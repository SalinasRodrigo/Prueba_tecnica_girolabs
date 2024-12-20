from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True, blank=True)
    price = models.BigIntegerField()
    discountPercentage = models.FloatField()
    rating = models.FloatField(null=True, blank=True)
    stock = models.IntegerField()
    brand = models.CharField(max_length=100, null=False)
    category = models.CharField(max_length=100, null=False)
    thumbnail = models.URLField(max_length=200, null=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.description + ' id:' + str(self.id)