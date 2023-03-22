//--------------------------------------------------------------------- API -------------------------------------------------------------------//

const apiPast = "https://mindhub-xj03.onrender.com/api/amazing";

async function fetchDataUpcoming() {
  try {
    const response = await fetch(apiPast);
    const pastData = await response.json();

    let arrayCategory = pastData.events.map((array) => array.category);
    let categoryFiltering = arrayCategory.reduce((array, element) => {
      if (!array.includes(element)) {
        array.push(element);
      }
      return array;
    }, []);

    //---------------------------------------------------------------- Capture ---------------------------------------------------------------//
    let pastContainer = document.getElementById("past-container");
    let pastCategory = document.getElementById("past-category");
    const searchInput = document.getElementById("search-input");

    //----------------------------------------------------------- Arrays / Variables ---------------------------------------------------------//
    let propertySearch = "";
    let searchFilter = [];
    let checked = [];
    let categoryCheck = [];

    //----------------------------------------------------------------- Search ---------------------------------------------------------------//
    searchInput.addEventListener("keyup", (event) => {
      propertySearch = event.target.value.toLowerCase();
      filterFunction();
    });

    //---------------------------------------------------------------- Check Box -------------------------------------------------------------//
    pastCategory.addEventListener("click", (event) => {
      if (event.target.checked) {
        checked.push(event.target.value);
      } else {
        checked = checked.filter(
          (notChecked) => notChecked !== event.target.value
        );
      }
      filterFunction();
    });

    //------------------------------------------------------------ Rendering Functions -------------------------------------------------------//
    function createCategory(event) {
      let genericCategory = "";
      for (let i of event) {
        genericCategory += `
          <label id="label-switch" for="category[]" class="form-check-label ms-4 mt-3">
            <input class="check-box form-check-input" type="checkbox" name="${i}" id="${i}" value=${i}> ${i}
          </label>
          `;
      }
      pastCategory.innerHTML = genericCategory;
    }
    function upcomingCards(arrayData) {
      let upcomingArrayCategory = arrayData.filter(
        (parameter) => parameter.date < pastData.currentDate
      );
      let genericCardUp = "";
      for (let array of upcomingArrayCategory) {
        genericCardUp += `<div class="card-scale ms-5 mt-5 d-flex flex-wrap">
              <div class="card" style="width: 14rem">
                <img
                  src="${array.image}"
                  class="card-img m-1"
                  alt="img-food"
                />
                <div class="card-body">
                  <h5 class="card-title text-center">${array.name}</h5>
                  <p class="card-description text-center">${array.description}</p>
                  <a
                    href="./details.html?id=${array._id}"
                    class="btn btn-outline-danger details-boton"
                    id="food-boton"
                    >More Details</a
                  >
                </div>
              </div>
            </div>`;
      }
      return genericCardUp;
    }
    function filterFunction() {
      searchFilter = pastData.events.filter(
        (arrayFilter) =>
          arrayFilter.category.toLowerCase().includes(propertySearch) ||
          arrayFilter.name.toLowerCase().includes(propertySearch) ||
          arrayFilter.date.includes(propertySearch)
      );

      categoryCheck = pastData.events.filter((aEvent) =>
        checked.includes(aEvent.category)
      );

      if (searchFilter.length > 0) {
        pastContainer.innerHTML = upcomingCards(searchFilter);
        let arrayActive = searchFilter.filter((event) =>
          event.category.includes(checked.toString())
        );
        pastContainer.innerHTML = upcomingCards(arrayActive);
      } else if (searchFilter == 0) {
        pastContainer.innerHTML = `<div class="card-scale ms-5 mt-5 d-flex flex-wrap">
        <div class="card" style="width: 14rem">
          <img
            id="error-img"
            src="./assets/images/lupa-x.jpg"
            class="card-img m-1"
            alt="img-food"
          />
          <div class="card-body">
            <h5 class="card-title text-center">Card Not Found</h5>
            <p class="card-description text-center"></p>
            <a
              href="./index.html"
              class="btn btn-outline-danger details-boton"
              id="error-boton"
              >Return to home</a
            >
          </div>
        </div>
        </div>`;
      }
      if (categoryCheck.length > 0) {
        pastContainer.innerHTML = upcomingCards(categoryCheck);
        let arrayNotActive = categoryCheck.filter((arrayNot) =>
          arrayNot.name.toLowerCase().includes(propertySearch.toString())
        );
        pastContainer.innerHTML = upcomingCards(arrayNotActive);
        if (searchFilter == 0) {
          pastContainer.innerHTML = `<div class="card-scale ms-5 mt-5 d-flex flex-wrap">
        <div class="card" style="width: 14rem">
          <img
            id="error-img"
            src="./assets/images/lupa-x.jpg"
            class="card-img m-1"
            alt="img-food"
          />
          <div class="card-body">
            <h5 class="card-title text-center">Card Not Found</h5>
            <p class="card-description text-center"></p>
            <a
              href="./index.html"
              class="btn btn-outline-danger details-boton"
              id="error-boton"
              >Return to home</a
            >
          </div>
        </div>
        </div>`;
        }
      }
    }
    createCategory(categoryFiltering);
    filterFunction();
  } catch (error) {
    console.log(error);
  }
}

fetchDataUpcoming();
