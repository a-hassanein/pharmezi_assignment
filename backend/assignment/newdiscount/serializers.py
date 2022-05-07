from rest_framework import serializers 
from main.models import SellerProducts

class SellerProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerProducts
        fields = ['product', 'discount']
