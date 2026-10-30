// Find the container, credit total, and filter buttons in the HTML.
const courseContainer = document.querySelector(".course-list");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".course-filters button");

// Display all courses or only those matching the selected filter.
function renderCourses(filter = "ALL") {
    const visibleCourses = filter === "ALL" ? courses : courses.filter((course) => course.subject === filter);
    // Remove previous cards before creating those for the current filter.
    courseContainer.replaceChildren();

    visibleCourses.forEach((course) => {
        // Create a course card and add the course title as text.
        const card = document.createElement("article");
        card.classList.add("course-card");

        if (course.status === "completed") {
            card.classList.add("is-completed");
        }

        const subject = document.createElement("h4");
        subject.textContent = `${course.subject} ${course.number}`

        const title = document.createElement("p");
        title.textContent = `${course.title}`;

        const status = document.createElement("p");
        status.classList.add("course-status");
        status.textContent =
            course.status === "completed" ? "Completed" :
                course.status === "in-progress" ? "In progress" :
                    course.status === "not-started" ? "Not started" : "Unknown status";

        card.append(subject, title, status);
        courseContainer.append(card);
    });

    // Add the visible courses' credits and update the total on the page.
    const total = visibleCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = total;
}

// When a button is clicked, update the filter and mark it as selected.
filterButtons.forEach((button) => {
    // Listen for clicks on this filter button.
    button.addEventListener("click", () => {
        // Read the filter value from this button's data-filter attribute.
        const selectedFilter = button.dataset.filter;

        // Mark only the clicked button as pressed.
        filterButtons.forEach((filterButton) => {
            filterButton.setAttribute("aria-pressed", filterButton === button ? "true" : "false");
        });

        // Display the courses that match the selected filter.
        renderCourses(selectedFilter);
    });
});

// Render all courses when the page loads.
renderCourses();