import csv
import requests
import json

# Function to get the coordinates of a given street, city, district, and borough
def get_coordinates(street_name, city_name, district_name, borough_name):
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    area["name"="{borough_name}"]->.searchArea;
    area["name"="{district_name}"]->.searchArea;
    area["name"="{city_name}"]->.searchArea;
    way["name"="{street_name}"](area.searchArea);
    (._;>;);
    out body;
    """
    response = requests.get(overpass_url, params={'data': overpass_query})
    data = response.json()
    
    coordinates = []
    for element in data['elements']:
        if element['type'] == 'node':
            coordinates.append((element['lat'], element['lon']))
    
    return coordinates

# Load street, city, district, and borough names from the CSV file
input_csv = 'streets.csv'
streets = []

with open(input_csv, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        streets.append({
            'street_name': row['street_name'], 
            'city_name': row['city_name'],
            'district_name': row['district_name'],
            'borough_name': row['borough_name']
        })

# Get coordinates for each street, city, district, and borough and save them to a list
streets_with_coordinates = []

for street in streets:
    coordinates = get_coordinates(street['street_name'], street['city_name'], street['district_name'], street['borough_name'])
    print(f"found street: {street['street_name']}")
    streets_with_coordinates.append({
        'street_name': street['street_name'],
        'city_name': street['city_name'],
        'district_name': street['district_name'],
        'borough_name': street['borough_name'],
        'coordinates': coordinates
    })

# Save the results to a JSON file
output_json = 'streets_with_coordinates.json'

with open(output_json, mode='w', encoding='utf-8') as file:
    json.dump(streets_with_coordinates, file, ensure_ascii=False, indent=4)

print(f"Data has been successfully saved to {output_json}")
