(function() {

  /*
  <div class="fl-timepicker">
    <span class="ion ion-chevron-left disabled"></span>
    <span class="ion ion-chevron-right"></span>
    <div class="times" style="display: inline-table;">
      <div class="fl-time">
        <span class="fl-heurs">12:00</span>
        <span class="fl-am-pm">am</span>
      </div>
      <div class="margin-right"></div>
      <div class="fl-time">
        <span class="fl-heurs">12:00</span>
        <span class="fl-am-pm">am</span>
      </div>
      ...
    </div>

  </div>
  */




  function Timepicker(idElem, options = {}) {


    var elem = document.getElementById(idElem);
    if (!elem) return;

    var start = "00:00 am";
    var end = "12:00 pm";
    var duration = "00:15";
    var startEvery = "00:00";


    var timepickerDOM = document.createElement('div');
    timepickerDOM.className = "fl-timepicker";

    var spanPrev = document.createElement('span');
    spanPrev.className = 'ion ion-chevron-left disabled';
    var spanNext = document.createElement('span');
    spanNext.className = 'ion ion-chevron-right';

    this.addEventListener = function(label, fn, useCapture = true) {
      timepickerDOM.addEventListener(label, (e) => fn(e), useCapture);
    };

    (function() {
      var count = 1;
      spanNext.onclick = function() {
        scrollDOM.scrollTo(count * 770, 0);
        spanPrev.classList.remove('disabled');
        count++;
      }
      spanPrev.onclick = function() {
        scrollDOM.scrollTo(count * 770, 0);
        if (count > 0) {
          spanPrev.classList.remove('disabled');
          count--;
        } else if (count == 0) {
          spanPrev.classList.add('disabled');
        }
      }
    })();

    var scrollDOM = document.createElement('div');
    scrollDOM.style = "overflow-x: hidden;width: 820px;"
    var timesDOM = document.createElement('div');
    timesDOM.style = "display : inline-table;"

    scrollDOM.appendChild(timesDOM);

    timepickerDOM.appendChild(spanPrev);
    timepickerDOM.appendChild(spanNext);
    timepickerDOM.appendChild(scrollDOM);

    elem.appendChild(timepickerDOM);


    function renderDOM() {

      var s = regExTime(start);
      var sh = parseInt(s[1]);
      var sm = parseInt(s[2]);
      var smode = s[3].toLowerCase();

      var e = regExTime(end);
      var eh = parseInt(e[1]);
      var em = parseInt(e[2]);
      var emode = e[3].toLowerCase();

      var se = regExTime(startEvery);
      var seh = parseInt(se[1]);
      var sem = parseInt(se[2]);

      var d = regExTime(duration);
      var dh = parseInt(d[1]);
      var dm = parseInt(d[2]);

      var xh = sh;
      var xm = sm;
      var xmode = smode;

      var count = 0;

      while (1) {

        if ((xmode == emode) && (xh == eh) && ((xm + dm + sem > em))) return;

        var timeDOM = document.createElement('div');
        var hoursDOM = document.createElement('span');
        var modeTimeDOM = document.createElement('span');
        timeDOM.className = 'fl-time';
        hoursDOM.className = 'fl-hours';
        modeTimeDOM.className = 'fl-am-pm';

        timeDOM.appendChild(hoursDOM);
        timeDOM.appendChild(modeTimeDOM);
        timesDOM.appendChild(timeDOM);

        var marginRightDOM = document.createElement('div');
        marginRightDOM.className = 'margin-right';
        timesDOM.appendChild(marginRightDOM);

        if (count > 0) {
          if ((xm + dm + sem) < 60) {
            xm += dm + sem;
          } else {
            xm = (xm + dm + sem) - 60;
            xh++;
            if (xmode == "am") {
              if (xh == 12) xmode = "pm";
              if (xh == 13) xh = 1;
            } else if (xmode == "pm") {
              if (xh == 13) xh = 1;
              if (xh == 12) {
                xh = 0;
                xmode = "am";
              }
            }
          }
        }

        var time = ((xh < 10) ? ('0' + xh) : xh) + ':' + ((xm < 10) ? ('0' + xm) : xm);

        (function(time) {
          timeDOM.onclick = function(e) {
            e.stopPropagation();
            var event = new Event('clickTime');
            event.time = time + ' ' + xmode;
            timepickerDOM.dispatchEvent(event);
          }
        })(time);


        hoursDOM.innerText = time;
        modeTimeDOM.innerText = xmode;
        count++;
      } //end while
    }


    function regExTime(time) {
      return /^([0][0-9]|[1][0-2]):([0-5][0-9]).?(pm|am|.?)/i.exec(time);
    }


    (function init() {

      var Options = {
        start: "00:00 am",
        end: "12:00 pm",
        duration: "00:30",
        startEvery: "00:05"
      }
      Object.assign(Options, (typeof options === "object") ? options : {});

      start = Options.start;
      end = Options.end;
      duration = Options.duration;
      startEvery = Options.startEvery;

      renderDOM();

    })();
  }


  window['Timepicker'] = Timepicker;

})();
