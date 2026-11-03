const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.append(fullName, birthDate, birthPlace, portrait);
        cards.appendChild(card);
    });
};

async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch prophet data: ${response.status}`);
        }

        const data = await response.json();
        //console.table(data.prophets);
        displayProphets(data.prophets);
    } catch (error) {
        console.error(error);
    }

}

getProphetData();

