import json
from lxml import etree
from pyproj import Transformer
from concurrent.futures import ProcessPoolExecutor, as_completed
import os


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


def process_additional_objects(xml_file, transformer, obec_name):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define the namespaces used in the XML file
    ns = {
        'vf': 'urn:cz:isvs:ruian:schemas:VymennyFormatTypy:v1',
        'kui': 'urn:cz:isvs:ruian:schemas:KatUzIntTypy:v1',
        'obi': 'urn:cz:isvs:ruian:schemas:ObecIntTypy:v1',
        'gml': 'http://www.opengis.net/gml/3.2'
    }

    # Find all katastralniUzemi elements
    kat_uzemi = root.xpath(
        '//vf:KatastralniUzemi[not(.//vf:KatastralniUzemi)]', namespaces=ns)

    uzemi = []
    for uzemi in kat_uzemi:
        name_element = uzemi.find('kui:Nazev', namespaces=ns)
        city_name = name_element.text if name_element is not None else ""

        district_name = obec_name

        point_element = uzemi.find(
            './/kui:Geometrie/kui:DefinicniBod/gml:MultiPoint/gml:pointMembers/gml:Point/gml:pos', namespaces=ns).text
        if point_element is not None:
            cors = point_element.split()
            lon, lat = transformer.transform(float(cors[0]), float(cors[1]))
            point_coords = [lon, lat]

        else:
            point_coords = []

        print(city_name, district_name, point_coords, "\n")


    # Find all KatastralniUzemi elements
    katastralni_uzemi_elements = root.findall(
        './/vf:KatastralniUzemi', namespaces=ns)

    additional_objects = []

    for ku_element in katastralni_uzemi_elements:

        street_name_element = ku_element.find('kui:Nazev', namespaces=ns)
        street_name = street_name_element.text if street_name_element is not None else ""

        city_name_element = root.find(
            './/vf:Obce/vf:Obec/obi:Nazev', namespaces=ns)
        city_name = city_name_element.text if city_name_element is not None else ""

        district_name_element = ku_element.find('kui:Nazev', namespaces=ns)
        district_name = district_name_element.text if district_name_element is not None else ""

        point_element = ku_element.find(
            './/kui:Geometrie/kui:DefinicniBod/gml:MultiPoint/gml:pointMembers/gml:Point/gml:pos', namespaces=ns)
        point_coords = point_element.text.strip(
        ).split() if point_element is not None else []
        if point_coords:
            lon, lat = transformer.transform(
                float(point_coords[0]), float(point_coords[1]))
            point = [lon, lat]
        else:
            point = []

        # Append the processed object to the list
        additional_objects.append({
            'date': "",  # Placeholder for date if available
            'name': "",  # Placeholder for additional name information if available
            'street_name': street_name,
            'city_name': city_name,
            'district_name': district_name,
            'borough_name': "",  # No borough name in this template
            'color': "#00ff00",  # Default color
            'point': point
        })

    return additional_objects


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

    directory = "./"
    # Array of XML file paths to process
    xml_files = [f for f in os.listdir(directory) if f.endswith('.xml')]
    # xml_files = ["20240831_OB_555134_UKSH.xml"]

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

        # Process all additional objects
        additional_objects = process_additional_objects(
            xml_file, transformer, obec_name)
        combined_data.extend(additional_objects)

    # Save the combined data to a single JSON file
    output_json_file = 'streets_data.json'
    save_to_json(combined_data, output_json_file)
    print(f"Data successfully saved to {output_json_file}")

    # Save the results to a JS file
    output_json = 'streets_with_coordinates.js'

    with open(output_json, mode='w', encoding='utf-8') as file:
        json.dump(combined_data, file, ensure_ascii=False, indent=4)
    with open(output_json, mode='r+', encoding='utf-8') as file:
        content = file.read()
        file.seek(0, 0)
        file.write("export const streets = " + content)

    print(f"Data has been successfully saved to {output_json}")
