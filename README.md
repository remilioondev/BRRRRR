# BRRR – Clean HTML/CSS/JS (sin bundlers)

Proyecto reordenado para que sea **muy fácil editar en VS Code** sin Vite/React ni archivos minificados.

## 📁 Estructura
```
the-printer/
├─ index.html          ← Edítalo aquí: textos y secciones
├─ assets/
│  ├─ styles.css       ← Colores/estilos
│  ├─ script.js        ← CONFIG (contrato, links, chart) y JS básico
│  └─ print.gif        ← (opcional) tu GIF de fondo del hero
```

## ⚙️ Configuración rápida
Abre `assets/script.js` y cambia los valores del objeto `CONFIG`:
- `contract` – tu contrato en Base
- `dexscreenerUrl` – el iframe del par en Dexscreener
- `buyUrl`, `twitterUrl`, `telegramUrl`, `websiteUrl`
- `supply`, `taxes`, etc.

Todo se refleja automáticamente en la web.

## 🧩 Componentes incl.
- **Hero** con GIF de fondo (puedes quitarlo o usar `assets/print.gif`)
- **Contract** con botón *Copy*
- **Dexscreener embed** responsive
- **How to buy** y **Tokenomics**
- Footer simple con links

## 🛠️ Personalización
- Cambia textos directamente en `index.html`.
- Ajusta estilos globales en `:root` dentro de `assets/styles.css`.
- Si no quieres el GIF remoto, reemplaza `background-image` en `.hero__bg` por tu archivo local.

¡Listo para abrir en cualquier hosting estático! :)
