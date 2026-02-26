# ai-Calcura-Adithya-ISE5-2025
AI Handwritten Problem or Expression Calculator - Final Year Project 2021-2025 ISE
<<<<<<< HEAD
Gemini API ✅

Supports handwritten image analysis
Free tier (1500 req/day) but quota exhausts fast

OpenAI ✅

GPT-4o supports image analysis
Works perfectly but requires billing ($5 minimum)

Groq ✅ (current)

Free, no credit card
Supports images with llama-4-scout model
=======


Calcura Math Solver is an AI-powered tool that can solve both text-based and handwritten math problems. The solution process is detailed step by step, making it useful for learning and verification purposes.

## Features

- Solve math problems given as text input.
- Solve handwritten math problems from image input.
- Provides step-by-step explanations and the final answer.
- Designed to be used as a tutoring or educational aid.

## Usage

1. Import the module in your Python project.
2. Call `solve_math_text(problem)` for text-based problems.
3. Call `solve_math_image(image_data)` for image-based problems.

```python
from math_solver import solve_math_text, solve_math_image

text_problem = "Solve 2x + 5 = 15"
result = solve_math_text(text_problem)
print(result)

# For image-based problems, provide base64 encoded string
image_data = "<base64-string>"
result = solve_math_image(image_data)
print(result)
>>>>>>> 4a22e09ce87eb4658b078ad8a91210a295ca5625
