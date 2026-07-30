# Cómo aplicar esta actualización

## 1. Reemplazar el archivo de datos
Reemplazá `src/promos.js` en tu carpeta local (`C:\Users\Matias\Downloads\descuentos-app`) por el
`promos.js` adjunto. Está armado con el mismo formato (`DAYS`, `_id`, helper `p(...)`, `PROMOS`,
alias `JUNE_PROMOS`) y usa los mismos IDs de entidad y categorías que ya tenías.

## 2. Invalidar el caché de localStorage (paso manual, 1 línea)
No tengo tu `src/App.jsx` real en este chat (no fue subido acá), así que no puedo tocarlo
directamente. Buscá en ese archivo la línea con `STORAGE_KEY` y subile el número de versión en 1.
Por ejemplo:

```js
const STORAGE_KEY = "descuentos-v3";
```
pasa a:
```js
const STORAGE_KEY = "descuentos-v4";
```

Esto obliga a la app a descartar el localStorage viejo y cargar las promos nuevas.

## 3. Deploy de siempre
```
git add .
git commit -m "Actualizar promos julio 2026"
git push
```
Vercel lo despliega solo.

## Notas sobre la fuente de datos
- No tenía el conector de Gmail activo en esta sesión (solo Google Drive, Notion e IOL), así que
  no revisé mails de MODO/BNA+/bancos. Si querés que la próxima actualización incluya eso, activá
  el conector de Gmail antes de pegar el Prompt 1 en el chat nuevo.
- Fuentes usadas: sitios oficiales de Santander, BBVA, Bancor, Banco Nación, Personal Pay, Claro
  Pay, Ualá, Brubank, Naranja X y MODO, más sitioandino.com.ar, calcularsueldo.com.ar, iproup.com,
  cronista.com, iprofesional.com y perfil.com — todo cruzado contra notas fechadas en julio 2026.
- Algunas promos de Ualá y Personal Pay se confirmaron contra notas de meses anteriores (patrón
  estable mes a mes) porque no encontré una nota específica de julio con el mismo detalle; están
  marcadas para que las revises si notás algo desactualizado en la próxima pasada.
- Bezza (Bancor) y algunas promos de MODO son "multi-banco" o de canje de puntos — el tope de
  reintegro exacto puede variar según tu segmento de cliente; convendría que lo verifiques en la
  app antes de confiar en el número puesto en `tope`.
