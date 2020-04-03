import { clearDP } from "../_custom.js";
import { fromDateSearch } from "../_custom.js";
import { toDateSearch } from "../_custom.js";
import { nameEventSearch } from "../_custom.js";
import { cityEventSearch } from "../_custom.js";
import { categorySearch } from "../_custom.js";
import { subjectSearch } from "../_custom.js";
import { paginationAjax } from "../_custom.js";
import { setFromDateSearch } from "../_custom.js";
import { delActiveColor } from "./help_create_elements.js";

// START BLOCK SEARCH DATE
export function createBlockDate() {
  for (let i = 0; i < 6; i++) {
    var date = new Date();
    let unixtimeDate = date.setDate(date.getDate() + i);
    moment.locale("ru");
    createSearchDays(
      moment(unixtimeDate).format("dd"),
      moment(unixtimeDate).format("DD"),
      moment(unixtimeDate).format("DD.MM.YYYY")
    );
  }
}
function createSearchDays(dayName, dayCount, dateForSearch) {
  let dayEl;
  if (dayName === "сб" || dayName === "вс") {
    dayEl =
      `
          <div class="name_day red_text">` +
      dayName +
      `</div>
          <div class="count_day">` +
      dayCount +
      `</div>
      `;
  } else {
    dayEl =
      `
          <div class="name_day">` +
      dayName +
      `</div>
          <div class="count_day">` +
      dayCount +
      `</div>
      `;
  }
  // console.log(test);

  let listDays = document.querySelector(".block_search_day");
  let eventCardElement = document.createElement("div");
  eventCardElement.className = "item_search_date";
  eventCardElement.innerHTML = dayEl;
  listDays.append(eventCardElement);
  addEventElementDate(eventCardElement, dateForSearch);
}
function addEventElementDate(element, searchDate) {
  element.addEventListener("click", function() {
    clearDP();
    delActiveColor("bg_chosen_day");
    element.classList.add("bg_chosen_day");
    // fromDateSearch = searchDate;
    setFromDateSearch(searchDate);
    paginationAjax(
      "#pagination",
      nameEventSearch,
      cityEventSearch,
      fromDateSearch,
      toDateSearch,
      categorySearch,
      subjectSearch
    );
  });
}
var allDateEl = document.querySelector(".all_days");
allDateEl.addEventListener("click", function() {
  delActiveColor("bg_chosen_day");
  allDateEl.classList.add("bg_chosen_day");
  paginationAjax("#pagination", "", "", "", "", categorySearch, subjectSearch);
});
// END BLOCK SEARCH DATE
