# Descuentos del Día — Argentina

**Laboratorio de producto · muestra histórica de julio de 2026**

Exploración de una interfaz para reunir promociones de bancos y billeteras virtuales por día, entidad y categoría. El proyecto queda pausado; la idea se retomará más adelante para mejorarla y diseñar una nueva versión.

## Demo histórica

[Consultar la demo pública](https://descuentos-app-theta.vercel.app/)

La demo está publicada como referencia del experimento. Sus promociones no deben usarse para decidir una compra ni considerarse vigentes.

## Estado de la información

Los datos precargados corresponden a un relevamiento de **julio de 2026**. Las condiciones, topes y fechas de vigencia pueden haber cambiado o vencido. La interfaz puede mostrar beneficios antiguos como verificados; esa etiqueta no confirma su vigencia actual.

Antes de aprovechar una promoción, verificá sus condiciones en la aplicación o el sitio oficial de la entidad.

## Qué explora el laboratorio

- Navegación por día de la semana.
- Filtros por entidad y categoría.
- Tarjetas con beneficio, tope y condiciones.
- Alta y eliminación local de promociones.
- Persistencia en el navegador mediante `localStorage`.
- Actualización opcional con IA mediante una función serverless.
- Diseño responsive desplegado en Vercel.

## Entidades contempladas

Mercado Pago, MODO, Brubank, Naranja X, Personal Pay, Santander, BBVA, Bancor, Claro Pay, Ualá y Banco Nación.

## Tecnologías

React 18 · Vite 6 · JavaScript · Vercel Functions · CSS responsive · Anthropic API (opcional)

## Desarrollo local

```bash
npm install
npm run dev
```

Para generar una versión de producción:

```bash
npm run build
npm run preview
```

## Próxima etapa

Cuando se retome el proyecto, revisar el enfoque y los datos antes de presentar una versión renovada. Las posibles mejoras incluyen fuentes oficiales por promoción, fechas y estados de verificación claros, favoritos y comparación de medios de pago.

## Autor

[Matías Noero](https://github.com/mnoero23)
