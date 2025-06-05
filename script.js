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
