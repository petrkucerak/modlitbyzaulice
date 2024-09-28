import json
from lxml import etree
from pyproj import Proj, transform


def extract_obec_name(xml_file):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define the namespaces used in the XML file
    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'obi': 'urn:cz:isvs:ruian:schemas:ObecIntTypy:v1',
    }

    # Find the Nazev obce element
    obec_name_element = root.find(
        './/vf:Obce/vf:Obec/obi:Nazev', namespaces=ns)
    return obec_name_element.text if obec_name_element is not None else ""


def extract_streets_with_coordinates(xml_file, obec_name):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define the namespaces used in the XML file
    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'uli': 'urn:cz:isvs:ruian:schemas:UliceIntTypy:v1',
        'gml': 'http://www.opengis.net/gml/3.2'
    }

    # Set up the projections
    # Original S-JTSK / Krovak East North projection
    proj_epsg_5514 = Proj(init='epsg:5514')
    proj_epsg_4326 = Proj(init='epsg:4326')  # WGS84 GPS coordinate system

    street_data = []

    # Find all street elements and iterate through them
    for street in root.xpath('//vf:Ulice[not(.//vf:Ulice)]', namespaces=ns):
        name_element = street.find('uli:Nazev', namespaces=ns)
        street_name = name_element.text if name_element is not None else ""

        # Placeholder for district and borough names
        district_name = ""  # Set appropriately if data is available
        borough_name = ""  # Set appropriately if data is available

        # Define a color (this is a placeholder; adjust logic if needed)
        color = "#00ff00"  # Default color, can be customized based on data or conditions

        subgroups = []

        # Extract coordinates from each gml:posList inside gml:LineString
        for posList in street.xpath('.//gml:posList', namespaces=ns):
            coords = posList.text.strip().split()
            subgroup = []
            # Group coordinates into pairs and convert them
            for x, y in zip(coords[::2], coords[1::2]):
                # Convert the coordinates from EPSG:5514 to EPSG:4326
                lon, lat = transform(
                    proj_epsg_5514, proj_epsg_4326, float(x), float(y))
                subgroup.append([lat, lon])

            # Append each subgroup of coordinates
            subgroups.append(subgroup)

        # Append the street data to the list
        street_data.append({
            'date': "",  # Placeholder for date if available
            'name': "",  # Placeholder for additional name information if available
            'street_name': street_name,
            'city_name': obec_name,
            'district_name': district_name,
            'borough_name': borough_name,
            'color': color,
            'coordinates': subgroups
        })

    return street_data


def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    xml_file = '20240831_OB_574198_UKSH.xml'  # Replace with your XML file path
    # The name of the JSON file to save
    output_json_file = 'streets_data.json'

    # Extract the name of the municipality (Nazev obce)
    obec_name = extract_obec_name(xml_file)

    # Extract and convert street data
    streets_data = extract_streets_with_coordinates(xml_file, obec_name)

    # Save the data to a JSON file
    save_to_json(streets_data, output_json_file)

    print(f"Data successfully saved to {output_json_file}")
