var flag = true;
function validate() {
    flag = true;
    $('[data-toggle="tooltip"]').tooltip('dispose');
    $('[data-toggle="tooltip"]').removeAttr("title");
    $('[data-toggle="tooltip"]').removeAttr("data-toggle");
    validateName();
    validatepAddress();
    validatecAddress();
    validateCity();
    validateState();
    validateZip();
    validateContact();
    validateEMail();
    validateDob();
    validateDoj();
    $('[data-toggle="tooltip"]').tooltip({ placement: 'right', trigger: 'manual' }).tooltip('show');
    if(flag==true){store();}
    return false;
}

$(function(){
 
        $("#filladdress").click(function () {
            if ($(this).is(":checked")) {
                $("#caddress").val($("#paddress").val());
            } else {
                $("caddress").val('');  
            }
    });
});
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
function validateAdhar(){
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

function validateDoj() {
    var str = $("#doj").val();
    if (str == '') {
        $("#doj").attr("data-toggle", "tooltip");
        $("#doj").attr("title", "Mandatory");
        flag = false;
    }
    else {

        var d1 = Date.parse(str);
        var d2 = new Date().getTime();
        if (d1 > d2) {
            $("#doj").attr("data-toggle", "tooltip");
            $("#doj").attr("title", "DOJ can't be more than system date");
            flag = false;
        }
    }
}

function validatepAddress() {
    var str = $("#paddress").val();
    if (str == '') {
        $("#paddress").attr("data-toggle", "tooltip");
        $("#paddress").attr("title", "Mandatory");
        flag = false;
    }
}
function validatecAddress() {
    var str = $("#caddress").val();
    if (str == '') {
        $("#caddress").attr("data-toggle", "tooltip");
        $("#caddress").attr("title", "Mandatory");
        flag = false;
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

function validateContact() {
    var str = $("#contact").val();
    if (str == '') {
        $("#contact").attr("data-toggle", "tooltip");
        $("#contact").attr("title", "Mandatory");
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
        var match = str.match("[a-zA-z0-9\\.\\_\\-]{2,}@[a-zA-z0-9\\.\\_\\-]{2,}\\.[a-zA-z\\.]{2,}");
        if (!(match != null && str == match[0])) {
            $("#email").attr("data-toggle", "tooltip");
            $("#email").attr("title", "Please enter a valid email address");
            flag = false;
        }
    }
}
function selectidtype(){
    var Adhar='<div class="form-group ">'+
    '<label><span style='+'color: red'+'>*</span></label>'+
    '<input type="text" class="form-control" id="apid" placeholder="Enter Adhar Number">'+
    '</div>'
    
    var Passport='<div class="form-group ">'+
    '<label><span style='+'color: red'+'>*</span></label>'+
    '<input type="text" class="form-control" id="apid" placeholder="Enter Passport Number">'+
    '</div>'
    
    var Voterid='<div class="form-group ">'+
    '<label><span style='+'color: red'+'>*</span></label>'+
    '<input type="text" class="form-control" id="apid" placeholder="Enter Voter ID">'+
    '</div>'
    
    var Drivinglicence='<div class="form-group ">'+
    '<label><span style='+'color: red'+'>*</span></label>'+
    '<input type="text" class="form-control" id="apid" placeholder="Enter Driving Licence No.">'+
    '</div>'

    if($("#apidtype").find(":selected").text()=='Passport'){
        $("#formspace").empty();
        $("#formspace").append(Passport);
    }
    else if($("#apidtype").find(":selected").text()=='Adhar'){

        $("#formspace").empty();
        $("#formspace").append(Adhar);
        populateAgents();

    }
    else if($("#apidtype").find(":selected").text()=='Voterid'){

        $("#formspace").empty();
        $("#formspace").append(Voterid);
        populateAgents();

    }
    else if($("#apidtype").find(":selected").text()=='Drivinglicence'){

        $("#formspace").empty();
        $("#formspace").append(Drivinglicence);
        populateAgents();

    }
}

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

