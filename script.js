// Scrollfunktion (optional)
function scrollToSection() {
  const el = document.getElementById('damen');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Filterfunktion (optional, wenn auf Seite vorhanden)
const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
const cards = document.querySelectorAll('.card');

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    const active = Array.from(checkboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value);

    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(' ');
      const match = active.every(tag => tags.includes(tag));
      card.style.display = (match || active.length === 0) ? 'block' : 'none';
    });
  });
});

// Modal-Funktion
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookingModal');
  const openBtn = document.getElementById('openBooking');
  const closeBtn = document.getElementById('closeBooking');
  const form = document.getElementById('bookingForm');
  const successMsg = document.getElementById('bookingSuccess');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      successMsg.style.display = 'none';
      form.style.display = 'block';
      form.reset();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
});
