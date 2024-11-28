from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.getRoutes, name="routes"),
    path('products/', view=views.getProducts, name="products"),
    path('products/<int:pk>/', view=views.oneProduct, name="one-product"),
    path('products/create', view=views.createProduct, name="create-product"),
]