# Voccel Studio — Sitio Web

## Arquitectura del proyecto

```
voccel/
├── index.html          # HTML principal (semántico, accesible)
├── css/
│   └── styles.css      # Todos los estilos con CSS variables
├── js/
│   └── main.js         # JavaScript modular y limpio
└── assets/             # Imágenes, íconos, etc. (a agregar)
```

## Decisiones de arquitectura

- **Sin frameworks**: HTML/CSS/JS vanilla puro, sin dependencias de build.
- **CSS Variables**: todos los colores, fuentes y espaciados centralizados en `:root`.
- **Separación de responsabilidades**: estructura (HTML), presentación (CSS), comportamiento (JS) completamente separados.
- **Accesibilidad**: uso correcto de `aria-label`, `role`, `id` para screen readers.
- **Performance**: fuentes cargadas desde Google Fonts con `preconnect`, JS con `defer`.
- **Animaciones**: IntersectionObserver propio (sin librerías externas), `data-aos` + `data-aos-delay`.

## Cómo usar

Simplemente abrí `index.html` en el navegador, o servilo con cualquier servidor estático:

```bash
npx serve .
# o
python3 -m http.server 3000
```

## Personalización

- **Colores**: editá las variables en `:root` dentro de `css/styles.css`
- **Contenido**: todo el texto editable está en `index.html`
- **Portfolio**: reemplazá los `.portfolio-img-placeholder` por `<img>` reales
- **Forms**: conectá los forms a tu backend/servicio (EmailJS, Formspree, etc.)
