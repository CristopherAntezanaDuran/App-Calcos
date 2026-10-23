// Copia las librerías y fuentes dentro de www/ para que la app funcione SIN internet.
const fs = require("fs"), path = require("path");
const R = path.join(__dirname, ".."), NM = path.join(R, "node_modules"), WWW = path.join(R, "www");
const lib = path.join(WWW, "lib"), fonts = path.join(WWW, "fonts");
fs.mkdirSync(lib, { recursive: true }); fs.mkdirSync(fonts, { recursive: true });

function copiar(desde, hacia) {
  const d = path.join(NM, desde);
  if (!fs.existsSync(d)) { console.error("  ✗ Falta " + desde + " (¿ejecutaste npm install?)"); process.exit(1); }
  fs.cpSync(d, hacia, { recursive: true }); console.log("  ✓ " + path.relative(R, hacia));
}
console.log("Preparando librerías sin conexión…");
copiar("jspdf/dist/jspdf.umd.min.js", path.join(lib, "jspdf.umd.min.js"));
copiar("pdfjs-dist/build/pdf.min.js", path.join(lib, "pdf.min.js"));
copiar("pdfjs-dist/build/pdf.worker.min.js", path.join(lib, "pdf.worker.min.js"));

const pesos = { "big-shoulders-stencil-display": ["800"], "ibm-plex-sans-condensed": ["400", "500", "600", "700"], "ibm-plex-mono": ["400", "600"] };
let css = "/* Fuentes locales (generado por scripts/preparar.js) */\n";
for (const [fam, ws] of Object.entries(pesos)) {
  const src = path.join(NM, "@fontsource", fam);
  if (!fs.existsSync(src)) { console.warn("  ! Fuente no encontrada: " + fam + " (se usará la del sistema)"); continue; }
  fs.cpSync(path.join(src, "files"), path.join(fonts, fam, "files"), { recursive: true });
  for (const w of ws) {
    const f = path.join(src, w + ".css");
    if (fs.existsSync(f)) { fs.copyFileSync(f, path.join(fonts, fam, w + ".css")); css += `@import "${fam}/${w}.css";\n`; }
  }
  console.log("  ✓ fuente " + fam);
}
fs.writeFileSync(path.join(fonts, "fonts.css"), css);
console.log("Listo.");
