from reportlab.lib.pagesizes import mm
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import inch

# Credit card dimensions in mm (85.60 x 53.98)
CARD_WIDTH = 53.98 * mm
CARD_HEIGHT = 85.60 * mm

# Function to create a double-sided card PDF


def create_double_sided_card(filename):
    # Create a PDF canvas
    c = canvas.Canvas(filename, pagesize=(CARD_WIDTH, CARD_HEIGHT))

    # Front side of the card
    draw_card_front(c)

    # Save the page (Front side)
    c.showPage()

    # Back side of the card
    draw_card_back(c)

    # Save the page (Back side)
    c.showPage()

    # Save the PDF
    c.save()

# Function to draw the front of the card


def draw_card_front(c):
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(colors.black)
    c.drawCentredString(CARD_WIDTH / 2, CARD_HEIGHT / 2, "Front Side Text")

    # Optionally draw borders
    c.setStrokeColor(colors.black)
    c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)

# Function to draw the back of the card


def draw_card_back(c):
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.black)
    c.drawCentredString(CARD_WIDTH / 2, CARD_HEIGHT / 2, "Back Side Text")

    # Optionally draw borders
    c.setStrokeColor(colors.black)
    c.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)


# Create the card PDF
create_double_sided_card("cards.pdf")
