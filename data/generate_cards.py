from reportlab.lib.pagesizes import landscape, A4
import json
from reportlab.lib.pagesizes import mm, landscape, A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
import re
import math


# USER CONFIGURATION
BORDERS = True  # export pdf with borders
CARD_LAYOUT = True
PRINT_LAYOUT = True
OUTPUT_PDF = "cards.pdf"
PRINT_OUTPUT_PDF = "cards-print.pdf"

SVG_BACKGROUND_FRONT = "svg_elements/ulice_karticky_V1-01.svg"
SVG_BACKGROUND_BACK = "svg_elements/ulice_karticky_V1-02.svg"
SVG_BACKGROUND_FRONT_PRINT = "svg_elements/ulice_karticky_V1-01-print.svg"
SVG_BACKGROUND_BACK_PRINT = "svg_elements/ulice_karticky_V1-02-print.svg"

# JSON_INPUT_FILE = "streets_data_test.json"  # Path to your JSON file
JSON_INPUT_FILE = "streets_data.json"  # Path to your JSON file

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
                "9.", "28.", "Čs.", "17.", "22.", "Dr.", "24."  # specific
                ]

back_side_map = {
    # first line
    0: 4,
    1: 3,
    2: 2,
    3: 1,
    4: 0,
    # second line
    5: 9,
    6: 8,
    7: 7,
    8: 6,
    9: 5
}


def custom_split(text):
    for preposition in prepositions:
        text = re.sub(fr"^{preposition} ", f"{preposition}*", text)
        text = re.sub(fr" {preposition} ", f" {preposition}*", text)
    words = text.split()
    patterns = []
    for word in words:
        patterns.append(word.replace("*", " "))
    return patterns


def create_multiple_double_sided_cards(filename, front_svg, back_svg, data, brother_font_path, eigerdals_sub_font_path, eigerdals_num_font_path):
    '''Function to create multiple double-sided cards PDF based on JSON data'''
    # Register the custom font
    pdfmetrics.registerFont(TTFont('BrotherFont', brother_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontSub', eigerdals_sub_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontNum', eigerdals_num_font_path))

    # Create a PDF canvas
    c = canvas.Canvas(filename, pagesize=(CARD_WIDTH, CARD_HEIGHT))

    for card in data:
        # print(f"{card["street_name"]} ({card["district_name"]})")

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


def draw_card_front(c, svg_file, street_name, district_name):
    '''
    Function to draw the front of the card.

    *Updated function to draw the front of the card with dynamic text fitting*
    '''
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


def split_text_to_fit(text, font_name, font_size, line_spacing, max_width, min_font_size):
    '''Helper function to split text to fit the card width'''
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


def draw_card_back(c, svg_file, unique_number):
    '''Function to draw the back of the card'''
    # Load and draw the back SVG
    svg = svg2rlg(svg_file)
    scale_svg_to_fit(svg)
    renderPDF.draw(svg, c, 0, 0)

    # Set custom font and render unique number
    c.setFont("EigerdalsFontNum", 8)
    c.setFillColor(color_blue)
    c.drawRightString(CARD_WIDTH - 10, 12, f"#{unique_number}")

    # Optionally draw borders
    if BORDERS:
        if PRINT_LAYOUT:
            c.setStrokeColor(colors.white)
            c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
        else:
            c.setStrokeColor(colors.black)
            c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)


def scale_svg_to_fit(drawing):
    '''Function to scale the SVG to fit within the card dimensions'''
    svg_width = drawing.width
    svg_height = drawing.height
    scale_x = CARD_WIDTH / svg_width
    scale_y = CARD_HEIGHT / svg_height
    scale = min(scale_x, scale_y)
    drawing.width *= scale
    drawing.height *= scale
    drawing.scale(scale, scale)


def create_print_file(PRINT_OUTPUT_PDF, SVG_BACKGROUND_FRONT,
                      SVG_BACKGROUND_BACK,
                      json_data,
                      brother_font_path,
                      eigerdals_sub_font_path, eigerdals_num_font_path):
    # Register custom fonts
    pdfmetrics.registerFont(TTFont('BrotherFont', brother_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontSub', eigerdals_sub_font_path))
    pdfmetrics.registerFont(
        TTFont('EigerdalsFontNum', eigerdals_num_font_path))

    # Create the PDF canvas for an A4 landscape page
    c = canvas.Canvas(PRINT_OUTPUT_PDF, pagesize=landscape(A4))

    # Dimensions of the A4 page in landscape (width, height)
    A4_WIDTH, A4_HEIGHT = landscape(A4)

    # Define the number of columns and rows (2x5 layout)
    COLUMNS = 5
    ROWS = 2

    # Calculate card positions based on A4 dimensions
    card_width = CARD_WIDTH - 70
    card_height = CARD_HEIGHT - 107

    # Horizontal and vertical gaps between cards
    horizontal_gap = (A4_WIDTH - (COLUMNS * card_width)) / (COLUMNS + 1)
    vertical_gap = (A4_HEIGHT - (ROWS * card_height)) / (ROWS + 1)

    reducer = 13.5 * mm

    def get_front_card_position(column, row):
        x = horizontal_gap + (column * (card_width + horizontal_gap)) - reducer
        y = A4_HEIGHT - (vertical_gap + ((row + 1) *
                         (card_height + vertical_gap))) + 45
        return x, y

    def get_back_card_position(column, row):
        x = horizontal_gap + \
            (column * (card_width + horizontal_gap)) - 70 + reducer
        y = A4_HEIGHT - (vertical_gap + ((row + 1) *
                         (card_height + vertical_gap))) + 45
        return x, y

    # Iterate over the data and place the cards on the page
    front_pages = []
    back_pages = [None] * COLUMNS * ROWS
    card_count = 0
    for i in range(len(json_data)):
        # back page
        index = i % (ROWS * COLUMNS)
        back_pages[back_side_map[index]] = json_data[i]
        # front page
        front_pages.append(json_data[i])

        # Print pages
        if len(front_pages) == 10:
            for card in front_pages:
                column = card_count % COLUMNS
                row = card_count // COLUMNS

                # Calculate the position for this card
                x, y = get_front_card_position(column, row)

                # Draw the front side of the card
                c.saveState()  # Save canvas state before translation
                c.translate(x, y)
                draw_card_front(c, SVG_BACKGROUND_FRONT,
                                card["street_name"], card["district_name"])
                c.restoreState()  # Restore canvas state after translation

                card_count += 1

            # Render x helping lines
            for i in range(6):
                x, y = get_front_card_position(i, 0)
                c.line(x-0.5, 0, x-0.5, A4_HEIGHT)

            # Render y helping lines
            for i in range(-1, 2):
                x, y = get_front_card_position(0, i)
                c.line(0, y-0.5, A4_WIDTH, y-0.5)

            # We've filled this page, save and start a new one
            c.showPage()
            card_count = 0
            column = 0
            row = 0
            front_pages.clear()

            for card in back_pages:
                column = card_count % COLUMNS
                row = card_count // COLUMNS

                # Calculate the position for this card
                x, y = get_back_card_position(column, row)

                # Draw the back side of the card
                c.saveState()  # Save canvas state before translation
                c.translate(x, y)
                draw_card_back(c, SVG_BACKGROUND_BACK,
                               card["unique_number"])
                c.restoreState()  # Restore canvas state after translation

                card_count += 1
            c.showPage()
            card_count = 0
            column = 0
            row = 0
            back_pages = [None] * COLUMNS * ROWS

    # Save the final PDF page
    c.save()


def load_json(json_file):
    '''Function to load JSON data from a file'''

    with open(json_file, 'r', encoding='utf-8') as f:
        return json.load(f)


json_data = load_json(JSON_INPUT_FILE)

if CARD_LAYOUT:
    print("Start building card.pdf")
    create_multiple_double_sided_cards(
        OUTPUT_PDF,
        SVG_BACKGROUND_FRONT_PRINT,
        SVG_BACKGROUND_BACK_PRINT,
        json_data,
        brother_font_path,
        eigerdals_sub_font_path, eigerdals_num_font_path
    )
    print("Script for building card.pdf ends.\n~~~~~~~~~~~~~~\n")

if PRINT_LAYOUT:
    print("Start building cards-print.pdf")
    create_print_file(PRINT_OUTPUT_PDF, SVG_BACKGROUND_FRONT_PRINT,
                      SVG_BACKGROUND_BACK_PRINT,
                      json_data,
                      brother_font_path,
                      eigerdals_sub_font_path, eigerdals_num_font_path)
    print("Script for building cards-print.pdf ends.\n~~~~~~~~~~~~~~\n")
