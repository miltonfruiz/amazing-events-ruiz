//------------------------------------------------------------------- Capture ----------------------------------------------------------------//

const headerDarkMode = document.getElementById("aEvent");
const navDarkMode = document.getElementById("navas");
const upcomingDarkMode = document.getElementById("upcoming-events");
const pastDarkMode = document.getElementById("past-events");
const contactDarkMode = document.getElementById("contact");
const statsDarkMode = document.getElementById("stats");
const h1DarkMode = document.getElementById("h1");
const mainDarkmode = document.getElementById("main");
const darkModeIcon = document.getElementById("darkmode-icon");
const bodyDarkMode = document.getElementById("body-dark-mode");
const redesDarkmode = document.getElementById("redes");
const cohorteDarkmode = document.getElementById("cohorte");

//-------------------------------------------------------------- Dark Mode Listener ----------------------------------------------------------//

loadMode();

darkModeIcon.addEventListener("click", () => {
  upcomingDarkMode.classList.toggle("inactive-boton");
  pastDarkMode.classList.toggle("inactive-boton");
  contactDarkMode.classList.toggle("inactive-boton");
  statsDarkMode.classList.toggle("inactive-boton");
  bodyDarkMode.classList.toggle("body-dark-mode");
  cohorteDarkmode.classList.toggle("cohorte");
  redesDarkmode.classList.toggle("redes");
  headerDarkMode.classList.toggle("aEvent");
  navDarkMode.classList.toggle("navas");
  h1DarkMode.classList.toggle("h1");
  mainDarkmode.classList.toggle("main");
  storeDarkMode(mainDarkmode.classList.contains("main"));
  storeDarkMode(h1DarkMode.classList.contains("h1"));
  storeDarkMode(navDarkMode.classList.contains("navas"));
  storeDarkMode(headerDarkMode.classList.contains("aEvent"));
  storeDarkMode(redesDarkmode.classList.contains("redes"));
  storeDarkMode(cohorteDarkmode.classList.contains("cohorte"));
  storeDarkMode(bodyDarkMode.classList.contains("body-dark-mode"));
  storeDarkMode(statsDarkMode.classList.contains("inactive-boton"));
  storeDarkMode(contactDarkMode.classList.contains("inactive-boton"));
  storeDarkMode(pastDarkMode.classList.contains("inactive-boton"));
  storeDarkMode(upcomingDarkMode.classList.contains("inactive-boton"));
});

//-------------------------------------------------------------- Local Storage Load ----------------------------------------------------------//

function loadMode() {
  let darkMode = localStorage.getItem("main");
  if (!darkMode) {
    storeDarkMode("false");
  } else if (darkMode == "true") {
    mainDarkmode.classList.add("main");
    h1DarkMode.classList.add("h1");
    navDarkMode.classList.add("navas");
    headerDarkMode.classList.add("aEvent");
    redesDarkmode.classList.add("redes");
    cohorteDarkmode.classList.add("cohorte");
    bodyDarkMode.classList.add("body-dark-mode");
    statsDarkMode.classList.add("inactive-boton");
    contactDarkMode.classList.add("inactive-boton");
    upcomingDarkMode.classList.add("inactive-boton");
  }
}

//-------------------------------------------------------------- Local Storage Set -----------------------------------------------------------//

function storeDarkMode(value) {
  localStorage.setItem("main", value);
  localStorage.setItem("h1", value);
  localStorage.setItem("navas", value);
  localStorage.setItem("aEvent", value);
  localStorage.setItem("redes", value);
  localStorage.setItem("cohorte", value);
  localStorage.setItem("body-dark-mode", value);
  localStorage.setItem("inactive-boton", value);
}
