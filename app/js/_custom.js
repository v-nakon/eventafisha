for(let i=1; i<7; i++) {
	var date = new Date();
	let unixtimeDate = date.setDate(date.getDate()+i);
	moment.locale("ru");
	console.log(moment(unixtimeDate).format('DD'));
	console.log(moment(unixtimeDate).format('dd'));
	createSearchDays(moment(unixtimeDate).format('dd'), moment(unixtimeDate).format('DD'));
}

function createSearchDays(dayName, dayCount) {
	let dayEl;
	if(dayName==='сб' || dayName==='вс') {
		dayEl = `
		<div class="name_day red_text">` + dayName + `</div>
		<div class="count_day">` + dayCount + `</div>
	`
	} else {
		dayEl = `
		<div class="name_day">` + dayName + `</div>
		<div class="count_day">` + dayCount + `</div>
	`
	};
	// console.log(test);

	let listDays = document.querySelector(".block_search_day");
	let eventCardElement = document.createElement('div');
	eventCardElement.className = "item_search_date";
	eventCardElement.innerHTML = dayEl;
	listDays.append(eventCardElement);
}



$(function(){
	$('.datepicker-start').datepicker({
	   onSelect: function (dateText, inst) {
		//   console.log(dateText)
		  datepickerStart = dateText;
	   },
	   minDate: new Date()
	});
 });

 $(function(){
	$('.datepicker-end').datepicker({
	   onSelect: function (dateText, inst) {
		//   console.log(dateText)
		  datepickerEnd = dateText;
	   },
	   minDate: new Date()
	});
 });