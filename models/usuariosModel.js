const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function setUsuarios(data){
    try {
        const hashedPassword = await bcrypt.hash(data.senha, 10);

        await prisma.usuarios.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    setUsuarios
}