import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEvent() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    datetime: '',
    location: '',
    total_tickets: '',
    available_tickets: '',
    price: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      
      if (name === "total_tickets") {
        return {
          ...prev,
          [name]: value,
          available_tickets: value
        }
      }
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8000/eventos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          navigate('/')
        } else {
          alert("Error al crear el evento.")
        }
      })
  }

  const disponibleMayorQueTotal =
    parseInt(formData.available_tickets) > parseInt(formData.total_tickets)

  return (
    <div>
      <h1>Crear nuevo evento</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Fecha y hora:</label><br />
          <input name="datetime" type="datetime-local" value={formData.datetime} onChange={handleChange} required />
        </div>

        <div>
          <label>Ubicación:</label><br />
          <input name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div>
          <label>Boletos totales:</label><br />
          <input name="total_tickets" type="number" value={formData.total_tickets} onChange={handleChange} required />
        </div>

        <div>
          <label>Boletos disponibles:</label><br />
          <input name="available_tickets" type="number" value={formData.available_tickets} onChange={handleChange} required />
        </div>

        <div>
          <label>Precio:</label><br />
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
        </div>

        {disponibleMayorQueTotal && (
          <p style={{ color: "red" }}>⚠️ Boletos disponibles no pueden ser mayores que los boletos totales.</p>
        )}

        <button type="submit" disabled={disponibleMayorQueTotal}>
          Crear evento
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
