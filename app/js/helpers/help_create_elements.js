export function addOptionSelect(item, elementSelect) {
  let selectCategory = document.getElementById(elementSelect);
  let option = document.createElement("option");
  option.value = item.id;
  option.innerHTML = item.title;
  selectCategory.add(option);
}

// for create list events on main page
export function createEventCard(objItem) {
  let eventCardElements =
    ` <div class="event_card_content">
  <a href="event-page.html?id=` +
    objItem.id +
    `" target="_blank">  
	<div class="block_event_img">
		<img src="https://eventafisha.com/storage/` +
    objItem.images +
    `" alt="` +
    sliceText(objItem.title, 20) +
    `" class="event_card_img">
	</div>
  </a>
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
    checkCity(objItem.city) +
    objItem.address +
    `</div>
	</div>
	<div class="event_card_cat">` +
    objItem.category.title +
    `</div>
	<input class="btn_buy_ticket" type="submit" value="Купить билет")">
  </div>`;
  // console.log(test);

  let listEventsElement = document.querySelector(".container_events");
  let eventCardElement = document.createElement("li");
  eventCardElement.className = "event_card";
  eventCardElement.innerHTML = eventCardElements;
  listEventsElement.append(eventCardElement);
  addEventToEl(eventCardElement, objItem.id);
}
// END for create list events on main page
function sliceText(text, count) {
  let sliced = text.replace(/<\/?[^>]+>/g, "");
  sliced = sliced.slice(0, count);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
}

function addEventToEl(element, id) {
  let btnEl = element.querySelector(".btn_buy_ticket");
  btnEl.addEventListener("click", function() {
    let urlEvent = window.location.href + "event-page.html?id=" + id;
    window.open(urlEvent);
  });
}

function checkCity(objCity) {
  if (objCity === null) {
    return "";
  } else {
    return objCity.title + ", ";
  }
}
