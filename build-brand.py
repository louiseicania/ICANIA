#!/usr/bin/env python3
"""Build brand.html from brand.template.html, inlining the animated logo frames
as base64 PNG data URIs so the page is one self-contained file."""
import base64, io
from PIL import Image, ImageSequence

SRC = "fairy_stopmotion.gif"
TEMPLATE = "brand.template.html"
OUT = "brand/index.html"
DISPLAY_W = 200  # 2x of the ~88px display cell, for crispness


def frames(path):
    im = Image.open(path)
    out = []
    for fr in ImageSequence.Iterator(im):
        out.append(fr.convert("RGBA"))
    return out


def to_data_uri(img):
    w, h = img.size
    scaled = img.resize((DISPLAY_W, round(h * DISPLAY_W / w)), Image.LANCZOS)
    buf = io.BytesIO()
    scaled.save(buf, format="PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    fs = frames(SRC)
    cells = []
    for fr in fs:
        uri = to_data_uri(fr)
        cells.append(f'<img class="frame" src="{uri}" alt="">')
    html = open(TEMPLATE, encoding="utf-8").read()
    html = html.replace("<!--FRAMES-->", "\n    ".join(cells))
    open(OUT, "w", encoding="utf-8").write(html)
    kb = len(html.encode("utf-8")) / 1024
    print(f"Wrote {OUT}: {len(fs)} frames inlined, {kb:.0f} KB")


if __name__ == "__main__":
    main()
