      document.addEventListener("DOMContentLoaded", function () {
        // --- DATA ---
        const stages = [
          { id: "analiza", name: "Analiza techniczna", color: "blue" },
          { id: "kosztorys", name: "Wstępny kosztorys", color: "teal" },
          { id: "oferta", name: "Oferta handlowa wysłana", color: "purple" },
          { id: "negocjacje", name: "Negocjacje / rewizje", color: "orange" },
          { id: "wstrzymane", name: "Wstrzymane", color: "gray" },
          { id: "wygrane", name: "Wygrane", color: "green" },
          { id: "przegrane", name: "Przegrane", color: "red" },
        ];

        let deals = [
          {
            id: 1,
            stage: "analiza",
            projectName: "Nowy dach dla Biedronki",
            company: "Jeronimo Martins Polska S.A.",
            roofTech: "PVC",
            areaM2: 2500,
            valueNet: 750000,
            probability: 80,
            openDate: "2025-06-15",
            expectedClose: "2025-08-30",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 2,
            stage: "analiza",
            projectName: "Hala produkcyjna Panattoni",
            company: "Panattoni Development Europe",
            roofTech: "Stalowa obudowa",
            areaM2: 12000,
            valueNet: 4800000,
            probability: 65,
            openDate: "2025-06-20",
            expectedClose: "2025-09-15",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 3,
            stage: "analiza",
            projectName: "Renowacja dachu biurowca",
            company: "Skanska Property Poland",
            roofTech: "Bitumen",
            areaM2: 1800,
            valueNet: 450000,
            probability: 75,
            openDate: "2025-07-01",
            expectedClose: "2025-08-20",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 4,
            stage: "kosztorys",
            projectName: "Zielony dach na osiedlu",
            company: "Dom Development S.A.",
            roofTech: "Zielony",
            areaM2: 3200,
            valueNet: 1200000,
            probability: 50,
            openDate: "2025-05-10",
            expectedClose: "2025-07-30",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 5,
            stage: "kosztorys",
            projectName: "Magazyn Amazon",
            company: "Amazon Fulfillment Poland",
            roofTech: "TPO",
            areaM2: 25000,
            valueNet: 9500000,
            probability: 60,
            openDate: "2025-05-25",
            expectedClose: "2025-08-10",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 6,
            stage: "oferta",
            projectName: "Modernizacja centrum handlowego",
            company: "ECE Projektmanagement Polska",
            roofTech: "EPDM",
            areaM2: 8500,
            valueNet: 3200000,
            probability: 40,
            openDate: "2025-04-15",
            expectedClose: "2025-07-25",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 7,
            stage: "oferta",
            projectName: "Dach na nowej szkole",
            company: "Urząd Miasta Łodzi",
            roofTech: "PVC",
            areaM2: 4000,
            valueNet: 1500000,
            probability: 35,
            openDate: "2025-04-30",
            expectedClose: "2025-08-05",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 8,
            stage: "negocjacje",
            projectName: "Fabryka LG Chem",
            company: "LG Energy Solution Wrocław",
            roofTech: "Stalowa obudowa",
            areaM2: 15000,
            valueNet: 6200000,
            probability: 70,
            openDate: "2025-03-01",
            expectedClose: "2025-07-15",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 9,
            stage: "negocjacje",
            projectName: 'Biurowiec "Varso Tower"',
            company: "HB Reavis",
            roofTech: "Inne",
            areaM2: 5000,
            valueNet: 2800000,
            probability: 65,
            openDate: "2025-03-20",
            expectedClose: "2025-07-20",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 10,
            stage: "wstrzymane",
            projectName: "Projekt hotelu Gołębiewski",
            company: "Tadeusz Gołębiewski",
            roofTech: "Bitumen",
            areaM2: 9000,
            valueNet: 3500000,
            probability: 20,
            openDate: "2024-11-10",
            expectedClose: "2025-09-01",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "Brak finansowania",
            lostReason: "",
          },
          {
            id: 11,
            stage: "wygrane",
            projectName: "Centrum Dystrybucyjne Lidl",
            company: "Lidl Polska",
            roofTech: "TPO",
            areaM2: 18000,
            valueNet: 7200000,
            probability: 100,
            openDate: "2025-01-05",
            expectedClose: "2025-05-30",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 12,
            stage: "wygrane",
            projectName: 'Osiedle "Nowa Papiernia"',
            company: "RED Real Estate Development",
            roofTech: "Zielony",
            areaM2: 2200,
            valueNet: 980000,
            probability: 100,
            openDate: "2025-02-12",
            expectedClose: "2025-06-10",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "",
          },
          {
            id: 13,
            stage: "przegrane",
            projectName: "Renowacja dachu PKiN",
            company: "Zarząd Pałacu Kultury i Nauki",
            roofTech: "PVC",
            areaM2: 6000,
            valueNet: 2100000,
            probability: 0,
            openDate: "2025-02-01",
            expectedClose: "2025-06-01",
            margin: 20,
            startDate: "2025-09-01",
            location: "Warszawa",
            investorType: "Komercyjny",
            objectType: "Hala",
            structureType: "Stalowa",
            insulationType: "Wełna",
            acquisitionSource: "Polecenie",
            holdReason: "",
            lostReason: "Oferta konkurencji",
          },
        ];

        const contacts = [
          { id: 1, name: "Adam Nowak", company: "Jeronimo Martins Polska S.A.", phone: "501 123 456", email: "a.nowak@jm.pl", address: "ul. Żniwna 5, 62-025 Kostrzyn", type: "Klient", lastActivity: "2025-07-01" },
          { id: 2, name: "Ewa Kowalska", company: "Panattoni Development Europe", phone: "602 234 567", email: "ewa.kowalska@panattoni.com", address: "Plac Europejski 1, 00-844 Warszawa", type: "Klient", lastActivity: "2025-06-28" },
          { id: 3, name: "Piotr Wiśniewski", company: "Dachy i Fasady Sp. z o.o.", phone: "703 345 678", email: "piotr@dachy-fasady.pl", address: "ul. Przemysłowa 10, 95-100 Zgierz", type: "Podwykonawca", lastActivity: "2025-06-25" },
          { id: 4, name: "Katarzyna Dąbrowska", company: "Bud-Mat", phone: "804 456 789", email: "k.dabrowska@budmat.com", address: "ul. Otolińska 25, 09-407 Płock", type: "Dostawca", lastActivity: "2025-07-02" },
          { id: 5, name: "Tomasz Zieliński", company: "Inwestor Prywatny", phone: "505 567 890", email: "t.zielinski@poczta.pl", address: "ul. Piotrkowska 1, 90-001 Łódź", type: "Potencjalny klient", lastActivity: "2025-06-30" },
          { id: 6, name: "Marek Jankowski", company: "Global Build", phone: "606 678 901", email: "m.jankowski@globalbuild.com", address: "ul. Wrocławska 54, 50-001 Wrocław", type: "Potencjalny klient", lastActivity: "2025-05-15" },
          { id: 7, name: "Agnieszka Maj", company: "BuildIt", phone: "517 234 111", email: "a.maj@buildit.pl", address: "ul. Lipowa 3, 00-201 Warszawa", type: "Klient", lastActivity: "2025-06-22" },
          { id: 8, name: "Paweł Stępień", company: "TechSolutions", phone: "523 335 222", email: "pawel.stepien@techsol.com", address: "ul. Ogrodowa 5, 01-000 Warszawa", type: "Klient", lastActivity: "2025-07-03" },
          { id: 9, name: "Julia Bąk", company: "Green House", phone: "534 445 333", email: "julia.bak@greenhouse.pl", address: "ul. Leśna 7, 05-800 Pruszków", type: "Dostawca", lastActivity: "2025-06-18" },
          { id: 10, name: "Krzysztof Pawlak", company: "KP Projekt", phone: "545 556 444", email: "k.pawlak@kpprojekt.pl", address: "ul. Słoneczna 12, 20-001 Lublin", type: "Podwykonawca", lastActivity: "2025-06-12" },
          { id: 11, name: "Monika Król", company: "FastTrans", phone: "556 667 555", email: "monika.krol@fasttrans.pl", address: "ul. Nowa 8, 40-100 Katowice", type: "Potencjalny klient", lastActivity: "2025-05-30" },
          { id: 12, name: "Sebastian Lis", company: "InwestBud", phone: "567 778 666", email: "s.lis@inwestbud.pl", address: "ul. Polna 4, 30-002 Kraków", type: "Klient", lastActivity: "2025-06-08" },
          { id: 13, name: "Natalia Górska", company: "DesignPro", phone: "578 889 777", email: "natalia.gorska@designpro.pl", address: "ul. Spacerowa 9, 80-001 Gdańsk", type: "Klient", lastActivity: "2025-06-01" },
          { id: 14, name: "Robert Wójcik", company: "RW Consulting", phone: "589 990 888", email: "robert.wojcik@rwconsult.pl", address: "ul. Dworcowa 2, 35-001 Rzeszów", type: "Potencjalny klient", lastActivity: "2025-05-20" },
          { id: 15, name: "Aneta Piotrowska", company: "AP Steel", phone: "600 101 999", email: "a.piotrowska@apsteel.pl", address: "ul. Fabryczna 20, 15-001 Białystok", type: "Dostawca", lastActivity: "2025-04-30" },
          { id: 16, name: "Michał Sawicki", company: "Sawicki Sp. z o.o.", phone: "611 212 000", email: "m.sawicki@sawicki.pl", address: "ul. Kolejowa 18, 70-100 Szczecin", type: "Klient", lastActivity: "2025-05-10" },
          { id: 17, name: "Karolina Kaczmarek", company: "Kaczmarek Design", phone: "622 323 111", email: "karolina@kdesign.pl", address: "ul. Nadmorska 2, 81-001 Gdynia", type: "Potencjalny klient", lastActivity: "2025-06-05" },
          { id: 18, name: "Wojciech Pietrzak", company: "WP Invest", phone: "633 434 222", email: "w.pietrzak@wpinvest.pl", address: "ul. Rynek 1, 32-000 Olkusz", type: "Klient", lastActivity: "2025-07-05" },
          { id: 19, name: "Renata Szymańska", company: "SzymBud", phone: "644 545 333", email: "renata@szymbud.pl", address: "ul. Jasna 3, 60-125 Poznań", type: "Podwykonawca", lastActivity: "2025-05-18" },
          { id: 20, name: "Łukasz Baran", company: "Baran Development", phone: "655 656 444", email: "lukasz.baran@barandev.pl", address: "ul. Długa 10, 44-100 Gliwice", type: "Klient", lastActivity: "2025-06-27" },
        ];

        const activities = {
          1: [
            {
              type: "note",
              user: "Igor Dąbrowski",
              text: "Klient prosi o aktualizację kosztorysu z uwzględnieniem świetlików.",
              timestamp: "2025-07-01 14:30",
            },
            {
              type: "stage-change",
              user: "System",
              text: 'Etap zmieniony na "Analiza techniczna"',
              timestamp: "2025-06-15 09:00",
            },
          ],
          8: [
            {
              type: "call",
              user: "Klaudia Brożyna",
              text: "Rozmowa telefoniczna z p. dyrektorem. Przesłać finalną wersję umowy do piątku.",
              timestamp: "2025-07-02 11:15",
            },
            {
              type: "email",
              user: "Łukasz Zawadzki",
              text: "Wysłano zrewidowaną ofertę.",
              timestamp: "2025-06-28 16:05",
            },
            {
              type: "stage-change",
              user: "System",
              text: 'Etap zmieniony na "Negocjacje / rewizje"',
              timestamp: "2025-06-25 10:00",
            },
          ],
        };

        const activityIcons = {
          note: { icon: "fa-sticky-note", color: "text-yellow-500" },
          call: { icon: "fa-phone", color: "text-blue-500" },
          email: { icon: "fa-envelope", color: "text-indigo-500" },
          "stage-change": { icon: "fa-flag", color: "text-gray-500" },
        };

        // --- DOM ELEMENTS ---
        const board = document.getElementById("kanban-board");
        const dealModal = document.getElementById("deal-modal");
        const closeModalBtn = document.getElementById("modal-close-btn");
        const kanbanView = document.getElementById("kanban-view");
        const contactsView = document.getElementById("contacts-view");
        const kanbanLink = document.getElementById("kanban-link");
        const contactsLink = document.getElementById("contacts-link");
        const addNewButton = document.getElementById("add-new-button");
        const addNewBtnText = document.getElementById("add-new-btn-text");
        const newActivityInput = document.getElementById("new-activity-input");
        const saveActivityButton = document.getElementById("save-activity-btn");
        const addOfferModal = document.getElementById("add-offer-modal");
        const cancelAddOffer = document.getElementById("cancel-add-offer");
        const closeAddOffer = document.getElementById("close-add-offer");
        const addOfferForm = document.getElementById("add-offer-form");
        const offerStageSelect = document.getElementById("offer-stage");
        const companyDatalist = document.getElementById("company-options");
        const contactDatalist = document.getElementById("contact-options");

        // --- CONFIG ---
        const techIcons = {
          PVC: "fa-layer-group",
          TPO: "fa-clone",
          EPDM: "fa-grip-horizontal",
          Bitumen: "fa-burn",
          Zielony: "fa-leaf",
          "Stalowa obudowa": "fa-industry",
          Inne: "fa-question-circle",
        };
        const stageColors = {
          blue: { bg: "bg-blue-100", text: "text-blue-800" },
          teal: { bg: "bg-teal-100", text: "text-teal-800" },
          purple: { bg: "bg-purple-100", text: "text-purple-800" },
          orange: { bg: "bg-orange-100", text: "text-orange-800" },
          gray: { bg: "bg-gray-200", text: "text-gray-800" },
          green: { bg: "bg-green-100", text: "text-green-800" },
          red: { bg: "bg-red-100", text: "text-red-800" },
        };
        const contactTypeColors = {
          Klient: "bg-blue-100 text-blue-800",
          "Potencjalny klient": "bg-yellow-100 text-yellow-800",
          Podwykonawca: "bg-purple-100 text-purple-800",
          Dostawca: "bg-indigo-100 text-indigo-800",
        };

        function populateStageSelect() {
          if (!offerStageSelect) return;
          offerStageSelect.innerHTML = "";
          stages.forEach((stage) => {
            const count = deals.filter((d) => d.stage === stage.id).length;
            const option = document.createElement("option");
            option.value = stage.id;
            option.textContent = `${stage.name} (${count})`;
            offerStageSelect.appendChild(option);
          });
        }

        function populateContactDatalist() {
          if (!contactDatalist) return;
          contactDatalist.innerHTML = "";
          contacts.forEach((contact) => {
            const option = document.createElement("option");
            option.value = contact.name;
            contactDatalist.appendChild(option);
          });
        }

        function populateCompanyDatalist() {
          if (!companyDatalist) return;
          companyDatalist.innerHTML = "";
          const companies = [...new Set(contacts.map((c) => c.company))];
          companies.forEach((company) => {
            const option = document.createElement("option");
            option.value = company;
            companyDatalist.appendChild(option);
          });
        }

        populateContactDatalist();
        populateCompanyDatalist();
        populateStageSelect();

        // --- HELPER FUNCTIONS ---
        function formatCurrency(value) {
          return new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
            .format(value || 0)
            .replace(/\s/g, " ");
        }

        function showToast(message) {
          const toast = document.getElementById("toast");
          const toastMessage = document.getElementById("toast-message");
          toastMessage.textContent = message;
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 3000);
        }

        // --- RENDER FUNCTIONS ---
        function createCard(deal) {
          const colorClass =
            stageColors[stages.find((s) => s.id === deal.stage).color];

          return `
                <div id="deal-${deal.id}" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 cursor-pointer has-tooltip" draggable="true" data-deal-id="${deal.id}">
                    <div class="relative">
                        <div class="tooltip absolute -top-10 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                            Otwarty: ${deal.openDate} | Spodz. zamknięcie: ${deal.expectedClose}
                        </div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-base text-gray-900 pr-2">${deal.projectName}</h3>
                            <span class="${colorClass.bg} ${colorClass.text} text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center space-x-1.5 flex-shrink-0">
                                <i class="fas ${techIcons[deal.roofTech]}"></i>
                                <span>${deal.roofTech}</span>
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 truncate">${deal.company}</p>
                        <p class="text-sm text-gray-500 mb-3">${deal.areaM2.toLocaleString("pl-PL")} m²</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="font-bold text-gray-900">${formatCurrency(deal.valueNet)}</span>
                            <span class="text-xs text-gray-500 font-semibold">${deal.probability}%</span>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderBoard() {
          const kanbanBoard = document.getElementById("kanban-board");
  if (!kanbanBoard) return;
          kanbanBoard.innerHTML = "";
          const fragment = document.createDocumentFragment();
          const dealsByStage = deals.reduce((acc, deal) => {
            (acc[deal.stage] ||= []).push(deal);
            return acc;
          }, {});
          stages.forEach((stage) => {
            const stageDeals = dealsByStage[stage.id] || [];
            const dealCount = stageDeals.length;
            const totalValue = stageDeals.reduce(
              (sum, deal) => sum + deal.valueNet,
              0,
            );
            const column = document.createElement("div");
            column.className =
              "kanban-column flex-shrink-0 p-3 mr-4 bg-gray-100 rounded-lg";
            column.dataset.stageId = stage.id;
            const colorClass = stageColors[stage.color];
            column.innerHTML = `
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center space-x-2">
                           <span class="${colorClass.bg} ${colorClass.text} w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm">${dealCount}</span>
                           <h2 class="font-bold text-gray-700">${stage.name}</h2>
                        </div>
                    </div>
                    <div class="deal-list min-h-[200px]" data-stage-id="${stage.id}">
                        ${stageDeals.map(createCard).join("")}
                    </div>
                    <div class="mt-2 text-sm font-semibold text-gray-500 text-right">
                        Łączna wartość: ${formatCurrency(totalValue)}
                    </div>
                `;
            fragment.appendChild(column);
          });
          kanbanBoard.appendChild(fragment);
          addDragAndDropListeners(); // Re-add listeners after re-rendering
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
                    </td>
                `;
            fragment.appendChild(row);
          });
          tableBody.appendChild(fragment);
        }

        // --- MODAL LOGIC ---
        // The modal view has been removed, so related functions are no longer needed.

        // --- EVENT LISTENERS & NAVIGATION ---
        function addDragAndDropListeners() {
          // Temporary: open first deal details page on click
          const firstCard = document.getElementById("deal-1");
          if (firstCard) {
            firstCard.addEventListener("click", () => {
              window.location.href = "offer_details.html";
            });
          }

          document.querySelectorAll('[draggable="true"]').forEach((card) => {
            card.addEventListener("dragstart", (e) => {
              e.dataTransfer.setData("text/plain", card.id);
              // Add a class to the dragged card for visual feedback
              setTimeout(() => card.classList.add("card-dragging"), 0);
            });
            card.addEventListener("dragend", () => {
              // Remove the visual feedback class when dragging ends
              card.classList.remove("card-dragging");
            });
          });

          document.querySelectorAll(".deal-list").forEach((column) => {
            column.addEventListener("dragover", (e) => {
              e.preventDefault(); // Allow drop
              column.classList.add("drag-over"); // Add visual feedback for drag over
            });
            column.addEventListener("dragleave", () => {
              column.classList.remove("drag-over"); // Remove visual feedback
            });
            column.addEventListener("drop", (e) => {
              e.preventDefault();
              column.classList.remove("drag-over"); // Remove visual feedback
              const cardId = e.dataTransfer.getData("text/plain");
              const droppedCard = document.getElementById(cardId);
              const dealId = parseInt(droppedCard.dataset.dealId);
              const newStageId = column.dataset.stageId;

              const dealIndex = deals.findIndex((d) => d.id === dealId);
              if (dealIndex > -1) {
                const oldStage = deals[dealIndex].stage;
                if (oldStage !== newStageId) {
                  deals[dealIndex].stage = newStageId;
                  renderBoard(); // Re-render the board to reflect the change
                  showToast(
                    `Deal "${deals[dealIndex].projectName}" moved to "${stages.find((s) => s.id === newStageId).name}"`,
                  );

                  // Add activity for stage change
                  if (!activities[dealId]) {
                    activities[dealId] = [];
                  }
                  activities[dealId].unshift({
                    // Add to the beginning of the array
                    type: "stage-change",
                    user: "System", // Could be 'Użytkownik' if a user system is implemented
                    text: `Etap zmieniony z "${stages.find((s) => s.id === oldStage).name}" na "${stages.find((s) => s.id === newStageId).name}"`,
                    timestamp: new Date().toLocaleString("pl-PL", {
                      hour12: false,
                    }),
                  });
                }
              }
            });
          });

        }

        // Add event listener for header button (np. "Nowa oferta")
        if (addNewButton) {
          addNewButton.addEventListener("click", () => {
            if (addOfferModal) {
              populateStageSelect();
              populateContactDatalist();
              populateCompanyDatalist();
              addOfferModal.classList.remove("hidden");
            } else if (kanbanView && kanbanView.classList.contains("hidden")) {
              showToast(
                "Funkcja dodawania nowego kontaktu będzie dostępna wkrótce!",
              );
            } else {
              showToast(
                "Funkcja dodawania nowego dealu będzie dostępna wkrótce!",
              );
            }
          });
        }

        if (cancelAddOffer && addOfferModal) {
          cancelAddOffer.addEventListener("click", () => {
            addOfferModal.classList.add("hidden");
          });
        }

        if (closeAddOffer && addOfferModal) {
          closeAddOffer.addEventListener("click", () => {
            addOfferModal.classList.add("hidden");
          });
        }

        if (addOfferModal) {
          addOfferModal.addEventListener("click", (e) => {
            if (e.target === addOfferModal) {
              addOfferModal.classList.add("hidden");
            }
          });
        }

        if (addOfferForm) {
          addOfferForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addOfferModal.classList.add("hidden");
            addOfferForm.reset();
            showToast("Oferta została dodana");
          });
        }

        // Sidebar Navigation
        if (kanbanLink && contactsLink && kanbanView && contactsView) {
          kanbanLink.addEventListener("click", (e) => {
            e.preventDefault();
            kanbanView.classList.remove("hidden");
            contactsView.classList.add("hidden");
            kanbanLink.classList.add("active");
            contactsLink.classList.remove("active");
            addNewBtnText.textContent = "Nowy deal";
            renderBoard(); // Re-render board on view switch
          });

          contactsLink.addEventListener("click", (e) => {
            e.preventDefault();
            contactsView.classList.remove("hidden");
            kanbanView.classList.add("hidden");
            contactsLink.classList.add("active");
            kanbanLink.classList.remove("active");
            addNewBtnText.textContent = "Nowy kontakt";
            renderContacts(); // Render contacts on view switch
          });
        }
        // Modal has been removed, so activity saving is disabled.
  if (board) {
    renderBoard();
    if (kanbanLink) kanbanLink.classList.add("active");
    if (contactsLink) contactsLink.classList.remove("active");
  } else {
    renderContacts();
    if (contactsLink) contactsLink.classList.add("active");
    if (kanbanLink) kanbanLink.classList.remove("active");
  }
});
