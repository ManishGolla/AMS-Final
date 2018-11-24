$(function(){
 
        $("#filladdress").click(function () {
            if ($(this).is(":checked")) {
                $("#caddress").val($("#paddress").val());
            } else {
                $("caddress").val('');  
            }
    });
    $("#apidtype").on("change",function(){
        var adhar='<label><span style="color:red">*</span>Adhar</label>'+
        '<input type="text" class="form-control" name="apid_adhar" id="apid_adhar" placeholder="Enter Adhar Number">';
     var passport='<label><span style="color:red">*</span>Passport</label>'+
     '<input type="text" class="form-control" name="apid_passport" id="apid_passport" placeholder="Enter Passport Number">';
     var drive='<label><span style="color:red">*</span>Driving Licence</label>'+
     '<input type="text" class="form-control" name="apid_driving" id="apid_driving" placeholder="Enter Driving Licence Number">';
     var voter='<label><span style="color:red">*</span>Voter Id</label>'+
     '<input type="text" class="form-control" name="apid_voter" id="apid_voter" placeholder="Enter Voter Id">';
        if($('#apidtype').val()=='A'){
           $('#apidfield').empty();
           $(adhar).appendTo('#apidfield');
        }
        else if ($('#apidtype').val()=='P'){
            $('#apidfield').empty();
           $(passport).appendTo('#apidfield');
        }
        else if($('#apidtype').val()=='D'){
            $('#apidfield').empty();
           $(drive).appendTo('#apidfield');
        }
        else if ($('#apidtype').val()=='V'){
            $('#apidfield').empty();
           $(voter).appendTo('#apidfield');
        }
    })
});
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
    $("#agentform").validate({
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
            paddress: {
                required: true
            },
            caddress: {
                required: true
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
            doj: {
                required: true,
                doj_shouldbe:true
            },
            apid_adhar:{
                required: true,
                digits:true,
                exactlength:12
                
            },
            apid_driving:{
                required:true,
                pattern:/^([A-Z]{2})(\d{2})(\d{4})(\d{7})$/i

            },
            apid_passport:{
                required:true,
                pattern:/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/i

            },
            apid_voter:{
                required:true,
                pattern:/^[A-Z]{3}[0-9]{7}$/i
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
            apid_adhar:{
                
                digits:"enter a valid adhar number",
                pattern:"Enter a valid adhar number"         
            },
            apid_driving:{
                
                pattern:"Enter a valid driving licence number"
            },
            apid_passport:{
               pattern:"Enter a valid passport number"

            },
            apid_voter:{
                pattern:" Enter a valid voter id"
            }
        },
        submitHandler: function(form) {
            store()}
    });
});

function getJson() {
    var $items = $('#name,#dob,#contact,#email,#paddress,#caddress,#zipcode,#city,#state,#doj,#type');
    var obj = {};
    $items.each(function () {
        obj[this.id] = $(this).val();
    });
    var json = JSON.stringify(obj);
    return json;
}

function store() {
    alert("store called");
    var json = getJson();
    $.ajax({
        type: "POST",
        url: "http://localhost:6844/admin/agent/register",
        async: false,
        data: json,
        contentType: "application/json",
        dataType: "text",
        success: function (data) { 
            
            $("#alertmodalbody").empty();
            $("#alertmodalbody").append('Agent with ID ' + data+' has been successfully registered!');
            $("#alertmodal").on("hidden.bs.modal", function () {
                window.location = "AdminHome";
            });
            $("#alertmodal").modal('show');

        },
            
        error: function () { 
            
            $("#alertmodalbody").empty();
            $("#alertmodalbody").append('Server Error! Please try later.');
            $("#alertmodal").modal('show'); 
    }
    });
}

function init() {
    if (sessionStorage.getItem('adminUser') === null) {
        alert('Unauthorized Access');
        localStorage.clear();
        window.location = 'Login';
    }
}

function logout(){
    sessionStorage.clear();
    window.location="Login";
}

