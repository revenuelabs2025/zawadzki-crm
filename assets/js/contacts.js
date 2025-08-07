document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://your-project.supabase.co";
  const supabaseAnonKey = "public-anon-key";
  const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseAnonKey
  );

  let contacts = [];
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

  async function loadContacts() {
    const { data, error } = await supabaseClient
      .from("contacts")
      .select(
        "id, first_name, last_name, phone, email, type, last_activity_date, company:companies(name, address, city)"
      )
      .order("last_activity_date", { ascending: false });

    if (error) {
      console.error("Błąd pobierania kontaktów:", error);
      return;
    }

    contacts = data.map((c) => ({
      id: c.id,
      name: `${c.first_name} ${c.last_name}`,
      company: c.company?.name || "",
      address: [c.company?.address, c.company?.city]
        .filter(Boolean)
        .join(", "),
      phone: c.phone,
      email: c.email,
      type: c.type,
      lastActivity: c.last_activity_date,
    }));

    renderContacts();
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
          ${contact.lastActivity || ""}
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
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("contact-name").value.trim();
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      const companyData = {
        name: document.getElementById("contact-company").value.trim() || null,
        nip: document.getElementById("contact-nip").value.trim() || null,
        address: document.getElementById("contact-address").value.trim() || null,
        city: document.getElementById("contact-city").value.trim() || null,
        voivodeship:
          document.getElementById("contact-voivodeship").value.trim() || null,
        website: document.getElementById("contact-website").value.trim() || null,
      };

      const contactData = {
        first_name: firstName || "",
        last_name: lastName || "",
        phone: document.getElementById("contact-phone").value.trim() || null,
        email: document.getElementById("contact-email").value.trim() || null,
        type: document.getElementById("contact-type").value,
        source: document.getElementById("contact-source").value,
        last_activity_date: new Date().toISOString().split("T")[0],
      };

      const { error } = await supabaseClient.rpc("add_contact_with_company", {
        company_data: companyData,
        contact_data: contactData,
      });

      if (error) {
        console.error("Błąd dodawania kontaktu:", error);
        showToast("Wystąpił błąd podczas zapisywania");
        return;
      }

      await loadContacts();
      modal.classList.add("hidden");
      form.reset();
      showToast("Kontakt został dodany");
    });
  }

  loadContacts();
});

