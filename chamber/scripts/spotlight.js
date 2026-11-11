const spotlightContainer = document.querySelector("#spotlight-container");

function shuffle(items) {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}

function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.className = "spotlight-card";

    const heading = document.createElement("div");
    heading.className = "spotlight-heading";

    const logo = document.createElement("img");
    logo.className = "spotlight-logo";
    logo.src = member.imagePath;
    logo.alt = `${member.name} logo`;
    logo.loading = "lazy";
    logo.width = member.imageWidth;
    logo.height = member.imageHeight;

    const name = document.createElement("h3");
    name.textContent = member.name;

    heading.append(logo, name);

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const membership = document.createElement("p");
    membership.textContent = `Membership: ${member.membership}`;

    const website = document.createElement("a");
    website.href = member.url;
    website.textContent = "Visit website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(heading, phone, address, membership, website);

    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Could not load members: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.companies)) {
            throw new Error("Member data must contain a companies array.");
        }

        const eligibleMembers = data.companies.filter((member) => {
            const level = member.membership?.toLowerCase();
            return level === "gold" || level === "silver";
        });

        if (eligibleMembers.length < 3) {
            throw new Error("At least three Gold or Silver members are required.");
        }

        const selectedMembers = shuffle(eligibleMembers).slice(0, 3);
        const cards = selectedMembers.map(createSpotlightCard);

        spotlightContainer.replaceChildren(...cards);
    } catch (error) {
        console.error("Could not load member spotlights:", error);
        spotlightContainer.textContent =
            "Member spotlights are unavailable right now.";
    }
}

loadSpotlights();