import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OutputCanvasProps {
  isLoading: boolean
  steps: string[]
  answer: string
}

const OutputCanvas: React.FC<OutputCanvasProps> = ({
  isLoading,
  steps,
  answer
}) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-y-auto">

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Solving your problem...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && steps.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-300">
            <p className="text-6xl mb-4">🧮</p>
            <p className="text-xl">Solution appears here</p>
            <p className="text-sm mt-2">Draw or type your problem and hit Solve</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <AnimatePresence>
        {!isLoading && steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5 }}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500"
          >
            <p className="text-sm text-blue-500 font-medium mb-1">Step {index + 1}</p>
            <p className="text-gray-800">{step}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Final Answer */}
      {!isLoading && answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: steps.length * 0.5 }}
          className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500"
        >
          <p className="text-sm text-green-500 font-medium mb-1">⭐ Final Answer</p>
          <p className="text-gray-800 text-xl font-bold">{answer}</p>
        </motion.div>
      )}

    </div>
  )
}

export default OutputCanvas