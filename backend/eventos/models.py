from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=200)
    datetime = models.DateTimeField()
    location = models.CharField(max_length=255)
    total_tickets = models.PositiveIntegerField()
    available_tickets = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
