//------------------------------------------------------------------- API --------------------------------------------------------------------//

let apiStats = "https://mindhub-xj03.onrender.com/api/amazing";

async function fetchDataStats() {
  try {
    const response = await fetch(apiStats);
    const statsData = await response.json();

    const assistanceArray = statsData.events
      .filter((array) => array.assistance !== undefined)
      .map((array) => {
        return {
          name: array.name,
          assistance: array.assistance,
          capacity: array.capacity,
          percentage: ((array.assistance / array.capacity) * 100).toFixed(2),
        };
      });

    const highPercentage = assistanceArray
      .sort((arrayA, arrayB) => arrayB.percentage - arrayA.percentage)
      .map((array) => {
        return `${array.name} ${array.percentage}%`;
      });

    const lowPercentage = highPercentage.slice(-3);

    const capacityPast = statsData.events.filter(
      (array) => array.date < statsData.currentDate
    );

    const highCapacity = capacityPast
      .sort((arrayA, arrayB) => arrayB.capacity - arrayA.capacity)
      .map((array) => {
        return `${array.name} ${array.capacity} people`;
      });
    const eventStatistics = (document.getElementById(
      "events-statistics"
    ).innerHTML = `<tr class="rowPointer"> 
                    <td>${highPercentage[0]}</td>
                    <td>${lowPercentage[2]}</td>
                    <td>${highCapacity[0]}</td>
                  </tr>
                  <tr class="rowPointer">
                    <td>${highPercentage[1]}</td>
                    <td>${lowPercentage[1]}</td>
                    <td>${highCapacity[1]}</td>
                  </tr>
                  <tr class="rowPointer">
                    <td>${highPercentage[2]}</td>
                    <td>${lowPercentage[0]}</td>
                    <td>${highCapacity[2]}</td>
                  </tr>`);

    const upcomingEvents = statsData.events
      .filter((array) => array.date > statsData.currentDate)
      .map((array) => {
        return {
          name: array.name,
          category: array.category,
          capacity: array.capacity,
          estimate: array.estimate,
          price: array.price,
          revenues: array.price * array.estimate,
        };
      });

    const arrayUpcomingCategories = upcomingEvents.map(
      (array) => array.category
    );

    const upcomingCategories = arrayUpcomingCategories
      .filter((item, index) => arrayUpcomingCategories.indexOf(item) == index)
      .sort();

    function createCategoryUpcoming(category) {
      let revenuesUpcoming = 0;
      let capacityUpcoming = 0;
      let estimateUpcoming = 0;
      let revenuesArrayUpcoming = [];
      upcomingEvents.forEach((event) => {
        if (event.category == category) {
          revenuesUpcoming += event.revenues;
          capacityUpcoming += event.capacity;
          estimateUpcoming += event.estimate;
        }
      });
      let percentageUpcoming = (
        (estimateUpcoming / capacityUpcoming) *
        100
      ).toFixed(2);
      revenuesArrayUpcoming.push(revenuesUpcoming);
      revenuesArrayUpcoming.push(percentageUpcoming);
      return revenuesArrayUpcoming;
    }

    function addDataUpcoming() {
      upcomingCategories.forEach((array) => {
        arrayUpcoming.push(createCategoryUpcoming(array));
      });
    }

    let arrayUpcoming = [];
    addDataUpcoming();

    const upcomingEventsStatistics = (document.getElementById(
      "upcoming-events-statistics"
    ).innerHTML = `
        <tr class="rowPointer">
            <td>${upcomingCategories[0]}</td>
            <td>$ ${arrayUpcoming[0][0]}</td>
            <td>${arrayUpcoming[0][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${upcomingCategories[1]}</td>
            <td>$ ${arrayUpcoming[1][0]}</td>
            <td>${arrayUpcoming[1][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${upcomingCategories[2]}</td>
            <td>$ ${arrayUpcoming[2][0]}</td>
            <td>${arrayUpcoming[2][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${upcomingCategories[3]}</td>
            <td>$ ${arrayUpcoming[3][0]}</td>
            <td>${arrayUpcoming[3][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${upcomingCategories[4]}</td>
            <td>$${arrayUpcoming[4][0]}</td>
            <td>${arrayUpcoming[4][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${upcomingCategories[5]}</td>
            <td>$${arrayUpcoming[5][0]}</td>
            <td>${arrayUpcoming[5][1]} %</td>
        </tr>
    `);

    const pastEvents = statsData.events
      .filter((array) => array.date < statsData.currentDate)
      .map((array) => {
        return {
          name: array.name,
          category: array.category,
          capacity: array.capacity,
          assistance: array.assistance,
          percentage: Math.round((array.assistance / array.capacity) * 100),
          price: array.price,
          revenues: array.price * array.assistance,
        };
      });

    const arrayPastCategories = pastEvents.map((array) => array.category);

    const pastCategories = arrayPastCategories
      .filter((item, index) => arrayPastCategories.indexOf(item) == index)
      .sort();

    function createCategoryPast(category) {
      let revenuesPast = 0;
      let capacityPast = 0;
      let assistancePast = 0;
      let revenuesArrayPast = [];
      pastEvents.forEach((array) => {
        if (array.category == category) {
          revenuesPast += array.revenues;
          capacityPast += array.capacity;
          assistancePast += array.assistance;
        }
      });
      let percentagePast = ((assistancePast / capacityPast) * 100).toFixed(2);
      revenuesArrayPast.push(revenuesPast);
      revenuesArrayPast.push(percentagePast);
      return revenuesArrayPast;
    }

    function addDataPast() {
      pastCategories.forEach((array) => {
        arrayPast.push(createCategoryPast(array));
      });
    }
    let arrayPast = [];
    addDataPast();

    const pastEventsStatistics = (document.getElementById(
      "past-events-statistics"
    ).innerHTML = `
        <tr class="rowPointer">
            <td>${pastCategories[0]}</td>
            <td>$ ${arrayPast[0][0]}</td>
            <td>${arrayPast[0][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[1]}</td>
            <td>$ ${arrayPast[1][0]}</td>
            <td>${arrayPast[1][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[2]}</td>
            <td>$ ${arrayPast[2][0]}</td>
            <td>${arrayPast[2][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[3]}</td>
            <td>$ ${arrayPast[3][0]}</td>
            <td>${arrayPast[3][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[4]}</td>
            <td>$ ${arrayPast[4][0]}</td>
            <td>${arrayPast[4][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[5]}</td>
            <td>$ ${arrayPast[5][0]}</td>
            <td>${arrayPast[5][1]} %</td>
        </tr>
        <tr class="rowPointer">
            <td>${pastCategories[6]}</td>
            <td>$ ${arrayPast[6][0]}</td>
            <td>${arrayPast[6][1]} %</td>
        </tr>
    `);
  } catch (error) {
    console.log(error);
  }
}
fetchDataStats();

//----------------------------------------------------------------- Capturo ------------------------------------------------------------------//

//------------------------------------------------------------------- Max --------------------------------------------------------------------//
