const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

function buildProposalPDF(options = {}) {
  const clientName = options.clientName || 'MUNDIMOTOS';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: options.compress !== undefined ? options.compress : true
  });

  const pw = 210;
  const ph = 297;
  const margin = 14;
  const cw = pw - (margin * 2); // 182mm

  // Colors palette - Mundimotos & Grupo Ve Por Más
  const cDark = [18, 63, 112];          // #123F70 Azul profundo corporativo
  const cDarkNavy = [16, 22, 34];       // #101622
  const cBlue = [13, 91, 153];          // #0D5B99 Azul vivo
  const cYellow = [245, 169, 0];        // #F5A900 Amarillo acento
  const cYellowBg = [254, 249, 235];    // #FEF9EB
  const cYellowBorder = [245, 169, 0];  // #F5A900
  const cBlueBg = [240, 246, 252];      // #F0F6FC
  const cBlueBorder = [186, 215, 243];  // #BAD7F3
  const cGrayText = [51, 65, 85];       // #334155
  const cMuted = [100, 116, 139];       // #64748B
  const cBorder = [218, 225, 233];      // #DAE1E9
  const cCardBg = [248, 250, 252];      // #F8FAFC

  function drawHeader(pageNum, pageSub) {
    doc.setFillColor(...cDark);
    doc.rect(margin, margin - 4, cw, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...cDark);
    doc.text(`GRUPO VE POR MÁS   |   ${clientName.toUpperCase()}`, margin, margin + 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...cBlue);
    doc.text(pageSub.toUpperCase(), pw - margin, margin + 2, { align: 'right' });

    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.line(margin, margin + 5, pw - margin, margin + 5);
  }

  function drawFooter(pageNum) {
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.line(margin, ph - margin - 4, pw - margin, ph - margin - 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...cMuted);
    doc.text(`Propuesta Comercial Confidencial · GRUPO VE POR MÁS para ${clientName} · 2026`, margin, ph - margin);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...cDark);
    doc.text(`Página ${pageNum} de 4`, pw - margin, ph - margin, { align: 'right' });
  }

  function drawConditionIcon(kind, x, y) {
    doc.setFillColor(...cBlueBg);
    doc.setDrawColor(...cBlueBorder);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, y, 6, 6, 1, 1, 'FD');
    doc.setDrawColor(...cDark);
    doc.setLineWidth(0.4);

    if (kind === 'services') {
      doc.circle(x + 3, y + 3, 1.8, 'S');
      doc.line(x + 1.7, y + 4.3, x + 4.3, y + 1.7);
    } else if (kind === 'schedule') {
      doc.roundedRect(x + 1.1, y + 1.4, 3.8, 3.7, 0.4, 0.4, 'S');
      doc.line(x + 1.1, y + 2.5, x + 4.9, y + 2.5);
      doc.line(x + 2, y + 0.9, x + 2, y + 2);
      doc.line(x + 4, y + 0.9, x + 4, y + 2);
    } else if (kind === 'logistics') {
      doc.rect(x + 1.2, y + 1.3, 3.6, 4.2, 'S');
      doc.line(x + 3, y + 1.3, x + 3, y + 5.5);
      doc.line(x + 1.2, y + 3.4, x + 4.8, y + 3.4);
    } else {
      doc.line(x + 3, y + 0.9, x + 5, y + 1.7);
      doc.line(x + 5, y + 1.7, x + 4.6, y + 4.1);
      doc.line(x + 4.6, y + 4.1, x + 3, y + 5.3);
      doc.line(x + 3, y + 5.3, x + 1.4, y + 4.1);
      doc.line(x + 1.4, y + 4.1, x + 1, y + 1.7);
      doc.line(x + 1, y + 1.7, x + 3, y + 0.9);
      doc.line(x + 2, y + 3.1, x + 2.7, y + 3.8);
      doc.line(x + 2.7, y + 3.8, x + 4, y + 2.4);
    }
  }

  // =========================================================================
  // PÁGINA 1: PORTADA EJECUTIVA, MÉTRICAS, FICHA TÉCNICA & SEDES
  // =========================================================================
  drawHeader(1, 'Propuesta de Experiencia Corporativa');

  let y = margin + 12;

  // Eyebrow badges
  doc.setFillColor(...cBlueBg);
  doc.setDrawColor(...cBlueBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, 78, 6.5, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...cDark);
  doc.text("PROPUESTA DE EXPERIENCIA CORPORATIVA", margin + 5, y + 4.5);

  doc.setFillColor(...cYellowBg);
  doc.setDrawColor(...cYellowBorder);
  doc.roundedRect(margin + 82, y, 46, 6.5, 3, 3, 'FD');
  doc.setTextColor(180, 110, 0);
  doc.text("CIERRE DE AÑO 2026", margin + 87, y + 4.5);

  y += 15;

  // Main Title H1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...cDark);
  doc.text("EXPERIENCIA DE SERVICIO Y CONEXIÓN", margin, y);

  y += 7.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...cBlue);
  doc.text("Reconocer lo que hemos construido. Conectar a quienes lo hacen posible. Fortalecer lo que viene.", margin, y);

  y += 6.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...cGrayText);
  doc.text("Una experiencia corporativa vivencial y participativa para los equipos de Mundimotos en Antioquia y Bogotá.", margin, y);

  y += 9;

  // 4 Feature highlight metrics (Antioquia first, 9 sessions total)
  const boxW = (cw - 9) / 4;
  const boxH = 22;
  const metrics = [
    { num: '9', lbl: 'Encuentros Totales', sub: '5 Bogotá y 4 Antioquia' },
    { num: 'Antioquia', lbl: '4 Encuentros', sub: '60 pers. ref.' },
    { num: 'Bogotá', lbl: '5 Encuentros', sub: '80 pers. ref. (2-2-1)' },
    { num: 'Fechas', lbl: 'Cronograma', sub: 'Por coordinar con Mundimotos' }
  ];

  metrics.forEach((m, idx) => {
    const bx = margin + (boxW + 3) * idx;
    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.4);
    doc.roundedRect(bx, y, boxW, boxH, 2.5, 2.5, 'FD');

    doc.setFillColor(...cYellow);
    doc.roundedRect(bx, y, boxW, 1.2, 0.6, 0.6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...cDark);
    doc.text(m.num, bx + 4, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...cBlue);
    doc.text(m.lbl, bx + 4, y + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...cMuted);
    doc.text(m.sub, bx + 4, y + 18);
  });

  y += boxH + 9;

  // Ficha Técnica Dossier
  const ftH = 30;
  doc.setFillColor(...cBlueBg);
  doc.setDrawColor(...cBlueBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, cw, ftH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cDark);
  doc.text("FICHA TÉCNICA Y RESUMEN EJECUTIVO", margin + 6, y + 6.5);

  const colHalf = (cw - 12) / 2;
  const fRows = [
    { l: "CLIENTE:", v: "Mundimotos (Antioquia y Bogotá D.C.)", rL: "PROPONENTE:", rV: "GRUPO VE POR MÁS" },
    { l: "FACILITADORES:", v: "Juan Manuel Restrepo & Eduardo Gómez", rL: "RESPALDO:", rV: "Academia Punto D' Partida / Agencia PDP" },
    { l: "POBLACIÓN:", v: "140 colaboradores ref. (60 Antioquia · 80 Bogotá)", rL: "ALCANCE:", rV: "9 encuentros presenciales vivenciales" },
    { l: "INVERSIÓN:", v: "$33.900.000 COP antes de IVA", rL: "MODALIDAD:", rV: "100% presencial vivencial y aplicado" }
  ];

  let fy = y + 12;
  fRows.forEach(r => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text(r.l, margin + 6, fy);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...cDark);
    const valueX = r.l === 'FACILITADORES:'
      ? margin + 6 + doc.getTextWidth(r.l) + 2.5
      : margin + 26;
    doc.text(r.v, valueX, fy);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...cMuted);
    doc.text(r.rL, margin + 6 + colHalf, fy);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...cDark);
    doc.text(r.rV, margin + 26 + colHalf, fy);
    fy += 4.5;
  });

  y += ftH + 9;

  // Propósito Estratégico
  const propH = 55;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, cw, propH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cBlue);
  doc.text("El Sentido de Hacer una Pausa", margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...cGrayText);
  const propP1 = "Una pausa para escuchar a los equipos, reconocer sus aportes y proyectar la experiencia de servicio. Reúne a Bogotá y Antioquia alrededor de la cultura de servicio, la comunicación, la colaboración y la experiencia del cliente; transforma retos cotidianos en aprendizajes y oportunidades de mejora para Mundimotos.";
  const splitP1 = doc.splitTextToSize(propP1, cw - 52);
  doc.text(splitP1, margin + 6, y + 13.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...cBlue);
  doc.text("TRES PILARES INMEDIATOS", margin + 6, y + 25);

  const pillarPhoto = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'pilares', 'collage_fotos.jpg')).toString('base64')}`;
  const pillarImageW = 40;
  const pillarImageH = pillarImageW * (1280 / 1080);
  doc.addImage(pillarPhoto, 'JPEG', margin + cw - pillarImageW - 6, y + 4, pillarImageW, pillarImageH);

  y += propH + 9;

  // Cobertura y Reglas Operativas
  const cobH = 44;
  doc.setFillColor(...cCardBg);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, cw, cobH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cBlue);
  doc.text("COBERTURA TERRITORIAL Y CONDICIONES OPERATIVAS", margin + 6, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cDark);
  doc.text("Parámetros Operativos Claros para Antioquia y Bogotá", margin + 6, y + 14);

  const ruleW = (cw - 16) / 3;
  const rules = [
    { t: "Antioquia", d: "Programación de jornadas presenciales para la población de referencia de 60 colaboradores, coordinada con Mundimotos." },
    { t: "Bogotá", d: "Distribución propuesta en jornadas 2-2-1; las fechas se coordinarán con Mundimotos." },
    { t: "Seguimiento e Informes", d: "Registro de asistencia, aplicación de encuestas de evaluación y entrega de informe final ejecutivo con memorias y hallazgos." }
  ];

  rules.forEach((r, idx) => {
    const rx = margin + 5 + (ruleW + 3) * idx;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(rx, y + 18, ruleW, 21, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(...cDark);
    doc.text(r.t, rx + 3.5, y + 23.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...cGrayText);
    const splitR = doc.splitTextToSize(r.d, ruleW - 7);
    doc.text(splitR, rx + 3.5, y + 28);
  });

  drawFooter(1);

  // =========================================================================
  // PÁGINA 2: METODOLOGÍA VIVENCIAL (6 MOMENTOS) & 6 EJES TEMÁTICOS
  // =========================================================================
  doc.addPage();
  drawHeader(2, 'Metodología Vivencial y Ejes Formativos');

  y = margin + 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...cDark);
  doc.text("La Experiencia en Seis Momentos", margin, y);

  y += 6.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...cGrayText);
  doc.text("Una experiencia 100% práctica, participativa y vivencial, sin cátedras rígidas ni contenidos desconectados de la operación diaria.", margin, y);

  y += 10;

  // 6 Momentos Grid (2 filas x 3 columnas - colectivos)
  const momW = (cw - 8) / 3;
  const momH = 44;
  const momentos = [
    { num: '01', verb: 'CONECTAR', title: 'Bienvenida & Activación', desc: 'Apertura vivencial para romper la inercia, alinear el propósito del encuentro y activar la energía colectiva del equipo.' },
    { num: '02', verb: 'RECONOCER', title: 'Aprendizajes del Año', desc: 'Poner en valor los aportes de las personas, los logros alcanzados y los aprendizajes colectivos en el trabajo cotidiano.' },
    { num: '03', verb: 'ESCUCHAR', title: 'Percepciones de Servicio', desc: 'Espacio guiado para levantar oportunidades de mejora directamente desde el primer contacto con el cliente.' },
    { num: '04', verb: 'EXPERIMENTAR', title: 'Casos & Dinámicas Grupales', desc: 'Dinámicas y simulaciones colectivas aplicadas a situaciones reales de clientes para practicar empatía y manejo de objeciones.' },
    { num: '05', verb: 'FORTALECER', title: 'Herramientas Aplicables', desc: 'Estructuración de pautas claras, mapas de conversación y comportamientos observables de servicio para el mostrador.' },
    { num: '06', verb: 'CERRAR', title: 'Reflexión, Aprendizajes y Reconocimiento', desc: 'Reflexión grupal sobre la experiencia, reconocimiento de los aprendizajes y valoración de los aportes de quienes participaron para fortalecer la cultura organizacional de Mundimotos.' }
  ];

  momentos.forEach((m, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const mx = margin + (momW + 4) * col;
    const my = y + (momH + 5) * row;

    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.4);
    doc.roundedRect(mx, my, momW, momH, 2.5, 2.5, 'FD');

    // Badge numérico
    doc.setFillColor(...cBlueBg);
    doc.setDrawColor(...cBlueBorder);
    doc.roundedRect(mx + 4, my + 4, 15, 5, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...cDark);
    doc.text(m.num, mx + 6.5, my + 7.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...cBlue);
    doc.text(m.verb, mx + 23, my + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...cDark);
    doc.text(m.title, mx + 4, my + 15.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...cGrayText);
    const splitDesc = doc.splitTextToSize(m.desc, momW - 8);
    doc.text(splitDesc, mx + 4, my + 21.5);
  });

  y += (momH * 2) + 15;

  // 6 Temas Transversales
  const temH = 110;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, cw, temH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cBlue);
  doc.text("SEIS TEMAS TRANSVERSALES DEL PRIMER ENCUENTRO", margin + 6, y + 7.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...cDark);
  doc.text("Seis Competencias Clave para la Cultura Organizacional de Mundimotos", margin + 6, y + 15.5);

  const tColW = (cw - 18) / 2;
  const temas = [
    { t: '1. Cultura de servicio y experiencia del cliente', d: 'Comprender el impacto humano y comercial del servicio para transformar la atención habitual en una experiencia memorable y diferenciadora.' },
    { t: '2. Comunicación, escucha activa y empatía', d: 'Herramientas para leer las necesidades del motociclista, saber escuchar antes de ofrecer repuestos y conectar con cercanía y respeto.' },
    { t: '3. Confianza y sentido de pertenencia', d: 'Cohesión de equipo, alineación con la misión corporativa de Mundimotos y orgullo por la labor que cada colaborador desempeña.' },
    { t: '4. Situaciones retadoras y manejo de objeciones', d: 'Técnicas constructivas para abordar quejas, demoras en mostrador y conversaciones complejas manteniendo la calma y el profesionalismo.' },
    { t: '5. Trabajo colaborativo y articulación interáreas', d: 'Coordinación fluida entre bodega, ventas, servicio técnico y áreas administrativas para una entrega sin fricciones.' },
    { t: '6. Experiencias memorables y mejora continua', d: 'Generación constante de valor agregado en cada punto de contacto y mentalidad de evolución para fidelizar al cliente.' }
  ];

  temas.forEach((t, idx) => {
    const cIdx = idx % 2;
    const rIdx = Math.floor(idx / 2);
    const tx = margin + 6 + (tColW + 6) * cIdx;
    const ty = y + 23 + (27 * rIdx);

    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(tx, ty, tColW, 23.5, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(...cDark);
    doc.text(t.t, tx + 3.5, ty + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...cGrayText);
    const splitT = doc.splitTextToSize(t.d, tColW - 7);
    doc.text(splitT, tx + 3.5, ty + 11.5);
  });

  drawFooter(2);

  // =========================================================================
  // PÁGINA 3: PROPUESTA COMERCIAL DEFINITIVA (UN SOLO PAQUETE $33.900.000)
  // =========================================================================
  doc.addPage();
  drawHeader(3, 'Propuesta Comercial Integral');

  y = margin + 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...cDark);
  // Master Bento Card: 2 Columnas (Izquierda: Alcance, Derecha: Inversión)
  const masterH = 135;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, cw, masterH, 3, 3, 'FD');

  // Columna Izquierda: Entregables (cw * 0.6)
  const leftW = cw * 0.58;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cBlue);
  doc.text("ALCANCE INTEGRAL DEL PROGRAMA (9 ENCUENTROS)", margin + 6, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...cDark);
  doc.text("Paquete Integral de Experiencia y Servicio", margin + 6, y + 15);

  const itemsIncluidos = [
    "4 encuentros presenciales en Antioquia para la población de referencia de 60 colaboradores.",
    "5 encuentros presenciales en Bogotá, distribuidos en jornadas 2-2-1.",
    "Planeación, diseño pedagógico y facilitación directiva senior en vivo.",
    "Herramientas vivenciales y recursos didácticos para todas las actividades.",
    "Formatos organizados y control riguroso de asistencia por jornada y sede.",
    "Recolección y procesamiento de encuestas de evaluación de impacto y servicio.",
    "Documento e Informe Final Ejecutivo con evidencias fotográficas, hallazgos, resultados cualitativos y cuantitativos, y recomendaciones."
  ];

  let iy = y + 23;
  itemsIncluidos.forEach(it => {
    doc.setFillColor(...cYellow);
    doc.circle(margin + 8, iy - 1, 1.2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...cGrayText);
    const splitIt = doc.splitTextToSize(it, leftW - 14);
    doc.text(splitIt, margin + 12, iy);
    iy += (splitIt.length > 1 ? 9.5 : 7.5);
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(...cMuted);
  const noteScope = "* Nota de alcance: Los cambios de fechas, jornadas o distribución que impliquen ajustes logísticos o viáticos podrán generar costos adicionales, que se cotizarán y acordarán previamente.";
  doc.text(doc.splitTextToSize(noteScope, leftW - 10), margin + 6, y + masterH - 10);

  // Columna Derecha: Tarjeta de Inversión (cw * 0.42)
  const rightX = margin + leftW + 4;
  const rightW = cw - leftW - 8;
  const invBoxH = masterH - 12;

  doc.setFillColor(...cCardBg);
  doc.setDrawColor(...cYellow);
  doc.setLineWidth(0.8);
  doc.roundedRect(rightX, y + 6, rightW, invBoxH, 2.5, 2.5, 'FD');

  doc.setFillColor(...cYellow);
  doc.roundedRect(rightX, y + 6, rightW, 6.5, 2.5, 2.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...cDarkNavy);
  doc.text("INVERSIÓN TOTAL", rightX + (rightW / 2), y + 10.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...cDark);
  doc.text("$33.900.000", rightX + (rightW / 2), y + 24, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 110, 0);
  doc.text("COP · ANTES DE IVA", rightX + (rightW / 2), y + 29, { align: 'center' });

  // Recuadro interior de Esquema de Pagos 50/50
  const payInnerH = 48;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.3);
  doc.roundedRect(rightX + 4, y + 38, rightW - 8, payInnerH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...cBlue);
  doc.text("ESQUEMA DE PAGOS EN 2 PARTES:", rightX + 6, y + 44);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...cDark);
  doc.text("• Primer Pago (50%):", rightX + 6, y + 51);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...cGrayText);
  doc.text("A mitad del proceso: $16.950.000 COP.", rightX + 6, y + 55.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...cDark);
  doc.text("• Segundo Pago (50%):", rightX + 6, y + 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...cGrayText);
  doc.text("Al finalizar y entregar el informe final: $16.950.000 COP.", rightX + 6, y + 66.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.2);
  doc.setTextColor(...cMuted);
  doc.text("Hasta 5 días hábiles tras recibir la documentación.", rightX + 6, y + 74);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...cDark);
  doc.text("Vigencia de la propuesta: 15 días calendario.", rightX + 6, y + 79);

  // Botón simulado institucional
  doc.setFillColor(...cYellowBg);
  doc.setDrawColor(...cYellowBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(rightX + 4, y + invBoxH - 12, rightW - 8, 8, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...cDark);
  doc.text("PROPUESTA INTEGRAL MUNDIMOTOS", rightX + (rightW / 2), y + invBoxH - 6.8, { align: 'center' });

  y += masterH + 11;

  drawFooter(3);

  // =========================================================================
  // PÁGINA 4: FACILITADORES, CONTINUIDAD 2027 & CONTACTO DIRECTO
  // =========================================================================
  doc.addPage();
  drawHeader(4, 'Equipo de Facilitación y Proyección');

  y = margin + 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...cDark);
  doc.text("Equipo de Facilitación Principal", margin, y);

  y += 6.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...cGrayText);
  doc.text("GRUPO VE POR MÁS integra experiencia directiva, consultoría estratégica y pedagogía vivencial.", margin, y);

  y += 10;

  // 2 Perfiles de Facilitadores
  const facW = (cw - 6) / 2;
  const facH = 46;
  const facilitadores = [
    {
      name: 'EDUARDO GÓMEZ',
      role: 'Facilitador y Formador Experiencial',
      cred: 'Profesional con amplia trayectoria en facilitación vivencial, liderazgo consciente, coaching de equipos y diseño de experiencias formativas de alto impacto humano.',
      org: 'Liderazgo en procesos de cultura organizacional, servicio memorable y fortalecimiento de equipos operativos en toda Colombia.'
    },
    {
      name: 'JUAN MANUEL RESTREPO',
      role: 'Consultor, Formador y Estratega',
      cred: 'Especialista en mercadeo, comunicación estratégica, transformación digital e inteligencia artificial aplicada al desarrollo de organizaciones y equipos comerciales.',
      org: 'Experiencia y conferencias en Cámara de Comercio de Medellín, Fenalco Antioquia y empresas del sector automotriz y retail.'
    }
  ];

  facilitadores.forEach((f, idx) => {
    const fx = margin + (facW + 6) * idx;
    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.4);
    doc.roundedRect(fx, y, facW, facH, 3, 3, 'FD');

    doc.setFillColor(...cBlue);
    doc.roundedRect(fx, y, facW, 2, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...cDark);
    doc.text(f.name, fx + 5, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...cYellow);
    doc.text(f.role, fx + 5, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...cGrayText);
    const splitCred = doc.splitTextToSize(f.cred, facW - 10);
    doc.text(splitCred, fx + 5, y + 20);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(...cMuted);
    const splitOrg = doc.splitTextToSize(f.org, facW - 10);
    doc.text(splitOrg, fx + 5, y + 33);
  });

  y += facH + 5;

  // Continuidad 2027: CREER · CREAR · CRECER + Formador de Formadores + Soluciones Digitales
  const contH = 90;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, cw, contH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...cBlue);
  doc.text("CONTINUIDAD Y PROYECCIÓN ESTRATÉGICA 2027 (ETAPA FUTURA)", margin + 6, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cDark);
  doc.text("Ruta de Evolución: Modelo CREER · CREAR · CRECER & Nuevas Líneas", margin + 6, y + 14);

  const cPillW = (cw - 18) / 3;
  const pilares = [
    { p: 'CREER · Cultura & Personas', d: 'Propósito compartido, liderazgo consciente, valores corporativos y sentido de pertenencia por la marca Mundimotos.' },
    { p: 'CREAR · Procesos & Herramientas', d: 'Modelo de servicio propio, protocolos de mostrador, mapas de conversación y guías prácticas para el equipo comercial.' },
    { p: 'CRECER · Seguimiento & Evolución', d: 'Acompañamiento a líderes de sede, análisis de casos retadores, tableros de servicio y mejora continua de la atención.' }
  ];

  pilares.forEach((pl, idx) => {
    const px = margin + 5 + (cPillW + 4) * idx;
    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(px, y + 18, cPillW, 19, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(...cDark);
    doc.text(pl.p, px + 3, y + 23);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.4);
    doc.setTextColor(...cGrayText);
    const splitPl = doc.splitTextToSize(pl.d, cPillW - 6);
    doc.text(splitPl, px + 3, y + 28);
  });

  // Dos líneas independientes: Formador de Formadores y Líderes Formando Líderes
  const futColW = (cw - 16) / 2;
  const futLines = [
    { t: 'Formador de Formadores', d: 'Capacitación de líderes internos de Mundimotos con habilidades pedagógicas, dinámicas vivenciales y herramientas de facilitación, para que la organización entrene con autonomía a nuevos colaboradores y multiplique internamente su cultura de servicio.' },
    { t: 'Líderes Formando Líderes', d: 'Programa de desarrollo, liderazgo y multiplicación de capacidades bajo estándares de Leadership Development y Train the Trainer: fortalece el liderazgo humano, integra inteligencia artificial aplicada y convierte a los líderes en multiplicadores del conocimiento organizacional.' }
  ];
  futLines.forEach((fl, idx) => {
    const fx = margin + 6 + (futColW + 4) * idx;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(...cDark);
    doc.text(fl.t, fx, y + 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...cGrayText);
    doc.text(doc.splitTextToSize(fl.d, futColW), fx, y + 46);
  });

  // Tres soluciones digitales
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...cBlue);
  doc.text("TRES SOLUCIONES DIGITALES", margin + 6, y + 58);
  const solW = (cw - 18) / 3;
  const soluciones = [
    { t: 'Sistema inteligente de atención y calidad', d: 'Medición de calidad (bueno, regular y malo) · buenas prácticas · preguntas y acompañamiento con IA · guías paso a paso por área · información para mejora continua.' },
    { t: 'Software personalizado de inventarios', d: 'Inventarios con fotografías · marcas y categorías · roles y permisos · posible integración POS · tiempo real si es viable · posibilidades de IA · interfaz sencilla.' },
    { t: 'Plataforma educativa propia', d: 'Integración propuesta con el sitio web o canales de Mundimotos · módulos personalizados · formación continua · seguimiento del aprendizaje · acceso móvil · posible aplicación.' }
  ];
  soluciones.forEach((sl, idx) => {
    const sx = margin + 5 + (solW + 4) * idx;
    doc.setFillColor(...cCardBg);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(sx, y + 61, solW, 22, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(...cDark);
    doc.text(doc.splitTextToSize(sl.t, solW - 6), sx + 3, y + 65.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.9);
    doc.setTextColor(...cGrayText);
    doc.text(doc.splitTextToSize(sl.d, solW - 6), sx + 3, y + 69.5);
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(5.8);
  doc.setTextColor(...cMuted);
  const futureNote = "* Iniciativas propuestas para desarrollar en 2027; no son productos implementados ni forman parte del paquete comercial actual. Su viabilidad y funcionalidades dependerán de evaluación técnica.";
  doc.text(doc.splitTextToSize(futureNote, cw - 12), margin + 6, y + 85.5);

y += contH + 4;

  // Condiciones Generales y Logística
  const condH = 48;
  doc.setFillColor(...cCardBg);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, cw, condH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(...cBlue);
  doc.text("CONDICIONES COMERCIALES Y LOGÍSTICAS", margin + 6, y + 6);

  const conditionCards = [
    { title: "Servicios no incluidos", text: "Sesiones virtuales adicionales y encuentros presenciales adicionales se cotizan por separado.", icon: 'services' },
    { title: "Modificaciones del cronograma", text: "Cualquier cambio de fechas, jornadas o distribución de actividades que genere costos adicionales de logística o viáticos deberá cotizarse y acordarse previamente con Mundimotos.", icon: 'schedule' },
    { title: "Logística a cargo del cliente", text: "El cliente dispone los espacios físicos, los refrigerios y la convocatoria de los participantes.", icon: 'logistics' },
    { title: "Propiedad intelectual", text: "Las metodologías, los contenidos y las herramientas pertenecen a GRUPO VE POR MÁS, conforme a las condiciones acordadas.", icon: 'ownership' }
  ];
  const conditionW = (cw - 18) / 2;
  conditionCards.forEach((condition, idx) => {
    const column = idx % 2;
    const row = Math.floor(idx / 2);
    const x = margin + 6 + column * (conditionW + 6);
    const cardY = y + 10 + row * 20;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cardY, conditionW, 17, 1.5, 1.5, 'FD');
    drawConditionIcon(condition.icon, x + 3, cardY + 1);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.3);
    doc.setTextColor(...cDark);
    doc.text(condition.title, x + 11, cardY + 4.2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(...cGrayText);
    doc.text(doc.splitTextToSize(condition.text, conditionW - 6), x + 3, cardY + 7.5);
  });

  y += condH + 3;

  // Cierre Ejecutivo, Punto de Contacto y Firma
  const ctcH = 34;
  doc.setFillColor(...cBlueBg);
  doc.setDrawColor(...cBlueBorder);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, cw, ctcH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text("Coordinemos el Inicio de la Experiencia", margin + 6, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.setTextColor(...cGrayText);
  const contactIntro = "Estamos listos para agendar la sesión técnica con la dirección de Mundimotos, definir los detalles del encuentro, ajustar las fechas de ejecución en Bogotá y Antioquia y dar inicio al levantamiento metodológico.";
  doc.text(doc.splitTextToSize(contactIntro, cw - 12), margin + 6, y + 10.5);

  const ctcW = (cw - 12) / 3;
  const contacts = [
    { l: "CORREO ELECTRÓNICO", v: "ceo@pdpcomunica.com", href: "mailto:ceo@pdpcomunica.com" },
    { l: "WHATSAPP / TELÉFONO", v: "+57 305 233 9865", href: "https://wa.me/573052339865" },
    { l: "SITIO WEB OFICIAL", v: "pdpcomunica.com", href: "https://pdpcomunica.com/" }
  ];

  contacts.forEach((c, idx) => {
    const cx = margin + 6 + ctcW * idx;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...cMuted);
    doc.text(c.l, cx, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...cDark);
    doc.textWithLink(c.v, cx, y + 27.5, { url: c.href });
  });

  drawFooter(4);

  return doc;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildProposalPDF };

  if (require.main === module) {
    const doc = buildProposalPDF();
    const outPath = path.join(__dirname, 'Propuesta_Comercial_Mundimotos.pdf');
    fs.writeFileSync(outPath, Buffer.from(doc.output('arraybuffer')));
    console.log(`PDF successfully generated at: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  }
}
