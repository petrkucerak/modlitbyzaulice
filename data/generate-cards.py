import json
from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

# Credit card dimensions in mm (85.60 x 53.98)
CARD_WIDTH = 53.98 * mm
CARD_HEIGHT = 85.60 * mm

color_vine = "#5a003d"
color_blue = "#516ba8"

# Function to create multiple double-sided cards PDF based on JSON data


def create_multiple_double_sided_cards(filename, front_svg, back_svg, data, brother_font_path, eigerdals_sub_font_path, eigerdals_num_font_path):
    # Register the custom font
    pdfmetrics.registerFont(TTFont('BrotherFont', brother_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontSub', eigerdals_sub_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontNum', eigerdals_num_font_path))

    # Create a PDF canvas
    c = canvas.Canvas(filename, pagesize=(CARD_WIDTH, CARD_HEIGHT))

    for card in data:
        print(f"{card["street_name"]} ({card["district_name"]})")

        # Front side of the card
        draw_card_front(
            c, front_svg, card["street_name"], card["district_name"])

        # Save the page (Front side)
        c.showPage()

        # Back side of the card
        draw_card_back(c, back_svg, card["unique_number"])

        # Save the page (Back side)
        c.showPage()

    # Save the PDF
    c.save()

# Function to draw the front of the card


def draw_card_front(c, svg_file, street_name, district_name):
    # Load and draw the front SVG
    svg = svg2rlg(svg_file)
    scale_svg_to_fit(svg)
    renderPDF.draw(svg, c, 0, 0)

    reduction = 0

    # Set custom font and render street name
    c.setFont("BrotherFont", 24)
    c.setFillColor(color_vine)
    c.drawString(11, CARD_HEIGHT / 3 + reduction + 7, street_name)

    # Render district name
    c.setFont("EigerdalsFontSub", 10)
    c.setFillColor(color_vine)
    c.drawString(11, CARD_HEIGHT / 3 + reduction - 7, district_name)

    # Optionally draw borders
    # c.setStrokeColor(colors.black)
    # c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)

# Function to draw the back of the card


def draw_card_back(c, svg_file, unique_number):
    # Load and draw the back SVG
    svg = svg2rlg(svg_file)
    scale_svg_to_fit(svg)
    renderPDF.draw(svg, c, 0, 0)

    # Set custom font and render unique number
    c.setFont("EigerdalsFontNum", 6)
    c.setFillColor(color_blue)
    c.drawRightString(CARD_WIDTH - 10, 12, f"#{unique_number}")

    # Optionally draw borders
    # c.setStrokeColor(colors.black)
    # c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)

# Function to scale the SVG to fit within the card dimensions


def scale_svg_to_fit(drawing):
    svg_width = drawing.width
    svg_height = drawing.height
    scale_x = CARD_WIDTH / svg_width
    scale_y = CARD_HEIGHT / svg_height
    scale = min(scale_x, scale_y)
    drawing.width *= scale
    drawing.height *= scale
    drawing.scale(scale, scale)

# Function to load JSON data from a file


def load_json(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        return json.load(f)


# Usage example
json_file_path = "streets_data_test.json"  # Path to your JSON file
# json_file_path = "streets_data.json"  # Path to your JSON file
# Path to your custom font file
brother_font_path = "fonts/Brother1816Printed-Bold.ttf"
eigerdals_sub_font_path = "fonts/Eigerdals-Med.ttf"
eigerdals_num_font_path = "fonts/Eigerdals-Reg.ttf"
json_data = load_json(json_file_path)

# Create the cards PDF with individual SVGs for front and back
create_multiple_double_sided_cards(
    "cards.pdf",
    "svg_elements/ulice_karticky_V1-01.svg",
    "svg_elements/ulice_karticky_V1-02.svg",
    json_data,
    brother_font_path,
    eigerdals_sub_font_path, eigerdals_num_font_path
)
