from groq import Groq
from config.settings import GROQ_API_KEY
import base64

client = Groq(api_key=GROQ_API_KEY)


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
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"""STEP 1: Error occurred
STEP 2: {str(e)}
ANSWER: Failed"""


def solve_math_image(image_base64: str) -> str:
    if "," in image_base64:
        image_base64 = image_base64.split(",", 1)[1]

    print(f"Image received, length: {len(image_base64)}")

    if not image_base64 or not image_base64.strip():
        return """STEP 1: No image data received
STEP 2: Please draw a problem and try again
ANSWER: No input"""

    prompt = """
    You are an expert math tutor. Solve this handwritten math problem.
    Return in this EXACT format:
    STEP 1: [recognized equation]
    STEP 2: [explanation]
    STEP 3: [explanation]
    ANSWER: [final answer]
    """

    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",  
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{image_base64}"
                        }
                    }
                ]
            }]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"""STEP 1: Error occurred
STEP 2: {str(e)}
ANSWER: Failed"""