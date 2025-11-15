# from google import genai
# import os
# from dotenv import load_dotenv

# load_dotenv()

# API_KEY = os.getenv("GEMINI_API_KEY")
# client = genai.Client(api_key=API_KEY)

# print("\n=== CLIENT ATTRIBUTES ===")
# print(dir(client))

# print("\n=== MODELS ATTRIBUTES ===")
# print(dir(client.models))

# print("\n=== METHODS IN MODELS ===")
# for a in dir(client.models):
#     if not a.startswith("_"):
#         print("-", a)

import inspect
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

print(inspect.getsource(client.models.embed_content))

