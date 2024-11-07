import os
from datetime import datetime  # Importación necesaria para el manejo de fechas

# Ruta de la carpeta blog
blog_path = 'src/blog'

# Formato de fecha deseado
desired_format = "%Y-%m-%dT%H:%M:%S+00:00"

# Función para convertir la fecha al formato deseado
def convert_date_format(date_str):
    try:
        # Intentar convertir la fecha al nuevo formato
        date_obj = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S +0000")
        return date_obj.strftime(desired_format)
    except ValueError:
        # Si falla, devolver la fecha original
        return date_str

# Recorrer todos los archivos en la carpeta blog
for filename in os.listdir(blog_path):
    if filename.endswith('.md'):
        file_path = os.path.join(blog_path, filename)
        
        # Leer el contenido del archivo
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
        
        # Escribir de nuevo en el archivo con el formato de fecha actualizado
        with open(file_path, 'w', encoding='utf-8') as file:
            for line in lines:
                # Buscar y reemplazar las líneas de date y fecha
                if line.startswith('date: '):
                    date_str = line.split('date: ')[1].strip()
                    new_date = convert_date_format(date_str)
                    file.write(f'date: {new_date}\n')
                elif line.startswith('fecha: '):
                    date_str = line.split('fecha: ')[1].strip()
                    new_date = convert_date_format(date_str)
                    file.write(f'fecha: {new_date}\n')
                else:
                    file.write(line)
