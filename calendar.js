// Get The Current Date
let currentDate = new Date();
function render() {
    // Write the Current month number into the html 
    document.querySelector('.current-date').innerHTML = currentDate.getMonth();

    // set the current date to the first day of that month
    currentDate.setDate(1);

    // get the last day of the current date, this will give us 28,29,30 or 31
    let lastDayOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    // get the last day of the prev month
    let lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // get the first day index, aka from 0 to 6, as 7 days in the week we need to know the first day index 
    let firstDayIndex = currentDate.getDay();

    // get the last day index as well
    let lastDayIndex = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDay();

    // get the next days left in the grid, to complete the next month starting days
    let nextDays = 7 - lastDayIndex - 1;

    // prepare a days array
    let days = [];
    // prepare a days html string
    let daysHTML = "";

    // we add the leading days from the prev month
    for (var x = firstDayIndex; x > 0; x--) {
        days.push(lastDayOfPrevMonth - x + 1);
    }
    // we add the current month days
    for (var i = 1; i <= lastDayOfCurrentDate; i++) {
        days.push(i);
    }
    // we add the next month days to complete the grid
    for (var j = 1; j <= nextDays; j++) {
        days.push(j);
    }

    // we chunk the result into 7 elements so we can control the display
    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    
    let daysArray = chunk(days, 7);

    // now we build the html
    daysArray.forEach(function (days) {

        let row = "";

        days.forEach(function (day) {
            // we check if the day is today so we can display it in different way
            if( day == new Date().getDate() && currentDate.getMonth() == new Date().getMonth() ){
                row += `<a class="btn btn-primary">${day}</a>`;
            }else{
                row += `<a class="btn">${day}</a>`;
            }
        });

        daysHTML += `<div class="d-flex align-items-center justify-content-around mt-4">${row}</div>`;

    });

    document.querySelector('.days').innerHTML = daysHTML;

}

// we render the calendar in the dom
render();

// we call for the prev month and render again
document.querySelector('.prev').addEventListener('click', function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() - 1);
    render();
});
// we call for the next month and render again
document.querySelector('.next').addEventListener('click', function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() + 1);
    render();
});