import json
from lxml import etree
from pyproj import Transformer
from concurrent.futures import ProcessPoolExecutor, as_completed


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


def process_street_element(street_data, transformer, obec_name):
    street_name, coordinates_list = street_data

    # Placeholder for district and borough names
    district_name = ""  # Set appropriately if data is available
    borough_name = ""  # Set appropriately if data is available

    # Define a color (this is a placeholder; adjust logic if needed)
    color = "#00ff00"  # Default color, can be customized based on data or conditions

    subgroups = []

    # Process the coordinates
    for coords in coordinates_list:
        subgroup = []
        # Group coordinates into pairs and convert them
        for x, y in zip(coords[::2], coords[1::2]):
            # Convert the coordinates using the Transformer
            lon, lat = transformer.transform(float(x), float(y))
            subgroup.append([lon, lat])  # Swap lat and lon here

        # Append each subgroup of coordinates
        subgroups.append(subgroup)

    # Return the processed street data
    return {
        'date': "",  # Placeholder for date if available
        'name': "",  # Placeholder for additional name information if available
        'street_name': street_name,
        'city_name': obec_name,
        'district_name': district_name,
        'borough_name': borough_name,
        'color': color,
        'coordinates': subgroups
    }


def extract_streets_with_coordinates(xml_file, transformer, obec_name):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define the namespaces used in the XML file
    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'uli': 'urn:cz:isvs:ruian:schemas:UliceIntTypy:v1',
        'gml': 'http://www.opengis.net/gml/3.2'
    }

    # Find all street elements and extract necessary data
    streets = root.xpath('//vf:Ulice[not(.//vf:Ulice)]', namespaces=ns)

    # Prepare the data to be passed to the parallel process
    street_data_list = []
    for street in streets:
        name_element = street.find('uli:Nazev', namespaces=ns)
        street_name = name_element.text if name_element is not None else ""

        coordinates_list = []
        for posList in street.xpath('.//gml:posList', namespaces=ns):
            coords = posList.text.strip().split()
            coordinates_list.append(coords)

        street_data_list.append((street_name, coordinates_list))

    # Parallelize the processing of street elements
    with ProcessPoolExecutor() as executor:
        futures = [executor.submit(process_street_element, street_data,
                                   transformer, obec_name) for street_data in street_data_list]

        street_data = []
        for future in as_completed(futures):
            street_data.append(future.result())

    return street_data


def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    # Array of XML file paths to process
    xml_files = ['20240831_OB_555134_UKSH.xml',
                 '20240831_OB_574198_UKSH.xml',
                 '20240831_OB_574741_UKSH.xml',
                 '20240831_OB_575372_UKSH.xml',
                 '20240831_OB_575534_UKSH.xml',
                 '20240831_OB_575593_UKSH.xml',
                 ]  # Add your XML files here

    # Initialize the Transformer
    transformer = Transformer.from_crs("EPSG:5514", "EPSG:4326")

    # Combine all results into a single JSON file
    combined_data = []
    for xml_file in xml_files:
        # Extract the name of the municipality (Nazev obce)
        obec_name = extract_obec_name(xml_file)

        # Extract and convert street data with parallel processing
        streets_data = extract_streets_with_coordinates(
            xml_file, transformer, obec_name)

        # Add the data to the combined list
        combined_data.extend(streets_data)

    # Save the combined data to a single JSON file
    output_json_file = 'streets_data.json'
    save_to_json(combined_data, output_json_file)
    print(f"Data successfully saved to {output_json_file}")
