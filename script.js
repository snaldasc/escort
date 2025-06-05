function scrollToSection() {
  document.getElementById('damen').scrollIntoView({ behavior: 'smooth' });
}

const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
const cards = document.querySelectorAll('.card');

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    const active = Array.from(checkboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value);

    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const match = active.every(tag => tags.includes(tag));
      card.style.display = (match || active.length === 0) ? 'block' : 'none';
    });
  });
});
// Modal-Elemente
const modal = document.getElementById('bookingModal');
const openBtn = document.getElementById('openBooking');
const closeBtn = document.getElementById('closeBooking');
const form = document.getElementById('bookingForm');
const successMsg = document.getElementById('bookingSuccess');

// Modal öffnen
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  successMsg.style.display = 'none';
  form.style.display = 'block';
  form.reset();
});

// Modal schließen
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Klick außerhalb des Modals schließt es
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Formular absenden
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Hier könntest du eine echte Anfrage an Server schicken
  // z.B. fetch('/buchung', {method: 'POST', body: FormData...})

  // Für Demo zeigen wir nur Erfolgsmeldung
  form.style.display = 'none';
  successMsg.style.display = 'block';
});
