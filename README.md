# Prueba_tecnica_girolab

## Pasos para levantar la app

### Levantar el servidor 
-  Clonar el repositorio con el proyecto: https://github.com/SalinasRodrigo/Prueba_tecnica_girolabs.git
- (opcional) Crear un virtual environment para las librerías de python y acceder a él.
- Instalar las librerías en requirements.txt `pip install -r requirements.txt`
- Realizar las migraciones para la base de datos `python manage.py migrate`
- Levantar el servidor `python manage.py runserver`
### Levantar el cliente
- En otro terminal acceder al directorio del client `Prueba_tecnica_girolabs/client`
- Instalar los paquetes `npm install` (con npm o cualquier gestor de paquetes)
- Levantar el cliente `npm run dev` 
- (opcional) Los setings del servidor están preparados para correr la build del cliente así que otra opción es armar la build `npm run build` y luego ver la aplicación en el puerto del servidor.

### Agregar datos de prueba

Probablemente, la página sale en blanco porque la base de datos esta vacía, para agregar datos desde el mock:
- Copiar los datos en mock.json.
- Ir a la ruta `/api/products/create` (en el puerto del servidor), en esta ruta está el formulario de django rest framework, en el content pegar los datos del mock, luego enviar la solicitud POST.
- La vista asociada a la ruta `/api/products/create` puede recibir tanto una lista de json como un único json por si quiere agregar un único elemento específico.
