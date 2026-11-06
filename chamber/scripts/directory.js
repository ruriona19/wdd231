const membersContainer = document.querySelector(".members-grid");
const viewButtons = document.querySelectorAll("[data-view]");

function createMemberCard(member) {
    const card = document.createElement("article");
    card.className = "member-card";

    const name = document.createElement("h2");
    name.textContent = member.name;
    name.className = "member-name";

    const logo = document.createElement("img");
    logo.className = "member-logo";
    logo.src = member.imagePath;
    logo.alt = `${member.name} logo`;
    logo.loading = "lazy";
    logo.width = 76;
    logo.height = 67;

    const membership = document.createElement("p");
    membership.textContent = `Membership: ${member.membership}`;
    membership.className = "member-membership";

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;
    address.className = "member-address";

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;
    phone.className = "member-phone";

    const website = document.createElement("a");
    website.href = member.url;
    website.textContent = "Visit website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.className = "member-website";

    card.append(name, logo, membership, address, phone, website);
    return card;
}

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Could not load members: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.companies)) {
            throw new Error("The member data must contain a companies array.");
        }

        const cards = data.companies.map(createMemberCard);
        membersContainer.replaceChildren(...cards);
    } catch (error) {
        console.error(error);
        membersContainer.textContent =
            "The member directory could not be loaded. Please try again later.";
    }
}

viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const showList = button.dataset.view === "list";

        membersContainer.classList.toggle("list-view", showList);

        viewButtons.forEach((viewButton) => {
            viewButton.setAttribute(
                "aria-pressed",
                String(viewButton === button)
            );
        });
    });
});

loadMembers();