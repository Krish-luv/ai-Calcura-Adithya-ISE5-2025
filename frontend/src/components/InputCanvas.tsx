import React, { useEffect, useRef } from 'react'
import * as fabric from 'fabric'

interface InputCanvasProps {
  mode: 'draw' | 'type'
  text: string
  onTextChange: (text: string) => void
  canvasRef: React.MutableRefObject<fabric.Canvas | null>
}

const InputCanvas: React.FC<InputCanvasProps> = ({
  mode,
  text,
  onTextChange,
  canvasRef
}) => {
  const htmlCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!htmlCanvasRef.current || !containerRef.current) return

    const width = containerRef.current.offsetWidth
    const height = containerRef.current.offsetHeight

    const fabricCanvas = new fabric.Canvas(htmlCanvasRef.current, {
      isDrawingMode: true,
      backgroundColor: '#ffffff',
      width: width || 800,
      height: height || 600,
    })

    // Set brush
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas)
    fabricCanvas.freeDrawingBrush.width = 3
    fabricCanvas.freeDrawingBrush.color = '#000000'

    canvasRef.current = fabricCanvas

    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    if (mode === 'draw') {
      canvasRef.current.isDrawingMode = true
    } else {
      canvasRef.current.isDrawingMode = false
    }
  }, [mode])

 return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-white"
      style={{ position: 'relative' }}
    >
      <canvas
        ref={htmlCanvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {mode === 'type' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your math problem here..."
            style={{ width: '75%', height: '75%', padding: '16px', fontSize: '20px', border: 'none', outline: 'none', resize: 'none', background: 'transparent' }}
          />
        </div>
      )}
    </div>
  )
}

export default InputCanvas