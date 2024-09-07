import csv
import requests
import json

# Function to find a node by its ID
def find_node_by_id(node_id):
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    node({node_id});
    out body;
    """
    response = requests.get(overpass_url, params={'data': overpass_query})
    data = response.json()
    
    if data['elements']:
        node = data['elements'][0]
        return {
            'id': node['id'],
            'lat': node['lat'],
            'lon': node['lon'],
            'tags': node.get('tags', {})
        }
    else:
        return None

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
    
    # print(data)

    coordinates = []
    for element in data['elements']:
        if element['type'] == 'way':
            way = []
            for node_id in element['nodes']:
                node = find_node_by_id(node_id)
                # print(node)
                way.append((node['lat'], node['lon']))
            coordinates.append(way)
    

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

street_num = 0
street_sum = len(streets)

for street in streets:
    street_num +=1
    coordinates = get_coordinates(street['street_name'], street['city_name'], street['district_name'], street['borough_name'])
    print(f"Found street: {street['street_name']}\t\t({street_num}/{street_sum})")
    streets_with_coordinates.append({
        'date': "",
        'name': "",
        'color': "#ffff00",
        'street_name': street['street_name'],
        'city_name': street['city_name'],
        'district_name': street['district_name'],
        'borough_name': street['borough_name'],
        'coordinates': coordinates
    })

# Save the results to a JS file
output_json = 'streets_with_coordinates.js'

with open(output_json, mode='w', encoding='utf-8') as file:
    json.dump(streets_with_coordinates, file, ensure_ascii=False, indent=4)
with open(output_json, mode='r+', encoding='utf-8') as file:
    content = file.read()
    file.seek(0,0)
    file.write("export const streets = " + content)

print(f"Data has been successfully saved to {output_json}")
