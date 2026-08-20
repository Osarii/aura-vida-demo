# Reporte de pruebas — Aura & Vida v2.1.2

## Resultado

Las validaciones estructurales y de lógica ejecutadas sobre esta versión terminaron correctamente.

## Pruebas ejecutadas

### Código

- Parseo de todos los archivos `.ts` y `.tsx`: **PASS**
- TypeScript estructural en modo `strict`: **PASS**
- Imports relativos: **PASS**
- Todos los botones explícitos usan `type="button"`: **PASS**
- Enlaces externos con `target="_blank"` incluyen `rel`: **PASS**
- IDs de navegación del header existen en la página: **PASS**
- Búsqueda de textos `demo`, `premium`, `mock`, `ficticio` o `simulado` visibles: **PASS**

### CSS / accesibilidad

- Parseo completo de CSS: **PASS**
- Contraste `--muted` sobre blanco: **5.28:1**
- Contraste `--peach-text` sobre blanco: **4.76:1**
- Breakpoints revisados: 320, 340, 680, 920, 1100 y 1180 px
- Cards de profesionales: una columna en móvil
- Acciones de cards: ancho completo en móvil
- Stepper: etiquetas ocultas en móvil, números conservados

### Fechas y reservas

- Fecha inválida (`2026-02-30`) rechazada: **PASS**
- Hora inválida (`25:00`) rechazada: **PASS**
- Zona horaria Costa Rica: **PASS**
- Horarios anteriores a la hora actual: bloqueados
- Domingo: sin disponibilidad
- Sábado: únicamente horarios de mañana
- Reserva duplicada activa: bloqueada
- Reserva cancelada: libera el horario
- Cita en curso: permanece como próxima
- Cita finalizada: pasa a completada

### LocalStorage

- JSON corrupto: recuperación sin romper la aplicación
- Objetos incompletos: descartados
- IDs de profesionales inexistentes: descartados
- Favoritos duplicados: normalizados
- Favoritos inválidos: eliminados
- Borradores con fecha/hora inválida: saneados
- Profesional incompatible con especialidad: descartado

### Assets

- Imports de assets locales: válidos
- Logo completo WebP: ~64 KB
- Símbolo WebP: ~19 KB
- Wordmark WebP: ~27 KB
- Fallbacks para imágenes externas: incluidos

## Validación final en el equipo local

Ejecutar antes de subir:

```powershell
npm install
npm run typecheck
npm run build
```

El build real de Vite debe ser la última validación antes del `git push`, ya que las dependencias npm se instalan en el equipo local/Vercel.
