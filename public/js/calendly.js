(function () {

  /*
  Agenda DOM
  <div class="fl-agenda">
    <span class="ion ion-chevron-left"></span>
    <span class="ion ion-chevron-right"></span>
    <div class="fl-date">
      <span class="fl-day">Fri</span>
      <span class="fl-month-date">Dec 21</span>
    </div>
    <div class="margin-right"></div>
  </div>
  */

  var Calendly = function Calendly(idElem, options) {
    startDate = new Date();
    endDate = new Date();
    var dateDOMS = [];
    var currentweekdate = new Date();
    var week = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    var nbWeek = 0;

    var agendaDOM = document.createElement('div');

    agendaDOM.className = 'fl-agenda';
    agendaDOM.setAttribute("data-week", "This week");
    agendaDOM.setAttribute("data-year", currentweekdate.getFullYear());

    var spanPrev = document.createElement('span');
    spanPrev.className = 'ion ion-chevron-left disabled';
    var spanNext = document.createElement('span');
    spanNext.className = 'ion ion-chevron-right';

    var daysDOM = document.createElement('div');
    daysDOM.style = "display : inline-table;"

    agendaDOM.appendChild(spanPrev);
    agendaDOM.appendChild(spanNext);

    spanPrev.onclick = () => this.prevWeek();
    spanNext.onclick = () => this.nextWeek();


    this.addEventListener = function (label, fn, useCapture= true) {
      agendaDOM.addEventListener(label, (e) => fn(e), useCapture);
    }


    this.nextWeek = function () {
      nbWeek++;
      currentweekdate.setDate(currentweekdate.getDate() + 7);
      spanPrev.className = 'ion ion-chevron-left';
      updateDOM();
    };

    this.prevWeek = function () {
      let today = new Date();
      if (nbWeek > 0) {
        nbWeek--;
        if (nbWeek == 0) spanPrev.classList.add('disabled');
        currentweekdate.setDate(currentweekdate.getDate() - 7);
        updateDOM();
      }
    };

    (function () {
      for (var i = 0; i < 7; i++) {
        var dateDOM = document.createElement('div');
        dateDOM.className = 'fl-date';
        var dayDOM = document.createElement('span');
        dayDOM.className = 'fl-day';
        var textDay = document.createTextNode('');
        var monthDateDOM = document.createElement('span');
        monthDateDOM.className = 'fl-month-date';
        var textMonthDate = document.createTextNode('');


        dayDOM.appendChild(textDay);
        monthDateDOM.appendChild(textMonthDate);
        dateDOM.appendChild(dayDOM);
        dateDOM.appendChild(monthDateDOM);

        daysDOM.appendChild(dateDOM);
        if(i<6){
          var marginRightDOM = document.createElement('div');
          marginRightDOM.className = 'margin-right';

          daysDOM.appendChild(marginRightDOM);
        }


        dateDOMS.push({
          dateDOM,
          dayDOM,
          monthDateDOM,
          textDay,
          textMonthDate
        })
      }
      agendaDOM.appendChild(daysDOM);

    })();

    function updateDOM() {
      updateYearDOM();
      updateNbWeekDOM();

      for (var i = 0; i < 7; i++) {

        var copy_date = new Date(currentweekdate.getTime());
        copy_date.setDate(copy_date.getDate() - copy_date.getDay() + i);
        let today = new Date();


        dateDOMS[i].dateDOM.setAttribute('data-date', copy_date.toLocaleDateString())

        if(!((copy_date >= startDate) && (copy_date <= endDate))){
          dateDOMS[i].dateDOM.classList.add("disabled");
        }else{
          dateDOMS[i].dateDOM.classList.remove("disabled");
        }


        if (
          (today.getDate() == copy_date.getDate()) &&
          (today.getMonth() == copy_date.getMonth()) &&
          (today.getFullYear() == copy_date.getFullYear())
        ) {
          dateDOMS[i].dateDOM.classList.add('today');
        } else {
          dateDOMS[i].dateDOM.classList.remove('today');
        }


        (function (copy_date, dateDOM) {

          dateDOM.onclick = function (e) {
            var event = new Event('flClickDate');
            if (dateDOM.classList.contains('disabled')) event.date = null;
            else event.date = new Date(copy_date.getTime());
            agendaDOM.dispatchEvent(event);
          };

        })(copy_date, dateDOMS[i].dateDOM);

        dateDOMS[i].textDay.textContent = week[i];
        dateDOMS[i].textMonthDate.textContent = copy_date.toString().split(' ')[1] + ' ' + copy_date.toString().split(' ')[2];

      }

    }

    function updateYearDOM() {
      agendaDOM.setAttribute("data-year", currentweekdate.getFullYear());
    }

    function updateNbWeekDOM() {
      if (nbWeek == 1) agendaDOM.setAttribute("data-week", "Next week");
      else if (nbWeek == 0) agendaDOM.setAttribute("data-week", "This week");
      else agendaDOM.setAttribute("data-week", nbWeek + " weeks out");
    }

    (function Init(elm, options) {

      var Options={
        startDate: startDate,
        endDate: endDate,
        holidays: [],
        weekHolidays: []
      }

      Object.assign(Options, options);

      if(options.startDate && !options.endDate)
        Options.endDate= new Date(Options.startDate.getFullYear()+1, Options.startDate.getMonth(), Options.startDate.getDay())


      if (elm) elem = document.getElementById(elm);

      startDate = new Date(Options.startDate.getTime());
      currentweekdate = new Date(Options.startDate.getTime());
      endDate = new Date(Options.endDate.getTime());

      if (elem) {
        elem.innerHTML = "";
        updateDOM();
        elem.appendChild(agendaDOM);
      }
    })(idElem, options);


  }

  window['Calendly'] = Calendly;
})();
