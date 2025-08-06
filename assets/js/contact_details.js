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
});
