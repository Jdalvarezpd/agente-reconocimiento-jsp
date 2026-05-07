# Agente de Reconocimiento de Imagen - J.S.P Abogados

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-%23FF6C37.svg?style=for-the-badge&logo=n8n&logoColor=white)

Una aplicación web rápida y responsiva diseñada para J.S.P Abogados. Esta herramienta funciona como una aplicación de reconocimiento de imagen para documentos, integrándose directamente con un flujo de trabajo en n8n para procesar la imagen y extraer información clave de manera automatizada.

## Características Principales

- Mobile-First y Cámara Nativa: Al acceder desde un dispositivo móvil, el botón de la cámara abre directamente la cámara trasera del dispositivo para escanear el documento.
- Subida de Archivos: Permite seleccionar imágenes desde el almacenamiento local del ordenador o galería.
- Diseño Moderno: Interfaz limpia utilizando Glassmorphism y animaciones fluidas para una excelente experiencia de usuario.
- Integración con n8n: Envía la imagen capturada a un Webhook en n8n mediante peticiones multipart/form-data.
- Tarjeta de Resultados: Extrae la respuesta JSON del webhook y la renderiza en una tarjeta informativa y organizada.

## Tecnologías Utilizadas

- React.js: Librería principal para la interfaz de usuario.
- Vite: Herramienta de compilación ultrarrápida.
- CSS Vanilla: Estilos personalizados avanzados sin dependencias externas.
- n8n: Plataforma de automatización para el backend y procesamiento de imágenes.

## Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu entorno de desarrollo:

1. Clonar el repositorio:
 ```bash
 git clone https://github.com/Jdalvarezpd/agente-reconocimiento-jsp.git
 cd agente-reconocimiento-jsp
 ```

2. Instalar dependencias:
 ```bash
 npm install
 ```

3. Iniciar el servidor de desarrollo:
 ```bash
 npm run dev
 ```

4. Acceder a la aplicación:
 Abre tu navegador y navega a http://localhost:5173/.

## Construcción para Producción

Para compilar la aplicación para un entorno de producción (como un hosting o subdominio):

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos estáticos optimizados. Recuerda configurar el parámetro `base` en el archivo `vite.config.js` si vas a desplegar en un subdirectorio.

## Flujo de Datos (n8n)

La aplicación envía un archivo de imagen en un campo form-data llamado `image` a la URL configurada. 
El flujo de n8n debe devolver un objeto JSON con las llaves correspondientes a los campos extraídos del documento para que la Tarjeta de Resultados se renderice correctamente.

---
Desarrollado para J.S.P Abogados.
