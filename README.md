# Propuesta Corporativa Mundimotos

Sitio web de presentación de **«Experiencia de Servicio y Conexión»**, una propuesta comercial y metodológica de Grupo Ve Por Más S.A.S. para los equipos de Mundimotos en Bogotá y Antioquia.

El proyecto reúne la presentación de la experiencia, su metodología, los facilitadores, la trayectoria y las condiciones comerciales en una página web adaptable a distintos dispositivos.

## Sitio web

**Producción:** [https://propuesta-mundimotos.vercel.app/](https://propuesta-mundimotos.vercel.app/)

**Repositorio:** [https://github.com/programandopalacios/mundimotoss](https://github.com/programandopalacios/mundimotoss)

## Descripción del proyecto

La página presenta una propuesta de cierre de año 2026 para Mundimotos, dirigida a una población de referencia de 140 colaboradores en Antioquia y Bogotá.

El sitio combina información sobre el propósito y la cobertura de la experiencia con una metodología participativa, perfiles de facilitadores, evidencia fotográfica, condiciones comerciales y canales de contacto. También incluye una opción para generar y descargar la propuesta en PDF.

## Objetivos

- Presentar la propuesta de experiencia de servicio y conexión para Mundimotos.
- Explicar el propósito, la cobertura territorial y la metodología de trabajo.
- Dar a conocer a los facilitadores y su trayectoria.
- Mostrar fotografías de experiencias y talleres.
- Presentar el alcance, las condiciones comerciales y la continuidad propuesta para 2027.
- Facilitar el contacto con Grupo Ve Por Más.
- Ofrecer una experiencia de navegación adaptable a móviles y computadores.

## Secciones

### Inicio

Presentación de la propuesta, sus objetivos y acceso a las principales secciones.

### Propósito

Explica el sentido de la experiencia y su relación con la cultura de servicio, la comunicación, la colaboración y la experiencia del cliente.

### Cobertura

Presenta la planificación territorial para los equipos de Antioquia y Bogotá, con una población de referencia de 140 colaboradores.

### Experiencia

Describe la metodología en seis momentos: conectar, reconocer, escuchar, experimentar, fortalecer y cerrar; además de los temas transversales del encuentro.

### Paquete integral

Resume el alcance de la propuesta, sus componentes metodológicos y los entregables contemplados.

### Facilitadores

Presenta los perfiles de Eduardo Gómez y Juan Manuel Restrepo.

### Trayectoria

Muestra marcas y organizaciones relacionadas con la experiencia profesional de los facilitadores.

### Galería

Galería fotográfica de actividades, encuentros y talleres.

### Continuidad 2027

Expone líneas de continuidad y soluciones propuestas para evaluar en 2027.

### Condiciones comerciales y contacto

Reúne las condiciones comerciales y logísticas de la propuesta y los canales de contacto de Grupo Ve Por Más.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) para la generación del PDF en el navegador y desde Node.js
- Node.js y npm para los scripts auxiliares de generación y verificación del PDF
- Git y GitHub
- Vercel

## Diseño y experiencia

La interfaz utiliza una identidad visual basada en los colores corporativos de Mundimotos, una composición modular tipo Bento Grid y temas claro y oscuro. La preferencia de tema se guarda en el navegador.

Incluye un carrusel de marcas, una galería con visor de imágenes y navegación mediante controles y teclado, y una presentación adaptable a diferentes tamaños de pantalla.

## Estructura del proyecto

```text
mundimotos/
├── assets/
│   ├── facilitators/
│   ├── gallery/
│   ├── images/
│   ├── logos/
│   └── pilares/
├── generate-pdf.js
├── index.html
├── package.json
├── package-lock.json
├── Propuesta_Comercial_Mundimotos.pdf
├── vercel.json
└── verify-pdf.js
```

La página principal está implementada en `index.html`; las imágenes y marcas utilizadas se encuentran en `assets/`.

## Ejecución local

Clona el repositorio y entra al directorio:

```bash
git clone https://github.com/programandopalacios/mundimotoss.git
cd mundimotoss
```

Instala las dependencias necesarias para los scripts del PDF:

```bash
npm install
```

Inicia el servidor local:

```bash
npm run dev
```

También puedes abrir `index.html` directamente en un navegador.

## PDF

Para generar el documento PDF desde Node.js:

```bash
node generate-pdf.js
```

Para ejecutar la verificación automatizada:

```bash
node verify-pdf.js
```

## Despliegue

El sitio está publicado en Vercel: [https://propuesta-mundimotos.vercel.app/](https://propuesta-mundimotos.vercel.app/).

La configuración del proyecto para Vercel se encuentra en `vercel.json`. La publicación automática después de cambios en GitHub depende de que el proyecto de Vercel esté conectado al repositorio.

## Autoría y créditos

Sitio web realizado por **Marlon David Palacios Parra** para **Grupo Ve Por Más S.A.S.**, como presentación de su propuesta comercial y metodológica para Mundimotos.

La propuesta cuenta con la participación de Eduardo Gómez y Juan Manuel Restrepo.

El contenido, las fotografías, los logotipos y las marcas pertenecen a sus respectivos titulares y se utilizan en el contexto de la propuesta.

## Estado del proyecto

Sitio publicado y disponible en producción como presentación de la propuesta comercial y técnica para Mundimotos.

---

© 2026 Grupo Ve Por Más S.A.S. · Sitio web realizado por Marlon David Palacios Parra para Mundimotos.
