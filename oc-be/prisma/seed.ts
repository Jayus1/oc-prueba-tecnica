import { PrismaClient, Planta, Cuidado, TipoCuidado } from '@prisma/client'
const prisma = new PrismaClient()

const plantasData: Planta[] = [
    { id: 1, nombre: 'Rosa', especie: 'Rosa', fechaRegistro: new Date('2023-01-15'), ubicacion: 'Jardín Frontal', isActive: true },
    { id: 2, nombre: 'Tulipán', especie: 'Tulipa', fechaRegistro: new Date('2023-02-20'), ubicacion: 'Jardín Trasero', isActive: true },
    { id: 3, nombre: 'Girasol', especie: 'Helianthus', fechaRegistro: new Date('2023-03-10'), ubicacion: 'Huerto', isActive: true },
    { id: 4, nombre: 'Lavanda', especie: 'Lavandula', fechaRegistro: new Date('2023-04-05'), ubicacion: 'Jardín de Aromáticas', isActive: true },
    { id: 5, nombre: 'Cactus', especie: 'Cactaceae', fechaRegistro: new Date('2023-05-12'), ubicacion: 'Interior', isActive: true },
]

const cuidadosData: Cuidado[] = [
    { id: 1, idPlanta: 1, tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2023-01-16'), fechaFin: new Date('2023-01-16'), notas: 'Riego ligero por la mañana', isActive: true },
    { id: 2, idPlanta: 1, tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2023-01-20'), fechaFin: new Date('2023-01-20'), notas: 'Fertilizante orgánico', isActive: true },
]

async function main() {
    const plantasPromises = plantasData.map(async (planta) => {
        return await prisma.planta.upsert({
            where: { id: planta.id },
            update: {},
            create: planta,
        })
    })

    await Promise.all(plantasPromises)

    const cuidadosPromises = cuidadosData.map(async (cuidado) => {
        return await prisma.cuidado.upsert({
            where: { id: cuidado.id },
            update: {},
            create: cuidado,
        })
    })

    await Promise.all(cuidadosPromises)

    console.log('Seeding finalizado.')
}


main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})