import { Server } from 'http'

import { app } from './app'
import { prisma } from './repositories/prismaImplementation/prismaConnection'

const port = 4000

const server: Server = app.listen(port, () => {
    console.log(`Executando na porta: ${port}`)
})

// Tratando sinal de encerramento
const handleExit = async (signal: any) => {
    console.log(`Recebido sinal ${signal}. Fechando o servidor...`);
    server.close(async () => {
        console.log('Servidor fechado.');
        await prisma.$disconnect();
        console.log('Desconectado do Prisma.');
        process.exit(0); // Encerra o processo após a desconexão
    });
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);