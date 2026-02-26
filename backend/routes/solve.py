from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini import solve_math_text, solve_math_image

# Create router
router = APIRouter()

# Define what data we receive from frontend
class SolveRequest(BaseModel):
    type: str        # "text" or "image"
    content: str     # text problem or base64 image

class SolveResponse(BaseModel):
    steps: list[str]
    answer: str

def parse_response(raw: str) -> SolveResponse:
    """Parses Gemini response into steps and answer"""
    
    lines = raw.strip().split('\n')
    steps = []
    answer = ''

    for line in lines:
        line = line.strip()
        if line.startswith('STEP'):
            step_text = line.split(':', 1)[-1].strip()
            steps.append(step_text)
        elif line.startswith('ANSWER'):
            answer = line.split(':', 1)[-1].strip()

    return SolveResponse(steps=steps, answer=answer)

@router.post("/solve")
async def solve(request: SolveRequest):
    """Main solve endpoint"""
    
    if request.type == "text":
        raw = solve_math_text(request.content)
    else:
        raw = solve_math_image(request.content)

    return parse_response(raw)