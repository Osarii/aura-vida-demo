# Auditoría técnica — Aura & Vida

## Correcciones realizadas

- Corregido el layout móvil de las tarjetas de profesionales.
- Eliminados textos visuales relacionados con versiones de prueba o nombres promocionales internos.
- Ajustados botones que se cortaban o desbordaban en pantallas pequeñas.
- Corregido el comportamiento de `Próxima cita` en tarjetas estrechas.
- Mejorada la navegación móvil y el estado visual del menú.
- Mejorados estados de foco y accesibilidad para teclado.
- Mejorado el modal: enfoque inicial, restauración de foco y cierre con `Escape`.
- Añadido soporte para `prefers-reduced-motion`.
- Eliminados testimonios y métricas ficticias visibles; se reemplazaron por contenido institucional neutral.
- Mejorado el flujo de reserva y sus textos.
- Añadida validación defensiva para datos guardados en LocalStorage.
- Mejorada la exportación `.ics` con escape de contenido.
- Mejorados metadatos HTML y carga de tipografías.
- Eliminado código y archivos sin uso.
- Añadido `src/vite-env.d.ts` para imports de assets.
- Actualizado `.gitignore` para evitar `node_modules`, `dist` y archivos locales.
- Movidas herramientas de compilación a `devDependencies`.
- Actualizado `jsPDF` a una versión corregida de seguridad.
- Añadido script `npm run typecheck`.

## Validaciones ejecutadas

- Parseo de CSS: correcto.
- Revisión de imports relativos: correcta.
- Compilación TypeScript estructural con stubs de dependencias: correcta.
- Pruebas de lógica de fechas y disponibilidad: correctas.
- Búsqueda de textos visuales no deseados: sin coincidencias.
- Revisión responsive específica para tarjetas de profesionales y acciones móviles.

## Validación final recomendada en el equipo local

Después de descomprimir:

```bash
npm install
npm run typecheck
npm run build
```

Esto regenera `package-lock.json` con las dependencias actualizadas y valida el build real de Vite antes del push.
