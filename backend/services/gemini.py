from google import genai
from google.genai.errors import ClientError
from config.settings import GEMINI_API_KEY
import base64

client = genai.Client(api_key=GEMINI_API_KEY)

def solve_math_text(problem: str) -> str:
    prompt = f"""
    You are an expert math tutor. Solve this problem step by step.
    Problem: {problem}
    Return in this EXACT format:
    STEP 1: [explanation]
    STEP 2: [explanation]
    STEP 3: [explanation]
    ANSWER: [final answer]
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return response.text
    except ClientError:
        return """STEP 1: Quota exceeded
STEP 2: Please try again later
STEP 3: Or create new API key
ANSWER: Quota exhausted"""

def solve_math_image(image_data: str) -> str:
    image_bytes = base64.b64decode(image_data)
    prompt = """
    You are an expert math tutor. Solve this handwritten problem.
    Return in this EXACT format:
    STEP 1: [recognized equation]
    STEP 2: [explanation]
    STEP 3: [explanation]
    ANSWER: [final answer]
    """
    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash-8b",
            contents=[{
                "role": "user",
                "parts": [
                    {"text": prompt},
                    {"inline_data": {"mime_type": "image/png", "data": image_bytes}}
                ]
            }]
        )
        return response.text
    except ClientError:
        return """STEP 1: Quota exceeded
                    STEP 2: Please try again later
                    STEP 3: Or create new API key
                    ANSWER: Quota exhausted"""