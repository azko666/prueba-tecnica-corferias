import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/eventos/${id}/`)
      .then(res => res.json())
      .then(data => {
        const localDateTime = new Date(data.datetime).toISOString().slice(0, 16)
        setFormData({ ...data, datetime: localDateTime })
      })
      .catch(err => console.error("Error cargando evento:", err))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:8000/eventos/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          navigate('/')
        } else {
          alert("Error al editar el evento.")
        }
      })
  }

  if (!formData) return <p>Cargando evento...</p>

  const disponibleMayorQueTotal =
    parseInt(formData.available_tickets) > parseInt(formData.total_tickets)

  return (
    <div>
      <h1>Editar evento</h1>

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
          <input name="price" type="number" step="0.01" value={parseFloat(formData.price)} onChange={handleChange} required />
        </div>

        {disponibleMayorQueTotal && (
          <p style={{ color: "red" }}>⚠️ Boletos disponibles no pueden ser mayores que los boletos totales.</p>
        )}

        <button type="submit" disabled={disponibleMayorQueTotal}>
          Guardar cambios
        </button>
      </form>
    </div>
  )
}

export default EditEvent