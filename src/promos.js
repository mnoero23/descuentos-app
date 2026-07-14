export const ENTITIES = [
  { id:"mercadopago", name:"Mercado Pago", color:"#009ee3", icon:"💙" },
  { id:"modo", name:"MODO", color:"#5e17eb", icon:"🟣" },
  { id:"brubank", name:"Brubank", color:"#6c3baa", icon:"💜" },
  { id:"naranjax", name:"Naranja X", color:"#ff6600", icon:"🧡" },
  { id:"personalpay", name:"Personal Pay", color:"#00b4d8", icon:"📱" },
  { id:"santander", name:"Santander Río", color:"#ec0000", icon:"🔴" },
  { id:"bbva", name:"BBVA", color:"#004481", icon:"🔵" },
  { id:"bancon", name:"BANCON", color:"#1a8c4e", icon:"🟢" },
  { id:"uala", name:"Ualá", color:"#7b2d8e", icon:"💳" },
  { id:"bna", name:"BNA", color:"#0072bc", icon:"🏛️" },
];

export const CATEGORIES = ["Supermercados","Combustible","Farmacia","Gastronomía","Indumentaria","Electro","Entretenimiento","Viajes","Otros"];
export const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
export const DAY_SHORT = ["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];

let _id = 1;
const p = (entity,day,cat,desc,tope,cond) => ({id:_id++,entity,day,category:cat,description:desc,tope,conditions:cond,source:"preloaded"});

export const JUNE_PROMOS = [
  // SANTANDER
  p("santander",3,"Combustible","30% en YPF (Select Black/Platinum)","$20.000/mes","App YPF · Jueves · Visa crédito"),
  p("santander",3,"Combustible","15% en YPF (otros segmentos)","$7.500/mes","App YPF · Jueves · Visa crédito"),
  p("santander",4,"Supermercados","25% en Carrefour vía MODO","$20.000/mes","Viernes · Visa Santander"),
  ...DAYS.map((_,i) => p("santander",i,"Gastronomía","25% en desayunos gastro (6-11hs)","$10.000/mes","Visa crédito/débito vía MODO · QR")),
  p("santander",4,"Indumentaria","20% en Nike online","Sin tope","Visa crédito o débito · Reintegro 30 días"),
  // BNA
  p("bna",0,"Supermercados","30% en ChangoMás","$25.000/mes","Compra mín $75.000 · QR · Lunes"),
  p("bna",0,"Supermercados","10% extra ChangoMás (junio)","$20.000/mes","Acumulable · Compra mín $75.000"),
  p("bna",0,"Supermercados","25% en El Nene","$12.000/mes","Lunes y Jueves"),
  p("bna",3,"Supermercados","25% en El Nene","$12.000/mes","Lunes y Jueves"),
  p("bna",2,"Supermercados","30% Carrefour, Maxiconsumo, ChangoMás, Cabrales","$12.000/sem","Miércoles · MODO BNA+ · Visa/MC crédito"),
  p("bna",3,"Supermercados","20% en Mayorista Nini","$20.000","Jueves · Sin mínimo de compra"),
  ...[0,1,2,3,4].map(d => p("bna",d,"Supermercados","5% jubilados Carrefour/Coto/Disco/Vea/ChangoMás","$5.000/sem · $20.000/mes","Lun-Vie · Cobro haberes BNA · BNA+ MODO")),
  ...DAYS.map((_,i) => p("bna",i,"Gastronomía","25% gastro adheridos (Semana Nación)","$10.000/compra","Máx 5 txn/mes · Todos los días")),
  ...DAYS.map((_,i) => p("bna",i,"Combustible","15% en YPF Infinia","$10.000/mes","Visa crédito BNA vía MODO · QR")),
  p("bna",2,"Combustible","20% en YPF con QR","$10.000/mes","Miércoles · QR desde BNA+"),
  // MODO
  ...[4,5,6].map(d => p("modo",d,"Supermercados","20% en Disco & Vea","$25.000/mes por banco","Compra mín $100.000 · QR presencial")),
  ...DAYS.map((_,i) => p("modo",i,"Supermercados","20% en DIA (Superdía)","Varía por banco","QR · Bancos adheridos")),
  // MERCADO PAGO
  ...DAYS.map((_,i) => p("mercadopago",i,"Supermercados","Hasta 25% en Carrefour, Coto, Día, Vea, ChangoMás","Sin tope","Billetera MP · Todos los días")),
  p("mercadopago",0,"Combustible","30% reintegro combustible","Varía por nivel","Lunes · Tarjeta crédito MP"),
  p("mercadopago",2,"Gastronomía","15% en Burger King","Sin tope","Miércoles · Pago QR"),
  p("mercadopago",4,"Gastronomía","30% en McDonald's","Sin tope","Viernes · Pago QR"),
  p("mercadopago",1,"Farmacia","15% en Dr. Ahorro","Sin tope","Martes · Presencial"),
  p("mercadopago",2,"Indumentaria","20% + 6 CSI en Adidas","Sin tope","Miércoles · Tarjeta MP"),
  p("mercadopago",0,"Entretenimiento","2x1 en Cinemark","Sin tope","Lunes y Martes"),
  p("mercadopago",1,"Entretenimiento","2x1 en Cinemark","Sin tope","Lunes y Martes"),
  p("mercadopago",2,"Combustible","10% en Dapsa con QR","Sin tope","Miércoles · Pago QR"),
  // PERSONAL PAY
  p("personalpay",3,"Supermercados","30% en Coto NFC","Sin tope","Jueves · Visa sin contacto"),
  ...[0,1,2].map(d => p("personalpay",d,"Supermercados","15% en Libertad","$40.000","Lun-Mié · QR/NFC/tarjeta")),
  ...[4,5,6].map(d => p("personalpay",d,"Supermercados","15% en ChangoMás","Sin tope","Vie-Dom · Pago QR")),
  p("personalpay",0,"Supermercados","20% en Vea con QR","Sin tope","Lunes"),
  p("personalpay",4,"Supermercados","25% en Coto con QR","Sin tope","Viernes"),
  p("personalpay",4,"Electro","10% en Frávega","$10.000","Viernes · Visa"),
  // BBVA
  ...DAYS.map((_,i) => p("bbva",i,"Gastronomía","25% desayunos gastro (6-11hs)","$1.000/compra · $10.000/mes","QR Visa crédito/débito · Todos los días")),
  p("bbva",2,"Indumentaria","Hasta 9 CSI en Dexter/Moov","Sin tope","Visa/MC BBVA · Hasta 17/6"),
  // NARANJA X
  ...DAYS.map((_,i) => p("naranjax",i,"Indumentaria","9 CSI en Dexter/StockCenter/Moov","Sin tope","Todos los días · Tarjeta Naranja X")),
  // BRUBANK
  p("brubank",0,"Combustible","10% en Shell","$1.500","Lunes · Débito Brubank"),
  // UALÁ
  p("uala",5,"Entretenimiento","2x1 en cines","Sin tope","Sábados · Prepaga Ualá"),
  ...DAYS.map((_,i) => p("uala",i,"Otros","100% reintegro transporte (subte/colectivo)","$15.000/mes subte + $15.000 colectivo","Prepaga o crédito Ualá")),
  // BANCON
  p("bancon",4,"Farmacia","20% en farmacias","$3.000","Viernes · Débito"),
];
