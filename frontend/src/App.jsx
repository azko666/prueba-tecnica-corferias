import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import SellTickets from './pages/SellTickets'

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Inicio</Link> |{' '}
        <Link to="/crear">Crear evento</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CreateEvent />} />
        <Route path="/editar/:id" element={<EditEvent />} />
        <Route path="/vender/:id" element={<SellTickets />} />
      </Routes>
    </div>
  )
}

export default App
