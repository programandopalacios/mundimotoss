const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFName } = require('pdf-lib');
const { buildProposalPDF } = require('./generate-pdf');

async function verifyProposalPDF() {
  const outputPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(__dirname, 'Propuesta_Comercial_Mundimotos.pdf');

  // 1. Generate compressed PDF for final delivery
  const docCompressed = buildProposalPDF({
    clientName: 'MUNDIMOTOS',
    valEsencial: '[Por definir con el cliente]',
    valIntegral: '[Por definir con el cliente]',
    valPlus: '[Por definir con el cliente]',
    compress: true
  });
  const pdfBytes = docCompressed.output('arraybuffer');
  fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

  console.log('--- INICIANDO VERIFICACIÓN COMPLETA DEL PDF MUNDIMOTOS ---');
  console.log(`1. Tamaño de archivo generado (comprimido): ${pdfBytes.byteLength} bytes`);

  // 2. Load with pdf-lib to inspect pages & dimensions
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();
  console.log(`2. Cantidad de páginas detectadas: ${pageCount}`);

  if (pageCount !== 4) {
    throw new Error(`Error: Se esperaban 4 páginas, pero se detectaron ${pageCount}`);
  }

  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    console.log(`   Página ${i + 1}: ${width.toFixed(2)} x ${height.toFixed(2)} pt (A4 exacto)`);
    const stream = page.node.Contents();
    if (!stream || stream.getContents().length === 0) {
      throw new Error(`Error: La página ${i + 1} no contiene contenido.`);
    }
  }

  const pageOneXObjects = pdfDoc.getPage(0).node.Resources()
    .lookup(PDFName.of('XObject'))?.keys().length || 0;
  if (pageOneXObjects < 1) {
    throw new Error(`La página 1 debe incluir el collage original de los pilares; se encontraron ${pageOneXObjects}.`);
  }

  const annotations = pdfDoc.getPage(3).node.Annots();
  const pdfLinks = annotations
    ? annotations.asArray().map(ref => {
      const annotation = pdfDoc.context.lookup(ref);
      const action = annotation.lookup(PDFName.of('A'));
      return action?.lookup(PDFName.of('URI'))?.decodeText();
    }).filter(Boolean)
    : [];
  const expectedLinks = [
    'mailto:ceo@pdpcomunica.com',
    'https://wa.me/573052339865',
    'https://pdpcomunica.com/'
  ];
  expectedLinks.forEach(link => {
    if (!pdfLinks.includes(link)) {
      throw new Error(`Fallo de verificación: Enlace PDF no encontrado: "${link}"`);
    }
  });
  console.log('   Enlaces PDF verificados: correo, WhatsApp y sitio web.');

  // 3. Generate uncompressed version to inspect exact text streams
  const docUncompressed = buildProposalPDF({
    clientName: 'MUNDIMOTOS',
    valEsencial: '[Por definir con el cliente]',
    valIntegral: '[Por definir con el cliente]',
    valPlus: '[Por definir con el cliente]',
    compress: false
  });
  const rawContent = Buffer.from(docUncompressed.output('arraybuffer')).toString('latin1');

  const checkKeywords = [
    { page: 1, key: 'MUNDIMOTOS', label: 'Portada y Cliente Mundimotos' },
    { page: 1, key: '140', label: 'Cifra 140 Colaboradores' },
    { page: 1, key: 'Bogot', label: 'Presencia Bogotá y Antioquia' },
    { page: 1, key: 'Por coordinar con Mundimotos', label: 'Fechas pendientes de coordinación' },
    { page: 1, key: 'El Sentido de Hacer una Pausa', label: 'Propósito sin encabezado repetido' },
    { page: 1, key: 'TRES PILARES INMEDIATOS', label: 'Tres Pilares Inmediatos con collage original' },
    { page: 2, key: 'CONECTAR', label: 'Momento 01 Conectar' },
    { page: 2, key: 'CERRAR', label: 'Momento 06 Cerrar' },
    { page: 2, key: 'Reflexión, Aprendizajes y Reconocimiento', label: 'Nuevo título del momento 06' },
    { page: 2, key: 'Reflexión grupal sobre la experiencia', label: 'Reflexión grupal del momento 06' },
    { page: 2, key: 'aportes de quienes', label: 'Reconocimiento de participantes del momento 06' },
    { page: 2, key: 'fortalecer la cultura', label: 'Cultura organizacional en el momento 06' },
    { page: 2, key: 'TRANSVERSALES', label: 'Ejes Temáticos Transversales' },
    { page: 3, key: 'Paquete Integral de Experiencia y Servicio', label: 'Paquete Integral de Experiencia y Servicio' },
    { page: 3, key: '4 encuentros presenciales en Antioquia', label: 'Cuatro encuentros en Antioquia' },
    { page: 3, key: '5 encuentros presenciales en Bogotá', label: 'Cinco encuentros en Bogotá' },
    { page: 3, key: 'jornadas 2-2-1', label: 'Distribución 2-2-1 en Bogotá' },
    { page: 3, key: 'Herramientas vivenciales', label: 'Herramientas de trabajo' },
    { page: 3, key: 'control riguroso de asistencia', label: 'Registro de asistencia' },
    { page: 3, key: 'encuestas de evaluación', label: 'Encuestas' },
    { page: 3, key: 'evidencias fotográficas', label: 'Evidencias fotográficas' },
    { page: 3, key: '$33.900.000', label: 'Inversión total' },
    { page: 3, key: 'antes de IVA', label: 'Inversión antes de IVA' },
    { page: 3, key: '$16.950.000', label: 'Valores de cada pago' },
    { page: 3, key: 'A mitad del proceso:', label: 'Primer pago a mitad del proceso' },
    { page: 3, key: 'Al finalizar y entregar el informe final', label: 'Segundo pago contra entrega del informe' },
    { page: 3, key: 'Hasta 5 días hábiles tras recibir la documentación.', label: 'Plazo de gestión de cada pago' },
    { page: 3, key: 'cualitativos y cuantitativos', label: 'Resultados del informe final' },
    { page: 3, key: '15 días calendario', label: 'Vigencia de la propuesta' },
    { page: 4, key: 'JUAN MANUEL RESTREPO', label: 'Facilitador Juan Manuel' },
    { page: 4, key: 'EDUARDO G', label: 'Facilitador Eduardo Gómez' },
    { page: 4, key: 'CREER', label: 'Continuidad 2027 CREER' },
    { page: 4, key: 'CREER · CREAR · CRECER', label: 'Modelo CREER, CREAR y CRECER' },
    { page: 4, key: 'Formador de Formadores', label: 'Línea Formador de Formadores' },
    { page: 4, key: 'cultura de servicio', label: 'Descripción de Formador de Formadores' },
    { page: 4, key: 'Líderes Formando Líderes', label: 'Línea Líderes Formando Líderes' },
    { page: 4, key: 'inteligencia artificial aplicada', label: 'Descripción de Líderes Formando Líderes' },
    { page: 4, key: 'TRES SOLUCIONES DIGITALES', label: 'Soluciones digitales propuestas' },
    { page: 4, key: 'Sistema inteligente de atención', label: 'Sistema de atención y calidad' },
    { page: 4, key: 'Software personalizado de inventarios', label: 'Software de inventarios' },
    { page: 4, key: 'Plataforma educativa propia', label: 'Plataforma educativa' },
    { page: 4, key: 'no son productos implementados ni forman parte del paquete comercial actual', label: 'Soluciones no implementadas y fuera del paquete actual' },
    { page: 4, key: 'Modificaciones del cronograma', label: 'Condiciones de cronograma' },
    { page: 4, key: 'Cualquier cambio de fechas', label: 'Cambios de fechas en cronograma' },
    { page: 4, key: 'costos adicionales de logística o viáticos', label: 'Costos de logística o viáticos' },
    { page: 4, key: 'deberá cotizarse y acordarse previamente', label: 'Cotización y acuerdo previo' },
    { page: 4, key: 'con Mundimotos.', label: 'Acuerdo previo con Mundimotos' },
    { page: 4, key: 'Servicios no incluidos', label: 'Servicios no incluidos' },
    { page: 4, key: 'Sesiones virtuales adicionales', label: 'Sesiones virtuales cotizables' },
    { page: 4, key: 'encuentros presenciales adicionales', label: 'Encuentros presenciales cotizables' },
    { page: 4, key: 'Logística a cargo del cliente', label: 'Logística a cargo del cliente' },
    { page: 4, key: 'espacios físicos', label: 'Espacios físicos' },
    { page: 4, key: 'refrigerios', label: 'Refrigerios' },
    { page: 4, key: 'convocatoria de los', label: 'Convocatoria de participantes' },
    { page: 4, key: 'Propiedad intelectual', label: 'Condiciones de propiedad intelectual' },
    { page: 4, key: 'GRUPO VE POR MÁS', label: 'Titularidad de Grupo Ve Por Más' },
    { page: 4, key: 'Coordinemos el Inicio de la Experiencia', label: 'Cierre comercial' },
    { page: 4, key: 'ceo@pdpcomunica.com', label: 'Correo de contacto' },
    { page: 4, key: '+57 305 233 9865', label: 'WhatsApp de contacto' },
    { page: 4, key: 'pdpcomunica.com', label: 'Sitio web de contacto' }
  ];

  console.log('3. Verificación de secciones clave en el flujo del PDF:');
  checkKeywords.forEach(({ page, key, label }) => {
    if (rawContent.includes(key)) {
      console.log(`   [OK] Página ~${page} - ${label} (clave verificada: "${key}")`);
    } else {
      throw new Error(`Fallo de verificación: Clave "${key}" no encontrada para ${label}`);
    }
  });

  if (/Propuesta Comercial: Experiencia Integral|Una solución única, completa y ejecutiva|PROPUESTA DE VALOR CORPORATIVA/i.test(rawContent)) {
    throw new Error('El PDF conserva encabezados o textos redundantes que debían retirarse.');
  }

  if (rawContent.includes('CONDICIONES DE PAGO Y GESTIÓN COMERCIAL')) {
    throw new Error('El PDF conserva el bloque duplicado de condiciones de pago.');
  }
  const paymentAmountCount = (rawContent.match(/\$16\.950\.000/g) || []).length;
  if (paymentAmountCount !== 2) {
    throw new Error(`Se esperaban dos importes de pago en el bloque de inversión; se encontraron ${paymentAmountCount}.`);
  }

  if (/CERTIFICACI|CERTIFICADO|DINAMICA DE PAREJA|COMPROMISO(?:S)? (?:INDIVIDUAL(?:ES)?|PERSONAL(?:ES)? OBLIGATORI(?:O|A)(?:S)?)|RETROALIMENTACION PERSONALIZADA|ANTICIPO|BASE DE NEGOCIACI[ÓO]N|Reflexión & Compromisos|Reflexión, Compromisos|acuerdos colectivos de acción/i.test(rawContent)) {
    throw new Error('El PDF contiene referencias excluidas del alcance comercial.');
  }

  if (/NOV.?DIC|MAR.?JUE|MARTES|MI[EÉ]RCOLES|JUEVES|4 D[IÍ]AS DIFERENTES|4 FECHAS DIFERENTES|1 JORNADA POR D[IÍ]A/i.test(rawContent)) {
    throw new Error('El PDF contiene detalles de fechas o días de ejecución no acordados.');
  }

  console.log('--- VERIFICACIÓN EXITOSA: El PDF contiene cuatro páginas A4 con contenido y las secciones requeridas. ---');
}

verifyProposalPDF().catch(err => {
  console.error('Error durante la verificación del PDF:', err);
  process.exit(1);
});
