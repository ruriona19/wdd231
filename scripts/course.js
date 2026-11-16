// Find the container, credit total, and filter buttons in the HTML.
const courseContainer = document.querySelector(".course-list");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".course-filters button");
const courseDetails = document.getElementById("course-details");

// Display all courses or only those matching the selected filter.
function renderCourses(filter = "ALL") {
    const visibleCourses = filter === "ALL" ? courses : courses.filter((course) => course.subject === filter);
    // Remove previous cards before creating those for the current filter.
    courseContainer.replaceChildren();

    visibleCourses.forEach((course) => {
        // Create a course card and add the course title as text.
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("course-card");
        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        if (course.status === "completed") {
            card.classList.add("is-completed");
        }

        const subject = document.createElement("span");
        subject.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement("span");
        title.textContent = course.title;

        const status = document.createElement("span");
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

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
    <button id="closeModal" type="button" aria-label="Close">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificates:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `
    courseDetails.showModal();

    const closeButton = courseDetails.querySelector("#closeModal");
    closeButton.addEventListener("click", () => {
        courseDetails.close();
    });
}

// Close the modal when the user clicks outside of it (on the backdrop)
courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});