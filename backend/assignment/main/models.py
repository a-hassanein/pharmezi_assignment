from django.db import models

# Create your models here.


class Products(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'products'


class Sellers(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'sellers'


class SellerProducts(models.Model):
    id = models.BigIntegerField(primary_key=True)
    seller = models.ForeignKey('Sellers', models.DO_NOTHING)
    product = models.ForeignKey(Products, models.DO_NOTHING)
    price = models.FloatField(blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    discount = models.FloatField(blank=True, null=True)
    availability = models.IntegerField(db_column='Availability', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'seller_products'
