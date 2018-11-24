jQuery(function ($) {
    $.validator.addMethod("validDOB",function(value, element) {              
            
             var from = value.split("-"); // DD/MM/YYYY
            var day = from[2];
            var month = from[1];
            var year = from[0];
            var age = 18;

            var mydate = new Date();
            mydate.setFullYear(year, month-1, day);

            var currdate = new Date();
            var setDate = new Date();

            setDate.setFullYear(mydate.getFullYear() + age, month-1, day);

            if ((currdate - setDate) > 0){
                return true;
            }else{
                return false;
            }
        },
        "Sorry, you must be 18 years of age to apply"
    );
    $.validator.addMethod('strongPassword', function (value, Element) {
        return this.optional(Element) || value.length >= 8 && /\d/.test(value) && /[A-Z]{1}/.test(value);
    }, 'Password should be 8 character long and contain atleast one digit, and a capital letter');

    $.validator.addMethod("exactlength", function(value, element, param) {
        return this.optional(element) || value.length == param;
       }, $.validator.format("Please enter exactly {0} characters."));

       $.validator.addMethod("doj_shouldbe",function(value,element){
        var str = $(element).val();
        var d1 = Date.parse(str);
        var d2 = new Date().getTime();
        return this.optional(element)||d1<=d2;
       },$.validator.format("Date should be atmost today or one in the past"));
    $("#customerform").validate({
        onkeyup: function(element) {
            this.element(element);  // <- "eager validation"
        },
        onfocusout: function(element) {
            this.element(element);  // <- "eager validation"
        },
        errorClass: 'error',
        highlight: function (Element) {

            $(Element).addClass('is-invalid')
        },
        unhighlight: function (Element) {
            $(Element).removeClass('is-invalid')
        },

        rules: {
            name: {
                required: true,
                lettersonly: true,
                minlength: 4,
                maxlength: 50
            },
            dob: {
                required: true,
                date:true,
                validDOB:true
            },
            contact: {
                required: true,
                digits: true,
                exactlength:10
            },
            email: {
                required: true,
                email: true
            },
            address: {
                required: true
            },
            mark:{
              required:true
            },
            height:{
               
                pattern:/^([0-9]{1,})(.{0,1})([0-9]{0,})$/
            },
            weight:{
                
                pattern:/^([0-9]{1,})(.{0,1})([0-9]{0,})$/
            },
            zipcode: {
                required: true,
                digits:true,
                exactlength:6
            },
            city: {
                required: true,
                lettersonly: true
            },
            state: {
                required: true,
                lettersonly: true
            },
            income: {
                required: true,
                digits:true
            },
        password:{
            strongPassword:true,
            required:true
        },
        cpassword:{
            equalTo : "#password"
        }
        },
        messages: {
            name: {},
            dob: {},
            contact: {},
            email: {},
            paddress: {},
            caddress: {},
            zipcode: {},
            city: {},
            state: {},
            doj: {},
            cpassword:{
                equalTo : "Enter the same password again "
            }
        },
        submitHandler: function(form) {
            store()}
    });
});

function validateHeight() {
    var str = $("#height").val();
    if (str == '') {
        $("#height").attr("data-toggle", "tooltip");
        $("#height").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#height").attr("data-toggle", "tooltip");
                $("#height").attr("title", "Height can contain be a number");
                flag = false;
            }
        }
    }
}

function validateWeight() {
    var str = $("#weight").val();
    if (str == '') {
        $("#weight").attr("data-toggle", "tooltip");
        $("#weight").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#weight").attr("data-toggle", "tooltip");
                $("#weight").attr("title", "Weight can contain only be a number");
                flag = false;
            }
        }
    }
}

function validateName() {
    var str = $("#name").val();
    if (str == '') {
        $("#name").attr("data-toggle", "tooltip");
        $("#name").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var b = new RegExp("[^A-Za-z ]").test(str);
        if (b) {
            $("#name").attr("data-toggle", "tooltip");
            $("#name").attr("title", "Name can contain only letters and spaces");
            flag = false;
        }
    }
}

function validateAddress() {
    var str = $("#address").val();
    if (str == '') {
        $("#address").attr("data-toggle", "tooltip");
        $("#address").attr("title", "Mandatory");
        this.flag = false;
    }
}

function validateCity() {
    var str = $("#city").val();
    if (str == '') {
        $("#city").attr("data-toggle", "tooltip");
        $("#city").attr("title", "Mandatory");
        flag = false;
    }
}


function validateState() {
    var str = $("#state").val();
    if (str == '') {
        $("#state").attr("data-toggle", "tooltip");
        $("#state").attr("title", "Mandatory");
        flag = false;
    }
}

function validateZip() {
    var str = $("#zipcode").val();
    if (str == '') {
        $("#zipcode").attr("data-toggle", "tooltip");
        $("#zipcode").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var match = str.match("[0-9]{6}");
        if (!(match != null && str == match[0])) {
            $("#zipcode").attr("data-toggle", "tooltip");
            $("#zipcode").attr("title", "Zipcode should be of 6 digits");
            flag = false;
        }
    }
}

function validatePremiums() {
    var str = $("#premiums").val();
    if (str == '') {
        $("#premiums").attr("data-toggle", "tooltip");
        $("#premiums").attr("title", "Mandatory");
        flag = false;
    }
    else {
        var match = str.match("[0-9]+");
        var match2 = str.match("[0-9]+\\.[0-9]+");
        if (!(match != null && str == match[0])) {
            if (!(match2 != null && str == match2[0])) {
                $("#premiums").attr("data-toggle", "tooltip");
                $("#premiums").attr("title", "Premium should only contain digits");
                flag = false;
            }
        }
    }
}

    function validateIncome() {
        var str = $("#income").val();
        if (str == '') {
            $("#income").attr("data-toggle", "tooltip");
            $("#income").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[0-9]+");
            var match2 = str.match("[0-9]+\\.[0-9]+");
            if (!(match != null && str == match[0])) {
                if (!(match2 != null && str == match2[0])) {
                    $("#income").attr("data-toggle", "tooltip");
                    $("#income").attr("title", "Income should only contain digits");
                    flag = false;
                }
            }
        }
    }

    function validateContact() {
        var str = $("#contactno").val();
        if (str == '') {
            $("#contactno").attr("data-toggle", "tooltip");
            $("#contactno").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[0-9]{10}");
            if (!(match != null && str == match[0])) {
                $("#contactno").attr("data-toggle", "tooltip");
                $("#contactno").attr("title", "Contact No. should be of 10 digits");
                flag = false;
            }
        }
    }

    function validateEMail() {
        var str = $("#email").val();
        if (str == '') {
            $("#email").attr("data-toggle", "tooltip");
            $("#email").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var match = str.match("[a-zA-z0-9\\.\\_-]{2,}@[a-zA-z0-9\\.\\_-]{2,}\\.[a-zA-z\\.]{2,}");
            if (!(match != null && str == match[0])) {
                $("#email").attr("data-toggle", "tooltip");
                $("#email").attr("title", "Please enter a valid email address");
                flag = false;
            }
        }
    }

    function validatePassword() {
        var str = $("#password").val();
        if (str == '') {
            $("#password").attr("data-toggle", "tooltip");
            $("#password").attr("title", "Mandatory");
            flag = false;
        }
        else {
            var b1 = new RegExp("[0-9]").test(str);
            var b2 = new RegExp("[A-Z]").test(str);
            var b3 = new RegExp("[a-z]").test(str);
            var b4 = str.length >= 8;
            if (!(b1 && b2 && b3 & b4)) {
                $("#password").attr("data-toggle", "tooltip");
                $("#password").attr("title", "Password should have at least 8 characters, 1 digit, 1 uppercase and 1 lowercase");
                flag = false;
            }
        }
    }

    function validateDob() {
        var str = $("#dob").val();
        if (str == '') {
            $("#dob").attr("data-toggle", "tooltip");
            $("#dob").attr("title", "Mandatory");
            flag = false;
        }
        else {

            var d1 = Date.parse(str);
            var d2 = new Date().getTime();
            if (d1 > d2) {
                $("#dob").attr("data-toggle", "tooltip");
                $("#dob").attr("title", "DOB can't be more than system date");
                flag = false;
            }
            else {
                var d3 = (d2 - d1) / 31536000000;
                if (d3 < 18) {
                    $("#dob").attr("data-toggle", "tooltip");
                    $("#dob").attr("title", "Agent has to be minimum 18 years");
                    flag = false;
                }
            }
        }
    }

    function getJson() {
        var $items = $('#name,#address,#city,#state,#zipcode,#contactno,#email,#dob,#mark,#height,#weight,#premiums,#income,#password');
        var obj = {};
        $items.each(function () {
            obj[this.id] = $(this).val();
        });
        var json = JSON.stringify(obj);
        return json;
    }


    function store() {
        var json = getJson();
        $.ajax({
            type: "POST",
            url: "http://localhost:6844/customer/register",
            async: false,
            data: json,
            contentType: "application/json",
            dataType: "text",
            success: function (data) {

                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('Your login ID is ' + data);
                $("#alertmodal").on("hidden.bs.modal", function () {
                    window.location = "Login.html";
                });
                $("#alertmodal").modal('show');
            },
            error: function () {

                $("#alertmodalbody").empty();
                $("#alertmodalbody").append('Server error, please try later.');
                $("#alertmodal").modal('show');
            }
        });
    }
