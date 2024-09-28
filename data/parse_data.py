from lxml import etree
from pyproj import Proj, transform


def extract_streets_with_coordinates(xml_file):
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

    # Find all street elements
    streets = root.findall('.//vf:Ulice', namespaces=ns)

    street_data = []

    # Iterate over each street element and extract data
    for street in streets:
        name_element = street.find('uli:Nazev', namespaces=ns)
        name = name_element.text if name_element is not None else "Unnamed Street"
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
                subgroup.append((lat, lon))

            # Append each subgroup of coordinates
            subgroups.append(subgroup)

        # Append the street name and the list of subgroups to the list
        street_data.append({
            'name': name,
            'subgroups': subgroups
        })

    return street_data


if __name__ == "__main__":
    xml_file = '20240831_OB_574198_UKSH.xml'  # Replace with your XML file path
    streets = extract_streets_with_coordinates(xml_file)

    # Print out the results
    for street in streets:
        print(f"Street: {street['name']}")
        print("GPS Coordinate Subgroups:")
        for subgroup_index, subgroup in enumerate(street['subgroups']):
            print(f"  Subgroup {subgroup_index + 1}:")
            for coord in subgroup:
                print(f"    {coord}")
