from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product
from .serializaers import ProductSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/products/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of products",
        },
        {
            "Endpoint": "/products/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single product object",
        },
        {
            "Endpoint": "/products/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new product with data sent in post request",
        },
        {
            "Endpoint": "/products/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing product with data sent in post request",
        },
        {
            "Endpoint": "/products/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting product",
        },
    ]
    return Response(routes)


@api_view(["GET"])
def getProducts(request):
    print(request.GET.get('mesage'))
    products = Product.objects.all()
    serial_products = ProductSerializer(products, many=True)
    return Response(serial_products.data, status=status.HTTP_200_OK)

@api_view(["GET", "PUT", "DELETE"])
def oneProduct (request, pk):
    product = get_object_or_404(Product, id=pk)
    
    if request.method == "GET":
        serial_product = ProductSerializer(product)
        return Response(serial_product.data, status=status.HTTP_200_OK)
    
    elif request.method == "PUT":
        serial_product = ProductSerializer(instance=product, data=request.data)
        if serial_product.is_valid():
            serial_product.save()
            return Response(serial_product.data, status=status.HTTP_200_OK)
        return Response(serial_product.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)

@api_view(["POST"])
def createProduct(request):
    data = request.data
    serialProduct = ProductSerializer(data=data, many=False)
    print(data, serialProduct)
    if serialProduct.is_valid():  
        serialProduct.save() 
        return Response(serialProduct.data, status=status.HTTP_201_CREATED)
    return Response(serialProduct.errors, status=status.HTTP_400_BAD_REQUEST)