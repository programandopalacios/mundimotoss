# Propuesta Digital Corporativa · Mundimotos
## «Experiencia de Servicio y Conexión» · Cierre de Año 2026
**Proponente:** Grupo Ve Por Más S.A.S. (Juan Manuel Restrepo & Eduardo Gómez)  
**Respaldo Institucional:** Academia Punto D’ Partida · Agencia PDP · Pro Juan Manuel  
**Cliente:** Mundimotos (Bogotá D.C. & Antioquia)  
**Población de Referencia:** 140 Colaboradores (80 Bogotá · 60 Antioquia)

---

### 🚀 Resumen del Proyecto

Propuesta comercial y técnica digital desarrollada como landing ejecutiva de alto impacto para **Mundimotos**.

El diseño está construido con máxima fidelidad al referente corporativo [Formando Líderes](https://formando-lideres-m.vercel.app/), incorporando:
- **Sistema Bento Grid:** Grilla modular de 12 columnas con tarjetas de cristal (`--border-subtle`), resplandor interno (*inner glow*) y radios suaves.
- **Tema Dual (Light / Dark):** Modo claro predeterminado, con modo oscuro disponible desde la barra superior y preferencia guardada en `localStorage`.
- **Paleta Oficial Mundimotos:** Azul profundo (`#123F70`), Azul vivo (`#0D5B99`), Amarillo acento (`#F5A900`), Carbón (`#17212B`) y Blanco (`#FFFFFF`).
- **Carrusel Infinito (*Marquee*):** Riel animado continuo con 8 marcas institucionales y empresariales autorizadas.
- **Galería Editorial con Lightbox:** Mosaico fotográfico bento con fotos reales de talleres en vivo y visor modal a pantalla completa con navegación por teclado y botones.
- **Propuesta Comercial Integral:** Alcance de 9 encuentros presenciales, inversión, condiciones de pago y canales directos de contacto.
- **Exportación Vectorial a PDF:** Motor integrado con `jsPDF` que genera y descarga en milisegundos un documento corporativo A4 de 4 páginas (`Propuesta_Comercial_Mundimotos.pdf`).

---

### 📐 Las 10 Secciones del Documento Maestro Implementadas

El bloque 10 agrupa Condiciones Comerciales y Contacto; en el HTML se presentan como dos secciones consecutivas.

1. **Hero / Inicio (`#inicio`):** Eyebrows oficiales, título principal, subtítulo, descriptor, 4 bloques métricos (140 colaboradores, 80 Bogotá, 60 Antioquia y cronograma por coordinar) y CTAs.
2. **Propósito (`#proposito`):** Sentido de la experiencia de cierre de año para hacer una pausa, reconocer el trabajo y abrir conversaciones para el crecimiento.
3. **Cobertura (`#cobertura`):** Desglose de 140 colaboradores (80 Bogotá / 60 Antioquia), cuatro encuentros en Antioquia y cinco en Bogotá distribuidos en jornadas 2-2-1; fechas por coordinar.
4. **Metodología & Experiencia (`#experiencia`):**
   * **6 Momentos:** 01 Conectar, 02 Reconocer, 03 Escuchar, 04 Experimentar, 05 Fortalecer, 06 Cerrar.
   * **6 Temas Transversales:** Cultura de servicio, Comunicación/empatía, Confianza, Conversaciones difíciles, Colaboración y Mejora continua.
5. **Paquete Integral de Experiencia y Servicio (`#paquetes`):** 9 encuentros presenciales (4 Antioquia y 5 Bogotá, con distribución 2-2-1), herramientas de trabajo, registro de asistencia, encuestas e informe final con evidencias fotográficas, hallazgos y resultados cualitativos y cuantitativos.
6. **Facilitadores (`#facilitadores`):** Perfiles y fotografías de alta resolución de Juan Manuel Restrepo y Eduardo Gómez.
7. **Trayectoria (`#trayectoria`):** Carrusel animado de marcas institucionales (Cámara de Comercio, Leonisa, Fenalco, Univ. de Medellín, Alcaldía de Itagüí, Finanzas Consulting, Coca-Cola, Proyecto Matuna).
8. **Galería de Experiencias (`#galeria`):** Mosaico con fotografías reales de talleres en vivo y visor modal Lightbox.
9. **Continuidad 2027 (`#continuidad`):** CREER · CREAR · CRECER, dos líneas independientes de desarrollo y tres soluciones digitales propuestas, no implementadas.
10. **Condiciones Comerciales & Contacto (`#condiciones`, `#contacto`):** Inversión y pagos, cuatro condiciones comerciales, logística de Mundimotos y canales directos de contacto.

---

### 💻 Cómo Ejecutar Localmente

- **Visualización Directa:** Abre `index.html` en Google Chrome o Microsoft Edge.
- **Servidor Local de Desarrollo:**
  ```bash
  npx serve .
  ```
- **Verificación Automatizada del PDF:**
  ```bash
  node verify-pdf.js
  ```

---
