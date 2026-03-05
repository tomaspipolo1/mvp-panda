export const SOLICITUDES_CAMIONES = [
  {
    id: "1",
    numero: "CAM-2024-001",
    tipoVisita: "Transporte de Carga",
    operacion: "Carga",
    tipoCarga: "Granel",
    destino: "Depósito Norte",
    responsableRecibir: "Juan Portuario",
    fechaIngreso: "2024-06-10",
    horaIngreso: "08:00",
    fechaEgreso: "2024-06-10",
    horaEgreso: "18:00",
    conductor: {
      nombre: "Carlos Gómez",
      dni: "30123456",
      telefono: "+54 9 221 123-4567",
      nroLicencia: "LIC-2024-0001"
    },
    acompanantes: [
      { nombre: "Ana Torres", dni: "31234567", telefono: "+54 9 221 765-4321" },
      { nombre: "Luis Pérez", dni: "32345678", telefono: "+54 9 221 111-2222" }
    ],
    vehiculo: {
      tipo: "Camión",
      patente: "AB123CD",
      marca: "Mercedes-Benz",
      modelo: "Actros 2042"
    },
    documentos: [
      { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" },
      { nombre: "cedula_verde.pdf", tipo: "Cédula Verde" },
      { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo" }
    ],
    observaciones: "Precaución con la carga a granel."
  },
  {
    id: "2",
    numero: "CAM-2024-002",
    tipoVisita: "Transporte de Carga",
    operacion: "Descarga",
    tipoCarga: "Contenedores",
    destino: "Terminal Sur",
    fechaIngreso: "2024-06-11",
    horaIngreso: "09:00",
    conductor: {
      nombre: "Miguel Fernández",
      dni: "34123456",
      telefono: "+54 9 221 333-4444",
      nroLicencia: "LIC-2024-0002"
    },
    vehiculo: {
      tipo: "Camión",
      patente: "CD456EF",
      marca: "Volvo",
      modelo: "FH 540"
    },
    documentos: [
      { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" },
      { nombre: "cedula_azul.pdf", tipo: "Cédula Azul" }
    ],
    observaciones: ""
  },
  {
    id: "3",
    numero: "CAM-2024-003",
    tipoVisita: "Transporte de Carga",
    operacion: "Carga y Descarga",
    tipoCarga: "Materiales de Construcción",
    destino: "Obra Puerto",
    responsableRecibir: "María Portuaria",
    fechaIngreso: "2024-06-12",
    horaIngreso: "07:30",
    fechaEgreso: "2024-06-12",
    horaEgreso: "17:00",
    conductor: {
      nombre: "Sergio López",
      dni: "35123456",
      telefono: "+54 9 221 555-6666",
      nroLicencia: "LIC-2024-0003"
    },
    acompanantes: [],
    vehiculo: {
      tipo: "Camión",
      patente: "EF789GH",
      marca: "Scania",
      modelo: "R450"
    },
    documentos: [
      { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir" },
      { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo" }
    ],
    observaciones: "Requiere autorización especial para descarga de materiales."
  }
]; 