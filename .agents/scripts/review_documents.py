from pathlib import Path
import fitz

out = Path("/tmp/pp-document-review")
out.mkdir(exist_ok=True)
for path in Path("attached_assets").glob("*1792002661887.pdf"):
    doc = fitz.open(path)
    (out / (path.stem + ".txt")).write_text("\n".join(page.get_text() for page in doc))
    print(path.name, "pages:", len(doc))
    if path.name.startswith("Pre-Call"):
        doc[0].get_pixmap(matrix=fitz.Matrix(1.4, 1.4)).save(out / "intake.png")
