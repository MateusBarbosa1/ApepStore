// Inicializar eventos
document.addEventListener('DOMContentLoaded', function() {
    setupQuantityControls();
    setupRemoveButtons();
    setupCheckoutButton();
    updateCartSummary();
});

// ============================================
// Controle de Quantidade
// ============================================

function setupQuantityControls() {
    const qtyBtns = document.querySelectorAll('.qty-btn');
    const qtyInputs = document.querySelectorAll('.qty-input');

    qtyBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            const input = this.parentElement.querySelector('.qty-input');
            const isIncrement = this.textContent === '+';
            
            let value = parseInt(input.value) || 1;
            if (isIncrement) value++;
            else if (value > 1) value--;

            input.value = value;

            updateCartSummary();

            // Atualiza no backend
            await fetch(`/carrinho/update-qtd`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: input.dataset.id, qtd: value })
            });
            
        });
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value) || 1;
            if (value < 1) value = 1;
            this.value = value;
            updateCartSummary();
        });

        input.addEventListener('input', function() {
            // Permitir apenas números
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
}

// ============================================
// Remover Itens
// ============================================

function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.product-card');

            // animação
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';

            setTimeout(async () => {
                card.remove();

                const remainingItems = document.querySelectorAll('.product-card');

                if (remainingItems.length === 0) {
                    showEmptyCart();
                } else {
                    updateCartSummary();
                }
                updateCartSummary();

                // BACKEND
                await fetch(`/carrinho/remove`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: btn.dataset.id })
                });


                

            }, 300);
            
            
        });
    });
}

// ============================================
// Atualizar Resumo do Carrinho
// ============================================

function updateCartSummary() {
    const qtyInputs = document.querySelectorAll('.qty-input');
    const prices = document.querySelectorAll('.product-price');

    let subtotal = 0;

    qtyInputs.forEach((input, index) => {
        const qty = parseInt(input.value) || 1;
        const priceText = prices[index].textContent
            .replace('R$ ', '')
            .replace(',', '.');

        const price = parseFloat(priceText);
        subtotal += price * qty;
    });

    const shipping = 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    // Atualizar subtotal
    document.querySelector('.summary-row.subtotal .summary-value')
        .textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    // Atualizar total
    document.querySelector('.summary-row.total .summary-value')
        .textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ============================================
// Botão Finalizar Compra
// ============================================

function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const continueBtn = document.querySelector('.continue-shopping-btn');

    checkoutBtn.addEventListener('click', function() {
        const items = document.querySelectorAll('.product-card').length;
        
        if (items === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        // Simular clique
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Mensagem de sucesso
        showNotification('Redirecionando para o checkout...', 'success');
        
        setTimeout(() => {
            alert('Funcionalidade de checkout seria implementada aqui!');
        }, 1000);
    });

    continueBtn.addEventListener('click', function() {
        showNotification('Redirecionando para a loja...', 'info');
        window.location.href = '/';
        // Aqui você redirecionaria para a página de produtos
    });
}

// ============================================
// Notificações
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// Carrinho Vazio
// ============================================

function showEmptyCart() {
    const productsList = document.querySelector('.products-list');

    productsList.innerHTML = `
        <div style="
            text-align: center;
            padding: 60px 20px;
            color: #6B6B6B;
        ">
            <p style="font-size: 1.25rem; margin-bottom: 10px;">
                Seu carrinho está vazio
            </p>
            <p style="font-size: 0.95rem;">
                Adicione produtos para continuar
            </p>
        </div>
    `;
}


// ============================================
// Animações CSS
// ============================================

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
