/* --- SMOOTH SCROLL --- */
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* --- MODAL --- */
const modal = document.getElementById('reportModal');

function openReportModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeReportModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', e => {
  if (e.target === modal) closeReportModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReportModal();
});

/* --- REPORT SUBMIT --- */
function submitReport() {
  const name = document.getElementById('repName').value.trim() || 'Anonym';
  const date = document.getElementById('repDate').value || '(Datum nicht angegeben)';
  const desc = document.getElementById('repDesc').value.trim();

  if (!desc) {
    alert('Bitte schildere den Vorfall kurz.');
    return;
  }

  const reportText = [
    `Meldender: ${name}`,
    `Betroffene Person: Max`,
    `Datum: ${date}`,
    `Schilderung: ${desc}`,
    `Hinweis: Körperliche Gewalt ist niemals akzeptabel.`
  ].join('\n\n');

  navigator.clipboard.writeText(reportText).then(() => {
    showReportFeedback();
    closeReportModal();
  }).catch(() => prompt('Kopiere den folgenden Text manuell:', reportText));
}

/* --- FEEDBACK ANIMATION --- */
function showReportFeedback() {
  const feedback = document.createElement('div');
  feedback.className = 'report-feedback';
  feedback.innerText = '✅ Bericht kopiert! Füge ihn in ein Formular oder E-Mail ein.';
  document.body.appendChild(feedback);

  feedback.animate([
    { transform: 'translateY(0)', opacity: 0 },
    { transform: 'translateY(-20px)', opacity: 1 },
    { transform: 'translateY(-50px)', opacity: 0 }
  ], {
    duration: 2000,
    easing: 'ease-out'
  });

  setTimeout(() => feedback.remove(), 2000);
}

/* --- WAVE EFFECT BUTTONS --- */
document.querySelectorAll('.btn-wave').forEach(btn => {
  btn.addEventListener('mouseenter', e => {
    const circle = document.createElement('span');
    circle.className = 'btn-wave-circle';
    btn.appendChild(circle);

    const rect = btn.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left + 'px';
    circle.style.top = e.clientY - rect.top + 'px';

    setTimeout(() => circle.remove(), 600);
  });
});
