let currentDate = new Date();
function render() {
    document.querySelector('.current-date').innerHTML = currentDate.getMonth();
    currentDate.setDate(1);


    let lastDayOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    let firstDayIndex = currentDate.getDay();


    let lastDayIndex = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDay();

    let nextDays = 7 - lastDayIndex - 1;


    let days = [];
    let daysHTML = "";

    for (var x = firstDayIndex; x > 0; x--) {
        days.push(lastDayOfPrevMonth - x + 1);
    }

    for (var i = 1; i <= lastDayOfCurrentDate; i++) {
        days.push(i);
    }

    for (var j = 1; j <= nextDays; j++) {
        days.push(j);
    }

    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    let daysArray = chunk(days, 7);

    daysArray.forEach(function (days) {

        let row = "";

        days.forEach(function (day) {
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

render();

document.querySelector('.prev').addEventListener('click', function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() - 1);
    render();
});

document.querySelector('.next').addEventListener('click', function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() + 1);
    render();
});