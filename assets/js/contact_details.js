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
      note.innerHTML = `<div class="text-sm text-gray-600 mb-1">Dawid Śmietański – ${date}</div><div>${text}</div>`;
      notesList.prepend(note);
      newNoteInput.value = '';
    });
  }

  const emailsList = document.getElementById('emails-list');
  if (emailsList) {
    const emails = [
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

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
      { title: 'Oddzwonić do klienta', content: '', user: 'Łukasz Zawadzki', dueDate: '2024-06-01', completed: false },
      { title: 'Wysłać prezentację', content: '', user: 'Igor Dąbrowski', dueDate: '2024-04-01', completed: false },
      { title: 'Przygotować ofertę', content: '', user: 'Klaudia Brożyna', dueDate: '2024-03-20', completed: true }
    ];

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
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
});
