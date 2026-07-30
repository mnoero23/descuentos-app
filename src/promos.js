// promos.js — Actualizado 30/07/2026
// Fuentes: sitios oficiales de cada entidad (Santander, BBVA, Bancor, BNA, Personal Pay,
// Claro Pay, Ualá, Brubank, Naranja X, MODO) + sitioandino.com.ar, calcularsueldo.com.ar,
// iproup.com, cronista.com, iprofesional.com, perfil.com (relevamiento julio 2026).
// Sin conector de Gmail activo en esta sesión, no se revisaron mails.

const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
let _id = 1;
const p = (entity,day,cat,desc,tope,cond) => ({id:_id++,entity,day,category:cat,description:desc,tope,conditions:cond,source:"preloaded"});

export const PROMOS = [

  // ============ SANTANDER ============
  p("santander",0,"Supermercados","20% en Changomás","$25.000","Lunes · Compra mínima $75.000 · Presencial y online · Vigente hasta 31/07/2026"),
  p("santander",3,"Supermercados","30% en Coto","Sin tope","Jueves · Compra mínima $100.000 · Exclusivo pago sin contacto (Apple Pay / Google Pay) · Vigente hasta 31/07/2026"),
  ...[5,6].map(d => p("santander",d,"Supermercados","20% en Diarco","Sin tope","Sábado y domingo · Pago con QR desde App Santander")),
  ...DAYS.map((_,d) => p("santander",d,"Otros","10% en Yenny + 6 cuotas sin interés","$20.000","Todos los días · Librería")),
  p("santander",1,"Farmacia","25% en Farmacity + 3 cuotas sin interés","$15.000","Martes"),
  ...DAYS.map((_,d) => p("santander",d,"Entretenimiento","2x1 en entradas Cinépolis","Sin tope","Todos los días · Visa débito o crédito")),

  // ============ BBVA ============
  ...DAYS.map((_,d) => p("bbva",d,"Supermercados","Reintegro en Jumbo, Vea y Disco pagando con QR MODO (App BBVA)","Consultar tope","Vigente 01/07/2026 al 31/07/2026 · Requiere caja de ahorro en pesos activa en BBVA")),
  ...DAYS.map((_,d) => p("bbva",d,"Supermercados","20% en supermercados y combustible (paquete Black+ All)","$100.000/mes (compartido con combustible)","Todos los días · Exclusivo NFC con Visa Signature BBVA Black+ (Apple Pay / Google Pay / MODO NFC)")),
  ...DAYS.map((_,d) => p("bbva",d,"Combustible","20% en estaciones de servicio (paquete Black+ All)","$100.000/mes (compartido con supermercados)","Todos los días · Exclusivo NFC con Visa Signature BBVA Black+")),
  ...DAYS.map((_,d) => p("bbva",d,"Gastronomía","20% en La Cabrera, La Parolaccia y Dandy","$50.000/mes","Todos los días · Pago con celular vía NFC · Vigente 01/07/2026 al 31/07/2026")),

  // ============ BANCOR ============
  ...[4,5].map(d => p("bancor",d,"Gastronomía","20% de ahorro (25% Premier/Black/Signature) con tarjeta Cordobesa","$30.000 ($50.000 Premier/Black/Signature)","Viernes y sábado · Vigente durante julio 2026")),
  ...DAYS.map((_,d) => p("bancor",d,"Otros","Hasta 20% de reintegro con Bezza en gastronomía, panaderías, librerías, peajes, almacenes, bares y carnicerías","$3.000 por compra","Todos los días · Billetera digital Bezza")),
  ...DAYS.map((_,d) => p("bancor",d,"Supermercados","30% de ahorro canjeando puntos Club Bancor","Según canje","Todos los días · Programa de puntos Club Bancor, válido en Córdoba")),
  ...[0,1,3].map(d => p("bancor",d,"Entretenimiento","Descuento en Cines Dino (Alto Verde, Ruta 20, Salsipuedes, Alta Gracia, 60 Cuadras)","Consultar","Lunes, martes y jueves · Tarjeta Cordobesa")),

  // ============ BNA (Banco Nación / BNA+ MODO) ============
  p("bna",0,"Supermercados","20% en Changomás","$25.000","Lunes · Compra mínima $75.000 · Pago con Visa crédito/débito vía BNA+ MODO · Vigente hasta 31/07/2026"),
  ...[1,3].map(d => p("bna",d,"Supermercados","20% en Jumbo","$25.000","Martes y jueves · Compra mínima $100.000 · BNA+ MODO · Vigente hasta 31/07/2026")),
  ...[4,5].map(d => p("bna",d,"Supermercados","20% en Vea","$25.000","Viernes y sábado · Compra mínima $100.000 · BNA+ MODO · Vigente hasta 31/07/2026")),
  p("bna",3,"Supermercados","20% en Makro","$20.000","Jueves · BNA+ MODO · Vigente hasta 31/07/2026"),
  p("bna",4,"Combustible","20% en YPF, Axion y Shell","$10.000","Viernes · Pago con Visa crédito vía BNA+ MODO · Vigente hasta 31/08/2026"),
  p("bna",0,"Farmacia","Hasta 3 cuotas sin interés + 10% adicional jubilados","Sin tope","Lunes · Farmacity, Farmacia del Puente y adheridas · Pago con Visa crédito vía BNA+ MODO"),
  p("bna",3,"Otros","Hasta 3 cuotas sin interés y 10% en ópticas adheridas","Sin tope","Jueves · Pago con tarjeta de crédito vía BNA+ MODO"),
  ...DAYS.map((_,d) => p("bna",d,"Otros","10% + 3 cuotas sin interés en veterinarias","Sin tope","Todos los días · Visa crédito vía BNA+ · Vigente hasta 31/08/2026")),

  // ============ PERSONAL PAY ============
  p("personalpay",3,"Supermercados","25% en ChangoMás y DIA (Súper Jueves de Ahorro)","$15.000","Jueves · Pago con Visa Personal Pay vía NFC (Android)"),
  ...[3,4].map(d => p("personalpay",d,"Supermercados","25% en Diarco","Consultar tope","Jueves y viernes · Pago con tarjeta Visa Personal Pay")),
  p("personalpay",5,"Combustible","10% en carga de combustible Puma Energy (Súper, Premium, Ion Diesel)","$4.000 por transacción","Sábados · Requiere app Puma Pris + pago con Visa Personal Pay · Máximo 2 cargas por mes · Vigente julio y agosto 2026"),

  // ============ CLARO PAY ============
  ...DAYS.map((_,d) => p("claropay",d,"Electro","20% off + 10% cashback en equipos y accesorios (Tienda Online / Centros de Atención)","Consultar tope","Todos los días · Pago con Claro Pay en un solo pago (crédito, débito o saldo en cuenta) · Vigente 01/07/2026 al 31/07/2026")),
  ...DAYS.map((_,d) => p("claropay",d,"Otros","10% cashback en el pago de la factura Claro","1 factura por mes","Todos los días · Cashback automático, primer pago del mes")),

  // ============ UALÁ ============
  p("uala",0,"Supermercados","25% en COTO (tarjeta de crédito o prepaga)","$15.000/mes","Lunes"),
  p("uala",0,"Supermercados","25% en Carrefour Express pagando con NFC (15% con tarjeta física)","$8.000 semanal (NFC) / $3.000 semanal (física)","Lunes"),
  p("uala",1,"Supermercados","25% en Jumbo, Vea y Disco pagando con NFC (15% con tarjeta física)","$8.000 semanal (NFC) / $6.000 semanal (física)","Martes"),
  p("uala",5,"Farmacia","25% en Farmacity, Simplicity y Get the Look","$10.000/mes","Sábados · Cualquier tarjeta Ualá"),
  ...[5,6].map(d => p("uala",d,"Gastronomía","30% en restaurantes, fast food, cervecerías y cafeterías","$7.500 semanal","Sábado y domingo · Pago con NFC (Apple Pay / Google Pay)")),
  ...DAYS.map((_,d) => p("uala",d,"Otros","Hasta 100% de reintegro en viajes de subte y colectivo","Consultar tope","Todos los días · Pago desde el celular")),

  // ============ BRUBANK ============
  p("brubank",4,"Farmacia","20% en Farmacity, Simplicity, Get the Look y The Food Market","Consultar tope","Viernes · Tarjeta débito Visa Brubank · Vigente 01/07/2026 al 31/07/2026"),
  p("brubank",1,"Combustible","10% en Axion Energy","$2.000 semanal","Martes · Tarjeta débito Visa Brubank · Vigente 01/07/2026 al 31/07/2026"),
  ...DAYS.map((_,d) => p("brubank",d,"Gastronomía","40% en Cervelar","Consultar tope","Todos los días · Clientes con Plan Ultra · Tarjeta débito o crédito Visa Brubank · Vigente 01/07/2026 al 31/07/2026")),

  // ============ MERCADO PAGO ============
  p("mercadopago",2,"Supermercados","10% en Día","Sin tope","Miércoles · Pago con QR, dinero disponible"),
  p("mercadopago",2,"Supermercados","15% en Don Ángel","Sin tope","Miércoles · Pago con QR"),
  p("mercadopago",3,"Supermercados","15% en Carrefour","Sin tope","Jueves · Pago con QR"),
  p("mercadopago",4,"Supermercados","25% en Coto","Sin tope","Viernes · Pago con QR (dinero en cuenta, débito o crédito)"),
  ...[4,5].map(d => p("mercadopago",d,"Supermercados","10% en Makro","Sin tope","Viernes y sábado · Pago con dinero disponible")),
  p("mercadopago",5,"Supermercados","20% en Coto","Sin tope","Sábado · Fin de semana"),
  p("mercadopago",6,"Supermercados","20% en Coto","Sin tope","Domingo · Fin de semana"),
  p("mercadopago",6,"Supermercados","15% en Don Ángel","Sin tope","Domingo"),
  p("mercadopago",2,"Farmacia","10% en Farmacity","$2.500 por día","Miércoles · Pago sin contacto con tarjeta prepaga Mercado Pago"),
  ...[4,5,6].map(d => p("mercadopago",d,"Otros","40% en kioscos Open25","$4.000 por día","Viernes, sábado y domingo · Pago sin contacto con tarjeta prepaga Mercado Pago")),

  // ============ NARANJA X ============
  p("naranjax",3,"Supermercados","15% en Coto pagando con QR","Sin tope","Jueves · Pago con QR desde app Naranja X · Vigente 01/07/2026 al 31/07/2026"),
  ...[4,5,6].map(d => p("naranjax",d,"Supermercados","15% en HiperChangoMás y ChangoMás pagando con QR de Mercado Pago desde app Naranja X","Sin tope","Viernes a domingo · Excluye carnicería, pescadería, granja y algunos lácteos")),
  ...[4,5].map(d => p("naranjax",d,"Gastronomía","30% de reintegro pagando con QR (dinero en cuenta)","$15.000/mes","Viernes y sábado · Vigente 01/07/2026 al 31/07/2026")),
  p("naranjax",1,"Supermercados","25% Plan Turbo / 30% Plan Épico en Jumbo, Disco, Vea, Libertad, Chango Más, Carrefour, Día, La Anónima y Coto","$8.000 semanal (Turbo) / $10.000 semanal (Épico)","Martes · Tarjeta de crédito física o débito Naranja X"),
  ...[5,6].map(d => p("naranjax",d,"Combustible","10% en estaciones Gulf","$3.000 por transacción","Sábado y domingo · Tarjeta de crédito Naranja X")),

  // ============ MODO ============
  p("modo",3,"Supermercados","20% de reintegro (multi-banco vía MODO)","$20.000 (aprox. compra $100.000)","Jueves · Vinculando la cuenta bancaria a MODO · Verificar bancos adheridos vigentes"),
  ...DAYS.map((_,d) => p("modo",d,"Otros","50% extra de reintegro en transporte público (QR Transporte)","Consultar tope","Todos los días · Vigente hasta 31/07/2026")),
  p("modo",4,"Combustible","Descuento en Axion Energy pagando con QR (Banca Credicoop o MODO, Tarjetas Credicoop)","$2.000 semanal","Viernes · Vigente durante julio 2026"),

];

export const JUNE_PROMOS = PROMOS; // alias de compatibilidad
