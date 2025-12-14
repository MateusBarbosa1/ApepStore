const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProduct(data, filename) {
    try {
        const cores = data.coresNome.map((nome, index) => ({
            nome,
            hex: data.coresHex[index]
        }));

        const produtoCriado = await prisma.produtos.createMany({
            data: {
                nome_produto: data.nome,
                descricao: data.descricao,
                categoria: data.categoria,
                preco: data.preco,
                img: filename,
                cores
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
async function getProdutos() {
    try {
        const produtos = await prisma.produtos.findMany();
        
        return produtos;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
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
async function updateProduto(id,data) {
    try {
        await prisma.produtos.updateMany({
            where: {
                id_produto: id
            },
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
async function getProdutoID(id) {
    try {
        const produto = await prisma.produtos.findMany({ where: {id_produto: id} });
        
        return produto;
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
    getProdutoID
}