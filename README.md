# Aura & Vida

Frontend en React + TypeScript + Vite para presentar la experiencia web de Aura & Vida.

## Funcionalidades

- Navegación responsive
- Especialidades y perfiles profesionales
- Favoritos
- Reserva de citas en 4 pasos
- Calendario y horarios disponibles
- Historial de citas guardado en el navegador
- Exportación de comprobante en PDF
- Exportación `.ics`
- Integración con Google Calendar
- Compartir reserva por WhatsApp
- Diseño responsive para escritorio, tablet y móvil

## Tecnologías

- React 19
- TypeScript
- Vite
- jsPDF
- CSS
- LocalStorage

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Validar antes de subir

```bash
npm run typecheck
npm run build
```

## Flujo de staging

```bash
git checkout staging
git add .
git commit -m "feat: polish Aura Vida frontend"
git push origin staging
```

Vercel genera automáticamente un Preview Deployment cuando la rama `staging` recibe cambios.

## Notas

El proyecto es frontend-only. La información creada desde la interfaz se conserva localmente en el navegador y no se envía a un backend.
