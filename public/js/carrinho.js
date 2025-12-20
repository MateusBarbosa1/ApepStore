document.addEventListener('DOMContentLoaded', () => {
    initProductCards();
});

/* ======================================================
   INICIALIZAÇÃO DOS CARDS
====================================================== */
function initProductCards() {

    // CARD → ABRE PRODUTO
    document.querySelectorAll('.produto-single').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            if (!id) return;
            window.location.href = `/produto-single/${id}`;
        });
    });

    // BOTÃO CARRINHO
    document.querySelectorAll('.btn-carrinho').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const id = btn.dataset.id;
            if (!id) {
                console.error('ID do produto não encontrado');
                return;
            }

            try {
                const data = {
                    id: id,
                    qtd: 1,
                    size: "null",
                    cor: "null"
                }
                const response = await fetch(`/add-carrinho/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if(!response.ok) {
                    showNotification('Produto ja está no Carrinho!', 'error');
                } else {
                    showNotification('Produto adicionado ao carrinho', 'success');
                }
            } catch (err) {
                console.error(err);
                showNotification('Erro ao adicionar ao carrinho', 'error');
            }
        });
    });

    // BOTÃO COMPRAR
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const id = btn.dataset.id;
            if (!id) {
                console.error('ID do produto não encontrado');
                return;
            }

            try {
                await fetch(`/add-carrinho/${id}`, { method: 'POST' });
                showNotification('Produto adicionado! Indo para o checkout...', 'success');

                setTimeout(() => {
                    window.location.href = '/checkout';
                }, 600);
            } catch (err) {
                console.error(err);
                showNotification('Erro ao comprar produto', 'error');
            }
        });
    });
}

/* ======================================================
   NOTIFICAÇÃO (ESTILO ANTIGO)
====================================================== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');

    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${
            type === 'success' ? '#4CAF50' :
            type === 'error' ? '#F44336' : '#2196F3'
        };
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: Arial, sans-serif;
        font-size: 14px;
        animation: slideIn .3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut .3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

/* ======================================================
   ANIMAÇÕES
====================================================== */
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { opacity: 0; transform: translateX(300px); }
    to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideOut {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(300px); }
}
`;
document.head.appendChild(style);
