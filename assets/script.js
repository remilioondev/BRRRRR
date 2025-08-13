/* Simple site config — cámbialo a tu gusto */
const CONFIG = {
  tokenName: "BRRR",
  tokenSymbol: "$BRRR",
  // Contrato en Base (cámbialo aquí y se refleja en toda la web)
  contract: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  // Dexscreener URL (si cambias de par, actualiza esto)
  dexscreenerUrl: "https://dexscreener.com/base/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15",
  // Enlaces sociales / compra
  buyUrl: "https://dexscreener.com/base/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  twitterUrl: "https://x.com/Based_BRRR",
  telegramUrl: "https://t.me/MoneyprintergoBRR",
  websiteUrl: "https://moneyprintergobrrr.store",
  supply: "1,000,000,000",
  taxes: "0/0"
};

// Utilidades simples
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

function bindConfig(){
  // Texto
  $$("#contract-address").forEach ? null : null; // noop to avoid older envs
  const elAddr = $("#contract-address");
  if (elAddr) elAddr.textContent = CONFIG.contract;

  $$("[data-bind='tokenName']").forEach(n => n.textContent = CONFIG.tokenName);
  $$("[data-bind='tokenSymbol']").forEach(n => n.textContent = CONFIG.tokenSymbol);
  $$("[data-bind='supply']").forEach(n => n.textContent = CONFIG.supply);
  $$("[data-bind='taxes']").forEach(n => n.textContent = CONFIG.taxes);

  // Enlaces
  $$("[data-bind='buyUrl']").forEach(a => a.href = CONFIG.buyUrl);
  $$("[data-bind='twitterUrl']").forEach(a => a.href = CONFIG.twitterUrl);
  $$("[data-bind='telegramUrl']").forEach(a => a.href = CONFIG.telegramUrl);
  $$("[data-bind='websiteUrl']").forEach(a => a.href = CONFIG.websiteUrl);

  // Dex iframe
  const iframe = $("#dex-iframe");
  if (iframe) iframe.src = CONFIG.dexscreenerUrl;

  // Año en footer
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

function setupCopy(){
  const btn = $("#copy-btn");
  const elAddr = $("#contract-address");
  if (!btn || !elAddr) return;

  btn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(CONFIG.contract);
      btn.textContent = "Copied!";
      setTimeout(()=> btn.textContent = "Copy", 1200);
    }catch(err){
      console.warn("Clipboard failed, fallback", err);
      // fallback
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elAddr);
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      btn.textContent = "Copied!";
      setTimeout(()=> btn.textContent = "Copy", 1200);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupShakeBar();
  bindConfig();
  setupCopy();
});


/* ===== Shake bar logic ===== */
let _shakeRAF = null;
let _shakeIntensity = 0; // 0..1

function _applyShakeFrame(){
  // amplitude in px; at full intensity ~14px jitter, small rotation
  const amp = 14 * _shakeIntensity;
  const dx = (Math.random()*2 - 1) * amp;
  const dy = (Math.random()*2 - 1) * amp;
  const rot = (Math.random()*2 - 1) * (1.2 * _shakeIntensity);
  document.body.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
  _shakeRAF = requestAnimationFrame(_applyShakeFrame);
}

function _startShake(){
  if (_shakeRAF) return;
  document.documentElement.classList.add("shake-active");
  _shakeRAF = requestAnimationFrame(_applyShakeFrame);
}

function _stopShake(){
  if (_shakeRAF){
    cancelAnimationFrame(_shakeRAF);
    _shakeRAF = null;
  }
  document.documentElement.classList.remove("shake-active");
  document.body.style.transform = "";
}

function setupShakeBar(){
  const slider = document.getElementById("shake-slider");
  const shakebar = document.querySelector(".shakebar");
  if (!slider || !shakebar) return;

  const update = () => {
    const val = Number(slider.value) || 0; // 0..100
    _shakeIntensity = Math.min(1, Math.max(0, val / 100));
    // visual glow feedback
    shakebar.style.setProperty("--shake-glow", String(_shakeIntensity));

    if (_shakeIntensity >= 0.9){
      _startShake();
    }else if (_shakeIntensity <= 0.05){
      _stopShake();
    }else{
      // mid values: gentle shake
      _startShake();
    }
  };

  slider.addEventListener("input", update);
  slider.addEventListener("change", update);
  // Initialize
  update();
}
