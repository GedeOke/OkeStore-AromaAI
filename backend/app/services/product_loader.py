import pandas as pd

PRODUCTS_PATH = "app/data/oke_store_products.xlsx"

def load_products():
    df = pd.read_excel(PRODUCTS_PATH)
    docs = []

    for _, row in df.iterrows():
        text = f"""
Produk: {row['Nama Produk']}
Aroma: {row['Aroma']}
Tipe: {row['Tipe']}
Ketahanan: {row['Ketahanan (jam)']}
Harga: Rp {row['Harga (Rp)']}
Cocok Untuk: {row['Cocok Untuk']}
Keunggulan: {row['Keunggulan']}
"""
        docs.append(text.strip())

    return docs
