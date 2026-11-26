import { places } from '../data/places.mjs'
console.log(places)

const placeCards = document.querySelector("#place-cards");

function displayPlaces(placesToDisplay) {
    placeCards.replaceChildren();

    placesToDisplay.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = place.photo_url;
        image.alt = `View of ${place.name}`;
        image.loading = "lazy";
        figure.append(image);

        const address = document.createElement("address");
        const locationLabel = document.createElement("strong");
        locationLabel.textContent = "Location: ";
        address.append(locationLabel, document.createTextNode(place.address));

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        card.append(title, figure, address, description, button);
        placeCards.append(card);
    });
}

displayPlaces(places);