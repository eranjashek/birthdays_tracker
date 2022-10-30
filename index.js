var today = new Date();

var erans_date = new Date(2001, 10, 20, 0, 0, 0, 0);
var noas_date = new Date(2003, 8, 18, 0, 0, 0, 0);
var noavs_date = new Date(2003, 7, 20, 0, 0, 0, 0);
var yarins_date = new Date(2002, 7, 15, 0, 0, 0, 0);
var netanels_date = new Date(2002, 6, 29, 0, 0, 0, 0);
var idos_date = new Date(2002, 11, 3, 0, 0, 0, 0);
var tals_date = new Date(2002, 8, 16, 0, 0, 0, 0);
var elads_date = new Date(2002, 5, 3, 0, 0, 0, 0);
var daniels_date = new Date(2001, 11, 6, 0, 0, 0, 0);
var lihis_date = new Date(1998, 10, 3, 0, 0, 0, 0);
var danas_date = new Date(2000, 6, 29, 0, 0, 0, 1);
var romis_date = new Date(2000, 11, 3, 0, 0, 0, 1);
var ofeks_date = new Date(2002, 5, 13, 0, 0, 0, 0);
var pazs_date = new Date(2002, 2, 14, 0, 0, 0, 0);
var galis_date = new Date(2002, 2, 26, 0, 0, 0, 0);

var peoples_dates = [erans_date, noas_date, noavs_date, yarins_date, netanels_date,
    idos_date, tals_date, elads_date, daniels_date, lihis_date, danas_date,
    romis_date, ofeks_date, pazs_date, galis_date
];

var peoples_names = ["Eran", "Noa O", "Noa V", "Yarin", "Netanel", "Ido", "Tal",
    "Elad", "Daniel", "Lihi", "Dana", "Romi", "Ofek", "Paz", "Gali"
];

var people_diffs = [];
var sorted_peoples_dates = [];
var sorted_peoples_names = [];

function sort_people() {
    people_diffs.sort(compareNumbers);
    for (var i = 0; i < people_diffs.length; i++) {
        temp = people_diffs[i];
        for (var j = 0; j < peoples_dates.length; j++) {
            if (diff_dates(peoples_dates[j]) == temp) {
                sorted_peoples_dates.push(peoples_dates[j]);
                sorted_peoples_names.push(peoples_names[j]);
                break;
            }
        }
    }
}

function create_labels() {
    var label1 = document.createElement("label");

    label1.innerHTML = "Name || Days || Hours || Minutes || Seconds <br><br>";
    label1.setAttribute("id", i);
    document.querySelector(".dates").appendChild(label1);
    for (var i = 0; i < sorted_peoples_dates.length; i++) {

        var person = sorted_peoples_dates[i];
        var label1 = document.createElement("label");
        label1.setAttribute("id", i + 1);
        var temp_time = people_diffs[i];
        var results = date_converter(temp_time);
        var diff_days = results[0];
        var diff_hours = results[1];
        var diff_minutes = results[2];
        var diff_seconds = results[3];
        label1.innerHTML = `${sorted_peoples_names[i]} || ${diff_days} ||
        ${diff_hours} || ${diff_minutes} || ${diff_seconds}` + "<br>";
        document.querySelector(".dates").appendChild(label1);


    }
    labels = document.querySelectorAll("label");
    for (let i = 1; i < labels.length; i++) {
        labels[i].addEventListener('mouseover', function() {
            this.classList.add("hovering");
            this.innerHTML = `${sorted_peoples_names[this.id - 1]} || ${sorted_peoples_dates[this.id - 1].getDate()} ||
            ${sorted_peoples_dates[this.id - 1].getMonth() + 1} || ${sorted_peoples_dates[this.id - 1].getFullYear()}` + "<br>";
        })
        labels[i].addEventListener('mouseout', function() {
            this.classList.remove("hovering");
        })
    }
}

function date_converter(time_in_milli) {
    var diff_days = Math.floor(time_in_milli / (1000 * 60 * 60 * 24));
    var diff_hours = Math.floor(time_in_milli / (1000 * 60 * 60));
    var diff_minutes = Math.ceil(time_in_milli / (1000 * 60));
    var diff_seconds = Math.floor(time_in_milli / (1000));
    diff_seconds = diff_seconds - (diff_minutes * 60) + 60;
    diff_minutes -= diff_hours * 60;
    diff_hours -= diff_days * 24;
    diff_days = String(diff_days);
    diff_hours = String(diff_hours);
    diff_minutes = String(diff_minutes);
    diff_seconds = String(diff_seconds);
    diff_days = add_zeros(diff_days);
    diff_hours = add_zeros(diff_hours).slice(1);
    diff_minutes = add_zeros(diff_minutes).slice(1);
    diff_seconds = add_zeros(diff_seconds).slice(1);
    return [diff_days, diff_hours, diff_minutes, diff_seconds];
}

function add_zeros(str1) {
    while (str1.length < 3) {
        str1 = '0' + str1;
    }
    return str1;
}

function compareNumbers(a, b) {
    return a - b;
}

function diff_dates(date1) {
    var temp_date = new Date(today.getFullYear(), date1.getMonth(),
        date1.getDate(), date1.getHours(), date1.getMinutes(), date1.getSeconds(),
        date1.getMilliseconds());
    var diff_time = temp_date - today;

    if (diff_time < 0) {
        temp_date.setFullYear(today.getFullYear() + 1);
        diff_time = temp_date - today;
    }

    // console.log(diff_days, diff_hours, diff_minutes, diff_time);
    return diff_time;
}


function main() {
    for (var i = 0; i < peoples_dates.length; i++) {
        people_diffs.push(diff_dates(peoples_dates[i]));
    }
    sort_people();
    create_labels();

    var labels = document.querySelectorAll("label")[1].classList.add("closest");
    countdown();
    if (isBirthday()) {
        document.querySelector("#my-canvas").classList.add("birthday");
    }
    else{
        document.querySelector("#my-canvas").classList.remove("birthday");
    }
}

function countdown() {
    setInterval(reset, 500);
}

function reset() {
    today = new Date();
    people_diffs = [];
    sorted_peoples_dates = [];
    sorted_peoples_names = [];
    for (let i = 0; i < peoples_dates.length; i++) {
        people_diffs.push(diff_dates(peoples_dates[i]));
    }
    sort_people();
    labels = document.querySelectorAll("label");
    labels.item(1);
    for (let i = 1; i < labels.length; i++) {
        var temp_time = people_diffs[i - 1];
        var results = date_converter(temp_time);
        var diff_days = results[0];
        var diff_hours = results[1];
        var diff_minutes = results[2];
        var diff_seconds = results[3];
        if (!labels[i].classList.contains("hovering")) {
            labels[i].innerHTML = `${sorted_peoples_names[i - 1]} || ${diff_days} ||
            ${diff_hours} || ${diff_minutes} || ${diff_seconds}` + "<br>";
        }
    }
}

function isBirthday() {
    return (today.getDate() == sorted_peoples_dates[sorted_peoples_dates.length - 1].getDate() &&
        today.getMonth() == sorted_peoples_dates[sorted_peoples_dates.length - 1].getMonth());
}



main();
