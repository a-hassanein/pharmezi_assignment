from django.shortcuts import render
from main.models import SellerProducts
from .serializers import SellerProductsSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class SellerProductsViewset(viewsets.ModelViewSet):
    queryset = SellerProducts.objects.all()
    serializer_class = SellerProductsSerializer

@api_view(['GET','PUT'])
def DiscountUpdate(requset,id):
    discount=SellerProducts.objects.get(product=id)
    # print("*********************************",discount)
    getserializer = SellerProductsSerializer(discount)
    # print("-------------------------------------",serializer.data["price"])
    if requset.method == "PUT":
        newdata = requset.data
        # data = serializer.data["price"]
        # print("++++++++++++++++++++++++++++++",data)
        serializer = SellerProductsSerializer(discount,data=newdata)
        # price = serializer.data[1]
        # print("//////////////////////////",price)
        print("-------------------------------------",serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    return Response(getserializer.data)