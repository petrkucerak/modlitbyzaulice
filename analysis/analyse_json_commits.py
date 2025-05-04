import git
import json
import csv
from datetime import datetime
import os
import re
import logging
import ast

def setup_logging():
    """Set up logging to file in analysis directory."""
    os.makedirs('analysis', exist_ok=True)
    logging.basicConfig(
        filename='analysis/debug_log.txt',
        level=logging.DEBUG,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

def clean_js_content(content):
    """Clean JavaScript content to extract the JSON array."""
    # Remove JavaScript comments (single-line and multi-line)
    content = re.sub(r'//.*?\n|/\*.*?\*/', '', content, flags=re.DOTALL)
    # Find the start of the array
    start_marker = 'export const streets ='
    start_idx = content.find(start_marker)
    if start_idx == -1:
        return None
    # Move past the marker
    content = content[start_idx + len(start_marker):].strip()
    # Find the end of the array by matching brackets
    bracket_count = 0
    end_idx = 0
    for i, char in enumerate(content):
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i + 1
                break
    if bracket_count != 0 or end_idx == 0:
        return None
    array_content = content[:end_idx].strip()
    # Remove trailing semicolon if present
    array_content = array_content.rstrip(';').strip()
    # Replace single quotes with double quotes for JSON compatibility
    array_content = re.sub(r"(?<!\\)'", '"', array_content)
    return array_content

def parse_js_file(blob, commit_hexsha):
    """Parse the .js file to extract the JSON array from 'export const streets = [...]'."""
    try:
        content = blob.data_stream.read().decode('utf-8')
        cleaned_content = clean_js_content(content)
        if not cleaned_content:
            logging.warning(f"Commit {commit_hexsha}: No valid 'streets' array found in file")
            logging.debug(f"Commit {commit_hexsha}: Raw content (first 200 chars):\n{content[:200]}")
            return None

        # Try parsing with json.loads
        try:
            data = json.loads(cleaned_content)
            logging.info(f"Commit {commit_hexsha}: Successfully parsed {len(data)} records with json.loads")
            return data
        except json.JSONDecodeError as e:
            logging.warning(f"Commit {commit_hexsha}: json.loads failed - {str(e)}")
            # Fallback to ast.literal_eval for JavaScript-like structures
            try:
                data = ast.literal_eval(cleaned_content)
                logging.info(f"Commit {commit_hexsha}: Successfully parsed {len(data)} records with ast.literal_eval")
                return data
            except (ValueError, SyntaxError) as e:
                logging.error(f"Commit {commit_hexsha}: ast.literal_eval failed - {str(e)}")
                logging.debug(f"Commit {commit_hexsha}: Cleaned content (first 200 chars):\n{cleaned_content[:200]}")
                return None
    except Exception as e:
        logging.error(f"Commit {commit_hexsha}: Failed to parse .js file - {str(e)}")
        logging.debug(f"Commit {commit_hexsha}: Raw content (first 200 chars):\n{content[:200]}")
        return None

def count_empty_and_changed_names(current_data, parent_data, commit_hexsha):
    """Count empty names and changed names between current and parent JSON data."""
    empty_count = 0
    changed_count = 0

    if not isinstance(current_data, list):
        logging.warning(f"Commit {commit_hexsha}: Current data is not a list")
        return 0, 0

    # Count empty names in current data
    for item in current_data:
        name = item.get('name', '')
        if not isinstance(name, str):
            logging.warning(f"Commit {commit_hexsha}: Invalid name type for unique_number {item.get('unique_number')}: {type(name)}")
            continue
        if name == "":
            empty_count += 1

    # If no parent data, only return empty count
    if not isinstance(parent_data, list):
        logging.info(f"Commit {commit_hexsha}: No parent data to compare")
        return empty_count, 0

    # Create dictionaries to map unique_number to names
    current_names = {item['unique_number']: item['name'] for item in current_data if 'name' in item and 'unique_number' in item}
    parent_names = {item['unique_number']: item['name'] for item in parent_data if 'name' in item and 'unique_number' in item}

    # Compare names by unique_number
    for unique_number in current_names:
        if unique_number in parent_names:
            if current_names[unique_number] != parent_names[unique_number]:
                changed_count += 1
                logging.info(f"Commit {commit_hexsha}: Name changed for unique_number {unique_number}: '{parent_names[unique_number]}' -> '{current_names[unique_number]}'")

    logging.info(f"Commit {commit_hexsha}: Empty names: {empty_count}, Changed names: {changed_count}")
    return empty_count, changed_count

def has_file_changed(commit, parent_commit, file_path):
    """Check if the specified file was changed in the commit compared to its parent."""
    if not parent_commit:
        # For the first commit, check if the file exists
        return file_path in commit.tree
    diff = commit.diff(parent_commit, paths=file_path)
    return len(diff) > 0

def analyze_commits(repo_path, js_file_path):
    """Analyze commits in the repository and generate CSV with name statistics."""
    repo = git.Repo(repo_path)
    # Reverse commits to process from oldest to newest
    commits = list(repo.iter_commits('main'))[::-1]  # Adjust branch name if needed
    logging.info(f"Found {len(commits)} commits in repository")

    # Prepare CSV output in the analysis directory
    csv_file = os.path.join('analysis', 'analysis_log.csv')
    with open(csv_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['date', 'empty_names', 'changed_names'])

        for i, commit in enumerate(commits):
            commit_date = datetime.fromtimestamp(commit.committed_date).strftime('%Y-%m-%d %H:%M:%S')
            commit_hexsha = commit.hexsha[:7]
            parent_commit = commits[i - 1] if i > 0 else None

            # Check if the file was changed in this commit
            if not has_file_changed(commit, parent_commit, js_file_path):
                logging.info(f"Commit {commit_hexsha}: Skipped - {js_file_path} not changed")
                continue

            parent_data = None

            # Get .js file from current commit
            try:
                current_blob = commit.tree / js_file_path
                current_data = parse_js_file(current_blob, commit_hexsha)
            except KeyError:
                logging.warning(f"Commit {commit_hexsha}: File {js_file_path} not found")
                current_data = None
                continue

            # Get .js file from parent commit (if exists)
            if parent_commit:
                parent_hexsha = parent_commit.hexsha[:7]
                try:
                    parent_blob = parent_commit.tree / js_file_path
                    parent_data = parse_js_file(parent_blob, parent_hexsha)
                except KeyError:
                    logging.warning(f"Parent commit {parent_hexsha}: File {js_file_path} not found")
                    parent_data = None

            # Analyze names
            empty_count, changed_count = count_empty_and_changed_names(current_data, parent_data, commit_hexsha)
            writer.writerow([commit_date, empty_count, changed_count])

def main():
    # Configuration
    repo_path = '.'  # Path to your Git repository (root directory)
    js_file_path = 'data/streets_with_coordinates.js'  # Path to .js file in repo

    # Verify repository exists
    if not os.path.exists(os.path.join(repo_path, '.git')):
        print(f"Error: {repo_path} is not a valid Git repository")
        logging.error(f"{repo_path} is not a valid Git repository")
        return

    # Ensure analysis directory exists
    os.makedirs('analysis', exist_ok=True)

    # Analyze commits and generate CSV
    try:
        analyze_commits(repo_path, js_file_path)
        print(f"CSV file 'analysis/analysis_log.csv' generated successfully.")
        print(f"Debug log saved to 'analysis/debug_log.txt'.")
    except Exception as e:
        print(f"Error analyzing commits: {e}")
        logging.error(f"Error analyzing commits: {e}")

if __name__ == '__main__':
    setup_logging()
    main()