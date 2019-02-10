
!(function initPageAndSchedule() {

    const xmlhttp = new XMLHttpRequest(),
          url = "schedule.json";
    let schedule = {};

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let schedule = JSON.parse(this.responseText);
            createList(schedule);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
})();

function createList(schedule) {
    const main = document.querySelector('main'),
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    months.forEach(item => createMonthItem(item, main));

    for (var k in schedule) {
        fillMonthList(schedule[k], months);
    }

};

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

function fillMonthList(conf, months){
    let confDate = conf.startDate,
        country = conf.country,
        city = conf.city,
        name = conf.name,
        url = conf.url,
        month = confDate.split('-')[1],
        motnthInArray = parseInt(month) - 1;

        list = document.querySelector('#' + month[motnthInArray]);

        console.log(list);
        



};



