let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get("id");
console.log(idEvent);

axios
  .get("https://eventafisha.com/api/v1/events/" + idEvent)
  .then(function(response) {
    console.log(response.data);
    setTitle(response.data);
    setDate(response.data);
    setLocation(response.data);
    setCity(response.data);
    setPrice(response.data);
    setBuyLink(response.data);
    setDescription(response.data);
    setImg(response.data);
    setCategory(response.data);
    setTopTags(response.data);
    setBottomTags(response.data);
    setPromo(response.data);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });

function setTitle(obj) {
  let title = obj.title;
  let titleElement = document.querySelector(".event_title");
  titleElement.innerHTML = title;
}
function setDate(obj) {
  let startDate = new Date(obj.start_date);
  let endDate = new Date(obj.end_date);
  let dateElement = document.querySelector("#event_date");
  dateElement.innerHTML =
    startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
}
function setCity(obj) {
  let city = obj.city.title;
  let cityElement = document.querySelector("#event_city");
  cityElement.innerHTML = city;
}
function setLocation(obj) {
  let location = obj.address;
  let locationElement = document.querySelector("#event_location");
  locationElement.innerHTML = location;
}
function setPrice(obj) {
  let price = obj.cost;
  if (price == 0) {
    document.querySelector("#block_price").classList.add("hide_element");
    document.querySelector("#hr_price").classList.add("hide_element");
    renameBtn();
  } else {
    let priceElement = document.querySelector("#event_price");
    priceElement.innerHTML = price;
  }
}
function setBuyLink(obj) {
  let buyLink = obj.buy_link;
  let buyBtn = document.querySelector(".btn_buy_ticket");
  buyBtn.addEventListener("click", () => window.open(buyLink));
}
function setDescription(obj) {
  let description = obj.desc;
  let descriptionElement = document.querySelector(".description_info");
  descriptionElement.innerHTML = description;
}
function setImg(obj) {
  let imgPath = obj.images;
  //  console.log("https://eventafisha.com/storage/" + imgPath);
  let imgElement = document.querySelector(".main_img_event");
  imgElement.src = "https://eventafisha.com/storage/" + imgPath;
}
function setCategory(obj) {
  let category = obj.category.title;
  let categoryElement = document.querySelector(".block_category");
  categoryElement.innerHTML = category;
}
function setTopTags(obj) {
  let tags = "";
  let tagsElement = document.querySelector(".container_top_tags");
  for (let i = 0; i < obj.tags.length; i++) {
    // console.log("tags", arr[i].title);
    tags += '<div class="tag_top">' + obj.tags[i].title + "</div>";
  }
  tagsElement.innerHTML = tags;
}

function setBottomTags(obj) {
  let tags = "";
  let tagsElement = document.querySelector(".container_bottom_tags");
  for (let i = 0; i < obj.tags.length; i++) {
    // console.log("tags", arr[i].title);
    tags += '<div class="tag_bottom">' + obj.tags[i].title + "</div>";
  }
  tagsElement.innerHTML = tags;
}
function setPromo(obj) {
  let promo = obj.promocode;
  if (promo === null) {
    document.querySelector("#block_promocode").classList.add("hide_element");
    document.querySelector("#hr_promocode").classList.add("hide_element");
  } else {
    let promoElement = document.querySelector("#event_promocode");
    promoElement.innerHTML = promo;
  }
}
function renameBtn() {
  let btn = document.querySelector(".btn_buy_ticket");
  btn.value = "РЕГИСТРАЦИЯ";
}
