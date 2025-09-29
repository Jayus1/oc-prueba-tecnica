import { PrismaClient, TipoCuidado } from '@prisma/client'
const prisma = new PrismaClient()


const especiesData = [
    { id: '67f551ea-0b40-46a5-90dc-e44666c48c60', nombre: 'Rosa', nombreCientifico: 'Rosa gallica', descripcion: 'Flor ornamental con espinas' },
    { id: '4e70a40d-0e29-487f-9004-85400e4c6c43', nombre: 'Tulipán', nombreCientifico: 'Tulipa gesneriana', descripcion: 'Flor bulbosa de primavera' },
    { id: '884facea-9323-4b40-8e2f-36ad830e8b40', nombre: 'Girasol', nombreCientifico: 'Helianthus annuus', descripcion: 'Planta que sigue al sol' },
    { id: '7383a1bd-0fd7-4330-af89-621932d21119', nombre: 'Lavanda', nombreCientifico: 'Lavandula angustifolia', descripcion: 'Planta aromática relajante' },
    { id: '511adb43-8dd2-4b06-b65b-bc023a05224c', nombre: 'Cactus', nombreCientifico: 'Opuntia ficus-indica', descripcion: 'Planta suculenta resistente' },
    { id: '0d07afc7-0c36-466b-8853-a486bb86f678', nombre: 'Begonia', nombreCientifico: 'Begonia semperflorens', descripcion: 'Planta de flor continua' },
    { id: '37ce7be7-0f54-4642-88ae-83b5b2354654', nombre: 'Geranio', nombreCientifico: 'Pelargonium hortorum', descripcion: 'Planta de balcón tradicional' },
    { id: 'b045dda8-d5d7-4359-8442-56926a0be3ba', nombre: 'Petunia', nombreCientifico: 'Petunia × atkinsiana', descripcion: 'Flor colorida de verano' },
    { id: 'e8d2bc82-56f0-44cc-bbff-318b79d10054', nombre: 'Albahaca', nombreCientifico: 'Ocimum basilicum', descripcion: 'Hierba aromática culinaria' },
    { id: 'e4e6706b-b7fe-43b7-a99b-733e8cfc5bec', nombre: 'Menta', nombreCientifico: 'Mentha spicata', descripcion: 'Hierba refrescante' },
]

// Ubicaciones con IDs fijos
const ubicacionesData = [
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d180', nombre: 'Jardín Principal', descripcion: 'Área principal del jardín con buena exposición solar' },
    { id: 'cee29521-fdf0-4f20-b769-ec86782170ab', nombre: 'Balcón Sur', descripcion: 'Balcón orientado al sur, mucha luz' },
    { id: '9edcd0e0-96cd-40b2-bbfb-d77a88e3686e', nombre: 'Terraza Norte', descripcion: 'Terraza con sombra parcial' },
    { id: 'd4583c67-8fa1-42be-9439-e5bb06548205', nombre: 'Invernadero', descripcion: 'Espacio protegido con clima controlado' },
    { id: '4eadbbd0-3c65-4b61-89d0-426ab56f8c24', nombre: 'Cocina', descripcion: 'Plantas aromáticas cerca de la cocina' },
    { id: 'b21a0ba3-2a71-4671-959c-b85e069e6c08', nombre: 'Sala de Estar', descripcion: 'Plantas decorativas de interior' },
]

// Plantas con IDs fijos
const plantasData = [
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d181', nombre: 'Rosa Roja del Jardín', idEspecie: '67f551ea-0b40-46a5-90dc-e44666c48c60', idUbicacion: '766b922e-d68c-4bc1-afe5-67651fc0d180', fechaRegistro: new Date('2025-09-01') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d182', nombre: 'Tulipán Amarillo', idEspecie: '4e70a40d-0e29-487f-9004-85400e4c6c43', idUbicacion: 'cee29521-fdf0-4f20-b769-ec86782170ab', fechaRegistro: new Date('2025-09-02') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d183', nombre: 'Girasol Grande', idEspecie: '884facea-9323-4b40-8e2f-36ad830e8b40', idUbicacion: '766b922e-d68c-4bc1-afe5-67651fc0d180', fechaRegistro: new Date('2025-09-03') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d184', nombre: 'Lavanda Aromática', idEspecie: '7383a1bd-0fd7-4330-af89-621932d21119', idUbicacion: '9edcd0e0-96cd-40b2-bbfb-d77a88e3686e', fechaRegistro: new Date('2025-09-04') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d185', nombre: 'Cactus del Desierto', idEspecie: '511adb43-8dd2-4b06-b65b-bc023a05224c', idUbicacion: 'd4583c67-8fa1-42be-9439-e5bb06548205', fechaRegistro: new Date('2025-09-05') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d186', nombre: 'Begonia Rosa', idEspecie: '0d07afc7-0c36-466b-8853-a486bb86f678', idUbicacion: 'b21a0ba3-2a71-4671-959c-b85e069e6c08', fechaRegistro: new Date('2025-09-06') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d187', nombre: 'Geranio Rojo', idEspecie: '37ce7be7-0f54-4642-88ae-83b5b2354654', idUbicacion: 'cee29521-fdf0-4f20-b769-ec86782170ab', fechaRegistro: new Date('2025-09-07') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d188', nombre: 'Petunia Violeta', idEspecie: 'b045dda8-d5d7-4359-8442-56926a0be3ba', idUbicacion: '9edcd0e0-96cd-40b2-bbfb-d77a88e3686e', fechaRegistro: new Date('2025-09-08') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d189', nombre: 'Albahaca Fresca', idEspecie: 'e8d2bc82-56f0-44cc-bbff-318b79d10054', idUbicacion: '4eadbbd0-3c65-4b61-89d0-426ab56f8c24', fechaRegistro: new Date('2025-09-09') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18a', nombre: 'Menta Verde', idEspecie: 'e4e6706b-b7fe-43b7-a99b-733e8cfc5bec', idUbicacion: '4eadbbd0-3c65-4b61-89d0-426ab56f8c24', fechaRegistro: new Date('2025-09-10') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18b', nombre: 'Rosa Blanca', idEspecie: '67f551ea-0b40-46a5-90dc-e44666c48c60', idUbicacion: '766b922e-d68c-4bc1-afe5-67651fc0d180', fechaRegistro: new Date('2025-09-11') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18c', nombre: 'Tulipán Rosa', idEspecie: '4e70a40d-0e29-487f-9004-85400e4c6c43', idUbicacion: 'cee29521-fdf0-4f20-b769-ec86782170ab', fechaRegistro: new Date('2025-09-12') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18d', nombre: 'Girasol Miniatura', idEspecie: '884facea-9323-4b40-8e2f-36ad830e8b40', idUbicacion: 'd4583c67-8fa1-42be-9439-e5bb06548205', fechaRegistro: new Date('2025-09-13') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18e', nombre: 'Lavanda Francesa', idEspecie: '7383a1bd-0fd7-4330-af89-621932d21119', idUbicacion: '9edcd0e0-96cd-40b2-bbfb-d77a88e3686e', fechaRegistro: new Date('2025-09-14') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d18f', nombre: 'Cactus Pequeño', idEspecie: '511adb43-8dd2-4b06-b65b-bc023a05224c', idUbicacion: 'b21a0ba3-2a71-4671-959c-b85e069e6c08', fechaRegistro: new Date('2025-09-15') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d190', nombre: 'Begonia Blanca', idEspecie: '0d07afc7-0c36-466b-8853-a486bb86f678', idUbicacion: 'b21a0ba3-2a71-4671-959c-b85e069e6c08', fechaRegistro: new Date('2025-09-01') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d191', nombre: 'Geranio Rosa', idEspecie: '37ce7be7-0f54-4642-88ae-83b5b2354654', idUbicacion: 'cee29521-fdf0-4f20-b769-ec86782170ab', fechaRegistro: new Date('2025-09-02') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d192', nombre: 'Petunia Roja', idEspecie: 'b045dda8-d5d7-4359-8442-56926a0be3ba', idUbicacion: '9edcd0e0-96cd-40b2-bbfb-d77a88e3686e', fechaRegistro: new Date('2025-09-03') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d193', nombre: 'Albahaca Dulce', idEspecie: 'e8d2bc82-56f0-44cc-bbff-318b79d10054', idUbicacion: '4eadbbd0-3c65-4b61-89d0-426ab56f8c24', fechaRegistro: new Date('2025-09-04') },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d194', nombre: 'Menta Chocolate', idEspecie: 'e4e6706b-b7fe-43b7-a99b-733e8cfc5bec', idUbicacion: '4eadbbd0-3c65-4b61-89d0-426ab56f8c24', fechaRegistro: new Date('2025-09-05') },
]

// Cuidados respetando las restricciones
const cuidadosData = [
    // Planta 1 - Rosa Roja del Jardín
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d201', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-01'), fechaFin: new Date('2025-09-01'), notas: 'Riego inicial después del trasplante' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d202', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-02'), fechaFin: new Date('2025-09-02'), notas: 'Ajuste de posición para mejor exposición solar' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d203', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-05'), fechaFin: new Date('2025-09-05'), notas: 'Primera fertilización con abono orgánico' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d204', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-07'), fechaFin: new Date('2025-09-07'), notas: 'Riego regular después de fertilización' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d205', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-10'), fechaFin: new Date('2025-09-10'), notas: 'Poda de hojas amarillentas' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d206', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d181', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-12'), fechaFin: new Date('2025-09-12'), notas: 'Riego profundo después de poda' },

    // Planta 2 - Tulipán Amarillo
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d207', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d182', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-02'), fechaFin: new Date('2025-09-02'), notas: 'Riego ligero para bulbo recién plantado' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d208', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d182', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-04'), fechaFin: new Date('2025-09-04'), notas: 'Reubicación para mejor luz matutina' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d209', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d182', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-06'), fechaFin: new Date('2025-09-06'), notas: 'Riego moderado, evitar encharcamiento' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d210', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d182', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-09'), fechaFin: new Date('2025-09-09'), notas: 'Fertilizante específico para bulbosas' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d211', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d182', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-11'), fechaFin: new Date('2025-09-11'), notas: 'Riego post-fertilización' },

    // Planta 3 - Girasol Grande
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d212', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-03'), fechaFin: new Date('2025-09-03'), notas: 'Riego abundante para germinación' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d213', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-05'), fechaFin: new Date('2025-09-05'), notas: 'Orientación hacia el sol matutino' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d214', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-07'), fechaFin: new Date('2025-09-07'), notas: 'Riego regular para crecimiento' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d215', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-10'), fechaFin: new Date('2025-09-10'), notas: 'Fertilizante rico en nitrógeno' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d216', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-12'), fechaFin: new Date('2025-09-12'), notas: 'Riego después de fertilización' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d217', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d183', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-15'), fechaFin: new Date('2025-09-15'), notas: 'Eliminación de hojas inferiores secas' },

    // Planta 4 - Lavanda Aromática
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d218', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d184', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-04'), fechaFin: new Date('2025-09-04'), notas: 'Riego moderado, evitar exceso' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d219', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d184', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-06'), fechaFin: new Date('2025-09-06'), notas: 'Maximizar exposición solar' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d220', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d184', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-08'), fechaFin: new Date('2025-09-08'), notas: 'Poda ligera para estimular crecimiento' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d221', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d184', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-11'), fechaFin: new Date('2025-09-11'), notas: 'Riego después de poda' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d222', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d184', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-14'), fechaFin: new Date('2025-09-14'), notas: 'Fertilizante bajo en nitrógeno' },

    // Planta 5 - Cactus del Desierto
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d223', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d185', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-05'), fechaFin: new Date('2025-09-05'), notas: 'Ubicación con luz solar directa' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d224', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d185', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-08'), fechaFin: new Date('2025-09-08'), notas: 'Riego mínimo, solo humedecer sustrato' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d225', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d185', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-15'), fechaFin: new Date('2025-09-15'), notas: 'Segundo riego del mes' },

    // Continuar con más plantas...
    // Planta 6 - Begonia Rosa
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d226', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d186', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-06'), fechaFin: new Date('2025-09-06'), notas: 'Riego con agua a temperatura ambiente' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d227', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d186', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-08'), fechaFin: new Date('2025-09-08'), notas: 'Luz indirecta, evitar sol directo' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d228', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d186', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-11'), fechaFin: new Date('2025-09-11'), notas: 'Fertilizante líquido para plantas de flor' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d229', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d186', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-13'), fechaFin: new Date('2025-09-13'), notas: 'Riego después de fertilización' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d230', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d186', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-16'), fechaFin: new Date('2025-09-16'), notas: 'Eliminación de flores marchitas' },

    // Planta 7 - Geranio Rojo
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d231', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d187', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-07'), fechaFin: new Date('2025-09-07'), notas: 'Riego regular para floración' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d232', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d187', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-09'), fechaFin: new Date('2025-09-09'), notas: 'Sol directo matutino' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d233', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d187', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-12'), fechaFin: new Date('2025-09-12'), notas: 'Poda de mantenimiento' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d234', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d187', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-14'), fechaFin: new Date('2025-09-14'), notas: 'Riego post-poda' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d235', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d187', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-17'), fechaFin: new Date('2025-09-17'), notas: 'Fertilizante para geranios' },

    // Planta 8 - Petunia Violeta
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d236', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d188', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-08'), fechaFin: new Date('2025-09-08'), notas: 'Riego matutino abundante' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d237', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d188', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-10'), fechaFin: new Date('2025-09-10'), notas: 'Sol directo pero con sombra en horas pico' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d238', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d188', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-13'), fechaFin: new Date('2025-09-13'), notas: 'Fertilizante líquido cada 2 semanas' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d239', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d188', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-15'), fechaFin: new Date('2025-09-15'), notas: 'Riego después de fertilización' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d240', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d188', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-18'), fechaFin: new Date('2025-09-18'), notas: 'Deadheading para prolongar floración' },

    // Planta 9 - Albahaca Fresca
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d241', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d189', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-09'), fechaFin: new Date('2025-09-09'), notas: 'Riego abundante, mantener húmedo' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d242', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d189', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-11'), fechaFin: new Date('2025-09-11'), notas: 'Luz solar directa 6 horas diarias' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d243', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d189', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-14'), fechaFin: new Date('2025-09-14'), notas: 'Poda de flores para estimular hojas' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d244', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d189', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-16'), fechaFin: new Date('2025-09-16'), notas: 'Riego después de poda' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d245', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d189', tipo: TipoCuidado.FERTILIZACION, fechaInicio: new Date('2025-09-19'), fechaFin: new Date('2025-09-19'), notas: 'Fertilizante orgánico para hierbas' },

    // Planta 10 - Menta Verde
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d246', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d18a', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-10'), fechaFin: new Date('2025-09-10'), notas: 'Riego frecuente, le gusta la humedad' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d247', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d18a', tipo: TipoCuidado.LUZ, fechaInicio: new Date('2025-09-12'), fechaFin: new Date('2025-09-12'), notas: 'Sombra parcial, evitar sol intenso' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d248', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d18a', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-14'), fechaFin: new Date('2025-09-14'), notas: 'Mantener sustrato húmedo' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d249', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d18a', tipo: TipoCuidado.PODA, fechaInicio: new Date('2025-09-17'), fechaFin: new Date('2025-09-17'), notas: 'Poda regular para controlar crecimiento' },
    { id: '766b922e-d68c-4bc1-afe5-67651fc0d250', idPlanta: '766b922e-d68c-4bc1-afe5-67651fc0d18a', tipo: TipoCuidado.RIEGO, fechaInicio: new Date('2025-09-19'), fechaFin: new Date('2025-09-19'), notas: 'Riego post-poda' },
]

async function main() {
    console.log('🌱 Iniciando seeding de la base de datos...')

    // Crear especies usando upsert
    console.log('📋 Creando especies...')
    for (const especieData of especiesData) {
        await prisma.especie.upsert({
            where: { id: especieData.id },
            update: {}, // No actualizar si ya existe
            create: especieData
        })
    }

    // Crear ubicaciones usando upsert
    console.log('📍 Creando ubicaciones...')
    for (const ubicacionData of ubicacionesData) {
        await prisma.ubicacion.upsert({
            where: { id: ubicacionData.id },
            update: {}, // No actualizar si ya existe
            create: ubicacionData
        })
    }

    // Crear plantas usando upsert
    console.log('🌿 Creando plantas...')
    for (const plantaData of plantasData) {
        await prisma.planta.upsert({
            where: { id: plantaData.id },
            update: {}, // No actualizar si ya existe
            create: {
                ...plantaData,
                isActive: true
            }
        })
    }

    // Crear cuidados usando upsert
    console.log('💧 Creando cuidados...')
    for (const cuidadoData of cuidadosData) {
        await prisma.cuidado.upsert({
            where: { id: cuidadoData.id },
            update: {}, // No actualizar si ya existe
            create: {
                ...cuidadoData,
                isActive: true
            }
        })
    }

    console.log(`✅ Seeding completado:`)
    console.log(`   - ${especiesData.length} especies procesadas`)
    console.log(`   - ${ubicacionesData.length} ubicaciones procesadas`)
    console.log(`   - ${plantasData.length} plantas procesadas`)
    console.log(`   - ${cuidadosData.length} cuidados procesados`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })