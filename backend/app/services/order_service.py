import pandas as pd
from app.core.exceptions import NotFound

ORDERS_PATH = "app/data/oke_store_orders.xlsx"

df_orders = pd.read_excel(ORDERS_PATH)

def get_order_by_id(order_id: str):
    order_id = order_id.strip().upper()

    match = df_orders[df_orders["Order ID"] == order_id]

    if match.empty:
        raise NotFound(f"Order ID {order_id} tidak ditemukan.")

    row = match.iloc[0]

    return {
        "order_id": row["Order ID"],
        "nama": row["Nama Pembeli"],
        "produk": row["Produk"],
        "jumlah": int(row["Jumlah"]),
        "total_harga": int(row["Total Harga (Rp)"]),
        "kurir": row["Kurir"],
        "tanggal_beli": str(row["Tanggal Beli"]),
        "tanggal_kirim": str(row["Tanggal Kirim"]),
        "tanggal_sampai": str(row["Tanggal Sampai"]),
        "status": row["Status"],
    }
