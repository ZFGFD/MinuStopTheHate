function scrollToSection(selector){
  const el = document.querySelector(selector);
  if(!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
}

/* REPORT MODAL */
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

/* Submit: erzeugt Text und kopiert ihn in die Zwischenablage */
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

  // in Zwischenablage kopieren
  navigator.clipboard.writeText(reportText).then(() => {
    alert('Bericht in die Zwischenablage kopiert. Füge ihn in eine E-Mail oder ein Meldeformular ein.');
    closeReportModal();
  }).catch(() => {
    // Fallback: Zeige das Report-Text in prompt zum manuellen Kopieren
    prompt('Kopiere den folgenden Text manuell:', reportText);
    closeReportModal();
  });
}

/* Escape schließt Modal */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeReportModal();
});
