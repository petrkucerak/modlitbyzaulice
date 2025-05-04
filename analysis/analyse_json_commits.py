import git
import json
import csv
from datetime import datetime
import os
import re


def parse_js_file(blob):
    """Parse the .js file to extract the JSON array from 'export const streets = [...]'."""
    try:
        content = blob.data_stream.read().decode('utf-8')
        # Extract the array using regex to match content between 'export const streets = [...]'
        match = re.search(
            r'export\s+const\s+streets\s*=\s*(\[.*?\])\s*;', content, re.DOTALL)
        if match:
            json_str = match.group(1)
            return json.loads(json_str)
        return None
    except (json.JSONDecodeError, AttributeError):
        return None


def count_empty_and_changed_names(current_data, parent_data):
    """Count empty names and changed names between current and parent JSON data."""
    empty_count = 0
    changed_count = 0

    # Ensure data is a list
    if not isinstance(current_data, list):
        return 0, 0

    # Count empty names in current data
    for item in current_data:
        name = item.get('name', '')
        if name == "":
            empty_count += 1

    # If no parent data, only return empty count
    if parent_data is None or not isinstance(parent_data, list):
        return empty_count, 0

    # Create a dictionary to map unique_number to names for comparison
    current_names = {item['unique_number']: item['name']
                     for item in current_data}
    parent_names = {item['unique_number']: item['name']
                    for item in parent_data}

    # Compare names by unique_number
    for unique_number in current_names:
        if unique_number in parent_names:
            if current_names[unique_number] != parent_names[unique_number]:
                changed_count += 1

    return empty_count, changed_count


def analyze_commits(repo_path, js_file_path):
    """Analyze commits in the repository and generate CSV with name statistics."""
    repo = git.Repo(repo_path)
    commits = list(repo.iter_commits('main'))  # Adjust branch name if needed

    # Prepare CSV output in the analysis directory
    csv_file = os.path.join('analysis', 'name_changes.csv')
    with open(csv_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['date', 'empty_names', 'changed_names'])

        for i, commit in enumerate(commits):
            commit_date = datetime.fromtimestamp(
                commit.committed_date).strftime('%Y-%m-%d %H:%M:%S')
            parent_data = None

            # Get .js file from current commit
            try:
                current_blob = commit.tree / js_file_path
                current_data = parse_js_file(current_blob)
            except KeyError:
                current_data = None

            # Get .js file from parent commit (if exists)
            if i < len(commits) - 1:  # Not the first commit
                parent_commit = commits[i + 1]
                try:
                    parent_blob = parent_commit.tree / js_file_path
                    parent_data = parse_js_file(parent_blob)
                except KeyError:
                    parent_data = None

            # Analyze names
            if current_data:
                empty_count, changed_count = count_empty_and_changed_names(
                    current_data, parent_data)
                writer.writerow([commit_date, empty_count, changed_count])
            else:
                writer.writerow([commit_date, 0, 0])


def main():
    # Configuration
    repo_path = '.'  # Path to your Git repository (root directory)
    js_file_path = 'data/streets_with_coordinates.js'  # Path to .js file in repo

    # Verify repository exists
    if not os.path.exists(os.path.join(repo_path, '.git')):
        print(f"Error: {repo_path} is not a valid Git repository")
        return

    # Ensure analysis directory exists
    os.makedirs('analysis', exist_ok=True)

    # Analyze commits and generate CSV
    try:
        analyze_commits(repo_path, js_file_path)
        print(f"CSV file 'analysis/name_changes.csv' generated successfully.")
    except Exception as e:
        print(f"Error analyzing commits: {e}")


if __name__ == '__main__':
    main()
