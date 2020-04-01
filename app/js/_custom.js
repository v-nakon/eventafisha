createBlockDate();
getCategories();
getCities("city");
getSubjects();

var spinner = document.querySelector(".block_spinner");

var searchName = document.querySelector("#event_name");
var searchLocation = document.querySelector("#city");
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

function viewEvent(id) {
  console.log("ID", id);
  console.log(window.location.href);
  let urlEvent = window.location.href + "event-page.html?id=" + id;
  window.open(urlEvent);
}

function createEventCard(objItem) {
  let eventCardElements =
    ` <div class="event_card_content">
	<div class="block_event_img">
		<img src="https://eventafisha.com/storage/` +
    objItem.images +
    `" alt="` +
    sliceText(objItem.title, 20) +
    `" class="event_card_img">
	</div>

	<div class="event_card_title">` +
    sliceText(objItem.title, 60) +
    `</div>
	<div class="event_card_desc">` +
    sliceText(objItem.desc, 120) +
    `</div>
	<div class="card_icon_title">
		<svg xmlns="http://www.w3.org/2000/svg" class="event_card_icon" viewBox="0 0 24 24"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"/></svg>
		<div class="card_title">` +
    new Date(objItem.start_date).toLocaleDateString() +
    `</div>
	</div>
	<div class="card_icon_title">
		<svg xmlns="http://www.w3.org/2000/svg" class="event_card_icon" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
		<div class="card_title">` +
    objItem.address +
    `</div>
	</div>
	<div class="event_card_cat">` +
    objItem.category.title +
    `</div>
	<input class="btn_buy_ticket" type="submit" value="Купить билет" onclick="viewEvent(` +
    objItem.id +
    `)">
  </div>`;
  // console.log(test);

  let listEventsElement = document.querySelector(".container_events");
  let eventCardElement = document.createElement("li");
  eventCardElement.className = "event_card";
  eventCardElement.innerHTML = eventCardElements;
  listEventsElement.append(eventCardElement);
}

function getCities(elementSelect) {
  axios
    .get("https://eventafisha.com/api/v1/cities")
    .then(function(response) {
      for (let item in response.data) {
        addOptionSelect(response.data[item], elementSelect);
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
function getSubjects() {
  axios
    .get("https://eventafisha.com/api/v1/subjects")
    .then(function(response) {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "subject_search");
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
function addOptionSelect(item, elementSelect) {
  let selectCategory = document.getElementById(elementSelect);
  let option = document.createElement("option");
  option.value = item.id;
  option.innerHTML = item.title;
  selectCategory.add(option);
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
// START categories for search
function getCategories() {
  axios
    .get("https://eventafisha.com/api/v1/categories")
    .then(function(response) {
      for (let item in response.data) {
        addCatToSearch(response.data[item], ".container_category");
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
function addCatToSearch(item, elementTo) {
  // console.log(item);
  let catElements = document.querySelector(elementTo);
  let newCat = document.createElement("div");
  newCat.classList.add("item_category");
  newCat.setAttribute("category_id", item.id);
  newCat.innerHTML = item.title;
  catElements.appendChild(newCat);
  addEventToElement(newCat, item.id);
}
function addEventToElement(element, catId) {
  element.addEventListener("click", function() {
    delActiveColor("color_active_cat");
    console.log("CAT - ", catId);
    element.classList.add("color_active_cat");
    document.querySelector(".arrow_down").classList.add("color_active_cat");
    categorySearch = catId;
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
var arrElCat = [
  {
    el: document.querySelector("#search_cat_all"),
    id: ""
  },
  {
    el: document.querySelector("#search_cat_main1"),
    id: 24
  },
  {
    el: document.querySelector("#search_cat_main2"),
    id: 1
  },
  {
    el: document.querySelector("#search_cat_main3"),
    id: 2
  }
];
function addListenerToArrEl(arr) {
  for (let i in arr) {
    arr[i].el.addEventListener("click", function() {
      delActiveColor("color_active_cat");
      arr[i].el.classList.add("color_active_cat");
      categorySearch = arr[i].id;
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
}
addListenerToArrEl(arrElCat);
// END categories for search
function delActiveColor(className) {
  let arrActiveColor = document.querySelectorAll("." + className);
  // console.log("arr", arrActiveColor)
  arrActiveColor.forEach(function(el) {
    el.classList.remove(className);
    // console.log("delete class")
  });
}
function sliceText(text, count) {
  let sliced = text.replace(/<\/?[^>]+>/g, "");
  sliced = sliced.slice(0, count);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
}

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
var fromDateSearch = "";
var toDateSearch = "";
var nameEventSearch = "";
var cityEventSearch = "";
var categorySearch = "";
var subjectSearch = "";

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

function paginationAjax(
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

// Open the dropdown window CATEGORY
document.querySelector(".dropbtn").addEventListener("click", function() {
  document.querySelector(".dropdown_content").classList.toggle("show");
});
// Close the dropdown if the user clicks outside of it CATEGORY
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdown = document.querySelector(".dropdown_content");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};
