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
    }
}
async function getUsuarioID(id) {
    try {
        const usuario = await prisma.usuarios.findMany({ where: {id: id} });
        return usuario;
    } catch (err) {
        console.error(err);
    }
}
async function getUsuarioEMAIL(email) {
    try {
        const usuario = await prisma.usuarios.findMany({ where: {email: email} });
        return usuario;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    setUsuarios,
    getUsuarioID,
    getUsuarioEMAIL
}