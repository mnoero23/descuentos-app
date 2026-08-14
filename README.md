# Descuentos del Día — Argentina

Aplicación web para explorar promociones de bancos y billeteras virtuales por día, entidad y categoría.

[Ver demo en Vercel](https://descuentos-app-theta.vercel.app)

## Problema que resuelve

Las promociones financieras suelen estar dispersas entre sitios, aplicaciones y comunicaciones comerciales. Este proyecto las reúne en una interfaz única para facilitar una decisión cotidiana: **qué medio de pago conviene usar hoy**.

## Funcionalidades

- Navegación por día de la semana.
- Filtros por entidad y categoría.
- Tarjetas con beneficio, tope y condiciones.
- Alta y eliminación local de promociones.
- Persistencia en el navegador mediante `localStorage`.
- Actualización opcional con IA mediante una función serverless.
- Diseño responsive desplegado en Vercel.

## Entidades contempladas

Mercado Pago, MODO, Brubank, Naranja X, Personal Pay, Santander, BBVA, Bancor, Claro Pay, Ualá y Banco Nación.

## Arquitectura

```text
React + Vite
├── src/App.jsx            interfaz, filtros y estado
├── src/promos.js          promociones precargadas
└── api/search-promos.js   función serverless para actualización opcional
```

La clave de Anthropic permanece del lado del servidor como variable de entorno y no se expone al navegador.

## Tecnologías

- React 18
- Vite 6
- JavaScript
- Vercel Functions
- Anthropic API (opcional)
- CSS responsive

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

## Actualización opcional con IA

La aplicación funciona con los datos precargados aunque no exista una clave de API. Para habilitar la búsqueda opcional en Vercel, configurar:

```text
ANTHROPIC_API_KEY=<tu_clave>
```

## Alcance y calidad de los datos

Las promociones incluidas constituyen una **fotografía demostrativa relevada en julio de 2026**. Pueden cambiar, vencer o depender del segmento del cliente. Antes de comprar, se debe validar cada beneficio en la aplicación o el sitio oficial de la entidad.

El uso de IA sirve como asistencia para localizar información; no reemplaza la verificación de vigencia, topes y condiciones.

## Próximas mejoras

- Fuentes oficiales enlazadas por promoción.
- Fecha de vigencia y estado de verificación.
- Favoritos y comparación de medios de pago.
- Proceso automatizado de actualización y revisión.
- Pruebas unitarias de filtros y normalización.

## Autor

Desarrollado por [Matías Noero](https://github.com/mnoero23) como proyecto de portfolio orientado a productos de datos y automatización.
