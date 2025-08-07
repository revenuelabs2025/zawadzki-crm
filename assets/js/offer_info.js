document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('selectedOffer'));
  if (!data) return;

  const formatDate = (str) => {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}.${m}.${y}`;
  };

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '';
  };

  setText('detail-name', data.projectName);
  setText('detail-status', data.stageName);
  setText('detail-company', data.company);
  setText('detail-value', `${(data.valueNet || 0).toLocaleString('pl-PL')} PLN`);
  setText('detail-margin', `${data.margin || 0}%`);
  setText('detail-start', formatDate(data.startDate));
  setText('detail-city', data.location);
  setText('detail-investor', data.investorType);
  setText('detail-owner', data.contact);
  setText('detail-added', formatDate(data.openDate));
});
