const SUPABASE_URL = 'https://oyjygzderhxghzsivyyn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95anlnemRlcmh4Z2h6c2l2eXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MzI3NzYsImV4cCI6MjEwODEwODc3Nn0.nWMtMbY8KroThkfx_-lkhSjar13c7hN_cb9l3ktZWV8';

const DEFAULT_PRODUCTS = [
  {
    id: "cebollitas-escabeche",
    name: "Cebollitas en Escabeche",
    category: "encurtidos",
    badge: "⭐ Producto Estrella",
    available: true,
    image: "assets/images/cebollitas.jpg",
    description: "Cebollitas perla seleccionadas a mano, crujientes y maceradas en vinagre natural aromatizado con laurel, pimienta entera y especias de la casa. 100% libres de aditivos químicos.",
    highlights: ["Receta 100% artesanal", "Textura crujiente garantizada", "Sin preservantes"],
    formats: [
      { id: "250g", label: "Pote 250 gr", price: 2200, unit: "250g" },
      { id: "500g", label: "Pote 500 gr", price: 3900, unit: "500g", recommended: true },
      { id: "1kg", label: "Formato 1 Kg", price: 6900, unit: "1kg" },
      { id: "balde3k", label: "Balde Gastronómico 3 Kg", price: 18900, unit: "3kg" },
      { id: "balde5k", label: "Balde Mayorista 5 Kg", price: 28500, unit: "5kg" }
    ]
  },
  {
    id: "aji-escabechado",
    name: "Ají Escabechado Artesanal",
    category: "encurtidos",
    badge: "🔥 Clásico Chileno",
    available: true,
    image: "assets/images/aji.jpg",
    description: "Ajíes oro cristal y verdes escabechados con el punto de picor justo, aromatizados con dientes de ajo y hierbas aromáticas. Indispensables para legumbres, charquicán o el picoteo.",
    highlights: ["Picor equilibrado y sabroso", "Corte entero o en rodajas", "Elaboración propia"],
    formats: [
      { id: "250g", label: "Pote 250 gr", price: 2300, unit: "250g" },
      { id: "500g", label: "Pote 500 gr", price: 4200, unit: "500g", recommended: true },
      { id: "1kg", label: "Formato 1 Kg", price: 7500, unit: "1kg" },
      { id: "balde3k", label: "Balde Gastronómico 3 Kg", price: 19900, unit: "3kg" },
      { id: "balde5k", label: "Balde Mayorista 5 Kg", price: 31000, unit: "5kg" }
    ]
  },
  {
    id: "pickles-surtidos",
    name: "Pickles Surtidos Especiales",
    category: "encurtidos",
    badge: "👌 Gran Favorito",
    available: true,
    image: "assets/images/pickles.jpg",
    description: "Crujiente mezcla de coliflor tierna, zanahorias acanaladas, pepinillos seleccionados y cebollitas perla en vinagre suave y especiado. Ideal para acompañar sándwiches y asados.",
    highlights: ["Coliflor, zanahoria y pepinillo", "Vinagre suave no invasivo", "Corte tradicional"],
    formats: [
      { id: "250g", label: "Pote 250 gr", price: 2100, unit: "250g" },
      { id: "500g", label: "Pote 500 gr", price: 3800, unit: "500g", recommended: true },
      { id: "1kg", label: "Formato 1 Kg", price: 6800, unit: "1kg" },
      { id: "balde3k", label: "Balde Gastronómico 3 Kg", price: 17900, unit: "3kg" },
      { id: "balde5k", label: "Balde Mayorista 5 Kg", price: 27500, unit: "5kg" }
    ]
  },
  {
    id: "aceitunas-sevillanas-aliñadas",
    name: "Aceitunas Sevillanas Aliñadas",
    category: "aceitunas",
    badge: "🫒 Calibre Grande",
    available: true,
    image: "assets/images/aceitunas.jpg",
    description: "Aceitunas verdes de gran tamaño, carnosas y maceradas con aceite de oliva extra virgen, finas hierbas del huerto, orégano silvestre y toques de ajo chileno.",
    highlights: ["Aceituna sevillana carnosa", "Aliño con orégano y ajo", "Bajo en sodio"],
    formats: [
      { id: "250g", label: "Pote 250 gr", price: 2500, unit: "250g" },
      { id: "500g", label: "Pote 500 gr", price: 4500, unit: "500g", recommended: true },
      { id: "1kg", label: "Formato 1 Kg", price: 8200, unit: "1kg" },
      { id: "balde3k", label: "Balde Gastronómico 3 Kg", price: 22500, unit: "3kg" },
      { id: "balde5k", label: "Balde Mayorista 5 Kg", price: 34900, unit: "5kg" }
    ]
  },
  {
    id: "aceitunas-negras-huasco",
    name: "Aceitunas Negras Tipo Huasco",
    category: "aceitunas",
    badge: "🌿 Sabor Tradicional",
    available: true,
    image: "assets/images/aceitunas.jpg",
    description: "Aceitunas negras maduras de sabor profundo y textura sedosa. Desamargadas naturalmente sin químicos aceleradores, conservadas en salmuera suave.",
    highlights: ["Maduración natural en árbol", "Textura suave y jugosa", "Ideales para empanadas y tablas"],
    formats: [
      { id: "250g", label: "Pote 250 gr", price: 2400, unit: "250g" },
      { id: "500g", label: "Pote 500 gr", price: 4400, unit: "500g", recommended: true },
      { id: "1kg", label: "Formato 1 Kg", price: 7900, unit: "1kg" },
      { id: "balde5k", label: "Balde Mayorista 5 Kg", price: 33500, unit: "5kg" }
    ]
  },
  {
    id: "merken-ahumado-especias",
    name: "Merkén Ahumado y Especias a Granel",
    category: "condimentos",
    badge: "🌶️ 100% Puro",
    available: true,
    image: "assets/images/condimentos.jpg",
    description: "Auténtico merkén mapuche con ají cacho de cabra secado a leña y semillas de cilantro tostadas. Además disponemos de orégano de la zona, comino, pimienta negra y laurel a granel.",
    highlights: ["Ahumado natural a leña", "Sin harina añadida ni colorantes", "Venta por peso a elección"],
    formats: [
      { id: "100g", label: "Bolsa 100 gr", price: 1800, unit: "100g" },
      { id: "250g", label: "Bolsa 250 gr", price: 3800, unit: "250g", recommended: true },
      { id: "500g", label: "Bolsa 500 gr", price: 6900, unit: "500g" },
      { id: "1kg", label: "Kilo Granel (Hostelería)", price: 12500, unit: "1kg" }
    ]
  },
  {
    id: "pack-picoteo-familiar",
    name: "Pack Picoteo 'La Casa del Encurtido'",
    category: "picoteo",
    badge: "🎁 Listo para Servir",
    available: true,
    image: "assets/images/picoteo.jpg",
    description: "La combinación perfecta para tu junta familiar o celebración de fin de semana: 350g de cebollitas en escabeche + 350g de aceitunas sevillanas aliñadas + 350g de pickles surtidos + pocillo de ají especial.",
    highlights: ["Ahorras un 15% vs comprar por separado", "Ideal para 4 a 6 personas", "Presentación premium"],
    formats: [
      { id: "pack-estandar", label: "Pack Picoteo 4 Personas (1.1 Kg total)", price: 11900, unit: "pack", recommended: true },
      { id: "pack-premium", label: "Pack Fiesta Gourmet (2.2 Kg total + Merkén)", price: 21500, unit: "pack" }
    ]
  },
  {
    id: "balde-mayorista-gastronomia",
    name: "Línea Baldes Gastronómicos 5kg y 10kg",
    category: "mayorista",
    badge: "🏢 Para Negocios",
    available: true,
    image: "assets/images/mayorista.jpg",
    description: "Formatos diseñados para sangucherías, completos, pizzerías, amasanderías y locales de comida de la Provincia de Petorca. Sellado hermético sanitario y rotulado comercial.",
    highlights: ["Precio por mayor asegurado", "Abastecimiento constante en La Ligua", "Facturación o boleta disponible"],
    formats: [
      { id: "balde-5k-cebollitas", label: "Balde 5 Kg Cebollitas Escabeche", price: 28500, unit: "5kg" },
      { id: "balde-5k-pickles", label: "Balde 5 Kg Pickles Especiales", price: 27500, unit: "5kg", recommended: true },
      { id: "balde-5k-aji", label: "Balde 5 Kg Ají Escabechado", price: 31000, unit: "5kg" },
      { id: "balde-10k-mixto", label: "Balde 10 Kg Surtido Gastronómico", price: 52000, unit: "10kg" }
    ]
  }
];

async function seed() {
  console.log("Insertando productos en Supabase...");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/productos`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(DEFAULT_PRODUCTS)
  });

  if (res.ok) {
    console.log("¡Productos insertados con éxito en Supabase!");
  } else {
    const errText = await res.text();
    console.error("Error al insertar:", res.status, errText);
  }
}

seed();
