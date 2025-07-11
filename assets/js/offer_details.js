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
