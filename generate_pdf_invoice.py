import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = r"c:\Users\amanb\OneDrive\Desktop\Bachat Byte Bistro\bachat-byte-bistro\public\Bachat_Byte_Bistro_Official_Invoice.pdf"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

# Custom Colors matching Angular site
TEAL_DEEP = colors.HexColor("#0F5C62")
TEAL_DARK = colors.HexColor("#1E413D")
TERRACOTTA = colors.HexColor("#D9701F")
AMBER_GOLD = colors.HexColor("#E8AE4B")
CREAM_BG = colors.HexColor("#FBF8E7")
LIGHT_BG = colors.HexColor("#F4EFE0")
TEXT_DARK = colors.HexColor("#1E413D")

# Styles
style_title = ParagraphStyle(
    'DocTitle',
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=25,
    textColor=colors.white
)

style_sub_tag = ParagraphStyle(
    'DocSubTag',
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=AMBER_GOLD
)

style_slogan = ParagraphStyle(
    'DocSlogan',
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    textColor=colors.HexColor("#D0E0E1")
)

style_inv_title = ParagraphStyle(
    'InvTitle',
    fontName='Helvetica-Bold',
    fontSize=15,
    leading=18,
    textColor=AMBER_GOLD,
    alignment=2
)

style_inv_id = ParagraphStyle(
    'InvId',
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=colors.white,
    alignment=2
)

style_inv_date = ParagraphStyle(
    'InvDate',
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    textColor=colors.HexColor("#D0E0E1"),
    alignment=2
)

style_token_label = ParagraphStyle(
    'TokLbl',
    fontName='Helvetica-Bold',
    fontSize=8,
    leading=10,
    textColor=colors.white
)

style_token_num = ParagraphStyle(
    'TokNum',
    fontName='Helvetica-Bold',
    fontSize=30,
    leading=32,
    textColor=colors.white
)

style_badge = ParagraphStyle(
    'Badge',
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=12,
    textColor=colors.white,
    alignment=2
)

style_sec_title = ParagraphStyle(
    'SecTitle',
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=TEAL_DEEP
)

style_meta_label = ParagraphStyle(
    'MetaLabel',
    fontName='Helvetica',
    fontSize=8,
    leading=10,
    textColor=colors.HexColor("#64748B")
)

style_meta_val = ParagraphStyle(
    'MetaVal',
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12,
    textColor=TEXT_DARK
)

style_tbl_hdr = ParagraphStyle(
    'TblHdr',
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11,
    textColor=TEAL_DEEP
)

style_tbl_cell = ParagraphStyle(
    'TblCell',
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=TEXT_DARK
)

style_tbl_cell_bold = ParagraphStyle(
    'TblCellBold',
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=TEAL_DEEP
)

style_tbl_price = ParagraphStyle(
    'TblPrice',
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=TERRACOTTA,
    alignment=2
)

style_tot_lbl = ParagraphStyle(
    'TotLbl',
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=TEXT_DARK
)

style_tot_val = ParagraphStyle(
    'TotVal',
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12,
    textColor=TEXT_DARK,
    alignment=2
)

style_grand_lbl = ParagraphStyle(
    'GrandLbl',
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=TEAL_DEEP
)

style_grand_val = ParagraphStyle(
    'GrandVal',
    fontName='Helvetica-Bold',
    fontSize=16,
    leading=19,
    textColor=TERRACOTTA,
    alignment=2
)

style_footer_msg = ParagraphStyle(
    'FtrMsg',
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=colors.white,
    alignment=1
)

style_footer_sub = ParagraphStyle(
    'FtrSub',
    fontName='Helvetica',
    fontSize=8,
    leading=11,
    textColor=colors.HexColor("#D0E0E1"),
    alignment=1
)

elements = []

# --- 1. HEADER BANNER ---
logo_path = r"c:\Users\amanb\OneDrive\Desktop\Bachat Byte Bistro\bachat-byte-bistro\public\logo.png"
logo_img = Image(logo_path, width=54, height=54)

header_brand = [
    Paragraph("Bachat Byte Bistro", style_title),
    Paragraph("Bachat Byte Bistro Food Fest", style_sub_tag),
    Paragraph("Savour. Save. Share.", style_slogan)
]

header_meta = [
    Paragraph("TAX INVOICE", style_inv_title),
    Paragraph("#BBB-2026-070", style_inv_id),
    Paragraph("30 Jul 2026, 01:45 PM", style_inv_date)
]

header_table = Table([[logo_img, header_brand, header_meta]], colWidths=[65, 315, 160])
header_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), TEAL_DEEP),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('PADDING', (0,0), (-1,-1), 14),
]))
elements.append(header_table)

# --- 2. TOKEN CALLOUT BANNER ---
token_left = [
    Paragraph("BISTRO TOKEN NUMBER", style_token_label),
    Paragraph("#07", style_token_num)
]

token_right = [
    Paragraph("STATUS: PAID &amp; CONFIRMED", style_badge)
]

token_table = Table([[token_left, token_right]], colWidths=[340, 200])
token_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), TERRACOTTA),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('PADDING', (0,0), (-1,-1), 12),
]))
elements.append(token_table)

elements.append(Spacer(1, 14))

# --- 3. CUSTOMER INFO ---
elements.append(Paragraph("CUSTOMER &amp; BILLING INFO", style_sec_title))
elements.append(Spacer(1, 4))

cust_c1 = [Paragraph("Customer Name", style_meta_label), Paragraph("Arjun Mehta", style_meta_val)]
cust_c2 = [Paragraph("Phone Number", style_meta_label), Paragraph("+91 98765 43210", style_meta_val)]
cust_c3 = [Paragraph("Email Address", style_meta_label), Paragraph("arjun.m@example.com", style_meta_val)]

cust_table = Table([[cust_c1, cust_c2, cust_c3]], colWidths=[180, 180, 180])
cust_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), CREAM_BG),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2D8C3")),
    ('PADDING', (0,0), (-1,-1), 10),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))
elements.append(cust_table)

elements.append(Spacer(1, 16))

# --- 4. ITEM DETAILS TABLE ---
elements.append(Paragraph("ITEMIZED ORDER SUMMARY", style_sec_title))
elements.append(Spacer(1, 4))

items_data = [
    [
        Paragraph("DISH DESCRIPTION", style_tbl_hdr),
        Paragraph("CUISINE", style_tbl_hdr),
        Paragraph("UNIT PRICE", style_tbl_hdr),
        Paragraph("QTY", style_tbl_hdr),
        Paragraph("TOTAL AMOUNT", style_tbl_hdr)
    ],
    [
        Paragraph("Aloo Tikki Chaat", style_tbl_cell_bold),
        Paragraph("Indian Street Food", style_tbl_cell),
        Paragraph("Rs. 70", style_tbl_cell),
        Paragraph("2", style_tbl_cell),
        Paragraph("Rs. 140", style_tbl_price)
    ],
    [
        Paragraph("Hummus Pitta", style_tbl_cell_bold),
        Paragraph("Middle Eastern", style_tbl_cell),
        Paragraph("Rs. 90", style_tbl_cell),
        Paragraph("1", style_tbl_cell),
        Paragraph("Rs. 90", style_tbl_price)
    ],
    [
        Paragraph("Jamun Shots", style_tbl_cell_bold),
        Paragraph("Dessert", style_tbl_cell),
        Paragraph("Rs. 50", style_tbl_cell),
        Paragraph("2", style_tbl_cell),
        Paragraph("Rs. 100", style_tbl_price)
    ],
    [
        Paragraph("Iced Tea", style_tbl_cell_bold),
        Paragraph("Beverage", style_tbl_cell),
        Paragraph("Rs. 60", style_tbl_cell),
        Paragraph("1", style_tbl_cell),
        Paragraph("Rs. 60", style_tbl_price)
    ],
]

items_table = Table(items_data, colWidths=[180, 140, 80, 50, 90])
items_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), LIGHT_BG),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2D8C3")),
    ('PADDING', (0,0), (-1,-1), 7),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
elements.append(items_table)

elements.append(Spacer(1, 12))

# --- 5. TOTALS BREAKDOWN ---
summary_data = [
    [Paragraph("Items Subtotal", style_tot_lbl), Paragraph("Rs. 390", style_tot_val)],
    [Paragraph("Bachat Promise Savings (All items &lt;= Rs. 100)", style_tot_lbl), Paragraph("<font color='#16a34a'><b>APPLIED</b></font>", style_tbl_price)],
    [Paragraph("Taxes &amp; Bistro Packaging", style_tot_lbl), Paragraph("<font color='#16a34a'><b>FREE</b></font>", style_tbl_price)],
    [Paragraph("GRAND TOTAL PAID", style_grand_lbl), Paragraph("Rs. 390", style_grand_val)]
]

summary_table = Table(summary_data, colWidths=[370, 170])
summary_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), CREAM_BG),
    ('LINEBELOW', (0,0), (-1,-2), 0.5, colors.HexColor("#E2D8C3")),
    ('LINEABOVE', (0,-1), (-1,-1), 1.5, TEAL_DEEP),
    ('PADDING', (0,0), (-1,-1), 7),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
elements.append(summary_table)

elements.append(Spacer(1, 14))

# --- 6. PAYMENT MODE INFO ---
pay_c1 = Paragraph("<b>Payment Method:</b> UPI / Scan &amp; Pay at Counter", style_tbl_cell)
pay_c2 = Paragraph("<b>Status:</b> Paid &amp; Confirmed [PASSED]", style_tbl_cell)

pay_table = Table([[pay_c1, pay_c2]], colWidths=[340, 200])
pay_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
    ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2D8C3")),
    ('PADDING', (0,0), (-1,-1), 8),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
elements.append(pay_table)

elements.append(Spacer(1, 16))

# --- 7. FOOTER BANNER ---
footer_content = [
    Paragraph("Thank you for dining at Bachat Byte Bistro!", style_footer_msg),
    Spacer(1, 2),
    Paragraph("Savour. Save. Share. &nbsp;·&nbsp; Every single item Rs. 100 or below", style_footer_sub)
]

footer_table = Table([[footer_content]], colWidths=[540])
footer_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), TEAL_DEEP),
    ('PADDING', (0,0), (-1,-1), 10),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
]))
elements.append(footer_table)

doc.build(elements)
print("Clean PDF without malformed glyphs generated successfully:", pdf_path)
