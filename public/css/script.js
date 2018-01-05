$(document).ready(function () {

    $("#ag").hide();

    $('#contactInput')
        .on('invalid', function () {
            return this.setCustomValidity('Please enter a valid mobile number');
        })
        .on('input', function () {
            return this.setCustomValidity('');
          });
});


(function () {

    var dateCal = '';
    var timeCal = '';
    var id_agenda = '';
    //exemple URL : location.search => ?id_agenda=123&a=1&b=2
    arr = location.search.slice(1).split('&') // [ "id_agenda=123", "a=1", "b=2" ]

    arr.forEach(element => {
        if (element.split('=')[0] == "id_agenda") {
            id_agenda = element.split('=')[1];
            var url = `http://localhost:5000/api/agendas/${id_agenda}`;

            ajaxRequest("GET", url, null).done(function (data) {
                    console.log("success");
                    if (data) { // !=null
                        const {
                            duration,
                            end, //endDate
                            start,//startDate
                            startEvery,
                            availability
                        } = data;



                        // Agenda plugin

                        calendly = new Calendly('agenda', {
                            startDate: new Date(start),
                            endDate: new Date(end)
                        });

                        calendly.addEventListener('flClickDate', function (e) {
                            if (e.date) {
                                dateCal = e.date.toJSON().split('T')[0];
                                $("#ag").show();
                            }
                        }, false);

                        // timepicker plugin

                        var timepicker = new Timepicker('timepicker', {
                            start: "08:00 am",
                            end: "05:00 pm",
                            duration: duration,
                            startEvery: startEvery
                        });

                        timepicker.addEventListener('clickTime', function (e) {
                            timeCal = e.time;
                            $("#appointment").modal();
                        }, true)
                    }
                })
                .fail(function (error) {
                    console.error(error.responseJSON.message);
                })
            return;
        }
    });


    function ajaxRequest(method, url, data) {

        return $.ajax({
            url: url,
            method: method,
            dataType: 'json',
            data: data,
            success: function (data, status) {
                console.log("The returned data", data);
            },
        });
    }


    $("#appointment").submit(function (e) {
        e.preventDefault();

        var name = $("#nameInput").val();
        var contact = $("#contactInput").val();
        var email = $("#emailInput").val();

        var dataForm = {
            date: dateCal,
            time: timeCal,
            fullname: $("#nameInput").val(),
            phone: $("#contactInput").val(),
            email: $("#emailInput").val()
        }

        console.log(dataForm);

        var url= `http://localhost:5000/api/reserve/${id_agenda}`
        ajaxRequest("POST", url, dataForm)
        .done(function(data){
            if(data.success) alert(data.message);
        })
        .fail(function(error){
            alert(error.responseJSON.message);
        });

    });


})()


/*

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

*/
