// Smooth Scroll
function scrollToSection(selector){
  const el = document.querySelector(selector);
  if(!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
}

// Modal
function openReportModal(){
  const m = document.getElementById('reportModal');
  if(!m) return;
  m.setAttribute('aria-hidden','false');
}
function closeReportModal(){
  const m = document.getElementById('reportModal');
  if(!m) return;
  m.setAttribute('aria-hidden','true');
}

// Submit Report
function submitReport(){
  const name = document.getElementById('repName').value || 'Anonym';
  const date = document.getElementById('repDate').value || '(Datum nicht angegeben)';
  const desc = document.getElementById('repDesc').value || '(Keine Schilderung angegeben)';

  const reportText = [
    `Meldender: ${name}`,
    `Betroffene Person: Max`,
    `Datum: ${date}`,
    `Schilderung: ${desc}`,
    `Hinweis: Körperliche Gewalt ist niemals akzeptabel. Bitte prüfen und geeignete Maßnahmen ergreifen.`
  ].join('\n\n');

  navigator.clipboard.writeText(reportText).then(() => {
    alert('Bericht in die Zwischenablage kopiert. Füge ihn in E-Mail oder Meldeformular ein.');
    closeReportModal();
  }).catch(() => {
    prompt('Kopiere den Text manuell:', reportText);
    closeReportModal();
  });
}

// Escape schließt Modal
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeReportModal();
});

// Optional: Fade-In beim Scrollen
const faders = document.querySelectorAll('.section, .card, .resource, .subsection');
const appearOptions = { threshold:0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
