import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RouteSwitcher } from './components/RouteSwitcher'
import { DesignOne } from './designs/DesignOne'
import { DesignTwo } from './designs/DesignTwo'
import { DesignThree } from './designs/DesignThree'
import { DesignFour } from './designs/DesignFour'
import { DesignFive } from './designs/DesignFive'
import { DesignSix } from './designs/DesignSix'
import { DesignSeven } from './designs/DesignSeven'
import { DesignEight } from './designs/DesignEight'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/1" replace />} />
        <Route path="/1" element={<DesignOne />} />
        <Route path="/2" element={<DesignTwo />} />
        <Route path="/3" element={<DesignThree />} />
        <Route path="/4" element={<DesignFour />} />
        <Route path="/5" element={<DesignFive />} />
        <Route path="/6" element={<DesignSix />} />
        <Route path="/7" element={<DesignSeven />} />
        <Route path="/8" element={<DesignEight />} />
      </Routes>
      <RouteSwitcher />
    </BrowserRouter>
  )
}

export default App
