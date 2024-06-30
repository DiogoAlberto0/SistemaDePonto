import { PrismaClient } from '@prisma/client'
import { PasswordUtils } from '../../utils/password/implementation/password.utils'

const prisma = new PrismaClient()

const init = async () => {

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

try {
    init()
        .catch(erro => console.error('Falha ao executar script'))
} catch (error) {
    throw new Error('Falha ao criar usuário')
}
export { prisma }