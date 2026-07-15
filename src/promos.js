const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

let _id = 1;
const p = (entity,day,cat,desc,tope,cond) => ({id:_id++,entity,day,category:cat,description:desc,tope,conditions:cond,source:"preloaded"});

// ── PROMOS JULIO 2026 (verificadas con fuentes web + mails MODO) ──
export const PROMOS = [
  // ══ MODO (julio 2026) ══
  p("modo",1,"Supermercados","20% en Jumbo","$25.000/banco/mes","Mar y Jue · Mín $100.000 · QR presencial y online · Hasta 31/7"),
  p("modo",3,"Supermercados","20% en Jumbo","$25.000/banco/mes","Mar y Jue · Mín $100.000 · QR presencial y online · Hasta 31/7"),
  p("modo",4,"Supermercados","20% en Disco","$25.000/banco/mes","Vie y Sáb · Mín $100.000 · QR presencial y online · Hasta 31/7"),
  p("modo",5,"Supermercados","20% en Disco","$25.000/banco/mes","Vie y Sáb · Mín $100.000 · QR presencial y online · Hasta 31/7"),
  p("modo",4,"Supermercados","20% en Vea","$25.000/banco/mes","Solo Viernes · Mín $100.000 · QR o botón de pago · Hasta 31/7"),
  p("modo",4,"Supermercados","20% en Supermercados de Córdoba","$15.000/banco/mes","Viernes · QR presencial · Hasta 31/7"),
  p("modo",2,"Supermercados","20% en Cooperativa Obrera","$15.000/banco/mes","Miércoles · Sucursales seleccionadas · QR · Hasta 31/7"),
  p("modo",0,"Supermercados","20% en Kilbel","$10.000/usuario/mes","Lunes · Mín $50.000 · QR presencial · Hasta 31/7"),
  p("modo",4,"Supermercados","20% en Supermercados Federal","$15.000/banco/mes","Viernes · QR presencial · Hasta 31/7"),
  p("modo",2,"Combustible","20% en YPF (Banco Macro vía MODO)","$15.000/mes","Miércoles · Visa crédito · Selecta 30% tope $20.000"),
  p("modo",4,"Combustible","10-15% en YPF (Galicia vía MODO)","$10.000-15.000","Viernes · MC crédito · Éminent 15%"),

  // ══ SANTANDER ══
  p("santander",3,"Combustible","15% en YPF (Sorpresa Santander)","$10.000","Jueves · Solo App YPF · Visa crédito/débito"),
  p("santander",5,"Supermercados","20% en Diarco con QR","Sin tope","Sáb y Dom · QR App Santander"),
  p("santander",6,"Supermercados","20% en Diarco con QR","Sin tope","Sáb y Dom · QR App Santander"),
  p("santander",1,"Farmacia","25% en Farmacity + 3 CSI","$15.000","Martes"),
  ...DAYS.map((_,i) => p("santander",i,"Otros","10% en Yenny + 6 CSI","$20.000","Todos los días")),

  // ══ BNA (julio 2026) ══
  p("bna",0,"Supermercados","20% en ChangoMás + 10% extra BNA","$25.000/mes + $5.000","Compra mín $75.000 · BNA+ MODO"),
  p("bna",1,"Supermercados","20% en Jumbo","$25.000/mes","Mar y Jue · Mín $100.000 · Visa BNA+ MODO · Hasta 31/7"),
  p("bna",3,"Supermercados","20% en Jumbo","$25.000/mes","Mar y Jue · Mín $100.000 · Visa BNA+ MODO · Hasta 31/7"),
  p("bna",2,"Supermercados","30% en Carrefour","$12.000/sem","Miércoles · MODO BNA+ · Tope semanal renovable"),
  p("bna",3,"Supermercados","20% en Mayorista Nini","$20.000/mes","Jueves"),
  p("bna",5,"Supermercados","20% en Día","$20.000","Sábados · Mín $35.000"),
  p("bna",5,"Supermercados","20% en Disco","$25.000","Sábados · Mín $100.000 · +10% extra BNA tope $5.000"),
  p("bna",5,"Supermercados","20% en La Anónima","$15.000","Sábados · Mín $50.000 · +5% extra BNA tope $5.000"),
  p("bna",5,"Supermercados","20% en Diarco Barrio","Sin tope","Todo el finde · Mín $35.000"),
  p("bna",6,"Supermercados","20% en Diarco Barrio","Sin tope","Todo el finde · Mín $35.000"),
  ...[0,1,2,3,4].map(d => p("bna",d,"Supermercados","5% jubilados en súpers adheridos","$5.000/sem · $20.000/mes","Lun-Vie · Cobro haberes BNA · BNA+ MODO · Acumulable")),
  p("bna",4,"Combustible","20% en YPF","$10.000/mes","Viernes · Visa/MC vía MODO BNA+"),
  p("bna",4,"Combustible","20% en Shell","$10.000/mes","Viernes · Visa/MC vía MODO"),
  p("bna",4,"Combustible","20% en Axion","$10.000/mes","Viernes · MODO BNA+ · Hasta 31/8"),
  p("bna",0,"Farmacia","3 CSI en farmacias","Sin tope","Lunes · Visa crédito BNA MODO"),

  // ══ MERCADO PAGO ══
  p("mercadopago",4,"Supermercados","10% en Makro","$10.000/mes","Vie y Sáb · Dinero en cuenta MP"),
  p("mercadopago",5,"Supermercados","10% en Makro","$10.000/mes","Vie y Sáb · Dinero en cuenta MP"),
  p("mercadopago",3,"Combustible","10% en Gulf con QR","$6.000","Jueves · Cargas > $50.000"),
  p("mercadopago",2,"Combustible","10% en Dapsa con QR","$5.000","Miércoles · Cargas > $50.000"),
  ...DAYS.map((_,i) => p("mercadopago",i,"Supermercados","Descuentos en Carrefour, Coto, Día con billetera","Varía","Ver app MP · Todos los días")),

  // ══ PERSONAL PAY ══
  p("personalpay",5,"Combustible","10% en Puma Energy","$4.000/carga","Sábados · Máx 2 cargas/mes · Julio y agosto"),

  // ══ NARANJA X ══
  p("naranjax",5,"Combustible","10% en Gulf","$3.000/compra","Sáb y Dom · Tarjeta crédito NX"),
  p("naranjax",6,"Combustible","10% en Gulf","$3.000/compra","Sáb y Dom · Tarjeta crédito NX"),

  // ══ BRUBANK ══
  ...DAYS.map((_,i) => p("brubank",i,"Combustible","10% en YPF (hasta 30% Ultra)","$2.000-6.000/sem según plan","Débito · General/Bruplus/Ultra")),
  p("brubank",5,"Combustible","Hasta 30% en Axion (Ultra)","$6.000/transacción","Fines de semana · Plan Ultra"),
  p("brubank",6,"Combustible","Hasta 30% en Axion (Ultra)","$6.000/transacción","Fines de semana · Plan Ultra"),

  // ══ UALÁ ══
  ...DAYS.map((_,i) => p("uala",i,"Otros","Reintegro transporte (subte/colectivo)","$15.000/mes c/u","Prepaga o crédito Ualá")),

  // ══ BBVA ══
  p("bbva",4,"Gastronomía","Descuentos gastro fin de semana","Varía","Consultar app BBVA"),

  // ══ BANCON ══
  p("bancon",4,"Farmacia","20% en farmacias adheridas","$3.000","Viernes · Débito"),
];

export const JUNE_PROMOS = PROMOS;
