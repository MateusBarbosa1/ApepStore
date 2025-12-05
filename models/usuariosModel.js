const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function setUsuarios(data){
    try {
        const hashedPassword = await bcrypt.hash(data.senha, 10);

        const usuario = await prisma.usuarios.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword
            }
        });
        return usuario;
    } catch(err) {
        if(err.code == 'P2002') {
            return 'email';
        }
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
async function getUsuarios() {
    try {
        const usuarios = await prisma.usuarios.findMany();
        return usuarios;
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
async function getUsuarioID(id) {
    try {
        const usuario = await prisma.usuarios.findMany({ where: {id: id} });
        return usuario;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
async function getUsuarioEMAIL(email) {
    try {
        const usuario = await prisma.usuarios.findMany({ where: {email: email} });
        return usuario;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}
async function deleteUsuarioID(id) {
    try {
        await prisma.usuarios.deleteMany({ where: { id: id } });
        return true;
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
    getUsuarios
}