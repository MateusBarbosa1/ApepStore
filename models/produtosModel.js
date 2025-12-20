const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Cria um novo produto no banco
 */
async function createProduct(data, filename) {
    try {
        // Monta array de cores a partir dos dados enviados
        const cores = data.coresNome.map((nome, index) => ({
            nome,
            hex: data.coresHex[index]
        }));

        // Cria o produto
        const produtoCriado = await prisma.produtos.createMany({
            data: {
                nome_produto: data.nome,
                descricao: data.descricao,
                categoria: data.categoria,
                preco: data.preco,
                img: filename,
                cores,
                tamanhos: data.tamanhos,
                material: data.material
            }
        });

        return produtoCriado;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna todos os produtos
 */
async function getProdutos() {
    try {
        return await prisma.produtos.findMany();
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna produtos filtrando por categoria
 */
async function getProdutosCATEGORIA(categoria) {
    try {
        return await prisma.produtos.findMany({ where: { categoria } });
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Deleta um produto pelo ID
 */
async function deleteProdutoID(id) {
    try {
        await prisma.produtos.deleteMany({ where: { id_produto: id } });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Atualiza um produto existente
 */
async function updateProduto(id, data) {
    try {
        await prisma.produtos.updateMany({
            where: { id_produto: id },
            data: {
                nome_produto: data.nome_produto,
                descricao: data.descricao,
                categoria: data.categoria,
                preco: data.preco,
            }
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Retorna um produto pelo ID
 */
async function getProdutoID(id) {
    try {
        return await prisma.produtos.findMany({ where: { id_produto: id } });
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    createProduct,
    getProdutos,
    deleteProdutoID,
    updateProduto,
    getProdutoID,
    getProdutosCATEGORIA
};
