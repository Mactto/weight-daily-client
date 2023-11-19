import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './pages/Loading'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SelectExercise from './pages/SelectExercise'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loading ? <Loading /> : <Landing />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/exercise/" element={<SelectExercise />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
