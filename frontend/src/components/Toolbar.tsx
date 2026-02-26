/** React — to build the component*/
import React from 'react'

/** Icons from lucide-react — for buttons*/
import { 
  Pencil, 
  Type, 
  Undo2, 
  Trash2, 
  Calculator 
} from 'lucide-react'

/**Defines the Props Interface — what data Toolbar receives from parent*/
interface ToolbarProps {
  mode: 'draw' | 'type'
  isLoading: boolean
  onDraw: () => void
  onType: () => void
  onUndo: () => void
  onDelete: () => void
  onSolve: () => void
}

/**Toolbar component with all 5 buttons */
const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  isLoading,
  onDraw,
  onType,
  onUndo,
  onDelete,
  onSolve
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border-b shadow-sm">
      
      {/* Draw Button */}
      <button
        onClick={onDraw}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${mode === 'draw' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        <Pencil size={18} />
        Draw
      </button>

      {/* Type Button */}
      <button
        onClick={onType}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${mode === 'type' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        <Type size={18} />
        Type
      </button>

      {/* Undo Button */}
      <button
        onClick={onUndo}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-all"
      >
        <Undo2 size={18} />
        Undo
      </button>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition-all"
      >
        <Trash2 size={18} />
        Delete
      </button>

      {/* Solve Button */}
      <button
        onClick={onSolve}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 font-medium transition-all ml-auto disabled:opacity-50"
      >
        <Calculator size={18} />
        {isLoading ? 'Solving...' : 'Solve'}
      </button>

    </div>
  )
}

/**Without export, no other file can use Toolbar. */
export default Toolbar