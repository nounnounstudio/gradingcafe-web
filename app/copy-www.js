// Kopiert das Spiel aus ../spiel nach www/ (App-Inhalt). Service-Worker wird in der App nicht gebraucht.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..', 'spiel'), dst = path.join(__dirname, 'www');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
let html = fs.readFileSync(path.join(dst, 'index.html'), 'utf8');
html = html.replace(/<script>if \("serviceWorker"[^<]*<\/script>\n?/, '');
// App-Brücke: Zurück-Taste von Android an den Browser-Verlauf geben, Statusleiste dunkel
html = html.replace('</body>', `<script>
(function(){ const C=window.Capacitor; if(!C||!C.Plugins) return; const P=C.Plugins;
  if (P.App) P.App.addListener('backButton', ({canGoBack})=>{ if (canGoBack) history.back(); else P.App.exitApp(); });
  if (P.StatusBar){ try { P.StatusBar.setStyle({style:'DARK'}); P.StatusBar.setBackgroundColor({color:'#120d0a'}); } catch(e){} }
  if (P.ScreenOrientation){ try { P.ScreenOrientation.lock({orientation:'portrait'}); } catch(e){} }
})();
</script>
</body>`);
fs.writeFileSync(path.join(dst, 'index.html'), html);
console.log('www bereit:', dst);
