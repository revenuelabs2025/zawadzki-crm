document.addEventListener("DOMContentLoaded", function () {
  const contacts = [
    { id: 1, name: "Adam Nowak", company: "Jeronimo Martins Polska S.A.", phone: "501 123 456", email: "a.nowak@jm.pl", address: "ul. Żniwna 5, 62-025 Kostrzyn", type: "Klient", lastActivity: "2025-07-01" },
    { id: 2, name: "Ewa Kowalska", company: "Panattoni Development Europe", phone: "602 234 567", email: "ewa.kowalska@panattoni.com", address: "Plac Europejski 1, 00-844 Warszawa", type: "Klient", lastActivity: "2025-06-28" },
    { id: 3, name: "Piotr Wiśniewski", company: "Dachy i Fasady Sp. z o.o.", phone: "703 345 678", email: "piotr@dachy-fasady.pl", address: "ul. Przemysłowa 10, 95-100 Zgierz", type: "Podwykonawca", lastActivity: "2025-06-25" },
    { id: 4, name: "Katarzyna Dąbrowska", company: "Bud-Mat", phone: "804 456 789", email: "k.dabrowska@budmat.com", address: "ul. Otolińska 25, 09-407 Płock", type: "Dostawca", lastActivity: "2025-07-02" },
    { id: 5, name: "Tomasz Zieliński", company: "Inwestor Prywatny", phone: "505 567 890", email: "t.zielinski@poczta.pl", address: "ul. Piotrkowska 1, 90-001 Łódź", type: "Potencjalny klient", lastActivity: "2025-06-30" },
    { id: 6, name: "Marek Jankowski", company: "Global Build", phone: "606 678 901", email: "m.jankowski@globalbuild.com", address: "ul. Wrocławska 54, 50-001 Wrocław", type: "Potencjalny klient", lastActivity: "2025-05-15" },
  ];

  const contactTypeColors = {
    Klient: "bg-blue-100 text-blue-800",
    "Potencjalny klient": "bg-yellow-100 text-yellow-800",
    Podwykonawca: "bg-purple-100 text-purple-800",
    Dostawca: "bg-indigo-100 text-indigo-800",
  };

  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function renderContacts() {
    const tableBody = document.getElementById("contacts-table-body");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    const fragment = document.createDocumentFragment();
    contacts.forEach((contact, index) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";
      if (index === 0) {
        row.classList.add("cursor-pointer");
        row.addEventListener("click", () => {
          window.location.href = "contact_details.html";
        });
      }
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${contact.name}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${contact.company}</div>
          <div class="text-sm text-gray-500">${contact.address}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${contact.phone}</div>
          <div class="text-sm text-gray-500">${contact.email}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contactTypeColors[contact.type]}">
            ${contact.type}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${contact.lastActivity}
        </td>`;
      fragment.appendChild(row);
    });
    tableBody.appendChild(fragment);
  }

  const addNewButton = document.getElementById("add-new-button");
  if (addNewButton) {
    addNewButton.addEventListener("click", () => {
      showToast("Funkcja dodawania nowego kontaktu będzie dostępna wkrótce!");
    });
  }

  renderContacts();
});
