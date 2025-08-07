import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
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
    const contactId = new URLSearchParams(window.location.search).get('id');
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
      if (contactId) query = query.eq('contact_id', contactId);
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
        contact_id: contactId
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
});
