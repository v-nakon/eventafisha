import { addListenerToArrEl } from "./category_search_block.js";
var arrElCatFooter = [
  {
    el: document.querySelector("#footer_search_cat1"),
    id: 27,
  },
  {
    el: document.querySelector("#footer_search_cat2"),
    id: 24,
  },
  {
    el: document.querySelector("#footer_search_cat3"),
    id: 1,
  },
  {
    el: document.querySelector("#footer_search_cat4"),
    id: 2,
  },
];
addListenerToArrEl(arrElCatFooter);
