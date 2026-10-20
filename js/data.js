/**
 * Datos y configuración de La Casa del Encurtido - La Ligua
 * Soporta almacenamiento local dinámico para autoadministración
 */

const DEFAULT_BUSINESS_INFO = {
  name: "La Casa del Encurtido",
  slogan: "Encurtidos artesanales, aceitunas y condimentos en un solo lugar",
  address: "Calle Santa Teresa 521, Local 4, La Ligua, Región de Valparaíso",
  addressShort: "Santa Teresa 521, Local 4, La Ligua",
  phone: "+56 9 5799 9220",
  phoneRaw: "56957999220",
  whatsappUrl: "https://wa.me/56957999220",
  facebookUrl: "https://www.facebook.com/profile.php?id=61589403204747",
  googleMapsUrl: "https://maps.google.com/?q=La+Casa+del+Encurtido+Santa+Teresa+521+La+Ligua",
  rating: 5.0,
  reviewsCount: 38,
  schedule: {
    weekdays: "Lunes a Sábado: 09:00 a 18:30 hrs",
    sunday: "Domingo: 09:00 a 13:30 hrs",
    openHourWeekday: 9,
    closeHourWeekday: 18.5, // 18:30
    openHourSunday: 9,
    closeHourSunday: 13.5   // 13:30
  }
};

const CATEGORIES = [
  { id: "todos", name: "Todos los Productos", icon: "✨" },
  { id: "encurtidos", name: "Encurtidos Artesanales", icon: "🧅" },
  { id: "aceitunas", name: "Aceitunas Selectas", icon: "🫒" },
  { id: "condimentos", name: "Condimentos y Especias", icon: "🌶️" },
  { id: "picoteo", name: "Packs para Picoteo", icon: "🧀" },
  { id: "mayorista", name: "Baldes Mayoristas (B2B)", icon: "🏭" }
];

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

// Helper para obtener productos con cambios del dueño (localStorage)
function getActiveProducts() {
  try {
    const saved = localStorage.getItem("casa_encurtido_custom_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("No se pudieron cargar productos personalizados, usando catálogo base:", e);
  }
  return DEFAULT_PRODUCTS;
}

// Helper para obtener datos de contacto con cambios del dueño
function getActiveBusinessInfo() {
  try {
    const saved = localStorage.getItem("casa_encurtido_custom_info");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_BUSINESS_INFO, ...parsed };
    }
  } catch (e) {
    console.warn("No se pudo cargar información personalizada del negocio:", e);
  }
  return DEFAULT_BUSINESS_INFO;
}

// Variables activas utilizadas por la app
let PRODUCTS = getActiveProducts();
let BUSINESS_INFO = getActiveBusinessInfo();

// Función para guardar productos actualizados desde el panel admin
function saveCustomProducts(newProductsList) {
  try {
    localStorage.setItem("casa_encurtido_custom_products", JSON.stringify(newProductsList));
    PRODUCTS = newProductsList;
    return true;
  } catch (e) {
    console.error("Error al guardar productos:", e);
    return false;
  }
}

// Función para guardar datos del negocio actualizados
function saveCustomBusinessInfo(newInfo) {
  try {
    localStorage.setItem("casa_encurtido_custom_info", JSON.stringify(newInfo));
    BUSINESS_INFO = { ...DEFAULT_BUSINESS_INFO, ...newInfo };
    return true;
  } catch (e) {
    console.error("Error al guardar info del negocio:", e);
    return false;
  }
}

// Función para restaurar catálogo de fábrica
function resetToDefaultProducts() {
  try {
    localStorage.removeItem("casa_encurtido_custom_products");
    localStorage.removeItem("casa_encurtido_custom_info");
    PRODUCTS = DEFAULT_PRODUCTS;
    BUSINESS_INFO = DEFAULT_BUSINESS_INFO;
    return true;
  } catch (e) {
    return false;
  }
}

const REVIEWS = [
  {
    name: "Marcela Tapia R.",
    role: "Clienta frecuente de La Ligua",
    rating: 5,
    date: "Hace 2 semanas",
    comment: "¡Excelente atención! El dueño se da el tiempo de explicarte la diferencia de cada encurtido y hacerte degustar. Las cebollitas en escabeche son crujientes de verdad y no tienen ese gusto químico de supermercado.",
    verified: true
  },
  {
    name: "Rodrigo C. Salinas",
    role: "Dueño de Sanguchería local",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Compro los baldes de 5kg de pickles y ají para mi local de sándwiches y la calidad es insuperable. Mis clientes siempre me felicitan por el sabor. Un 10 de 10 tenerlos en pleno centro de La Ligua.",
    verified: true
  },
  {
    name: "Camila Fernandez V.",
    rating: 5,
    date: "Hace 3 semanas",
    comment: "Pasé buscando condimentos y me llevé aceitunas aliñadas y cebollitas. Todo súper fresco y la relación precio-calidad es insuperable. Además el local está impecable.",
    verified: true
  },
  {
    name: "Hernán Muñoz G.",
    role: "Turista Quinta Región",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Cada vez que viajo a la costa o paso por La Ligua paro a comprar. Los frascos de ají escabechado y las aceitunas negras son adictivos. Muy recomendado.",
    verified: true
  }
];

const WHOLESALE_BENEFITS = [
  {
    icon: "💰",
    title: "Margen de Ganancia Alto",
    description: "Formatos de 3kg, 5kg y 10kg con precios mayoristas escalonados para maximizar la rentabilidad de tu sanguchería o minimarket."
  },
  {
    icon: "⏱️",
    title: "Ahorro de Mano de Obra",
    description: "Recibe tus pickles, cebollitas y ajíes limpios, crujientes y listos para servir en tus tablas o preparaciones culinarias."
  },
  {
    icon: "🌱",
    title: "100% Calidad Artesanal",
    description: "Marca la diferencia con tu competencia: productos sin aditivos artificiales ni saborizante sintético que tus clientes agradecerán."
  },
  {
    icon: "📍",
    title: "Stock Inmediato en La Ligua",
    description: "Sin esperas de Santiago ni fletes caros. Retira en Santa Teresa 521 o coordina entregas programadas en la zona."
  }
];
