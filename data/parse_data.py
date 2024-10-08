import json
from lxml import etree
from pyproj import Transformer
from concurrent.futures import ProcessPoolExecutor, as_completed
import os
import csv
import random

RANDOM_UNIQUE_NUMBERS = False

# Define the colors array
colors = ["#3d8bc9",  # sky
          "#516ba8",  # water
          "#ba003d",  # vine
          "#ea4756",  # red
          "#eb8fc2",  # pink
          "#789d3d",  # olive
          "#00846d",  # green
          "#f8e447"  # yellow
          ]

# Function to generate a unique 4-digit number for each street


def generate_unique_number(used_numbers):
    while True:
        number = f"{random.randint(1000, 9999)}"
        if number not in used_numbers:
            used_numbers.add(number)
            return number

# Colorize data by districts and assign a unique number to each street


def colorize_data(data):
    pairs = {
        "Polabiny": "#3d8bc9",
        "Zelené Předměstí": "#f8e447",
        "Bílé Předměstí": "#eb8fc2",
    }

    if RANDOM_UNIQUE_NUMBERS:
        used_numbers = set()
    else:
        unique_number = 1100

    for street in data:
        if (street["district_name"] == ""):
            street["color"] = random.choice(colors)
        else:
            if street["district_name"] not in pairs:
                pairs[street["district_name"]] = random.choice(colors)
            street["color"] = pairs[street["district_name"]]

        # Generate and assign a unique 4-digit number to the street
        if RANDOM_UNIQUE_NUMBERS:
            street["unique_number"] = generate_unique_number(used_numbers)
        else:
            street["unique_number"] = unique_number
            unique_number += 1

    return data

# Function to extract the name of the "obec" (municipality)


def extract_obec_name(xml_file):
    tree = etree.parse(xml_file)
    root = tree.getroot()

    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'obi': 'urn:cz:isvs:ruian:schemas:ObecIntTypy:v1',
    }

    obec_name_element = root.find(
        './/vf:Obce/vf:Obec/obi:Nazev', namespaces=ns)
    return obec_name_element.text if obec_name_element is not None else ""


# Function to load manual data from a JSON file
def get_manual_data():
    manual_data_file = 'manual_data.json'  # Replace with the actual filename

    if not os.path.exists(manual_data_file):
        print(f"Manual data file '{manual_data_file}' does not exist.")
        return []

    with open(manual_data_file, 'r', encoding='utf-8') as file:
        try:
            manual_data = json.load(file)
            return manual_data
        except json.JSONDecodeError:
            print(f"Error decoding JSON from file '{manual_data_file}'.")
            return []


# Function to load district data from the CSV file
def load_district_data(csv_file):
    district_data = {}
    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            key = (row['street_name'].strip(), row['city_name'].strip())
            if key not in district_data:
                district_data[key] = []

            district_data[key].append({
                'district_name': row['district_name'].strip(),
                'borough_name': row['borough_name'].strip()
            })
    return district_data

# Function to process each street element


def process_street_element(street_data, transformer, obec_name, district_data):
    street_name, coordinates_list = street_data

    key = (street_name, obec_name)
    district_info_list = district_data.get(key, [])

    district_info = district_info_list[0] if district_info_list else {}
    district_name = district_info.get('district_name', "")

    subgroups = []

    for coords in coordinates_list:
        subgroup = []
        for x, y in zip(coords[::2], coords[1::2]):
            lon, lat = transformer.transform(float(x), float(y))
            subgroup.append([lon, lat])

        subgroups.append(subgroup)

    # Conditional logic based on the obec_name
    if obec_name == "Pardubice":
        return {
            'name': "",
            'street_name': street_name,
            'city_name': obec_name,
            'district_name': district_name,
            'color': "",
            'unique_number': "",
            'coordinates': subgroups
        }
    else:
        return {
            'name': "",
            'street_name': street_name,
            'city_name': obec_name,
            'district_name': obec_name,
            'color': "",
            'unique_number': "",
            'coordinates': subgroups
        }

# Function to extract streets with their coordinates from the XML file


def extract_streets_with_coordinates(xml_file, transformer, obec_name, district_data):
    tree = etree.parse(xml_file)
    root = tree.getroot()

    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'uli': 'urn:cz:isvs:ruian:schemas:UliceIntTypy:v1',
        'gml': 'http://www.opengis.net/gml/3.2'
    }

    streets = root.xpath('//vf:Ulice[not(.//vf:Ulice)]', namespaces=ns)

    street_data_list = []
    for street in streets:
        name_element = street.find('uli:Nazev', namespaces=ns)
        street_name = name_element.text if name_element is not None else ""

        coordinates_list = []
        for posList in street.xpath('.//gml:posList', namespaces=ns):
            coords = posList.text.strip().split()
            coordinates_list.append(coords)

        street_data_list.append((street_name, coordinates_list))

    with ProcessPoolExecutor() as executor:
        futures = [executor.submit(process_street_element, street_data,
                                   transformer, obec_name, district_data) for street_data in street_data_list]

        street_data = []
        for future in as_completed(futures):
            street_data.append(future.result())

    return street_data

# Function to save the final data to a JSON file


def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# Main script execution
if __name__ == "__main__":
    directory = "./"
    xml_files = [f for f in os.listdir(directory) if f.endswith('.xml')]

    # Note: XML data downloaded from: https://vdp.cuzk.cz/vdp/ruian/ulice?kodOb=555134&nazevUl=Leteck%C3%A1&sort=NAZEV&search=

    csv_file = 'streets.csv'
    district_data = load_district_data(csv_file)

    transformer = Transformer.from_crs("EPSG:5514", "EPSG:4326")

    combined_data = []
    for xml_file in xml_files:
        obec_name = extract_obec_name(xml_file)

        streets_data = extract_streets_with_coordinates(
            xml_file, transformer, obec_name, district_data)

        combined_data.extend(streets_data)

    # Add manual data
    manual_data = get_manual_data()
    combined_data.extend(manual_data)

    # Colorize data by districts and assign unique numbers
    combined_data = colorize_data(combined_data)

    output_json_file = 'streets_data.json'
    save_to_json(combined_data, output_json_file)
    print(f"Data successfully saved to {output_json_file}")

    output_json = 'streets_with_coordinates.js'

    with open(output_json, mode='w', encoding='utf-8') as file:
        json.dump(combined_data, file, ensure_ascii=False, indent=4)
    with open(output_json, mode='r+', encoding='utf-8') as file:
        content = file.read()
        file.seek(0, 0)
        file.write("export const streets = " + content)

    print(f"Data has been successfully saved to {output_json}")
