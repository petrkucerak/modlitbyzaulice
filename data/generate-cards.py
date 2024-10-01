from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import svgwrite
import os
from reportlab.lib.units import inch
from PyPDF2 import PdfMerger
from PIL import ImageFont

# Constants
CARD_WIDTH, CARD_HEIGHT = 85.60 * mm, 53.98 * mm
FONT_PATH = "path/to/your/font.ttf"
OUTPUT_PDF = "output_cards.pdf"
SVG_FOLDER = "svg_elements"
BACKGROUND_IMAGES = ["bg1.png", "bg2.png"]  # Add paths to background images

# Helper: Create a SVG Element


def create_svg_element(card_number):
    dwg = svgwrite.Drawing(
        f"{SVG_FOLDER}/card_{card_number}.svg", size=(CARD_WIDTH, CARD_HEIGHT))
    dwg.add(dwg.text(f"Card {card_number}", insert=(
        20, 20), fill='black', font_size="20"))
    dwg.save()

# Helper: Add custom text and SVG to PDF


def add_card_to_canvas(c, card_number, background_image=None):
    # Set background image if provided
    if background_image and os.path.exists(background_image):
        c.drawImage(background_image, 0, 0, CARD_WIDTH, CARD_HEIGHT)

    # Draw SVG (example element)
    svg_path = f"{SVG_FOLDER}/card_{card_number}.svg"
    if os.path.exists(svg_path):
        c.drawImage(svg_path, 10, 20, CARD_WIDTH / 2, CARD_HEIGHT / 2)

    # Dynamic text
    c.setFont("CustomFont", 12)
    c.drawString(10, CARD_HEIGHT - 20, f"Dynamic Text for Card {card_number}")

# Main PDF Generation


def generate_pdf_cards(num_cards):
    # Create folder for SVG if not exists
    if not os.path.exists(SVG_FOLDER):
        os.makedirs(SVG_FOLDER)

    # Register Custom Font
    pdfmetrics.registerFont(TTFont('CustomFont', FONT_PATH))

    merger = PdfMerger()

    for card_number in range(1, num_cards + 1):
        pdf_filename = f"card_{card_number}.pdf"
        c = canvas.Canvas(pdf_filename, pagesize=(CARD_WIDTH, CARD_HEIGHT))

        # Generate SVG elements
        create_svg_element(card_number)

        # Front Side (dynamic background)
        add_card_to_canvas(
            c, card_number, background_image=BACKGROUND_IMAGES[0])
        c.showPage()

        # Back Side (different background)
        add_card_to_canvas(
            c, card_number, background_image=BACKGROUND_IMAGES[1])
        c.showPage()

        # Save PDF for this card
        c.save()
        merger.append(pdf_filename)

    # Merge all cards into one final PDF
    merger.write(OUTPUT_PDF)
    merger.close()


# Example: Create 5 double-sided cards
generate_pdf_cards(5)
