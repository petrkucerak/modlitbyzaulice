from PyPDF2 import PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from pdf2image import convert_from_path

# Konstanty pro velikost kreditní karty a rozmístění na A4
CARD_WIDTH = 85.60 * mm
CARD_HEIGHT = 53.98 * mm
CARDS_PER_ROW = 2
CARDS_PER_COLUMN = 5
PAGE_WIDTH, PAGE_HEIGHT = A4

# Funkce pro vložení obrázků na A4 stránku


def create_a4_page_with_cards(c, images):
    x_offset = (PAGE_WIDTH - (CARDS_PER_ROW * CARD_WIDTH)) / 2
    y_offset = (PAGE_HEIGHT - (CARDS_PER_COLUMN * CARD_HEIGHT)) / 2

    for i in range(CARDS_PER_COLUMN):
        for j in range(CARDS_PER_ROW):
            card_index = i * CARDS_PER_ROW + j
            if card_index >= len(images):
                continue

            # Umístění jednotlivé karty na A4
            x = x_offset + j * CARD_WIDTH
            y = y_offset + (CARDS_PER_COLUMN - i - 1) * CARD_HEIGHT

            card_image = images[card_index]
            c.drawImage(card_image, x, y, CARD_WIDTH, CARD_HEIGHT)

# Hlavní funkce pro vytvoření nového PDF


def create_a4_pdf_with_10_cards_per_page(input_pdf, output_pdf):
    # Převede PDF stránky na obrázky
    images = convert_from_path(input_pdf, dpi=300)

    # Oddělení sudých a lichých stránek
    front_pages = images[1::2]  # Sudé stránky (líc)
    back_pages = images[0::2]   # Liché stránky (rub)

    c = canvas.Canvas(output_pdf, pagesize=A4)

    # Zpracování stránek po 10 (2x5 na stránku)
    for i in range(0, len(front_pages), 10):
        # Přidání lícových stránek na první A4 stranu
        create_a4_page_with_cards(c, front_pages[i:i + 10])
        c.showPage()

        # Přidání rubových stránek na druhou A4 stranu
        create_a4_page_with_cards(c, back_pages[i:i + 10])
        c.showPage()

    # Uložení PDF
    c.save()


# Vytvoření výstupního PDF
create_a4_pdf_with_10_cards_per_page("cards.pdf", "cards-print.pdf")
