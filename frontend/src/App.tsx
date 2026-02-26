import { useRef, useState } from 'react'
import * as fabric from 'fabric'
import Toolbar from './components/Toolbar'
import InputCanvas from './components/InputCanvas'
import OutputCanvas from './components/OutputCanvas'
import { solveText, solveImage } from './services/api'

function App() {

  // Canvas reference for Fabric.js
  const canvasRef = useRef<fabric.Canvas | null>(null)

  // Mode — draw or type
  const [mode, setMode] = useState<'draw' | 'type'>('draw')

  // Text input for type mode
  const [text, setText] = useState('')

  // Loading state while AI is solving
  const [isLoading, setIsLoading] = useState(false)

  // Solution steps from AI
  const [steps, setSteps] = useState<string[]>([])

  // Final answer from AI
  const [answer, setAnswer] = useState('')

  // Undo last stroke or last character in type mode
  const handleUndo = () => {
    if (mode === 'type') {
      setText(prev => prev.slice(0, -1))
      return
    }
    if (!canvasRef.current) return
    const objects = canvasRef.current.getObjects()
    if (objects.length > 0) {
      canvasRef.current.remove(objects[objects.length - 1])
      canvasRef.current.renderAll()
    }
  }

  // Delete everything
  const handleDelete = () => {
    if (mode === 'type') {
      setText('')
      return
    }
    if (!canvasRef.current) return
    canvasRef.current.clear()
    canvasRef.current.backgroundColor = '#ffffff'
    canvasRef.current.renderAll()
  }

  // Solve — sends to backend
  const handleSolve = async () => {
    setIsLoading(true)
    setSteps([])
    setAnswer('')

    try {
      let result: { steps: string[], answer: string } | undefined

      if (mode === 'type') {
        result = await solveText(text)
      } else {
        const imageData = canvasRef.current?.toDataURL({
          format: 'png',
          multiplier: 0
        })
        if (!imageData) {
          setIsLoading(false)
          return
        }
        const base64 = imageData.replace('data:image/png;base64,', '')
        result = await solveImage(base64)
      }

      if (result) {
        setSteps(result.steps)
        setAnswer(result.answer)
      }

    } catch (error) {
      console.error('Error solving:', error)
      setSteps(['Something went wrong. Please try again.'])
      setAnswer('')
    } finally {
      setIsLoading(false)
    }
  }

return (
  <div className="flex flex-col h-screen bg-gray-50">

    {/* Header */}
    <div className="flex items-center px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      <span className="text-2xl mr-2">🧮</span>
      <span className="text-xl font-bold text-gray-800">CalcuraAI</span>
      <span className="ml-2 text-sm text-gray-400">Math Solver</span>
    </div>

    {/* Toolbar */}
    <Toolbar
      mode={mode}
      isLoading={isLoading}
      onDraw={() => setMode('draw')}
      onType={() => setMode('type')}
      onUndo={handleUndo}
      onDelete={handleDelete}
      onSolve={handleSolve}
    />

    {/* Split Screen */}
    <div className="flex flex-1 overflow-hidden">

      {/* Left — Input Canvas */}
      <div className="w-1/2 border-r-2 border-gray-200">
        <InputCanvas
          mode={mode}
          text={text}
          onTextChange={setText}
          canvasRef={canvasRef}
        />
      </div>

      {/* Right — Output Canvas */}
      <div className="w-1/2">
        <OutputCanvas
          isLoading={isLoading}
          steps={steps}
          answer={answer}
        />
      </div>

    </div>
  </div>
  )
}

export default App