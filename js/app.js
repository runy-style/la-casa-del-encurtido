/**
 * Lógica principal de la aplicación web
 * La Casa del Encurtido - La Ligua
 */

// Estado global de la aplicación
const state = {
  activeCategory: "todos",
  searchQuery: "",
  cart: [], // { productId, formatId, name, formatLabel, price, quantity, image }
  selectedFormats: {}, // productId -> formatId
  selectedQuantities: {} // productId -> qty
};

// Formato de moneda chilena
function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
}

// Inicialización de formatos predeterminados para cada producto
function initializeProductSelections() {
  PRODUCTS.forEach(p => {
    if (!state.selectedFormats[p.id]) {
      const defaultFormat = p.formats.find(f => f.recommended) || p.formats[0];
      state.selectedFormats[p.id] = defaultFormat.id;
    }
    if (!state.selectedQuantities[p.id]) {
      state.selectedQuantities[p.id] = 1;
    }
  });
}

// Comprobador en tiempo real de horario de atención (Chile)
function updateStoreStatusBadge() {
  const badgeEl = document.getElementById("store-status-badge");
  const mobileBadgeEl = document.getElementById("mobile-store-status");
  if (!badgeEl && !mobileBadgeEl) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const currentHour = now.getHours() + now.getMinutes() / 60;

  let isOpen = false;
  let statusText = "";

  if (day === 0) {
    // Domingo: 09:00 a 13:30
    if (currentHour >= BUSINESS_INFO.schedule.openHourSunday && currentHour < BUSINESS_INFO.schedule.closeHourSunday) {
      isOpen = true;
      statusText = "Abierto Hoy hasta las 13:30 hrs";
    } else {
      statusText = "Cerrado • Abre lunes a las 09:00 hrs";
    }
  } else {
    // Lunes a Sábado: 09:00 a 18:30
    if (currentHour >= BUSINESS_INFO.schedule.openHourWeekday && currentHour < BUSINESS_INFO.schedule.closeHourWeekday) {
      isOpen = true;
      statusText = "Abierto Hoy hasta las 18:30 hrs";
    } else if (currentHour < BUSINESS_INFO.schedule.openHourWeekday) {
      statusText = "Cerrado • Abre hoy a las 09:00 hrs";
    } else {
      statusText = day === 6 ? "Cerrado • Abre domingo 09:00 hrs" : "Cerrado • Abre mañana 09:00 hrs";
    }
  }

  const badgeHtml = `
    <span class="status-dot ${isOpen ? '' : 'closed'}"></span>
    <span>${isOpen ? '🟢 ' : '🟠 '}${statusText}</span>
  `;

  if (badgeEl) badgeEl.innerHTML = badgeHtml;
  if (mobileBadgeEl) mobileBadgeEl.innerHTML = badgeHtml;
}

// Carga del carrito desde LocalStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("casa_encurtido_cart");
    if (saved) {
      state.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    console.error("Error al cargar carrito:", e);
  }
}

// Guardado del carrito en LocalStorage
function saveCartToStorage() {
  try {
    localStorage.setItem("casa_encurtido_cart", JSON.stringify(state.cart));
  } catch (e) {
    console.error("Error al guardar carrito:", e);
  }
}

// Renderizado de categorías
function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === "todos" 
      ? PRODUCTS.length 
      : PRODUCTS.filter(p => p.category === cat.id).length;

    return `
      <button class="cat-pill ${state.activeCategory === cat.id ? 'active' : ''}" 
              data-category="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
        <span style="opacity: 0.6; font-size: 0.75rem;">(${count})</span>
      </button>
    `;
  }).join('');

  // Event listeners para filtros
  container.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      renderCategoryPills();
      renderProducts();
    });
  });
}

// Renderizado de las tarjetas de productos
function renderProducts() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filtered = PRODUCTS.filter(p => {
    const matchCategory = state.activeCategory === "todos" || p.category === state.activeCategory;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px dashed var(--border-light);">
        <p style="font-size: 2.5rem; margin-bottom: 10px;">🔍</p>
        <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--primary-900); margin-bottom: 6px;">No encontramos productos con ese término</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Prueba con otra palabra o revisa nuestras categorías principales.</p>
        <button class="btn btn-primary" style="margin-top: 16px; padding: 8px 20px; font-size: 0.85rem;" onclick="resetSearch()">Ver todos los productos</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const currentFormatId = state.selectedFormats[product.id] || product.formats[0].id;
    const currentFormat = product.formats.find(f => f.id === currentFormatId) || product.formats[0];
    const currentQty = state.selectedQuantities[product.id] || 1;
    const isAvailable = product.available !== false;

    return `
      <article class="product-card ${!isAvailable ? 'is-out-of-stock' : ''}" id="card-${product.id}">
        <div class="product-thumb-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy" />
          ${isAvailable 
            ? `<span class="product-badge">${product.badge || 'Artesanal'}</span>`
            : `<span class="product-badge badge-out-of-stock">❌ Agotado temporalmente</span>`
          }
        </div>
        <div class="product-card-body">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          
          <ul class="product-highlights">
            ${(product.highlights || []).map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="format-selector-section">
            <span class="format-label">Selecciona el formato:</span>
            <div class="format-pills">
              ${product.formats.map(fmt => `
                <button class="format-pill-btn ${fmt.id === currentFormatId ? 'active' : ''}"
                        onclick="selectFormat('${product.id}', '${fmt.id}')"
                        ${!isAvailable ? 'disabled' : ''}>
                  ${fmt.label}
                </button>
              `).join('')}
            </div>

            <div class="price-and-action">
              <div class="price-display-box">
                <span class="price-amount" id="price-${product.id}">${formatCLP(currentFormat.price)}</span>
                <span class="price-unit">por ${currentFormat.unit || currentFormat.label}</span>
              </div>

              <div class="qty-and-add">
                ${isAvailable ? `
                  <div class="qty-counter">
                    <button class="qty-btn" onclick="changeProductQty('${product.id}', -1)" aria-label="Disminuir">-</button>
                    <span class="qty-value" id="qty-${product.id}">${currentQty}</span>
                    <button class="qty-btn" onclick="changeProductQty('${product.id}', 1)" aria-label="Aumentar">+</button>
                  </div>
                  <button class="btn-add-cart" onclick="addToCart('${product.id}')" title="Agregar al pedido">
                    <span>+ Agregar</span>
                  </button>
                ` : `
                  <button class="btn-add-cart disabled" disabled title="Producto sin stock por el momento">
                    <span>Agotado</span>
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Cambio de formato de producto
window.selectFormat = function(productId, formatId) {
  state.selectedFormats[productId] = formatId;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const format = product.formats.find(f => f.id === formatId);
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    // Actualizar botones activos
    card.querySelectorAll('.format-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === format.label.trim());
    });
    // Actualizar precio
    const priceEl = document.getElementById(`price-${productId}`);
    if (priceEl && format) {
      priceEl.textContent = formatCLP(format.price);
    }
  }
};

// Cambio de cantidad por producto
window.changeProductQty = function(productId, delta) {
  const current = state.selectedQuantities[productId] || 1;
  const next = Math.max(1, current + delta);
  state.selectedQuantities[productId] = next;

  const qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) {
    qtyEl.textContent = next;
  }
};

// Agregar al carrito
window.addToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.available === false) return;

  const formatId = state.selectedFormats[productId] || product.formats[0].id;
  const format = product.formats.find(f => f.id === formatId) || product.formats[0];
  const quantity = state.selectedQuantities[productId] || 1;

  // Comprobar si ya existe la misma combinación de producto y formato
  const existingIndex = state.cart.findIndex(item => item.productId === productId && item.formatId === formatId);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      productId: product.id,
      formatId: format.id,
      name: product.name,
      formatLabel: format.label,
      price: format.price,
      quantity: quantity,
      image: product.image
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`¡Agregado! ${quantity}x ${product.name} (${format.label})`);
};

// Actualizar UI del carrito
function updateCartUI() {
  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Insignia en Header
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => b.textContent = totalItems);

  // Barra fija en móvil
  const mobileBar = document.getElementById('mobile-sticky-order-bar');
  if (mobileBar) {
    if (totalItems > 0) {
      mobileBar.classList.add('show');
      const infoCount = document.getElementById('mobile-bar-count');
      const infoTotal = document.getElementById('mobile-bar-total');
      if (infoCount) infoCount.textContent = `${totalItems} producto${totalItems > 1 ? 's' : ''}`;
      if (infoTotal) infoTotal.textContent = formatCLP(totalPrice);
    } else {
      mobileBar.classList.remove('show');
    }
  }

  // Renderizar contenido del Drawer
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const formSection = document.getElementById('cart-checkout-form');
  const summarySection = document.getElementById('cart-footer-summary');
  const totalAmountEl = document.getElementById('cart-total-amount');
  const subtotalAmountEl = document.getElementById('cart-subtotal-amount');

  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (formSection) formSection.style.display = 'none';
    if (summarySection) summarySection.style.display = 'none';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (formSection) formSection.style.display = 'block';
    if (summarySection) summarySection.style.display = 'block';

    itemsContainer.innerHTML = state.cart.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-format">${item.formatLabel}</p>
          <p class="cart-item-price">${formatCLP(item.price)} c/u</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeCartItem(${index})" title="Eliminar del pedido">🗑️</button>
        </div>
      </div>
    `).join('');

    if (subtotalAmountEl) subtotalAmountEl.textContent = formatCLP(totalPrice);
    if (totalAmountEl) totalAmountEl.textContent = formatCLP(totalPrice);
  }
}

// Modificar cantidad en carrito
window.updateCartItemQty = function(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
};

// Eliminar ítem del carrito
window.removeCartItem = function(index) {
  state.cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
};

// Generador de mensaje de WhatsApp con formato prolijo
window.sendWhatsAppOrder = function() {
  if (state.cart.length === 0) {
    alert("Tu carrito está vacío. Elige productos para armar tu pedido.");
    return;
  }

  const nameInput = document.getElementById("client-name");
  const deliveryTypeInput = document.querySelector('input[name="delivery-type"]:checked');
  const notesInput = document.getElementById("client-notes");

  const clientName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Cliente";
  const deliveryType = deliveryTypeInput ? deliveryTypeInput.value : "Retiro en Local (Santa Teresa 521)";
  const notes = (notesInput && notesInput.value.trim()) ? notesInput.value.trim() : "Sin observaciones especiales";

  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Construcción del mensaje elegante y estructurado
  let message = `¡Hola! Vengo desde el sitio web de *${BUSINESS_INFO.name}* en La Ligua y deseo solicitar el siguiente pedido:\n\n`;
  message += `🛒 *DETALLE DEL PEDIDO (${totalItems} items):*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;

  state.cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    message += `▪️ *${item.quantity}x* ${item.name}\n`;
    message += `   └ Formato: ${item.formatLabel}\n`;
    message += `   └ Subtotal: ${formatCLP(itemTotal)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL ESTIMADO: ${formatCLP(totalPrice)}*\n\n`;
  message += `👤 *DATOS DEL CLIENTE:*\n`;
  message += `• *Nombre:* ${clientName}\n`;
  message += `• *Tipo de entrega:* ${deliveryType}\n`;
  message += `• *Notas:* ${notes}\n\n`;
  message += `¿Tienen stock disponible para coordinar la entrega o retiro en el local? ¡Muchas gracias! 🙌`;

  const encodedUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
};

// Cotizador Rápido Mayorista
function setupWholesaleCalculator() {
  const productSelect = document.getElementById("wholesale-product-select");
  const qtySelect = document.getElementById("wholesale-qty-select");
  const priceDisplay = document.getElementById("wholesale-calc-price");
  const quoteBtn = document.getElementById("btn-quote-wholesale-wa");

  if (!productSelect || !qtySelect || !priceDisplay) return;

  function recalculate() {
    const basePrice = parseInt(productSelect.value, 10);
    const qty = parseInt(qtySelect.value, 10);
    // Descuento escalonado por volumen mayorista
    let discount = 1.0;
    if (qty >= 5) discount = 0.92; // 8% off adicional sobre 5 baldes
    if (qty >= 10) discount = 0.85; // 15% off adicional sobre 10 baldes

    const finalTotal = Math.round(basePrice * qty * discount);
    priceDisplay.textContent = formatCLP(finalTotal);
  }

  productSelect.addEventListener('change', recalculate);
  qtySelect.addEventListener('change', recalculate);
  recalculate();

  if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
      const productName = productSelect.options[productSelect.selectedIndex].text;
      const qty = qtySelect.value;
      const calculatedPrice = priceDisplay.textContent;

      let msg = `¡Hola! Soy comerciante/gastronómico y quiero cotizar por mayor en *${BUSINESS_INFO.name}*:\n\n`;
      msg += `🏭 *SOLICITUD DE COTIZACIÓN MAYORISTA:*\n`;
      msg += `• Producto: ${productName}\n`;
      msg += `• Cantidad de baldes: ${qty} unidades\n`;
      msg += `• Total referencial web: ${calculatedPrice}\n\n`;
      msg += `¿Me pueden enviar lista completa de precios mayoristas y condiciones de reparto o retiro en La Ligua?`;

      window.open(`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
}

// Renderizar testimonios reales
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <article class="review-card">
      <div class="review-card-head">
        <div class="reviewer-avatar">${r.name.charAt(0)}</div>
        <div class="reviewer-meta">
          <h4>${r.name}</h4>
          <span>${r.role || 'Cliente en La Ligua'}</span>
        </div>
      </div>
      <div class="stars-row" style="margin-bottom: 8px;">★★★★★</div>
      <p class="review-comment">"${r.comment}"</p>
      <div class="review-footer">
        <span class="verified-tag">✓ Reseña verificada</span>
        <span>${r.date}</span>
      </div>
    </article>
  `).join('');
}

// Toasts de feedback
function showToast(text) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <span>${text}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Control del Drawer del Carrito
function setupCartDrawerEvents() {
  const openButtons = document.querySelectorAll('.trigger-cart-open');
  const closeButton = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeButton) closeButton.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  window.openCartDrawer = openDrawer;
  window.closeCartDrawer = closeDrawer;
}

// Menú Móvil Hamburger & Drawer
function setupMobileMenuEvents() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-nav-close-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');

  function openMenu() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Cerrar al pulsar cualquier link dentro del menú móvil
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Control del Modal de Propuesta Comercial (Pitch Mode)
function setupPitchModalEvents() {
  const triggerBtns = document.querySelectorAll('.trigger-pitch-modal');
  const closeBtn = document.getElementById('pitch-close-btn');
  const overlay = document.getElementById('pitch-modal-overlay');

  function openModal() {
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(b => b.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  window.openPitchModal = openModal;
}

// Buscador en vivo
function setupSearchEvents() {
  const searchInput = document.getElementById('catalog-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  window.resetSearch = function() {
    searchInput.value = '';
    state.searchQuery = '';
    state.activeCategory = 'todos';
    renderCategoryPills();
    renderProducts();
  };
}

// Navbar scroll listener
function setupHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Escuchador de sincronización en vivo (cuando se edita en admin.html)
window.addEventListener('storage', (e) => {
  if (e.key === 'casa_encurtido_custom_products' || e.key === 'casa_encurtido_custom_info') {
    PRODUCTS = getActiveProducts();
    BUSINESS_INFO = getActiveBusinessInfo();
    initializeProductSelections();
    renderCategoryPills();
    renderProducts();
    updateStoreStatusBadge();
    showToast("Catálogo sincronizado con los cambios del dueño");
  }
});

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  PRODUCTS = getActiveProducts();
  BUSINESS_INFO = getActiveBusinessInfo();
  initializeProductSelections();
  updateStoreStatusBadge();
  renderCategoryPills();
  renderProducts();
  renderReviews();
  setupWholesaleCalculator();
  setupCartDrawerEvents();
  setupMobileMenuEvents();
  setupPitchModalEvents();
  setupSearchEvents();
  setupHeaderScroll();
  loadCartFromStorage();

  // Actualizar horario cada 2 minutos
  setInterval(updateStoreStatusBadge, 120000);
});
