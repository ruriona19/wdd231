// Get the mobile menu button and the navigation element it controls.
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

// Toggle the navigation menu whenever the button is clicked.
menuButton.addEventListener("click", () => {
    // Read the current expanded state, then calculate the state after this click.
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    const shouldExpand = !isExpanded;

    // Keep the accessibility state in sync so assistive technology knows
    // whether the controlled navigation menu is open or closed.
    menuButton.setAttribute("aria-expanded", String(shouldExpand));

    // Add or remove the CSS class that displays or hides the menu on mobile.
    primaryNav.classList.toggle("is-open", shouldExpand);

    // Update the button's screen-reader label to describe the action it will perform.
    menuButton.querySelector(".visually-hidden").textContent =
        shouldExpand ? "Close navigation" : "Open navigation";
});