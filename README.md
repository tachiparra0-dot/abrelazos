# Abrelazos - Frontend y Backend

Este proyecto incluye:
- `index.html`, `style.css`, `style.js` para el frontend.
- `server.js` con un backend Express que sirve los archivos estáticos y expone API REST.

## Instrucciones de uso

1. Asegúrate de tener Node.js instalado.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta:
   ```bash
   npm install
   npm start
   ```
4. Abre `http://localhost:3000` en tu navegador.

## API disponibles

- `GET /api/status` — estado del backend.
- `GET /api/servicios` — lista de servicios.
- `POST /api/contact` — envía el formulario de contacto.

## Notas

Los mensajes de contacto se guardan en `data/contacts.json`.
