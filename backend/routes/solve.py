from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.groq_service import solve_math_text, solve_math_image

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
    """Parses response into steps and answer"""
    
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
    try:
        if request.type == "text":
            if not request.content.strip():
                raise HTTPException(status_code=400, detail="Problem text is empty")
            raw = solve_math_text(request.content)
        else:
            if not request.content:
                raise HTTPException(status_code=400, detail="Image data is empty")
            raw = solve_math_image(request.content)

        if not raw:
            raise HTTPException(status_code=500, detail="AI returned empty response")

        return parse_response(raw)

    except HTTPException:
        raise
    except Exception as e:
        print(f"Internal error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )