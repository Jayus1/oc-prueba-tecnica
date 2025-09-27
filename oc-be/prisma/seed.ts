import { PrismaClient, Planta, Cuidado } from '@prisma/client'
const prisma = new PrismaClient()

const plantasData: Planta[] = [
    { id: 1, nombre: 'Rosa', especie: 'Rosa', fechaRegistro: new Date('2023-01-15'), ubicacion: 'Jardín Frontal' },
    { id: 2, nombre: 'Tulipán', especie: 'Tulipa', fechaRegistro: new Date('2023-02-20'), ubicacion: 'Jardín Trasero' },
    { id: 3, nombre: 'Girasol', especie: 'Helianthus', fechaRegistro: new Date('2023-03-10'), ubicacion: 'Huerto' },
    { id: 4, nombre: 'Lavanda', especie: 'Lavandula', fechaRegistro: new Date('2023-04-05'), ubicacion: 'Jardín de Aromáticas' },
    { id: 5, nombre: 'Cactus', especie: 'Cactaceae', fechaRegistro: new Date('2023-05-12'), ubicacion: 'Interior' },
]

const cuidadosData: Cuidado[] = [
    { id: 1, idPlanta: 1, tipo: 'Riego', fechaInicio: new Date('2023-01-16'), fechaFin: new Date('2023-01-16'), notas: 'Riego ligero por la mañana' },
    { id: 2, idPlanta: 1, tipo: 'Fertilización', fechaInicio: new Date('2023-01-20'), fechaFin: new Date('2023-01-20'), notas: 'Fertilizante orgánico' },
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