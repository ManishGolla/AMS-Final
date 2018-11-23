jQuery(function ($) {
    $.validator.addMethod('strongPassword',function(value,Element){
        return this.optional(Element)||value.length>=8 && /\d/.test(value) && /[A-Z]{1}/.test(value);
    },'Password should be 8 character long and contain atleast one digit, and a capital letter')
    $("#agentform").validate({
        errorClass:'error',
        highlight: function (Element) {
            
            $(Element).addClass('is-invalid')
        },
        unhighlight: function (Element) {
            $(Element).removeClass('is-invalid')
        },
        rules: {
            name: {
                required: true,
                lettersonly:true,
                minlength:4,
                maxlength:50
            },
            dob: {
                required: true
            },
            contact: {
                required: true,
                numbersonly:true
            },
            email: {
                 required: true,
                 email:true
                },
            paddress: {
                 required: true 
                },
            caddress: {
                 required: true
                 },
            zipcode: {
                 required: true 
                },
            city: { 
                required: true,
                lettersonly:true
             },
            state: { 
                required: true,
                lettersonly:true
            },
            doj: {
                 required: true
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
            doj: {}
        }
    });
});