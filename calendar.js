
!(function initPageAndSchedule() {

    const xmlhttp = new XMLHttpRequest(),
          url = "https://sirpravdi.github.io/calendar/schedule.json";
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
        motnthInArray = parseInt(month) - 1,
        section = document.querySelector('#' + months[motnthInArray]),
        list = section.querySelector('ul'),
        item = document.createElement('li'),
        itemName = document.createElement('h3'),
        link = document.createElement('a'),
        destination = document.createElement('p');

        itemName.textContent = name;

        link.href = url;
        link.textContent = url;

        destination.textContent = country + ', ' + city;

        item.append(itemName);
        item.append(link);
        item.append(destination);
        
        list.append(item);

};



