from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def validate(self, data):
        total = data.get('total_tickets')
        disponibles = data.get('available_tickets')

        if total is not None and disponibles is not None:
            if disponibles > total:
                raise serializers.ValidationError("Los boletos disponibles no pueden ser mayores a los boletos totales.")
        return data
