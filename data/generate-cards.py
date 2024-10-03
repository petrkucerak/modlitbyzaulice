import json
from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
import re
from PyPDF2 import PdfReader, PdfWriter


# USER CONFIGURATION
BORDERS = True  # export pdf with borders
PRINT_LAYOUT = False
OUTPUT_PDF = "cards.pdf"
PRINT_OUTPUT_PDF = "cards-print.pdf"

SVG_BACKGROUND_FRONT = "svg_elements/ulice_karticky_V1-01.svg"
SVG_BACKGROUND_BACK = "svg_elements/ulice_karticky_V1-02.svg"

# JSON_INPUT_FILE = "streets_data_test.json"  # Path to your JSON file
JSON_INPUT_FILE = "streets_data.json"  # Path to your JSON file

# Print configuration
PAGES_ON_PAGE = 9

# Credit card dimensions in mm (85.60 x 53.98)
CARD_WIDTH = 53.98 * mm
CARD_HEIGHT = 85.60 * mm


# Path to your custom font file
brother_font_path = "fonts/Brother1816Printed-Bold.ttf"
eigerdals_sub_font_path = "fonts/Eigerdals-Med.ttf"
eigerdals_num_font_path = "fonts/Eigerdals-Reg.ttf"

color_vine = "#5a003d"
color_blue = "#516ba8"

# List of common Czech one-letter prepositions
prepositions = ["v", "z", "k", "s", "u",
                "V", "Z", "K", "S", "U",
                "9.", "28.", "Čs."  # specific
                ]


def custom_split(text):
    for preposition in prepositions:
        text = re.sub(fr"^{preposition} ", f"{preposition}*", text)
        text = re.sub(fr" {preposition} ", f" {preposition}*", text)
    words = text.split()
    patterns = []
    for word in words:
        patterns.append(word.replace("*", " "))
    return patterns
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


# Updated function to draw the front of the card with dynamic text fitting
def draw_card_front(c, svg_file, street_name, district_name):
    # Load and draw the front SVG
    svg = svg2rlg(svg_file)
    scale_svg_to_fit(svg)
    renderPDF.draw(svg, c, 0, 0)

    reduction = -6

    # Set font and initial text position
    font_name = "BrotherFont"
    font_size = 24
    line_spacing = 26  # Adjust line spacing
    available_width = CARD_WIDTH - 22  # Adjust based on margins
    min_font_size = 12  # Minimum font size

    # Split street name if necessary
    street_name_lines, tmp_font_size, tmp_line_spacing = split_text_to_fit(
        street_name, font_name, font_size, line_spacing, available_width, min_font_size)

    # Calculate text height based on number of lines and adjust reduction
    total_text_height = len(street_name_lines) * (line_spacing if tmp_line_spacing ==
                                                  line_spacing else tmp_line_spacing) if len(street_name_lines) > 1 else 0
    text_y_position = CARD_HEIGHT / 3 + reduction + 9 + \
        total_text_height / 2 + (10 if len(street_name_lines) == 3 else 0)

    # Render street name
    c.setFont(font_name, font_size if tmp_font_size ==
              font_size else tmp_font_size)
    c.setFillColor(color_vine)
    for line in street_name_lines:
        c.drawString(11, text_y_position, line)
        text_y_position -= (line_spacing if tmp_line_spacing ==
                            line_spacing else tmp_line_spacing)

    # Render district name
    c.setFont("EigerdalsFontSub", 12)
    c.setFillColor(color_vine)
    c.drawString(11, CARD_HEIGHT / 3 + reduction - 9 -
                 (6 if len(street_name_lines) == 3 else 0), district_name)

    # Optionally draw borders
    if BORDERS:
        c.setStrokeColor(colors.black)
        c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)

# Helper function to split text to fit the card width


def split_text_to_fit(text, font_name, font_size, line_spacing, max_width, min_font_size):
    words = custom_split(text)
    lines = []
    current_line = ""

    for word in words:
        if stringWidth(current_line + " " + word, font_name, font_size) < max_width:
            if current_line:
                current_line += " " + word
            else:
                current_line = word
        else:
            # Adjust font size if necessary to fit the street name within the available width
            while stringWidth(word, font_name, font_size) > max_width and font_size > min_font_size:
                font_size -= 1  # Reduce font size until it fits
                line_spacing -= 1
            lines.append(current_line) if current_line != "" else None
            current_line = word

    if current_line:
        lines.append(current_line)

    return lines, font_size, line_spacing

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
    if BORDERS:
        c.setStrokeColor(colors.black)
        c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)

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

def shuffle_pdf_pages(input_pdf_path, output_pdf_path):
    # Load the PDF
    reader = PdfReader(input_pdf_path)
    total_pages = len(reader.pages)

    # Ensure total_pages is even for front/back matching
    if total_pages % 2 != 0:
        raise ValueError("The PDF must have an even number of pages to match front and back.")

    # Create a PDF writer for the output
    writer = PdfWriter()

    # Shuffle the pages by arranging front and back to match correctly
    for i in range(0, total_pages, 2 * PAGES_ON_PAGE):  # 9 pairs per A4 page
        front_pages = []
        back_pages = []
        for j in range (i, 2*PAGES_ON_PAGE, 2):
            front_pages.append(reader.pages[j])
        for j in range (i+1, 2*PAGES_ON_PAGE, 2):
            back_pages.append(reader.pages[j])

        # Add front pages first
        for front_page in front_pages:
            writer.add_page(front_page)

        # Add back pages next
        # expect flip on long edge
        for back_page in back_pages:
            writer.add_page(back_page)

    # Save the shuffled PDF to the output file
    with open(output_pdf_path, 'wb') as output_pdf:
        writer.write(output_pdf)

    print(f"PDF pages have been shuffled and saved to: {output_pdf_path}")



json_data = load_json(JSON_INPUT_FILE)

create_multiple_double_sided_cards(
    OUTPUT_PDF,
    SVG_BACKGROUND_FRONT,
    SVG_BACKGROUND_BACK,
    json_data,
    brother_font_path,
    eigerdals_sub_font_path, eigerdals_num_font_path
)

if PRINT_LAYOUT:
    print("TODO")
    shuffle_pdf_pages(OUTPUT_PDF, PRINT_OUTPUT_PDF)


# prekladani po dlouhe strane