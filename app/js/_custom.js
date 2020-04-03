import { addOptionSelect } from "./helpers/help_create_elements.js";
import { createEventCard } from "./helpers/help_create_elements.js";
import { getCategories } from "./helpers/requests.js";
import { getCities } from "./helpers/requests.js";
import { getSubjects } from "./helpers/requests.js";
import { addCatToSearch } from "./helpers/category_search_block.js";

createBlockDate();
getCategoriesData();
getCitiesData();
getSubjectsData();

var spinner = document.querySelector(".block_spinner");

var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");

closeModalNotfound.addEventListener("click", function() {
  modalNotFound.style.display = "none";
  document.location.href = "/";
});

let btnSearch = document.querySelector(".btn_search");
btnSearch.addEventListener("click", () =>
  searchEvent("event_name", "city", "subject_search")
);

function getCitiesData() {
  getCities()
    .then(response => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "city");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
function getSubjectsData() {
  getSubjects()
    .then(response => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "subject_search");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
function getCategoriesData() {
  getCategories()
    .then(response => {
      for (let item in response.data) {
        addCatToSearch(response.data[item], ".container_category");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
// START BLOCK SEARCH DATE
function createBlockDate() {
  for (let i = 0; i < 6; i++) {
    var date = new Date();
    let unixtimeDate = date.setDate(date.getDate() + i);
    moment.locale("ru");
    console.log(moment(unixtimeDate).format("DD"));
    console.log(moment(unixtimeDate).format("dd"));
    console.log(moment(unixtimeDate).format("DD.MM.YYYY"));
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
    dp.clear();
    delActiveColor("bg_chosen_day");
    console.log("Data - ", searchDate);
    element.classList.add("bg_chosen_day");
    fromDateSearch = searchDate;
    paginationAjax(
      "#pagination",
      nameEventSearch,
      cityEventSearch,
      fromDateSearch,
      toDateSearch,
      categorySearch,
      subjectSearch
    );
    // document.querySelector(".arrow_down").classList.add("color_active_cat");
  });
}
var allDateEl = document.querySelector(".all_days");
allDateEl.addEventListener("click", function() {
  delActiveColor("bg_chosen_day");
  allDateEl.classList.add("bg_chosen_day");
  paginationAjax("#pagination", "", "", "", "", categorySearch, subjectSearch);
});
// END BLOCK SEARCH DATE

// search datepicker
let $btn = $(".datepicker_btn"),
  $input = $("#dp"),
  dp = $input
    .datepicker({
      showEvent: "none",
      range: true,

      onSelect: function(dateText, inst) {
        console.log(dateText);
        splitSearchDate(dateText);
      },
      minDate: new Date()
    })
    .data("datepicker");

$btn.on("click", function() {
  dp.show();
  dp.clear();
  $input.focus();
});
function splitSearchDate(dates) {
  delActiveColor("bg_chosen_day");
  if (dates.indexOf(" - ") > -1) {
    let dateArr = dates.split(" - ");
    fromDateSearch = dateArr[0];
    toDateSearch = dateArr[1];
  } else {
    fromDateSearch = dates;
  }
}

// search function
export var fromDateSearch = "";
export var toDateSearch = "";
export var nameEventSearch = "";
export var cityEventSearch = "";
export var categorySearch = "";
export var subjectSearch = "";
export function setCategorySearch(value) {
  categorySearch = value;
}

// для поиска по названию/городу
function searchEvent(titleEl, cityEl, subjectEl) {
  nameEventSearch = document.getElementById(titleEl).value;
  cityEventSearch = document.getElementById(cityEl).value;
  subjectSearch = document.getElementById(subjectEl).value;
  // searchRequest(nameEvent, cityEvent);
  paginationAjax(
    "#pagination",
    nameEventSearch,
    cityEventSearch,
    fromDateSearch,
    toDateSearch,
    categorySearch,
    subjectSearch
  );
}
function removeEventList() {
  var listEventEl = document.querySelector(".container_events");
  while (listEventEl.firstChild) {
    listEventEl.removeChild(listEventEl.firstChild);
  }
}

$(function() {
  paginationAjax("#pagination", "", "", "", "", "", "");
});

function checkSearchParam(title, city, dateStart, dateEnd, category, subject) {
  let link = "https://eventafisha.com/api/v1/events?paginate=";
  if (title !== "") {
    link += "&title=" + title;
  }
  if (city !== "") {
    link += "&city_id=" + city;
  }
  if (dateStart !== "") {
    link += "&date_start=" + dateStart;
  }
  if (dateEnd !== "") {
    link += "&date_end=" + dateEnd;
  }
  if (category !== "") {
    link += "&category_id=" + category;
  }
  if (subject !== "") {
    link += "&subject_id=" + subject;
  }
  return link;
}

export function paginationAjax(
  name,
  title,
  city,
  dateStart,
  dateEnd,
  category,
  subject
) {
  let url = checkSearchParam(
    title,
    city,
    dateStart,
    dateEnd,
    category,
    subject
  );
  var container = $(name);
  container.pagination({
    dataSource: url,
    locator: "data",
    totalNumberLocator: function(dataSource) {
      // you can return totalNumber by analyzing response content
      console.log("test", dataSource.total);
      return dataSource.total;
    },
    pageSize: 24,
    showPageNumbers: true,
    showPrevious: true,
    showNext: true,
    // showNavigator: true,
    showFirstOnEllipsisShow: true,
    showLastOnEllipsisShow: true,
    className: "paginationjs-theme paginationjs-small",
    alias: {
      pageNumber: "page",
      pageSize: "limit"
    },
    ajax: {
      beforeSend: function() {
        // container.prev().html('Загрузка данных');
        removeEventList();
        spinner.classList.remove("hide_spinner");
      }
    },
    callback: function(response, pagination) {
      // window.console && console.log(22, response, pagination.pageNumber);
      // console.log(pagination.pageNumber);
      spinner.classList.add("hide_spinner");
      console.log("response", response);
      if (response.length === 0) {
        modalNotFound.style.display = "block";
      } else {
        removeEventList();
        $.each(response, function(index, item) {
          createEventCard(item);
        });
        window.scrollTo(0, 0);
      }
      //   searchName.value = "";
      //   searchLocation.value = "";

      // if (window.matchMedia("(max-width: 768px)").matches){
      // 	hideSearch();
      // 	searchNameMob.value = "";
      // 	searchLocationMob.value = "";
      // }
    }
  });
}
