
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

    document.addEventListener('click', function (event) {
        if (event.target.tagName == 'BUTTON') {
            notify(event.target);
        }
    });
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
        destination = document.createElement('p'),
        reminder1 = document.createElement('button'),
        reminder2 = document.createElement('button'),
        reminder3 = document.createElement('button');

        itemName.textContent = name;

        link.href = url;
        link.textContent = url;

        destination.textContent = country + ', ' + city;

        
        reminder1.textContent = 'Remind me three days before';
        reminder1.setAttribute('data-period', '3');
        reminder1.setAttribute('data-date', confDate);
        reminder1.setAttribute('data-name', name);

        reminder2.textContent = 'Remind me a week before';
        reminder2.setAttribute('data-period', '7');
        reminder2.setAttribute('data-date', confDate);
        reminder2.setAttribute('data-name', name);

        reminder3.textContent = 'Remind me two weeks before';
        reminder3.setAttribute('data-period', '14');
        reminder3.setAttribute('data-date', confDate);
        reminder3.setAttribute('data-name', name);

        item.append(itemName);
        item.append(link);
        item.append(destination);
        item.append(reminder1);
        item.append(reminder2);
        item.append(reminder3);
        
        list.append(item);

};

function notify (info) {

    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission(function (permission) {
           if(!('permission' in Notification)) {
             Notification.permission = permission;
           }
        });
      }
      
    let dateParts = info.dataset.date.split('-');
    let date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    date.setDate(date.getDate() + parseInt(info.dataset.period));

    var dts = Math.floor(date);

    var options = {
        body: 'Dont forget about ' + info.dataset.name + ' conference in ' + info.dataset.period + ' days',
        data: date,
        timestamp: dts
    }

    let n = new Notification('Reminder', options);
};

