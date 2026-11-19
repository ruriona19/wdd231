document.querySelectorAll("[data-dialog]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const dialog = document.getElementById(link.dataset.dialog);
    dialog.showModal();
  });
});

document.querySelectorAll(".membership-dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}