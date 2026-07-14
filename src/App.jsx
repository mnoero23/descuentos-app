import { useState, useEffect, useRef } from "react";
import { ENTITIES, CATEGORIES, DAYS, DAY_SHORT, JUNE_PROMOS } from "./promos.js";

// ── Storage (localStorage for standalone web) ──
const Storage = {
  load(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch { return null; }
  },
  save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch (e) { console.error(e); }
  },
};

// ── AI Fetch via serverless function ──
async function fetchPromosAI(entityNames) {
  try {
    const res = await fetch("/api/search-promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entities: entityNames.join(", ") }),
    });
    const data = await res.json();
    return Array.isArray(data.promos) ? data.promos : [];
  } catch {
    return [];
  }
}

// ── Components ──
function DiscountCard({ discount, onDelete, entityInfo }) {
  const badge = discount.source === "ai" ? "IA" : discount.source === "manual" ? "✍️" : null;
  return (
    <div className="card" style={{ borderLeftColor: entityInfo?.color || "#666" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <button className="card-del" onClick={() => onDelete(discount.id)} title="Eliminar">×</button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 18 }}>{entityInfo?.icon}</span>
        <span className="entity-label" style={{ color: entityInfo?.color }}>{entityInfo?.name}</span>
        {badge && <span className="badge" style={{ background: `${entityInfo?.color}20`, color: entityInfo?.color }}>{badge}</span>}
      </div>
      <div className="card-desc">{discount.description}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="pill" style={{ background: `${entityInfo?.color}18`, color: entityInfo?.color }}>{discount.category}</span>
        <span className="pill pill-tope">Tope: {discount.tope}</span>
      </div>
      {discount.conditions && <div className="card-cond">{discount.conditions}</div>}
    </div>
  );
}

function AddModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ entities: [], days: [], category: "", description: "", tope: "", conditions: "" });
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (key, val) => setForm(p => ({ ...p, [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val] }));
  const ok = form.entities.length > 0 && form.days.length > 0 && form.category && form.description;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700 }}>➕ Nuevo Descuento</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="label">Banco / Billetera (podés elegir varios)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ENTITIES.map(e => {
                const on = form.entities.includes(e.id);
                return (<button key={e.id} onClick={() => toggle("entities", e.id)}
                  className="toggle-btn" style={{
                    border: on ? `2px solid ${e.color}` : "2px solid var(--border)",
                    background: on ? `${e.color}20` : "var(--input-bg)",
                    color: on ? e.color : "var(--text-secondary)",
                  }}>{e.icon} {e.name}</button>);
              })}
            </div>
          </div>
          <div>
            <label className="label">Días (podés elegir varios)</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {DAYS.map((d, i) => {
                const on = form.days.includes(i);
                return (<button key={i} onClick={() => toggle("days", i)}
                  className="toggle-btn day-toggle" style={{
                    border: on ? "2px solid #6366f1" : "2px solid var(--border)",
                    background: on ? "#6366f120" : "var(--input-bg)",
                    color: on ? "#a5b4fc" : "var(--text-secondary)",
                  }}>{DAY_SHORT[i]}</button>);
              })}
              <button onClick={() => u("days", [0, 1, 2, 3, 4, 5, 6])} className="toggle-btn" style={{ border: "2px solid var(--border)", background: "var(--input-bg)", color: "var(--text-muted)" }}>Todos</button>
            </div>
          </div>
          <div><label className="label">Categoría</label>
            <select className="input" value={form.category} onChange={e => u("category", e.target.value)}>
              <option value="">Seleccioná...</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="label">Descripción</label><input className="input" placeholder="Ej: 20% en Carrefour" value={form.description} onChange={e => u("description", e.target.value)} /></div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}><label className="label">Tope</label><input className="input" placeholder="$3.000" value={form.tope} onChange={e => u("tope", e.target.value)} /></div>
            <div style={{ flex: 1 }}><label className="label">Condiciones</label><input className="input" placeholder="Con QR" value={form.conditions} onChange={e => u("conditions", e.target.value)} /></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22, justifyContent: "flex-end" }}>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={() => { if (ok) onAdd(form); }} style={{ opacity: ok ? 1 : 0.5 }}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

function Banner({ status, progress, found }) {
  if (status === "idle") return null;
  const cfg = {
    fetching: { bg: "#1a1a3e", b: "#6366f1", t: "#a5b4fc", m: "🤖 Buscando promos con IA..." },
    done: { bg: "#1e3a2f", b: "#10b981", t: "#34d399", m: `✅ ${found} promos nuevas vía IA` },
    error: { bg: "#3b1f1f", b: "#ef4444", t: "#f87171", m: "⚠️ Error. Usando precargadas." },
    no_results: { bg: "#2a2518", b: "#f59e0b", t: "#fbbf24", m: "ℹ️ Sin nuevas. Mostrando precargadas." },
  }[status];
  return (
    <div style={{ padding: "14px 18px", borderRadius: 14, marginBottom: 20, background: cfg.bg, border: `1px solid ${cfg.b}`, position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: cfg.t, position: "relative", zIndex: 1 }}>{cfg.m}</div>
      {status === "fetching" && <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)", width: `${progress}%`, transition: "width 0.5s", borderRadius: 2 }} />}
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [discounts, setDiscounts] = useState(JUNE_PROMOS);
  const [selDay, setSelDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [fEnt, setFEnt] = useState("all");
  const [fCat, setFCat] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [st, setSt] = useState("idle");
  const [prog, setProg] = useState(0);
  const [found, setFound] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const fetchRef = useRef(false);

  // Load
  useEffect(() => {
    const saved = Storage.load("promos-jun26-web");
    if (saved?.discounts?.length > 0) {
      setDiscounts(saved.discounts);
      const age = Date.now() - (saved.updatedAt || 0);
      if (age <= 12 * 3600000) fetchRef.current = true;
    }
    setLoaded(true);
  }, []);

  // Save
  useEffect(() => {
    if (loaded) Storage.save("promos-jun26-web", { discounts, updatedAt: Date.now() });
  }, [discounts, loaded]);

  const runFetch = async () => {
    setSt("fetching"); setProg(10);
    const iv = setInterval(() => setProg(p => Math.min(p + Math.random() * 12, 90)), 1000);
    const res = await fetchPromosAI(ENTITIES.map(e => e.name));
    clearInterval(iv); setProg(100);
    if (res.length > 0) {
      const v = res.filter(r => ENTITIES.some(e => e.id === r.entity))
        .map((r, i) => ({ ...r, id: Date.now() + i, day: typeof r.day === "number" ? Math.min(Math.max(r.day, 0), 6) : 0, source: "ai" }));
      setDiscounts(prev => [...prev.filter(d => d.source !== "ai"), ...v]);
      setFound(v.length); setSt("done");
    } else { setSt("no_results"); }
    setTimeout(() => setSt("idle"), 5000);
  };

  // Auto-fetch
  useEffect(() => {
    if (!loaded || fetchRef.current) return;
    fetchRef.current = true;
    runFetch();
  }, [loaded]);

  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const filtered = discounts.filter(d => d.day === selDay && (fEnt === "all" || d.entity === fEnt) && (fCat === "all" || d.category === fCat));
  const dayCt = DAYS.map((_, i) => discounts.filter(d => d.day === i).length);

  const handleAdd = (form) => {
    const now = Date.now(); const items = [];
    for (const eid of form.entities) for (const day of form.days)
      items.push({ id: now + items.length, entity: eid, day, category: form.category, description: form.description, tope: form.tope || "Sin tope", conditions: form.conditions || "", source: "manual" });
    setDiscounts(prev => [...prev, ...items]);
    setShowAdd(false);
  };

  return (
    <>
      <style>{`
        :root{--bg:#0f1117;--card-bg:#1a1d27;--modal-bg:#1e2130;--input-bg:#252839;--border:#2a2d3e;--text-primary:#e8eaf0;--text-secondary:#b0b4c4;--text-muted:#6b7094;--accent-bg:#1e3a2f;--accent-text:#34d399;--day-active:linear-gradient(135deg,#6366f1,#8b5cf6);--day-today-border:#f59e0b}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.dc{animation:fadeIn 0.3s ease forwards}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}.lp{animation:pulse 1.5s ease-in-out infinite}
        .card{background:var(--card-bg);border-radius:14px;padding:16px 18px;border-left:4px solid;position:relative;transition:transform 0.2s,box-shadow 0.2s}
        .card-del{position:absolute;top:8px;right:10px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:4px;border-radius:4px;line-height:1}
        .card-desc{font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:6px;line-height:1.3}
        .card-cond{font-size:12px;color:var(--text-muted);margin-top:8px;font-style:italic}
        .entity-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;font-family:'JetBrains Mono',monospace}
        .badge{font-size:9px;padding:2px 6px;border-radius:6px;font-weight:600;font-family:'JetBrains Mono',monospace}
        .pill{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600}
        .pill-tope{background:var(--accent-bg);color:var(--accent-text);font-weight:700}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;backdrop-filter:blur(4px)}
        .modal{background:var(--modal-bg);border-radius:20px;padding:28px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);color:var(--text-primary)}
        .label{font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px;display:block;text-transform:uppercase;letter-spacing:0.06em;font-family:'JetBrains Mono',monospace}
        .input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--input-bg);color:var(--text-primary);font-size:14px;font-family:'DM Sans',sans-serif;outline:none}
        .toggle-btn{padding:6px 12px;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s}
        .day-toggle{padding:8px 14px;font-weight:700;font-family:'JetBrains Mono',monospace}
        .btn-primary{padding:10px 22px;border-radius:10px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:14px;cursor:pointer;font-weight:700}
        .btn-secondary{padding:10px 22px;border-radius:10px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:14px;cursor:pointer;font-weight:600}
        @media(max-width:480px){.modal{padding:20px}.card{padding:14px 16px}}
      `}</style>

      <div style={{ fontFamily: "'DM Sans',sans-serif", background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)", padding: "24px 20px 40px", maxWidth: 820, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>Argentina · Junio 2026</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg,#6366f1,#a78bfa,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>Descuentos del Día</h1>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <span>{discounts.length} promos · {ENTITIES.length} entidades</span>
            <button onClick={() => { fetchRef.current = false; runFetch(); }} disabled={st === "fetching"}
              style={{ padding: "5px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text-secondary)", fontSize: 12, cursor: st === "fetching" ? "wait" : "pointer", fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span className={st === "fetching" ? "lp" : ""}>🔄</span> Actualizar con IA
            </button>
          </div>
        </div>

        <Banner status={st} progress={prog} found={found} />

        {/* Day Selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", padding: "4px 0" }}>
          {DAYS.map((_, i) => (
            <button key={i} onClick={() => setSelDay(i)} style={{
              flex: 1, minWidth: 44, padding: "10px 4px", borderRadius: 12, border: "none",
              background: selDay === i ? "var(--day-active)" : "var(--card-bg)",
              color: selDay === i ? "#fff" : "var(--text-secondary)", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative",
              outline: i === todayIdx ? `2px solid var(--day-today-border)` : "none", outlineOffset: 2, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{DAY_SHORT[i]}</span>
              <span style={{ fontSize: 10, fontWeight: 600, background: selDay === i ? "rgba(255,255,255,0.2)" : "var(--input-bg)", padding: "1px 7px", borderRadius: 10 }}>{dayCt[i]}</span>
              {i === todayIdx && <div style={{ position: "absolute", top: -6, right: -2, fontSize: 8, background: "var(--day-today-border)", color: "#000", padding: "1px 5px", borderRadius: 6, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>HOY</div>}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <select className="input" value={fEnt} onChange={e => setFEnt(e.target.value)} style={{ width: "auto", fontSize: 13 }}>
            <option value="all">Todas las entidades</option>
            {ENTITIES.map(e => <option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}
          </select>
          <select className="input" value={fCat} onChange={e => setFCat(e.target.value)} style={{ width: "auto", fontSize: 13 }}>
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div style={{ flex: 1 }} />
          <button className="btn-primary" onClick={() => setShowAdd(true)} style={{ fontSize: 13, padding: "8px 18px" }}>+ Agregar</button>
        </div>

        {/* Day Title */}
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ background: "var(--day-active)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{DAYS[selDay]}</span>
          <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>· {filtered.length} descuentos</span>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏷️</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No hay descuentos para {DAYS[selDay]}</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {filtered.map((d, i) => (
              <div key={d.id} className="dc" style={{ animationDelay: `${i * 0.04}s` }}>
                <DiscountCard discount={d} onDelete={id => setDiscounts(p => p.filter(x => x.id !== id))} entityInfo={ENTITIES.find(e => e.id === d.entity)} />
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: 32, padding: "16px 20px", background: "var(--card-bg)", borderRadius: 14, display: "flex", flexWrap: "wrap", gap: "8px 16px", justifyContent: "center" }}>
          {ENTITIES.map(e => {
            const n = discounts.filter(d => d.entity === e.id).length;
            return (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)", cursor: "pointer", opacity: fEnt === "all" || fEnt === e.id ? 1 : 0.4 }}
                onClick={() => setFEnt(fEnt === e.id ? "all" : e.id)}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, display: "inline-block" }} />
                <span style={{ fontWeight: 600 }}>{e.name}</span>
                <span style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>({n})</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span>📦 {discounts.filter(d => d.source === "preloaded").length} verificadas</span>
          {discounts.filter(d => d.source === "ai").length > 0 && <span>🤖 {discounts.filter(d => d.source === "ai").length} vía IA</span>}
          {discounts.filter(d => d.source === "manual").length > 0 && <span>✍️ {discounts.filter(d => d.source === "manual").length} manuales</span>}
        </div>
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 10, color: "var(--text-muted)", opacity: 0.6 }}>Verificá condiciones en la app de cada banco. Datos junio 2026.</div>
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </>
  );
}
