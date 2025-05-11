#from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=True, methods=['post'])
    def vender(self, request, pk=None):
        try:
            evento = self.get_object()
            cantidad = int(request.data.get('quantity', 0))

            if cantidad <= 0:
                return Response({"error": "La cantidad debe ser mayor a cero."}, status=400)

            if evento.available_tickets < cantidad:
                return Response({"error": "No hay suficientes boletos disponibles."}, status=400)

            evento.available_tickets -= cantidad
            evento.save()

            return Response({"message": f"Se vendieron {cantidad} boleto(s) correctamente."})
        except Exception as e:
            return Response({"error": "Ocurrió un error inesperado al procesar la venta."}, status=500)

