import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function SellTickets() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/eventos/${id}/`)
      .then(res => res.json())
      .then(data => {
        const localDateTime = new Date(data.datetime).toISOString().slice(0, 16)
        setEvent({ ...data, datetime: localDateTime })
      })
      .catch(err => console.error("Error cargando evento:", err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    fetch(`http://localhost:8000/eventos/${id}/vender/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parseInt(quantity) })
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          alert(`✔️ ${data.message}`)
          navigate('/')
        } else {
          setError(data.error || "Error inesperado")
        }
      })
      .catch(err => {
        console.error("Error al vender:", err)
        setError("Error de conexión con el servidor")
      })
  }

  if (!event) return <p>Cargando evento...</p>

  return (
    <div>
      <h1>Comprar Boletos</h1>
      <p>
        <strong>{event.name}</strong><br />
        Fecha: {new Date(event.datetime).toLocaleString()}<br />
        Ubicación: {event.location}<br />
        Precio: ${parseFloat(event.price)} COP<br />
        Disponibles: {event.available_tickets} / {event.total_tickets}
      </p>

      <form onSubmit={handleSubmit}>
        <label>Cantidad a comprar:</label><br />
        <input
          type="number"
          min="1"
          max={event.available_tickets}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={event.available_tickets === 0}
          required
        />
        <br />
        <button type="submit" disabled={event.available_tickets === 0}>
          Comprar
        </button>
      </form>

      {event.available_tickets === 0 && (
        <p style={{ color: "gray" }}>No hay boletos disponibles para comprar.</p>
      )}

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
    </div>
  )
}

export default SellTickets