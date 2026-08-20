# Aura & Vida

Frontend en React + TypeScript + Vite para presentar la experiencia web de Aura & Vida.

## Funcionalidades

- Navegación responsive
- Especialidades y perfiles profesionales
- Búsqueda tolerante a tildes
- Favoritos
- Reserva de citas en 4 pasos
- Calendario y horarios en zona horaria de Costa Rica
- Bloqueo de horarios pasados y reservas duplicadas
- Historial local de citas
- Cambio automático de citas finalizadas a historial
- Exportación de comprobante en PDF
- Exportación `.ics`
- Integración con Google Calendar
- Compartir reserva por WhatsApp
- Diseño responsive para escritorio, tablet y móvil
- Accesibilidad por teclado y modales con focus trap

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

También puede ejecutar:

```bash
npm run check
```

## Flujo de staging

```bash
git checkout staging
git add .
git commit -m "fix: stabilize Aura Vida frontend"
git push origin staging
```

Vercel genera automáticamente un Preview Deployment cuando la rama `staging` recibe cambios.

## Contacto

Los canales oficiales de teléfono, WhatsApp y correo no se incluyen hasta contar con los datos definitivos del centro médico. Se configuran en:

```text
src/data/contact.ts
```

## Notas

El proyecto es frontend-only. La información creada desde la interfaz se conserva localmente en el navegador y no se envía a un backend.
