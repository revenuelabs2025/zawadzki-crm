document.addEventListener('DOMContentLoaded', function () {
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
    });
  }

  const addTaskBtn = document.getElementById('add-task-btn');
  const newTaskTitle = document.getElementById('new-task-title');
  const newTaskContent = document.getElementById('new-task-content');
  const newTaskUser = document.getElementById('new-task-user');
  const newTaskDate = document.getElementById('new-task-date');
  const tasksList = document.getElementById('tasks-list');

  if (addTaskBtn && newTaskTitle && newTaskContent && newTaskUser && newTaskDate && tasksList) {
    const crmUsers = ['Dawid Śmietański', 'Magda Cieciorowska', 'Damian Zawadzki', 'Łukasz Zawadzki', 'Igor Dąbrowski', 'Klaudia Brożyna'];
    crmUsers.forEach(user => {
      const opt = document.createElement('option');
      opt.value = user;
      opt.textContent = user;
      newTaskUser.appendChild(opt);
    });

    let tasks = JSON.parse(localStorage.getItem('offerTasks')) || [
      { title: 'Przygotować ofertę', content: '', user: 'Łukasz Zawadzki', dueDate: '2024-06-01', completed: false },
      { title: 'Wysłać prezentację', content: '', user: 'Igor Dąbrowski', dueDate: '2024-04-01', completed: false },
      { title: 'Oddzwonić do klienta', content: '', user: 'Klaudia Brożyna', dueDate: '2024-03-20', completed: true }
    ];

    function saveTasks() {
      localStorage.setItem('offerTasks', JSON.stringify(tasks));
    }

    function getStatus(task) {
      const today = new Date().setHours(0, 0, 0, 0);
      const due = new Date(task.dueDate).setHours(0, 0, 0, 0);
      if (task.completed) return { text: 'wykonane', color: 'bg-green-100 text-green-800' };
      if (due < today) return { text: 'przeterminowane', color: 'bg-red-100 text-red-800' };
      return { text: 'oczekujące', color: 'bg-yellow-100 text-yellow-800' };
    }

    function renderTasks() {
      tasksList.innerHTML = '';
      tasks.forEach((task, index) => {
        const status = getStatus(task);
        const wrapper = document.createElement('div');
        wrapper.className = 'border p-3 rounded flex justify-between items-start';
        wrapper.innerHTML = `
          <div>
            <div class="font-medium">${task.title || task.text}</div>
            <div class="text-sm text-gray-600">${task.user ? task.user + ' – ' : ''}Do ${new Date(task.dueDate).toLocaleDateString('pl-PL')}</div>
            ${task.content ? `<div class="text-sm mt-1">${task.content}</div>` : ''}
          </div>
          <div class="flex items-center space-x-2">
            <span class="px-2 py-1 rounded text-xs ${status.color}">${status.text}</span>
            ${task.completed ? '' : `<button data-index="${index}" class="complete-task-btn bg-green-500 text-white text-xs px-2 py-1 rounded">Zakończ</button>`}
            <button data-index="${index}" class="delete-task-btn bg-red-500 text-white text-xs px-2 py-1 rounded">Usuń</button>
          </div>
        `;
        tasksList.appendChild(wrapper);
      });

      document.querySelectorAll('.complete-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = btn.getAttribute('data-index');
          tasks[idx].completed = true;
          saveTasks();
          renderTasks();
        });
      });

      document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = btn.getAttribute('data-index');
          tasks.splice(idx, 1);
          saveTasks();
          renderTasks();
        });
      });
    }

    addTaskBtn.addEventListener('click', () => {
      const title = newTaskTitle.value.trim();
      const content = newTaskContent.value.trim();
      const user = newTaskUser.value;
      const date = newTaskDate.value;
      if (!title || !user || !date) return;
      tasks.push({ title, content, user, dueDate: date, completed: false });
      saveTasks();
      renderTasks();
      newTaskTitle.value = '';
      newTaskContent.value = '';
      newTaskDate.value = '';
      newTaskUser.selectedIndex = 0;
    });

    function checkNotifications() {
      const today = new Date().toISOString().split('T')[0];
      tasks.forEach(task => {
        if (!task.completed && task.dueDate === today && !task.notified) {
          alert(`Masz zadanie na dziś: ${task.title || task.text}`);
          task.notified = true;
        }
      });
      saveTasks();
    }

    renderTasks();
    checkNotifications();
    setInterval(checkNotifications, 60000);
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
