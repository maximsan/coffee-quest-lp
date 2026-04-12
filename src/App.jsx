import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DesignFive } from './designs/DesignFive'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignFive />} />
        <Route path="/5" element={<DesignFive />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
