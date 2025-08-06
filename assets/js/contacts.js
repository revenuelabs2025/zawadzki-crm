document.addEventListener("DOMContentLoaded", function () {
  const contacts = [
    {
      id: 1,
      name: "Adam Nowak",
      company: "Jeronimo Martins Polska S.A.",
      phone: "501 123 456",
      email: "a.nowak@jm.pl",
      address: "ul. Żniwna 5, 62-025 Kostrzyn",
      type: "Klient",
      lastActivity: "2025-07-01",
    },
    {
      id: 2,
      name: "Ewa Kowalska",
      company: "Panattoni Development Europe",
      phone: "602 234 567",
      email: "ewa.kowalska@panattoni.com",
      address: "Plac Europejski 1, 00-844 Warszawa",
      type: "Klient",
      lastActivity: "2025-06-28",
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      company: "Dachy i Fasady Sp. z o.o.",
      phone: "703 345 678",
      email: "piotr@dachy-fasady.pl",
      address: "ul. Przemysłowa 10, 95-100 Zgierz",
      type: "Podwykonawca",
      lastActivity: "2025-06-25",
    },
    {
      id: 4,
      name: "Katarzyna Dąbrowska",
      company: "Bud-Mat",
      phone: "804 456 789",
      email: "k.dabrowska@budmat.com",
      address: "ul. Otolińska 25, 09-407 Płock",
      type: "Dostawca",
      lastActivity: "2025-07-02",
    },
    {
      id: 5,
      name: "Tomasz Zieliński",
      company: "Inwestor Prywatny",
      phone: "505 567 890",
      email: "t.zielinski@poczta.pl",
      address: "ul. Piotrkowska 1, 90-001 Łódź",
      type: "Potencjalny klient",
      lastActivity: "2025-06-30",
    },
    {
      id: 6,
      name: "Marek Jankowski",
      company: "Global Build",
      phone: "606 678 901",
      email: "m.jankowski@globalbuild.com",
      address: "ul. Wrocławska 54, 50-001 Wrocław",
      type: "Potencjalny klient",
      lastActivity: "2025-05-15",
    },
    {
      id: 7,
      name: "Agnieszka Maj",
      company: "BuildIt",
      phone: "517 234 111",
      email: "a.maj@buildit.pl",
      address: "ul. Lipowa 3, 00-201 Warszawa",
      type: "Klient",
      lastActivity: "2025-06-22",
    },
    {
      id: 8,
      name: "Paweł Stępień",
      company: "TechSolutions",
      phone: "523 335 222",
      email: "pawel.stepien@techsol.com",
      address: "ul. Ogrodowa 5, 01-000 Warszawa",
      type: "Klient",
      lastActivity: "2025-07-03",
    },
    {
      id: 9,
      name: "Julia Bąk",
      company: "Green House",
      phone: "534 445 333",
      email: "julia.bak@greenhouse.pl",
      address: "ul. Leśna 7, 05-800 Pruszków",
      type: "Dostawca",
      lastActivity: "2025-06-18",
    },
    {
      id: 10,
      name: "Krzysztof Pawlak",
      company: "KP Projekt",
      phone: "545 556 444",
      email: "k.pawlak@kpprojekt.pl",
      address: "ul. Słoneczna 12, 20-001 Lublin",
      type: "Podwykonawca",
      lastActivity: "2025-06-12",
    },
    {
      id: 11,
      name: "Monika Król",
      company: "FastTrans",
      phone: "556 667 555",
      email: "monika.krol@fasttrans.pl",
      address: "ul. Nowa 8, 40-100 Katowice",
      type: "Potencjalny klient",
      lastActivity: "2025-05-30",
    },
    {
      id: 12,
      name: "Sebastian Lis",
      company: "InwestBud",
      phone: "567 778 666",
      email: "s.lis@inwestbud.pl",
      address: "ul. Polna 4, 30-002 Kraków",
      type: "Klient",
      lastActivity: "2025-06-08",
    },
    {
      id: 13,
      name: "Natalia Górska",
      company: "DesignPro",
      phone: "578 889 777",
      email: "natalia.gorska@designpro.pl",
      address: "ul. Spacerowa 9, 80-001 Gdańsk",
      type: "Klient",
      lastActivity: "2025-06-01",
    },
    {
      id: 14,
      name: "Robert Wójcik",
      company: "RW Consulting",
      phone: "589 990 888",
      email: "robert.wojcik@rwconsult.pl",
      address: "ul. Dworcowa 2, 35-001 Rzeszów",
      type: "Potencjalny klient",
      lastActivity: "2025-05-20",
    },
    {
      id: 15,
      name: "Aneta Piotrowska",
      company: "AP Steel",
      phone: "600 101 999",
      email: "a.piotrowska@apsteel.pl",
      address: "ul. Fabryczna 20, 15-001 Białystok",
      type: "Dostawca",
      lastActivity: "2025-04-30",
    },
    {
      id: 16,
      name: "Michał Sawicki",
      company: "Sawicki Sp. z o.o.",
      phone: "611 212 000",
      email: "m.sawicki@sawicki.pl",
      address: "ul. Kolejowa 18, 70-100 Szczecin",
      type: "Klient",
      lastActivity: "2025-05-10",
    },
    {
      id: 17,
      name: "Karolina Kaczmarek",
      company: "Kaczmarek Design",
      phone: "622 323 111",
      email: "karolina@kdesign.pl",
      address: "ul. Nadmorska 2, 81-001 Gdynia",
      type: "Potencjalny klient",
      lastActivity: "2025-06-05",
    },
    {
      id: 18,
      name: "Wojciech Pietrzak",
      company: "WP Invest",
      phone: "633 434 222",
      email: "w.pietrzak@wpinvest.pl",
      address: "ul. Rynek 1, 32-000 Olkusz",
      type: "Klient",
      lastActivity: "2025-07-05",
    },
    {
      id: 19,
      name: "Renata Szymańska",
      company: "SzymBud",
      phone: "644 545 333",
      email: "renata@szymbud.pl",
      address: "ul. Jasna 3, 60-125 Poznań",
      type: "Podwykonawca",
      lastActivity: "2025-05-18",
    },
    {
      id: 20,
      name: "Łukasz Baran",
      company: "Baran Development",
      phone: "655 656 444",
      email: "lukasz.baran@barandev.pl",
      address: "ul. Długa 10, 44-100 Gliwice",
      type: "Klient",
      lastActivity: "2025-06-27",
    },
  ];

  const contactsPerPage = 8;
  let currentPage = 1;

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

  function renderContacts(page = currentPage) {
    currentPage = page;
    const tableBody = document.getElementById("contacts-table-body");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    const start = (page - 1) * contactsPerPage;
    const end = start + contactsPerPage;
    const fragment = document.createDocumentFragment();
    contacts.slice(start, end).forEach((contact, index) => {
      const globalIndex = start + index;
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";
      if (globalIndex === 0) {
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
    renderPagination();
  }

  function renderPagination() {
    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    pagination.innerHTML = "";
    const totalPages = Math.ceil(contacts.length / contactsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className =
        "px-3 py-1 border rounded-md text-sm " +
        (i === currentPage ? "bg-gray-200" : "bg-white hover:bg-gray-100");
      btn.addEventListener("click", () => renderContacts(i));
      pagination.appendChild(btn);
    }
  }

  const addNewButton = document.getElementById("add-new-button");
  const modal = document.getElementById("add-contact-modal");
  const cancelBtn = document.getElementById("cancel-add-contact");
  const closeBtn = document.getElementById("close-add-contact");
  const form = document.getElementById("add-contact-form");

  if (addNewButton && modal) {
    addNewButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.classList.add("hidden");
      form.reset();
      showToast("Kontakt został dodany");
    });
  }

  renderContacts();
});
