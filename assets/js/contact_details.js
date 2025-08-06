document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function activateTab(tab) {
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('active', isActive);
    });
    tabPanes.forEach(pane => {
      const isActive = pane.id === tab;
      pane.classList.toggle('active', isActive);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.getAttribute('data-tab')));
  });

  document.querySelectorAll('[data-open-tab]').forEach(el => {
    el.addEventListener('click', () => activateTab(el.getAttribute('data-open-tab')));
  });

  const addNoteBtn = document.getElementById('add-note-btn');
  const newNoteInput = document.getElementById('new-note-input');
  const notesList = document.getElementById('notes-list');

  if (addNoteBtn && newNoteInput && notesList) {
    addNoteBtn.addEventListener('click', () => {
      const text = newNoteInput.value.trim();
      if (!text) return;
      const date = new Date().toLocaleDateString('pl-PL');
      const note = document.createElement('div');
      note.className = 'border p-3 rounded';
      note.innerHTML = `<div class="text-sm text-gray-600 mb-1">Anna Nowak – ${date}</div><div>${text}</div>`;
      notesList.prepend(note);
      newNoteInput.value = '';
    });
  }

  const emailsList = document.getElementById('emails-list');
  if (emailsList) {
    const emails = [
      {
        direction: 'outgoing',
        user: 'Anna Nowak',
        date: '01.04.2024',
        subject: 'Powitanie i przedstawienie oferty',
        body: 'Dzień dobry, w załączeniu przesyłam ofertę naszej firmy.'
      },
      {
        direction: 'incoming',
        user: 'Jan Kowalski',
        date: '02.04.2024',
        subject: 'Odpowiedź na ofertę',
        body: 'Dziękuję za ofertę. Chciałbym uzyskać więcej informacji.'
      }
    ];

    emails.forEach(email => {
      const wrapper = document.createElement('div');
      wrapper.className = 'border rounded';

      const header = document.createElement('div');
      header.className = 'p-3 flex justify-between items-center cursor-pointer';
      header.innerHTML = `
        <div>
          <div class="font-medium">${email.subject}</div>
          <div class="text-sm text-gray-600">${email.direction === 'incoming' ? 'Odebrano' : 'Wysłano'} ${email.date}</div>
        </div>
        <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">${email.user}</span>
      `;

      const body = document.createElement('div');
      body.className = 'px-3 pb-3 text-sm hidden';
      body.textContent = email.body;

      header.addEventListener('click', () => {
        body.classList.toggle('hidden');
      });

      wrapper.appendChild(header);
      wrapper.appendChild(body);
      emailsList.appendChild(wrapper);
    });
  }
});
