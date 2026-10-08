// Orientační kalkulačka. Hodnoty jsou ZÁSTUPNÉ, upravte podle skutečného ceníku firmy.
const BASE = {1: [4000, 8000], 2: [8000, 15000], 3: [14000, 26000], 4: [20000, 38000], 5: [35000, 80000]};
const FLOOR_ADD = [0, 1500, 3500];
const CELLAR_ADD = [1500, 4000];
const CLEAN_ADD = [1500, 4000];

const $ = (id) => document.getElementById(id);
const fmt = (n) => (Math.round(n / 500) * 500).toLocaleString('cs-CZ');

function calc() {
  const [lo, hi] = BASE[$('cSize').value];
  const load = parseFloat($('cLoad').value);
  const floor = FLOOR_ADD[$('cFloor').value];
  let min = lo * load + floor;
  let max = hi * load + floor * 1.5;
  if ($('cCellar').checked) { min += CELLAR_ADD[0]; max += CELLAR_ADD[1]; }
  if ($('cClean').checked) { min += CLEAN_ADD[0]; max += CLEAN_ADD[1]; }
  $('cOut').textContent = `${fmt(min)} – ${fmt(max)} Kč`;
}
document.querySelectorAll('#calc select, #calc input').forEach((el) => el.addEventListener('input', calc));
calc();

// Formulář: zatím jen validace. Napojte na e-mail / n8n webhook / CRM.
const WEBHOOK_URL = ''; // např. https://vase-n8n.example/webhook/poptavka
$('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target, msg = $('formMsg');
  const data = Object.fromEntries(new FormData(f));
  if (!data.name.trim() || data.phone.replace(/\D/g, '').length < 9) {
    msg.className = 'form-msg err';
    msg.textContent = 'Vyplňte prosím jméno a platný telefon.';
    return;
  }
  try {
    if (WEBHOOK_URL) {
      const r = await fetch(WEBHOOK_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
      if (!r.ok) throw new Error(r.status);
    }
    msg.className = 'form-msg ok';
    msg.textContent = 'Děkujeme! Ozveme se vám co nejdřív.';
    f.reset();
  } catch {
    msg.className = 'form-msg err';
    msg.textContent = 'Odeslání se nepovedlo. Zavolejte nám prosím.';
  }
});

$('yr').textContent = new Date().getFullYear();
document.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', () => $('nav').classList.remove('open')));
