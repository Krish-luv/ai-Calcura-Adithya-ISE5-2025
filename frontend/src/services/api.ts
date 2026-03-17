import axios from 'axios'

// Backend URL
const BASE_URL = import.meta.env.VITE_API_URL
//'http://... i have placed in env ok'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response type
export interface SolveResponse {
  steps: string[]
  answer: string
}

// Send text problem to backend
export const solveText = async (problem: string): Promise<SolveResponse> => {
  const response = await api.post('/solve', {
    type: 'text',
    content: problem
  })
  return response.data
}

// Send canvas image to backend
export const solveImage = async (imageData: string): Promise<SolveResponse> => {
  const response = await api.post('/solve', {
    type: 'image',
    content: imageData
  })
  return response.data
}