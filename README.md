
# Prueba Técnica - Corferias

Este proyecto es una solución fullstack para la gestión de eventos, desarrollada como parte de una prueba técnica.  
Incluye funcionalidades completas para CRUD de eventos, venta de boletos y conexión entre Django y React con Docker.

---

## 🚀 Tecnologías utilizadas

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: React + Vite + React Router
- **Base de datos**: PostgreSQL 17
- **Contenedores**: Docker y Docker Compose

---

## 📦 Requisitos previos

Antes de continuar, asegúrate de tener instalado en tu máquina:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instrucciones para ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/azko666/prueba-tecnica-corferias.git
cd prueba-tecnica-corferias/
```

2. Ejecuta Docker Compose:

```bash
docker-compose up --build -d
```

3. Accede a las siguientes rutas:

- Backend Django: [http://localhost:8000](http://localhost:8000)
- Django Admin: [http://localhost:8000/admin](http://localhost:8000/admin)
- API de eventos: [http://localhost:8000/eventos/](http://localhost:8000/eventos/)
- Frontend React: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Funcionalidades implementadas

### 🎫 Eventos

- Crear eventos con nombre, ubicación, fecha/hora, boletos totales, disponibles y precio.
- Editar eventos con validación: boletos disponibles no pueden superar los totales.
- Eliminar eventos desde la vista de inicio.
- Listado de eventos en la pantalla principal.
- Interfaz amigable y validaciones visuales.

### 🎟️ Venta de boletos

- Página dedicada para vender boletos.
- Validación de cantidad solicitada.
- No se permite vender más boletos que los disponibles.
- Desactiva el formulario si no hay boletos restantes.
- Mensajes de éxito y error.

---

## 📁 Estructura del proyecto

```
.
├── backend/        # Proyecto Django
│   └── eventos/    # App principal con lógica de negocio
│   └── wait-for-db.sh
├── frontend/       # Proyecto React
│   └── src/pages/  # Rutas: Home, CreateEvent, EditEvent, SellTickets
├── .env            # Variables de entorno reales (incluido por simplicidad)
├── docker-compose.yml
└── README.md
```

---

## ⚠️ Nota sobre `.env`

Por practicidad en la evaluación, este archivo fue incluido en el repositorio.  
Sin embargo, **no es una práctica recomendada en proyectos reales**.  
Lo correcto es usar `.env.example` y excluir `.env` del control de versiones.

---

## 👤 Autor

Desarrollado por Mario Enrique González Triana para la prueba técnica de Corferias.  
Contacto: mario_gonzalez888@hotmail.com