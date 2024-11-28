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
    # Recuperar parámetros de la URL
    title = request.GET.get('title')  # Filtrar por título
    rating = request.GET.get('rating')  # Filtrar por categoría
    min_price = request.GET.get('min_price')  # Precio mínimo
    max_price = request.GET.get('max_price')  # Precio máximo

    # Crear un diccionario de filtros
    filters = {}
    if title:
        filters['title__icontains'] = title 
    if rating:
        filters['rating__gte'] = rating 
    if min_price:
        filters['price__gte'] = min_price 
    if max_price:
        filters['price__lte'] = max_price  

    products = Product.objects.filter(**filters)
    print("FILTROS:\n", filters,"\n\nPRODUCTOS:\n", products )
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
    if isinstance(data, list):  
        serialProducts = ProductSerializer(data=data, many=True)
        if serialProducts.is_valid():
            serialProducts.save()
            return Response(serialProducts.data, status=status.HTTP_201_CREATED)
        return Response(serialProducts.errors, status=status.HTTP_400_BAD_REQUEST)
    serialProduct = ProductSerializer(data=data, many=False)
    if serialProduct.is_valid():
        serialProduct.save()
        return Response(serialProduct.data, status=status.HTTP_201_CREATED)
    
    return Response(serialProduct.errors, status=status.HTTP_400_BAD_REQUEST)