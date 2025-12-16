let quantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    initializeColorButtons();
    initializeSizeButtons();
    initializeQuantityInput();
});

// ===========================
// CORES
// ===========================

function initializeColorButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;
        });
    });
}

// ===========================
// TAMANHOS
// ===========================

function initializeSizeButtons() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.textContent;
        });
    });
}

// ===========================
// QUANTIDADE
// ===========================

function initializeQuantityInput() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.addEventListener('change', function() {
        if (this.value < 1) this.value = 1;
        quantity = parseInt(this.value);
        updatePriceSummary();
    });
}

function increaseQuantity() {
    quantity++;
    document.getElementById('quantity').value = quantity;
    updatePriceSummary();
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity').value = quantity;
        updatePriceSummary();
    }
}

// ===========================
// CÁLCULO DE FRETE
// ===========================

function calculateShipping() {
    const zipCode = document.getElementById('zipCode').value;
    
    // Validar CEP
    if (zipCode.length < 5) {
        alert('Digite um CEP válido!');
        return;
    }

    // Simular cálculo de frete
    // Fórmula: R$ 10 + R$ 2 por dígito do CEP
    shippingCost = 10 + (zipCode.length * 2);

    // Exibir resultado
    document.getElementById('zipDisplay').textContent = zipCode;
    document.getElementById('shippingCost').textContent = shippingCost.toFixed(2);
    document.getElementById('shippingResult').style.display = 'block';

    // Atualizar resumo de preço
    updatePriceSummary();
}

// ===========================
// RESUMO DE PREÇO
// ===========================

function updatePriceSummary() {
    const subtotal = PRODUCT_PRICE * quantity;
    const total = subtotal + shippingCost;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('shippingFee').textContent = `R$ ${shippingCost.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;

    // Mostrar resumo apenas se houver frete calculado
    if (shippingCost > 0) {
        document.getElementById('priceSummary').style.display = 'block';
    }
}
// ===========================
// NOTIFICAÇÕES
// ===========================

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// ADICIONAR AO CARRINHO
// ===========================

document.addEventListener('DOMContentLoaded', function () {
  const addToCartBtns = document.querySelectorAll('.btn-secondary');

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      showNotification(`item adicionado ao carrinho!`);
    });
  });
});
