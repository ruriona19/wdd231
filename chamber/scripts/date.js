document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Get the number of days between visits

// Get the number of milliseconds in one day = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const dayToMilliseconds = 86400000;
const daysFromLastVisit = document.querySelector(".daysFromLastVisit");


// Get the number of milliseconds elapsed since the epoch
const msElapsedSinceEpoch = Date.now();

// Get the stored VALUE for the msFromLastVisit-ls KEY 
let msFromLastVisit = Number(window.localStorage.getItem("msFromLastVisit-ls")) || msElapsedSinceEpoch;

// Time elapsed in ms between last visit and today
let msElapsed = msElapsedSinceEpoch - msFromLastVisit;

msLastVisit = msElapsedSinceEpoch;

// Get number of days since last visit
let daysElapsed = Math.round(msElapsed / dayToMilliseconds);

// Determine if this is the first visit.
if (daysFromLastVisit !== null) {
    if (msElapsed !== 0) {
        daysFromLastVisit.textContent = daysElapsed;
    } else {
        daysFromLastVisit.textContent = `Welcome! This is your first visit.`;
    }
}

// Store the new msFromLastVisit into localStorage
localStorage.setItem("msFromLastVisit-ls", msLastVisit);