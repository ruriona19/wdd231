const params = new URLSearchParams(window.location.search);

const fields = [
    ["firstName", "first-name-output"],
    ["lastName", "last-name-output"],
    ["email", "email-output"],
    ["phone", "phone-output"],
    ["organization", "organization-output"],
    ["timestamp", "timestamp-output"],
];

const details = document.getElementById("application-details");
const message = document.getElementById("application-message");

if (!details || !message) {
    throw new Error("The application confirmation elements are missing.");
}

const hasAllValues = fields.every(([name]) => {
    const value = params.get(name);
    return value !== null && value.trim() !== "";
});

if (!hasAllValues) {
    message.textContent =
        "Application details were not found. Please return to the Join page and submit the form.";
} else {
    for (const [name, elementId] of fields) {
        const output = document.getElementById(elementId);

        if (!output) {
            throw new Error(`The confirmation field #${elementId} is missing.`);
        }

        const value = params.get(name);

        if (name === "timestamp" && value) {
            const date = new Date(value);
            output.textContent = Number.isNaN(date.getTime())
                ? value
                : date.toLocaleString();
        } else {
            output.textContent = value;
        }
    }

    details.hidden = false;
    message.textContent = "Here are the details submitted with your application:";
}