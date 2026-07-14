// Vercel Serverless Function — proxies requests to Anthropic API
// The API key is stored as an environment variable in Vercel (never exposed to the browser)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  try {
    const { entityNames } = req.body;
    const today = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const ENTITIES_MAP = 'Mercado Pago=mercadopago, MODO=modo, Brubank=brubank, Naranja X=naranjax, Personal Pay=personalpay, Santander Río=santander, BBVA=bbva, BANCON=bancon, Ualá=uala, BNA=bna';
    const CATEGORIES = 'Supermercados, Combustible, Farmacia, Gastronomía, Indumentaria, Electro, Entretenimiento, Viajes, Otros';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Hoy es ${today} en Argentina. Buscá promociones y descuentos VIGENTES de: ${entityNames.join(', ')}.
Buscá en eldestapeweb.com, iproup.com, sitioandino.com, perfil.com, modo.com.ar, calcularsueldo.com.ar
RESPONDÉ ÚNICAMENTE con un JSON array. Sin texto. Sin backticks.
Estructura: {"entity":"id","day":0,"category":"cat","description":"desc","tope":"tope","conditions":"cond"}
IDs: ${ENTITIES_MAP}
Días: 0=Lun 1=Mar 2=Mié 3=Jue 4=Vie 5=Sáb 6=Dom
Categorías: ${CATEGORIES}
Si aplica varios días, una entrada por día. Devolvé [] si no encontrás nada.`,
        }],
      }),
    });

    const data = await response.json();
    const texts = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = texts.replace(/```json|```/g, '').trim();

    let parsed = null;
    try { parsed = JSON.parse(clean); } catch {}
    if (!parsed) { const m = clean.match(/\[[\s\S]*\]/); if (m) try { parsed = JSON.parse(m[0]); } catch {} }
    if (!parsed) { const s = clean.indexOf('['), e = clean.lastIndexOf(']'); if (s !== -1 && e !== -1) try { parsed = JSON.parse(clean.slice(s, e + 1)); } catch {} }

    return res.status(200).json({ promos: Array.isArray(parsed) ? parsed : [] });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Failed to fetch promos', details: err.message });
  }
}
