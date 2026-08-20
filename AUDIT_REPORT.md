# Auditoría técnica — Aura & Vida v2.1.2

## Correcciones de estabilidad

- Corregido el flujo de reserva cuando se selecciona otro profesional después de completar una cita.
- Los horarios pasados ya no pueden seleccionarse ni confirmarse.
- La disponibilidad se actualiza mientras la página permanece abierta.
- Los domingos se bloquean y los sábados respetan el horario de mañana.
- Se bloquean reservas duplicadas para profesional + fecha + hora.
- Las citas pasan automáticamente a `Completada` después de finalizar su duración.
- LocalStorage ahora valida estructura, fechas, horas, estados, profesionales y especialidades.
- Los favoritos almacenados se limpian si contienen identificadores inválidos.
- Los borradores inválidos o vencidos se corrigen automáticamente al cargar.
- Corregida la exportación de calendario para interpretar las horas en Costa Rica (UTC-6).
- Google Calendar incluye la zona `America/Costa_Rica`.
- El PDF se carga con `dynamic import()` únicamente cuando el usuario lo solicita.

## UI / responsive

- Corregido el diseño móvil del hero.
- Tarjetas de profesionales en una sola columna en teléfonos.
- Botones y textos ya no se desbordan en tarjetas estrechas.
- Breakpoint del header ampliado para evitar saturación entre tablet y escritorio.
- Ajustes específicos para 320–340 px.
- Mapa reducido en móvil para evitar bloques excesivamente altos.
- Búsqueda de profesionales ignora tildes y mayúsculas.
- Eliminadas métricas de reseñas/valoraciones no verificadas de la interfaz.
- Eliminadas afirmaciones de disponibilidad estática; la disponibilidad se consulta en el flujo de reserva.
- Imagen de la Dra. Valeria reemplazada por una fotografía médica apropiada.
- Las imágenes remotas de profesionales tienen fallback visual si el proveedor externo falla.
- El hero tiene fallback al branding local si su imagen externa no carga.

## Accesibilidad

- `aria-label` para buscador y filtros.
- Estados `aria-pressed` para favoritos y selecciones.
- Stepper de reserva con `aria-current` y pasos inaccesibles deshabilitados.
- Focus trap en modales.
- Cierre de modales y menú móvil con `Escape`.
- Restauración del foco al cerrar modales.
- Soporte para `prefers-reduced-motion`.
- Contraste de texto secundario mejorado a más de 5:1 sobre blanco.
- Tono de acento para texto ajustado a más de 4.5:1 sobre fondos claros.

## Rendimiento

- Logos convertidos de PNG a WebP.
- Peso total de los tres logos reducido de aproximadamente 872 KB a 110 KB.
- jsPDF deja de formar parte de la carga inicial y se solicita solo al descargar un comprobante.
- Eliminado CSS de testimonios que ya no se utilizaba.

## Configuración externa pendiente

No se inventaron datos oficiales de teléfono, WhatsApp ni correo. Estos canales permanecen ocultos hasta configurarlos en `src/data/contact.ts`.
