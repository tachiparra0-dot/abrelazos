# Abrelazos

Sitio estático de la organización Abrelazos, preparado para publicación en GitHub Pages.

## Qué incluye este proyecto

- `index.html` con todo el diseño y funcionalidad embebidos.
- `server.js` para desarrollo local con Express.
- Flujo de GitHub Actions para publicar automáticamente en GitHub Pages desde `main`.
- Script local de monitoreo para auto-commit y push de cambios en `index.html`.

## Uso local

1. Asegúrate de tener Node.js instalado.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta:
   ```bash
   npm install
   npm start
   ```
4. Abre `http://localhost:3000` en tu navegador.

## Auto-actualización de cambios

Para que cada cambio en `index.html` se comprometa y empuje automáticamente:

```bash
npm run watch
```

Esto detectará cambios en el archivo, creará un commit automático y enviará la rama `main` a GitHub.

## Despliegue automático

Cualquier push a la rama `main` activará la acción de GitHub Pages en `.github/workflows/pages.yml` y actualizará el sitio público.
