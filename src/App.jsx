import { useState, useEffect, useRef } from "react";
import { PROMOS } from "./promos";

const DAYS=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const DAY_SHORT=["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];
const ENTITIES=[
  {id:"mercadopago",name:"Mercado Pago",color:"#009ee3",icon:"💙"},
  {id:"modo",name:"MODO",color:"#5e17eb",icon:"🟣"},
  {id:"brubank",name:"Brubank",color:"#6c3baa",icon:"💜"},
  {id:"naranjax",name:"Naranja X",color:"#ff6600",icon:"🧡"},
  {id:"personalpay",name:"Personal Pay",color:"#00b4d8",icon:"📱"},
  {id:"santander",name:"Santander Río",color:"#ec0000",icon:"🔴"},
  {id:"bbva",name:"BBVA",color:"#004481",icon:"🔵"},
  {id:"bancon",name:"BANCON",color:"#1a8c4e",icon:"🟢"},
  {id:"uala",name:"Ualá",color:"#7b2d8e",icon:"💳"},
  {id:"bna",name:"BNA",color:"#0072bc",icon:"🏛️"},
];
const CATEGORIES=["Supermercados","Combustible","Farmacia","Gastronomía","Indumentaria","Electro","Entretenimiento","Viajes","Otros"];

// Clave de storage con versión — al cambiar la data precargada, subí la versión para invalidar el caché viejo
const STORAGE_KEY = "descuentos-v3";

const ls={load(k){try{const d=localStorage.getItem(k);return d?JSON.parse(d):null}catch{return null}},save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};

async function fetchAI(names){
  try{
    const r=await fetch('/api/fetch-promos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({entityNames:names})});
    if(!r.ok)return[];const d=await r.json();return Array.isArray(d.promos)?d.promos:[];
  }catch{return[]}
}

function Card({d,onDel,ei}){
  const badge=d.source==="ai"?"IA":d.source==="manual"?"✍️":null;
  return(
    <div style={{background:"var(--card-bg)",borderRadius:14,padding:"16px 18px",borderLeft:`4px solid ${ei?.color||"#666"}`,position:"relative",transition:"transform .2s,box-shadow .2s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.18)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
      <button onClick={()=>onDel(d.id)} style={{position:"absolute",top:8,right:10,background:"none",border:"none",color:"var(--text-muted)",cursor:"pointer",fontSize:16,padding:4,borderRadius:4,lineHeight:1}}>×</button>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
        <span style={{fontSize:18}}>{ei?.icon}</span>
        <span style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",color:ei?.color,fontFamily:"'JetBrains Mono',monospace"}}>{ei?.name}</span>
        {badge&&<span style={{fontSize:9,background:`${ei?.color}20`,color:ei?.color,padding:"2px 6px",borderRadius:6,fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>{badge}</span>}
      </div>
      <div style={{fontSize:15,fontWeight:600,marginBottom:6,lineHeight:1.3}}>{d.description}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <span style={{background:`${ei?.color}18`,color:ei?.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{d.category}</span>
        <span style={{background:"var(--accent-bg)",color:"var(--accent-text)",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>Tope: {d.tope}</span>
      </div>
      {d.conditions&&<div style={{fontSize:12,color:"var(--text-muted)",marginTop:8,fontStyle:"italic"}}>{d.conditions}</div>}
    </div>
  );
}

function AddModal({onClose,onAdd}){
  const[f,setF]=useState({entities:[],days:[],category:"",description:"",tope:"",conditions:""});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const tog=(key,val)=>setF(p=>({...p,[key]:p[key].includes(val)?p[key].filter(x=>x!==val):[...p[key],val]}));
  const st={width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid var(--border)",background:"var(--input-bg)",color:"var(--text-primary)",fontSize:14,outline:"none"};
  const lb={fontSize:12,fontWeight:600,color:"var(--text-muted)",marginBottom:6,display:"block",textTransform:"uppercase",letterSpacing:".06em",fontFamily:"'JetBrains Mono',monospace"};
  const ok=f.entities.length>0&&f.days.length>0&&f.category&&f.description;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20,backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"var(--modal-bg)",borderRadius:20,padding:28,width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
        <h3 style={{margin:"0 0 20px",fontSize:20,fontWeight:700}}>➕ Nuevo Descuento</h3>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={lb}>Banco / Billetera (varios)</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{ENTITIES.map(e=>{const on=f.entities.includes(e.id);return<button key={e.id} onClick={()=>tog("entities",e.id)} style={{padding:"6px 12px",borderRadius:10,fontSize:12,fontWeight:600,cursor:"pointer",border:on?`2px solid ${e.color}`:"2px solid var(--border)",background:on?`${e.color}20`:"var(--input-bg)",color:on?e.color:"var(--text-secondary)",transition:".15s"}}>{e.icon} {e.name}</button>})}</div>
          </div>
          <div><label style={lb}>Días (varios)</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{DAYS.map((d,i)=>{const on=f.days.includes(i);return<button key={i} onClick={()=>tog("days",i)} style={{padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",border:on?"2px solid #6366f1":"2px solid var(--border)",background:on?"#6366f120":"var(--input-bg)",color:on?"#a5b4fc":"var(--text-secondary)",fontFamily:"'JetBrains Mono',monospace"}}>{DAY_SHORT[i]}</button>})}
              <button onClick={()=>u("days",[0,1,2,3,4,5,6])} style={{padding:"8px 12px",borderRadius:10,fontSize:11,fontWeight:600,cursor:"pointer",border:"2px solid var(--border)",background:"var(--input-bg)",color:"var(--text-muted)"}}>Todos</button>
            </div>
          </div>
          <div><label style={lb}>Categoría</label><select value={f.category} onChange={e=>u("category",e.target.value)} style={st}><option value="">Seleccioná...</option>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><label style={lb}>Descripción</label><input style={st} placeholder="Ej: 20% en Carrefour" value={f.description} onChange={e=>u("description",e.target.value)}/></div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><label style={lb}>Tope</label><input style={st} placeholder="$3.000" value={f.tope} onChange={e=>u("tope",e.target.value)}/></div>
            <div style={{flex:1}}><label style={lb}>Condiciones</label><input style={st} placeholder="Con QR" value={f.conditions} onChange={e=>u("conditions",e.target.value)}/></div>
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginTop:22,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"10px 22px",borderRadius:10,border:"1px solid var(--border)",background:"transparent",color:"var(--text-muted)",fontSize:14,cursor:"pointer",fontWeight:600}}>Cancelar</button>
          <button onClick={()=>{if(ok)onAdd(f)}} style={{padding:"10px 22px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:700,opacity:ok?1:.5}}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

function Banner({status,progress,found}){
  if(status==="idle")return null;
  const c={fetching:{bg:"#1a1a3e",b:"#6366f1",t:"#a5b4fc",m:"🤖 Buscando promos con IA..."},done:{bg:"#1e3a2f",b:"#10b981",t:"#34d399",m:`✅ ${found} promos nuevas vía IA`},error:{bg:"#3b1f1f",b:"#ef4444",t:"#f87171",m:"⚠️ Error. Usando precargadas."},no_results:{bg:"#2a2518",b:"#f59e0b",t:"#fbbf24",m:"ℹ️ Sin nuevas. Mostrando precargadas."}}[status];
  if(!c)return null;
  return(<div style={{padding:"14px 18px",borderRadius:14,marginBottom:20,background:c.bg,border:`1px solid ${c.b}`,position:"relative",overflow:"hidden"}}><div style={{fontSize:14,fontWeight:600,color:c.t,position:"relative",zIndex:1}}>{c.m}</div>{status==="fetching"&&<div style={{position:"absolute",bottom:0,left:0,height:3,background:"linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)",width:`${progress}%`,transition:"width .5s",borderRadius:2}}/>}</div>);
}

export default function App(){
  const[disc,setDisc]=useState(PROMOS);
  const[selDay,setSelDay]=useState(new Date().getDay()===0?6:new Date().getDay()-1);
  const[fEnt,setFEnt]=useState("all");
  const[fCat,setFCat]=useState("all");
  const[showAdd,setShowAdd]=useState(false);
  const[st,setSt]=useState("idle");
  const[prog,setProg]=useState(0);
  const[found,setFound]=useState(0);
  const[loaded,setLoaded]=useState(false);
  const fetchRef=useRef(false);

  useEffect(()=>{const s=ls.load(STORAGE_KEY);if(s?.discounts?.length>0){setDisc(s.discounts);if(Date.now()-(s.updatedAt||0)<=12*3600000)fetchRef.current=true}setLoaded(true)},[]);
  useEffect(()=>{if(loaded)ls.save(STORAGE_KEY,{discounts:disc,updatedAt:Date.now()})},[disc,loaded]);

  const runFetch=async()=>{setSt("fetching");setProg(10);const iv=setInterval(()=>setProg(p=>Math.min(p+Math.random()*12,90)),1000);const res=await fetchAI(ENTITIES.map(e=>e.name));clearInterval(iv);setProg(100);if(res.length>0){const v=res.filter(r=>ENTITIES.some(e=>e.id===r.entity)).map((r,i)=>({...r,id:Date.now()+i,day:typeof r.day==="number"?Math.min(Math.max(r.day,0),6):0,source:"ai"}));setDisc(prev=>[...prev.filter(d=>d.source!=="ai"),...v]);setFound(v.length);setSt("done")}else setSt("no_results");setTimeout(()=>setSt("idle"),5000)};

  useEffect(()=>{if(!loaded||fetchRef.current)return;fetchRef.current=true;runFetch()},[loaded]);

  const todayIdx=new Date().getDay()===0?6:new Date().getDay()-1;
  const filtered=disc.filter(d=>d.day===selDay&&(fEnt==="all"||d.entity===fEnt)&&(fCat==="all"||d.category===fCat));
  const dayCt=DAYS.map((_,i)=>disc.filter(d=>d.day===i).length);

  // Fecha dinámica — siempre muestra el mes y año actual
  const mesActual = new Date().toLocaleDateString("es-AR",{month:"long",year:"numeric"});

  const handleAdd=f=>{const now=Date.now();const items=[];for(const eid of f.entities)for(const day of f.days)items.push({id:now+items.length,entity:eid,day,category:f.category,description:f.description,tope:f.tope||"Sin tope",conditions:f.conditions||"",source:"manual"});setDisc(prev=>[...prev,...items]);setShowAdd(false)};

  return(
    <div style={{background:"var(--bg)",minHeight:"100vh",padding:"24px 20px 40px",maxWidth:820,margin:"0 auto"}}>
      <div style={{marginBottom:24,textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",color:"var(--text-muted)",textTransform:"uppercase",marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>Argentina · {mesActual}</div>
        <h1 style={{fontSize:30,fontWeight:800,letterSpacing:"-.02em",background:"linear-gradient(135deg,#6366f1,#a78bfa,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2}}>Descuentos del Día</h1>
        <div style={{fontSize:13,color:"var(--text-muted)",marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          <span>{disc.length} promos · {ENTITIES.length} entidades</span>
          <button onClick={()=>{fetchRef.current=false;runFetch()}} disabled={st==="fetching"} style={{padding:"5px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--card-bg)",color:"var(--text-secondary)",fontSize:12,cursor:st==="fetching"?"wait":"pointer",fontWeight:600,fontFamily:"'JetBrains Mono',monospace",display:"inline-flex",alignItems:"center",gap:6}}>
            <span className={st==="fetching"?"lp":""}>🔄</span> Actualizar con IA
          </button>
        </div>
      </div>

      <Banner status={st} progress={prog} found={found}/>

      <div style={{display:"flex",gap:6,marginBottom:24,overflowX:"auto",padding:"4px 0"}}>
        {DAYS.map((_,i)=><button key={i} onClick={()=>setSelDay(i)} style={{flex:1,minWidth:44,padding:"10px 4px",borderRadius:12,border:"none",background:selDay===i?"var(--day-active)":"var(--card-bg)",color:selDay===i?"#fff":"var(--text-secondary)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative",outline:i===todayIdx?"2px solid var(--day-today-border)":"none",outlineOffset:2,transition:"all .2s"}}>
          <span style={{fontSize:11,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{DAY_SHORT[i]}</span>
          <span title="Cantidad de promos" style={{fontSize:10,fontWeight:600,background:selDay===i?"rgba(255,255,255,.2)":"var(--input-bg)",padding:"1px 7px",borderRadius:10}}>🏷️{dayCt[i]}</span>
          {i===todayIdx&&<div style={{position:"absolute",top:-6,right:-2,fontSize:8,background:"var(--day-today-border)",color:"#000",padding:"1px 5px",borderRadius:6,fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>HOY</div>}
        </button>)}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
        <select value={fEnt} onChange={e=>setFEnt(e.target.value)} style={{padding:"8px 12px",borderRadius:10,border:"1px solid var(--border)",background:"var(--input-bg)",color:"var(--text-primary)",fontSize:13,outline:"none"}}><option value="all">Todas las entidades</option>{ENTITIES.map(e=><option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}</select>
        <select value={fCat} onChange={e=>setFCat(e.target.value)} style={{padding:"8px 12px",borderRadius:10,border:"1px solid var(--border)",background:"var(--input-bg)",color:"var(--text-primary)",fontSize:13,outline:"none"}}><option value="all">Todas las categorías</option>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select>
        <div style={{flex:1}}/>
        <button onClick={()=>setShowAdd(true)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:13,cursor:"pointer",fontWeight:700}}>+ Agregar</button>
      </div>

      <div style={{fontSize:20,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
        <span style={{background:"var(--day-active)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{DAYS[selDay]}</span>
        <span style={{fontSize:14,color:"var(--text-muted)",fontWeight:500}}>· {filtered.length} descuentos</span>
      </div>

      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"48px 20px",color:"var(--text-muted)"}}><div style={{fontSize:40,marginBottom:12}}>🏷️</div><div style={{fontSize:16,fontWeight:600}}>No hay descuentos para {DAYS[selDay]}</div><div style={{fontSize:13,marginTop:6}}>Agregá con + o tocá 🔄</div></div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {filtered.map((d,i)=><div key={d.id} className="dc" style={{animationDelay:`${i*.04}s`}}><Card d={d} onDel={id=>setDisc(p=>p.filter(x=>x.id!==id))} ei={ENTITIES.find(e=>e.id===d.entity)}/></div>)}
        </div>
      )}

      <div style={{marginTop:32,padding:"16px 20px",background:"var(--card-bg)",borderRadius:14,display:"flex",flexWrap:"wrap",gap:"8px 16px",justifyContent:"center"}}>
        {ENTITIES.map(e=>{const n=disc.filter(d=>d.entity===e.id).length;return<div key={e.id} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--text-secondary)",cursor:"pointer",opacity:fEnt==="all"||fEnt===e.id?1:.4}} onClick={()=>setFEnt(fEnt===e.id?"all":e.id)}><span style={{width:8,height:8,borderRadius:"50%",background:e.color,display:"inline-block"}}/><span style={{fontWeight:600}}>{e.name}</span><span style={{color:"var(--text-muted)",fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>({n})</span></div>})}
      </div>
      <div style={{marginTop:16,textAlign:"center",fontSize:11,color:"var(--text-muted)",fontFamily:"'JetBrains Mono',monospace",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
        <span>📦 {disc.filter(d=>d.source==="preloaded").length} verificadas</span>
        {disc.filter(d=>d.source==="ai").length>0&&<span>🤖 {disc.filter(d=>d.source==="ai").length} vía IA</span>}
        {disc.filter(d=>d.source==="manual").length>0&&<span>✍️ {disc.filter(d=>d.source==="manual").length} manuales</span>}
      </div>
      <div style={{marginTop:8,textAlign:"center",fontSize:10,color:"var(--text-muted)",opacity:.6}}>Promos pueden variar. Verificá en la app de cada banco. Datos actualizados: julio 2026.</div>

      {showAdd&&<AddModal onClose={()=>setShowAdd(false)} onAdd={handleAdd}/>}
    </div>
  );
}
