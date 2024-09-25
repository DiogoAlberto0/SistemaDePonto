// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { PasswordUtils } from '../api/utils/password/implementation/password.utils'

const prisma = new PrismaClient();

async function main() {
    const passUtils = new PasswordUtils()
    const position = await prisma.position.upsert({
        where: {
            office: 'admin'
        },
        create: {
            office: 'admin',
            privillegeLevel: 5
        },
        update: {
            office: 'admin',
            privillegeLevel: 5
        }
    })

    const station = await prisma.station.upsert({
        where: {

            name: 'Diretoria',
            OR: [
                {
                    cnpj: '0000000000'
                }
            ]
        },
        create: {
            name: 'Diretoria',
            cnpj: '0000000000',
            latitude: -1.000,
            longitude: -1.000
        },
        update: {
            name: 'Diretoria',
            cnpj: '0000000000',
            latitude: -1.000,
            longitude: -1.000
        }
    })

    const user = await prisma.user.upsert({
        where: {
            phone: '00123456789'
        },
        create: {
            name: 'ADMIN',
            phone: '00123456789',
            positionId: position.id,
            stationId: station.id,
            hash: passUtils.hash('12345')
        },
        update: {
            name: 'ADMIN',
            phone: '00123456789',
            positionId: position.id,
            stationId: station.id,
            hash: passUtils.hash('12345')
        }
    })
}

main()
    .then(() => {
        console.log("seed suceful...")
    })
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });