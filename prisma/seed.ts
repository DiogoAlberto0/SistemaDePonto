// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { PasswordUtils } from '../src/utils/password/implementation/password.utils'

const prisma = new PrismaClient();

async function main() {
    const passUtils = new PasswordUtils()
    const position = await prisma.position.create({
        data: {
            office: 'admin',
            privillegeLevel: 5
        }
    })

    const station = await prisma.station.create({
        data: {
            name: 'Diretoria',
            cnpj: '0000000000',
            latitude: -1.000,
            longitude: -1.000
        }
    })

    const user = await prisma.user.create({
        data: {
            name: 'ADMIN',
            phone: '123456789',
            positionId: position.id,
            stationId: station.id,
            hash: passUtils.hash('12345')
        }
    })
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });