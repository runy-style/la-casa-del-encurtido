# La Casa del Encurtido - Web App & Catálogo Digital (La Ligua)

Aplicación web moderna y ligera desarrollada para **La Casa del Encurtido**, local comercial ubicado en **Calle Santa Teresa 521, Local 4, La Ligua**.

---

## 🎯 Objetivo del Proyecto
Profesionalizar la presencia digital del negocio, completar su ficha de Google Maps (que actualmente tiene 5.0 estrellas pero el enlace a sitio web vacío), ahorrar tiempo en WhatsApp y potenciar la captación del canal mayorista gastronómico (sangucherías, minimarkets y restaurantes).

---

## 🗂️ Estructura del Proyecto

```
casa del encurtido/
├── index.html                  # Landing Page principal + Catálogo interactivo + Carrito WhatsApp
├── admin.html                  # Panel de Auto-Administración (PIN: 1234) para editar precios y productos
├── propuesta-comercial.html    # Dossier de venta / Ficha imprimible con planes y ROI para el dueño
├── server.js                   # Servidor HTTP local ultraligero en Node.js
├── css/
│   └── styles.css              # Sistema de diseño artesanal gastronómico premium
├── js/
│   ├── data.js                 # Catálogo, formatos, precios CLP, reseñas y horarios
│   └── app.js                  # Lógica reactiva: formatos, carrito, WhatsApp y horario en vivo
└── assets/
    └── images/                 # Fotografías gastronómicas de alta calidad
        ├── hero.jpg            # Portada principal con mesa artesanal
        ├── cebollitas.jpg      # Cebollitas en escabeche (Producto estrella)
        ├── aji.jpg             # Ají escabechado chileno
        ├── pickles.jpg         # Pickles surtidos especiales
        ├── aceitunas.jpg       # Aceitunas Sevillanas y Huasco
        ├── condimentos.jpg     # Merkén ahumado y especias a granel
        ├── mayorista.jpg       # Baldes gastronómicos de 5kg y 10kg
        └── picoteo.jpg         # Pack picoteo listo para servir
```

---

## ✨ Funcionalidades Principales

1. **Panel de Auto-Administración para el Dueño (`admin.html`)**:
   - Protegido por PIN de 4 dígitos (por defecto `1234`).
   - Permite al dueño desde su teléfono cambiar precios en 1 segundo, activar/pausar stock (Agotado/En Stock), subir fotos directo con la cámara de su celular y crear nuevos productos u ofertas.
2. **Catálogo Interactivo con Selector de Formato**:
   - Cada producto permite alternar dinámicamente entre formatos (ej. *250g, 500g, 1kg, Balde Gastronómico 3kg, Balde Mayorista 5kg*).
   - El precio en pesos chilenos (`$ CLP`) se recalcula en tiempo real al cambiar el formato.
3. **Generador de Pedidos a WhatsApp (+56 9 5799 9220)**:
   - Carrito lateral con ajuste de cantidades.
   - Selección de modalidad: *Retiro en Local* o *Despacho en La Ligua*.
   - Genera un mensaje formateado con viñetas, subtotales, total y notas para que el dueño reciba la orden lista sin tener que tipear.
4. **Indicador de Horario en Tiempo Real**:
   - Evalúa la hora actual y muestra un distintivo en vivo:
     - `🟢 Abierto Hoy hasta las 18:30 hrs` (Lunes a Sábado 09:00 - 18:30).
     - `🟢 Abierto Hoy hasta las 13:30 hrs` (Domingos 09:00 - 13:30).
     - `🟠 Cerrado por el momento • Abre a las 09:00 hrs`.
5. **Cotizador Rápido para Mayoristas (B2B)**:
   - Permite a sangucherías y restaurantes seleccionar baldes y volumen, aplicando descuentos automáticos escalonados por volumen y enviando una solicitud directa.
6. **Prueba Social de Google Maps**:
   - Destaca la calificación de **5.0 estrellas** con testimonios reales y enlace directo para dejar nuevas reseñas o abrir la ruta en el GPS.
7. **Modo Propuesta para el Dueño (Pitch Modal)**:
   - Botón discreto en la barra superior y footer para activar la guía de venta y argumentos frente al dueño.
   - Enlace directo a `propuesta-comercial.html` (dossier imprimible).

---

## 🚀 Cómo Ejecutar Localmente

1. Abre una terminal en esta carpeta.
2. Ejecuta:
   ```bash
   node server.js
   ```
3. Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## 🌐 Cómo Desplegar Gratis en Internet (Para mostrar desde el celular)

Para mostrársela al dueño directamente en su local desde tu celular o tablet:

### Opción 1: Vercel (Recomendada - 1 minuto)
1. Instala vercel: `npm i -g vercel`
2. En la carpeta del proyecto ejecuta: `vercel`
3. Te dará un enlace HTTPS público instantáneo como `https://casa-del-encurtido.vercel.app` para que lo abras desde el teléfono.

### Opción 2: GitHub Pages
1. Sube esta carpeta a un repositorio en GitHub.
2. En `Settings` > `Pages`, selecciona la rama `main` y guarda.
3. Tendrás tu enlace público listo.

### Opción 3: Netlify Drop
1. Ingresa a [netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra esta carpeta completa.
3. Te generará un enlace público en 5 segundos.
