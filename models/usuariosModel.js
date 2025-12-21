const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

/**
 * Cria um novo usuário
 */
async function setUsuarios(data) {
    try {
        // Cria hash da senha
        const hashedPassword = await bcrypt.hash(data.senha, 10);

        // Salva usuário no banco
        const usuario = await prisma.usuarios.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword,
                carrinho: [] // inicia carrinho vazio
            }
        });

        return usuario;
    } catch (err) {
        // Verifica erro de duplicidade de email
        if (err.code === 'P2002') return 'email';
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna todos os usuários
 */
async function getUsuarios() {
    try {
        return await prisma.usuarios.findMany();
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna um usuário pelo ID
 */
async function getUsuarioID(id) {
    try {
        return await prisma.usuarios.findMany({ where: { id } });
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna um usuário pelo email
 */
async function getUsuarioEMAIL(email) {
    try {
        return await prisma.usuarios.findMany({ where: { email } });
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Deleta um usuário pelo ID
 */
async function deleteUsuarioID(id) {
    try {
        await prisma.usuarios.deleteMany({ where: { id } });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Adiciona um produto ao carrinho do usuário
 */
async function addCarrinho(id_usuario, produto) {
    try {
        const usuario = await prisma.usuarios.findMany({ where: { id: id_usuario } });
        const carrinhoOfUsuario = usuario[0].carrinho;

        // Verifica se produto já está no carrinho
        for(let i = 0;i < carrinhoOfUsuario.length;i++) {
            if (carrinhoOfUsuario[i].id == produto.id) return 'produto_ja_adicionado';
        }

        const jsonProduto = {
            id: produto.id,
            qtd: produto.qtd,
            size: produto.size,
            cor: produto.cor
        }

        carrinhoOfUsuario.push(jsonProduto);

        // Atualiza carrinho no banco
        return await prisma.usuarios.update({
            where: { id: id_usuario },
            data: { carrinho: carrinhoOfUsuario }
        });
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
/**
 * Retorna os produtos do carrinho do Usuario.
 */
async function getCarrinho(id_usuario) {
    try {
        const produtosCarrinho = await prisma.usuarios.findMany({ where: { id: id_usuario } });

        return produtosCarrinho[0].carrinho; // retorna somente os produtos
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Atualiza informações do carrinho
 */
async function updateCarrinho(id_usuario,id_produto,data,type) {
    try {
        const carrinhoAntigo = await prisma.usuarios.findMany({ where: { id: id_usuario } });
        const carrinhoAntigoArray = carrinhoAntigo[0].carrinho;

        const novoCarrinho = [];

        for(let i = 0;i < carrinhoAntigoArray.length;i++) {
            if(carrinhoAntigoArray[i].id == id_produto) { // Produto Para Atualizar
                if(type == 'qtd') {
                    novoCarrinho.push({id: id_produto,cor: carrinhoAntigoArray[i].cor,qtd: data,size: carrinhoAntigoArray[i].size});
                }
            } else {
                novoCarrinho.push(carrinhoAntigoArray[i]);
            }
        }

        const produtosCarrinho = await prisma.usuarios.update({
            where: { id: id_usuario },
            data: {
                carrinho: novoCarrinho
            }
        });

        return produtosCarrinho;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
async function removeProdutoCarrinho(id_usuario,id_produto) {
    try {
        const carrinhoAntigo = await prisma.usuarios.findMany({ where: { id: id_usuario } });
        const carrinhoAntigoArray = carrinhoAntigo[0].carrinho;

        const novoCarrinho = [];

        for(let i = 0;i < carrinhoAntigoArray.length;i++) {
            if(carrinhoAntigoArray[i].id != id_produto) { // Produto Para Atualizar
                novoCarrinho.push(carrinhoAntigoArray[i]);
            }
        }

        const produtosCarrinho = await prisma.usuarios.update({
            where: { id: id_usuario },
            data: {
                carrinho: novoCarrinho
            }
        });

        return produtosCarrinho;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    setUsuarios,
    getUsuarioID,
    getUsuarioEMAIL,
    deleteUsuarioID,
    getUsuarios,
    addCarrinho,
    getCarrinho,
    updateCarrinho,
    removeProdutoCarrinho
};
