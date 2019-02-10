

!(function createList() {
    const main = document.querySelector('main'),
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          schedule = getSchedule();

    months.forEach(item => createMonthItem(item, main));

    console.log(schedule);

})();

function createMonthItem(item, main) {
    let section = document.createElement('section'),
        head = document.createElement('h2'),
        list = document.createElement('ul');

    head.textContent = item;
    section.id = item;

    section.append(head);
    section.append(list);

    main.append(section);
};

function fillMonthList (){

};

function getSchedule () {

    var xmlhttp = new XMLHttpRequest();
    var url = "schedule.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            schedule = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

};


