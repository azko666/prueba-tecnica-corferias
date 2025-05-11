import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    fetch('http://localhost:8000/eventos/')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error:", err))
  }

  const deleteEvent = (id) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return
    fetch(`http://localhost:8000/eventos/${id}/`, {
      method: 'DELETE'
    })
      .then(() => fetchEvents())
      .catch(err => console.error("Error eliminando:", err))
  }

  return (
    <div>
      <h1>Eventos disponibles</h1>

      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id} style={{ marginBottom: "1rem" }}>
              <strong>{event.name}</strong> — {event.location} — {new Date(event.datetime).toLocaleString()}<br />
              <small>Precio: ${parseFloat(event.price)} COP</small><br />
              <button onClick={() => navigate(`/editar/${event.id}`)}>✏️ Editar</button>{' '}
              <button onClick={() => deleteEvent(event.id)}>🗑️ Eliminar</button>{' '}
              <button onClick={() => navigate(`/vender/${event.id}`)}>🎟️ Comprar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  )
}

export default Home
