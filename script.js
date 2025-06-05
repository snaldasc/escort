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

// Telegram-Bot-Konfiguration
const TELEGRAM_TOKEN = '7597753174:AAE1hULvC4ancEULoRYaGObjYDROX8hoWok'; // <== Hier dein Bot-Token einfügen (vorsichtig!)
const TELEGRAM_CHAT_ID = '-2600357213'; // <== Hier die Ziel-Gruppen-Chat-ID einfügen

function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      console.log('Telegram-Nachricht erfolgreich gesendet!');
    } else {
      console.error('Fehler beim Senden:', data);
    }
  })
  .catch(console.error);
}

// Modal-Funktion & Buchungsformular mit Telegram-Anbindung
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

      // Daten aus dem Formular auslesen
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const date = form.date.value;
      const message = form.message.value.trim() || 'Keine Nachricht';

      // Nachricht für Telegram zusammenbauen
      const telegramText = `
Neue Buchung:
Name: ${name}
E-Mail: ${email}
Datum: ${date}
Nachricht: ${message}
      `;

      // Telegram-Nachricht senden
      sendTelegramMessage(telegramText);

      // Formular verstecken, Erfolgsmeldung anzeigen
      form.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }
});
