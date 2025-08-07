import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function () {
  // Tab switching logic
  const tabButtons = document.querySelectorAll('.tab-button');
  let rfqInitialized = false;

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');

      if (target === 'rfq' && !rfqInitialized) {
        initRFQ();
        rfqInitialized = true;
      }
    });
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
      note.innerHTML = `<div class="text-sm text-gray-600 mb-1">Dawid Śmietański – ${date}</div><div>${text}</div>`;
      notesList.prepend(note);
      newNoteInput.value = '';

      // Persist note
      const entityId = new URLSearchParams(window.location.search).get('id');
      const userId = window.currentUserId || null;
      if (window.supabaseClient && entityId && userId) {
        window.supabaseClient.from('notes').insert({
          id: crypto.randomUUID(),
          entity_type: 'offer',
          entity_id: entityId,
          user_id: userId,
          content: text
        });
      }
    });
    }

    const messagesList = document.getElementById('messages-list');
    if (messagesList) {
      const messages = [
        {
          direction: 'outgoing',
          user: 'Magda Cieciorowska',
          date: '01.04.2024',
          subject: 'Powitanie i przedstawienie oferty',
          body: 'Dzień dobry, w załączeniu przesyłam ofertę naszej firmy.'
        },
        {
          direction: 'incoming',
          user: 'Damian Zawadzki',
          date: '02.04.2024',
          subject: 'Odpowiedź na ofertę',
          body: 'Dziękuję za ofertę. Chciałbym uzyskać więcej informacji.'
        }
      ];

      function renderMessage(msg) {
        const wrapper = document.createElement('div');
        wrapper.className = 'border rounded';

        const header = document.createElement('div');
        header.className = 'p-3 flex justify-between items-center cursor-pointer';
        const directionText =
          msg.direction === 'incoming'
            ? 'Odebrano'
            : msg.direction === 'manual'
            ? 'Dodano'
            : 'Wysłano';
        header.innerHTML = `
          <div>
            <div class="font-medium">${msg.subject}</div>
            <div class="text-sm text-gray-600">${directionText} ${msg.date}</div>
          </div>
          <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">${msg.user}</span>
        `;

        const body = document.createElement('div');
        body.className = 'px-3 pb-3 text-sm hidden';
        body.textContent = msg.body;

        header.addEventListener('click', () => {
          body.classList.toggle('hidden');
        });

        wrapper.appendChild(header);
        wrapper.appendChild(body);
        messagesList.appendChild(wrapper);
      }

      messages.forEach(renderMessage);

      const addManualBtn = document.getElementById('add-manual-message-btn');
      const manualModal = document.getElementById('manual-message-modal');
      const manualInput = document.getElementById('manual-message-input');
      const manualCancel = document.getElementById('cancel-manual-message');
      const manualSave = document.getElementById('save-manual-message');

      if (addManualBtn && manualModal && manualInput && manualCancel && manualSave) {
        addManualBtn.addEventListener('click', () => {
          manualModal.style.display = 'flex';
        });

        manualCancel.addEventListener('click', () => {
          manualModal.style.display = 'none';
          manualInput.value = '';
        });

        manualSave.addEventListener('click', () => {
          const text = manualInput.value.trim();
          if (!text) return;
          const lines = text.split('\n');
          const subject = lines[0] || 'Wiadomość';
          renderMessage({
            direction: 'manual',
            user: 'Użytkownik',
            date: new Date().toLocaleDateString('pl-PL'),
            subject,
            body: text
          });
          manualInput.value = '';
          manualModal.style.display = 'none';

          // Persist manual message
          const entityId = new URLSearchParams(window.location.search).get('id');
          const userId = window.currentUserId || null;
          if (window.supabaseClient && entityId && userId) {
            window.supabaseClient.from('messages').insert({
              id: crypto.randomUUID(),
              entity_type: 'offer',
              entity_id: entityId,
              direction: 'manual',
              user_id: userId,
              subject,
              body: text,
              sent_at: new Date().toISOString(),
              status: 'manual'
            });
          }
        });
      }
    }

    
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskTitle = document.getElementById('new-task-title');
const newTaskContent = document.getElementById('new-task-content');
const newTaskUser = document.getElementById('new-task-user');
const newTaskDate = document.getElementById('new-task-date');
const tasksList = document.getElementById('tasks-list');

if (addTaskBtn && newTaskTitle && newTaskContent && newTaskUser && newTaskDate && tasksList) {
  const offerId = new URLSearchParams(window.location.search).get('id');
  let tasks = [];
  let usersMap = {};

  async function loadUsers() {
    const { data } = await db.from('profiles').select('id, full_name');
    if (data) {
      newTaskUser.innerHTML = '';
      data.forEach(user => {
        usersMap[user.id] = user.full_name;
        const opt = document.createElement('option');
        opt.value = user.id;
        opt.textContent = user.full_name;
        newTaskUser.appendChild(opt);
      });
    }
  }

  function getStatus(task) {
    const today = new Date().setHours(0, 0, 0, 0);
    const due = new Date(task.due_date).setHours(0, 0, 0, 0);
    if (task.completed) return { text: 'wykonane', color: 'bg-green-100 text-green-800' };
    if (due < today) return { text: 'przeterminowane', color: 'bg-red-100 text-red-800' };
    return { text: 'oczekujące', color: 'bg-yellow-100 text-yellow-800' };
  }

  async function loadTasks() {
    let query = db
      .from('tasks')
      .select('id, title, content, assigned_user_id, due_date, completed')
      .order('due_date', { ascending: true });
    if (offerId) query = query.eq('offer_id', offerId);
    const { data } = await query;
    tasks = data || [];
    renderTasks();
  }

  function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
      const status = getStatus(task);
      const wrapper = document.createElement('div');
      wrapper.className = 'border p-3 rounded flex justify-between items-start';
      wrapper.innerHTML = `
        <div>
          <div class="font-medium">${task.title}</div>
          <div class="text-sm text-gray-600">${usersMap[task.assigned_user_id] ? usersMap[task.assigned_user_id] + ' – ' : ''}Do ${new Date(task.due_date).toLocaleDateString('pl-PL')}</div>
          ${task.content ? `<div class="text-sm mt-1">${task.content}</div>` : ''}
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-2 py-1 rounded text-xs ${status.color}">${status.text}</span>
          ${task.completed ? '' : `<button data-id="${task.id}" class="complete-task-btn bg-green-500 text-white text-xs px-2 py-1 rounded">Zakończ</button>`}
          <button data-id="${task.id}" class="delete-task-btn bg-red-500 text-white text-xs px-2 py-1 rounded">Usuń</button>
        </div>
      `;
      tasksList.appendChild(wrapper);
    });

    document.querySelectorAll('.complete-task-btn').forEach(btn => {
      btn.addEventListener('click', () => completeTask(btn.getAttribute('data-id')));
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteTask(btn.getAttribute('data-id')));
    });
  }

  addTaskBtn.addEventListener('click', async () => {
    const title = newTaskTitle.value.trim();
    const content = newTaskContent.value.trim();
    const userId = newTaskUser.value;
    const date = newTaskDate.value;
    if (!title || !userId || !date) return;
    await db.from('tasks').insert({
      title,
      content,
      assigned_user_id: userId,
      due_date: date,
      offer_id: offerId
    });
    await loadTasks();
    newTaskTitle.value = '';
    newTaskContent.value = '';
    newTaskDate.value = '';
    newTaskUser.selectedIndex = 0;
  });

  async function completeTask(id) {
    await db.from('tasks').update({ completed: true }).eq('id', id);
    loadTasks();
  }

  async function deleteTask(id) {
    await db.from('tasks').delete().eq('id', id);
    loadTasks();
  }

  function checkNotifications() {
    const today = new Date().toISOString().split('T')[0];
    tasks.forEach(task => {
      if (!task.completed && task.due_date === today && !task.notified) {
        alert(`Masz zadanie na dziś: ${task.title}`);
        task.notified = true;
      }
    });
  }

  await loadUsers();
  await loadTasks();
  checkNotifications();
  setInterval(checkNotifications, 60000);
}


    const addFileBtn = document.getElementById('add-file-btn');
    const fileInput = document.getElementById('file-input');
    const filesList = document.getElementById('files-list');

    if (addFileBtn && fileInput && filesList) {
      addFileBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;
        const item = document.createElement('div');
        item.className = 'border p-3 rounded flex justify-between';
        item.innerHTML = `<div>${file.name}</div><div class="text-sm text-gray-600">${file.type || 'brak'} – ${(file.size / 1024).toFixed(1)} KB</div>`;
        filesList.appendChild(item);
        fileInput.value = '';
      });
    }

    function initRFQ() {
      const loadBtn = document.getElementById('load-subs');
      if (!loadBtn) return;
    const sendBtn = document.getElementById('send-rfq');
    const cancelBtn = document.getElementById('cancel-send');
    const confirmBtn = document.getElementById('confirm-send');

    let subcontractors = [];
    let sentRequests = [];
    let pendingIds = [];

    loadBtn.addEventListener('click', loadSubcontractors);
    sendBtn.addEventListener('click', showPreview);
    cancelBtn.addEventListener('click', () => toggleModal(false));
    confirmBtn.addEventListener('click', sendRFQ);

    function loadSubcontractors() {
      subcontractors = [
        { id: '101', name: 'Firma DachTech', email: 'kontakt@dachtech.pl', region: 'Mazowieckie', industry: 'Pokrycia dachowe' },
        { id: '102', name: 'StalBud', email: 'info@stalbud.pl', region: 'Ma\u0142opolskie', industry: 'Konstrukcje stalowe' },
        { id: '103', name: 'IzolacjePRO', email: 'biuro@izolacjepro.pl', region: 'Mazowieckie', industry: 'Izolacje termiczne' },
        { id: '104', name: 'OknaDach', email: 'sprzedaz@oknadach.pl', region: '\u015al\u0105skie', industry: 'Monta\u017c okien dachowych' },
        { id: '105', name: 'DachStyl', email: 'kontakt@dachstyl.pl', region: 'Pomorskie', industry: 'Renowacje dach\u00f3w' }
      ];
      renderSubcontractorTable();
    }

    function renderSubcontractorTable() {
      const tbody = document.getElementById('subs-tbody');
      tbody.innerHTML = '';
      subcontractors.forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><input type="checkbox" data-id="${sub.id}"></td><td>${sub.name}</td><td>${sub.email}</td><td>${sub.region}</td><td>${sub.industry}</td>`;
        tbody.appendChild(tr);
      });
      document.getElementById('subs-table').style.display = 'table';
      tbody.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => {
        const any = Array.from(tbody.querySelectorAll('input[type=checkbox]')).some(c => c.checked);
        sendBtn.disabled = !any;
      }));
    }

    function showPreview() {
      pendingIds = Array.from(document.querySelectorAll('#subs-tbody input[type=checkbox]:checked')).map(cb => cb.getAttribute('data-id'));
      const template = `Temat: Zapytanie ofertowe dla projektu dachu\n\nSzanowni Pa\u0144stwo,\n\nZwracamy si\u0119 z pro\u015bb\u0105 o przes\u0142anie oferty na wykonanie projektu dachu.\nDane techniczne:\n- Klient: Jeronimo Martins Polska S.A.\n- Rozpocz\u0119cie: 01.09.2025\n- Lokalizacja: Warszawa\n\nZ powa\u017caniem,\nKosztorysant`;
      document.getElementById('email-preview').textContent = template;
      toggleModal(true);
    }

    function toggleModal(show) {
      document.getElementById('preview-modal').style.display = show ? 'flex' : 'none';
    }

    function sendRFQ() {
      const now = new Date().toISOString();
      pendingIds.forEach(id => {
        const sub = subcontractors.find(s => s.id === id);
        sentRequests.push({ name: sub.name, email: sub.email, sentAt: now, status: 'Wys\u0142ane' });
      });
      renderSentTable();
      document.querySelectorAll('#subs-tbody input[type=checkbox]').forEach(cb => cb.checked = false);
      sendBtn.disabled = true;
      toggleModal(false);
    }

    function renderSentTable() {
      const tbody = document.getElementById('sent-tbody');
      tbody.innerHTML = '';
      sentRequests.forEach(req => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${req.name}</td><td>${req.email}</td><td>${new Date(req.sentAt).toLocaleString()}</td><td>${req.status}</td>`;
        tbody.appendChild(tr);
      });
    }

    setInterval(() => {
      sentRequests.forEach(r => {
        if (r.status === 'Wys\u0142ane') r.status = 'Odczytane';
        else if (r.status === 'Odczytane') r.status = 'Odpowiedziane';
      });
      renderSentTable();
    }, 15000);
  }
});
