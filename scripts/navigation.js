// Add a class to the root HTML element so CSS can apply styles that require JavaScript.
// For example, the navigation can be hidden when the menu button is available.
document.documentElement.classList.add("js");

// Find the button that controls the menu and the navigation element it controls.
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

// Continue only when both elements exist on the current page.
if (menuButton && primaryNav) {
    // Respond to a click by opening or closing the navigation menu.
    menuButton.addEventListener("click", () => {
        // Read the current expanded state; aria-expanded stores this as a string.
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        // Update the button's accessibility state and label for the next action.
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation" : "Close navigation"
        );

        // Add or remove the class that CSS uses to show or hide the navigation.
        primaryNav.classList.toggle("is-open", !isOpen);
    });
}