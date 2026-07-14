# 🏷️ Descuentos del Día - Argentina

App para ver promociones y descuentos de bancos y billeteras virtuales, organizados por día de la semana.

## Entidades incluidas
Mercado Pago, MODO, Brubank, Naranja X, Personal Pay, Santander Río, BBVA, BANCON, Ualá, BNA

## Deploy rápido en Vercel

### 1. Subir a GitHub

```bash
cd descuentos-app
git init
git add .
git commit -m "Initial commit"
gh repo create descuentos-del-dia --public --push
```

### 2. Conectar con Vercel

1. Andá a [vercel.com](https://vercel.com) y creá una cuenta con tu GitHub
2. Click en **"Add New Project"**
3. Importá el repo `descuentos-del-dia`
4. Vercel detecta Vite automáticamente — dejá todo como está
5. Click **"Deploy"**

### 3. Configurar la búsqueda con IA (opcional)

Para que el botón "🔄 Actualizar con IA" funcione:

1. Conseguí una API key de Anthropic en [console.anthropic.com](https://console.anthropic.com)
2. En el dashboard de Vercel → tu proyecto → **Settings** → **Environment Variables**
3. Agregá: `ANTHROPIC_API_KEY` = tu key
4. Hacé un nuevo deploy (o esperá al próximo push)

> Sin esta key, la app funciona igual con las promos precargadas. Solo el auto-fetch no va a andar.

## Desarrollo local

```bash
npm install
npm run dev
```

Para probar el auto-fetch local, creá un archivo `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Actualizar promos

Editá `src/promos.js` con las promos nuevas y pusheá a GitHub. Vercel redeploya solo.
