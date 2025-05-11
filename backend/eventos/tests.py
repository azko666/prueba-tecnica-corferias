from django.test import TestCase
from rest_framework.test import APIClient
from .models import Event

class EventTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.event = Event.objects.create(
            name="Concierto",
            datetime="2025-12-31T20:00:00Z",
            location="Bogotá",
            total_tickets=100,
            available_tickets=100,
            price=50.0
        )

    def test_crear_evento(self):
        response = self.client.post('/eventos/', {
            "name": "Feria",
            "datetime": "2025-11-01T18:00:00Z",
            "location": "Cali",
            "total_tickets": 50,
            "available_tickets": 50,
            "price": 30.0
        }, format='json')
        self.assertEqual(response.status_code, 201)

    def test_venta_exitosa(self):
        response = self.client.post(f'/eventos/{self.event.id}/vender/', {
            'quantity': 5
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.event.refresh_from_db()
        self.assertEqual(self.event.available_tickets, 95)

    def test_venta_excesiva(self):
        response = self.client.post(f'/eventos/{self.event.id}/vender/', {
            'quantity': 200
        }, format='json')
        self.assertEqual(response.status_code, 400)

    def test_validacion_boletos_disponibles_superiores(self):
        response = self.client.post('/eventos/', {
            "name": "ErrorEvento",
            "datetime": "2025-11-01T18:00:00Z",
            "location": "Medellín",
            "total_tickets": 10,
            "available_tickets": 20,
            "price": 40.0
        }, format='json')
        self.assertEqual(response.status_code, 400)