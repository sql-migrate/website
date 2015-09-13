---
---

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// HTML5 only solution:
// prevent the ugly default message bubbles
function replaceValidationUI( form ) {
  form.addEventListener( "invalid", function( event ) {
    event.preventDefault();
  }, true );

  // support Safari, iOS Safari, and the Android browser—each of which do not prevent
  // form submissions by default
  form.addEventListener( "submit", function( event ) {
    if ( !this.checkValidity() ) {
      event.preventDefault();
    }
  });

  // when I click submit do your magic ...
  var submitButton = form.querySelector( "button:not([type=button]), input[type=submit]" );
  submitButton.addEventListener( "click", function( event ) {
    var invalidFields = form.querySelectorAll( ":invalid" ),
        errorMessages = form.querySelectorAll( ".validation-error" ),
        parent;

    // ... remove any existing messages
    for ( var i = 0; i < errorMessages.length; i++ ) {
      errorMessages[ i ].parentNode.removeChild( errorMessages[ i ] );
    }

    // ... insert out custom error messages into the DOM
    for ( var i = 0; i < invalidFields.length; i++ ) {
      parent = invalidFields[ i ].parentNode;
      parent.insertAdjacentHTML( "beforeend", "<div class='validation-error'>" + 
        invalidFields[ i ].validationMessage +
        "</div>" );
    }

    // ... if there are errors, give focus to the first invalid field
    if ( invalidFields.length > 0 ) {
      invalidFields[ 0 ].focus();
    }
  });
}

// replace the validation UI for all forms
var forms = document.querySelectorAll( "form" );
for ( var i = 0; i < forms.length; i++ ) {
  replaceValidationUI( forms[ i ] );
}

// change the messages for each form field ...
var email = document.querySelector('input[name="email"]');
var nameField = document.querySelector('input[name="name"]');
var message = document.querySelector('textarea[name="message"]');

// ... by 
email.oninvalid = function( e ) {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
    if (e.target.value.length == 0) {
e.target.setCustomValidity("Please provide an Email address");
    } else {
e.target.setCustomValidity("That doesn't look like an Email address");
    }
  }
};

nameField.oninvalid = function( e ) {
  e.target.setCustomValidity("Enter your name please");
}

// Formspree
// Bug: This piece of code bypasses form validation and runs regardless
var $contactForm = $('#contactForm');

$contactForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: '//formspree.io/{{ site.email }}',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      $('#send-button').hide();
      $('#sending').show();
    },
    success: function (data) {
      $('#sending').hide();
      $('.input-element').fadeOut(1000, function() {
        $('#sent-success').show();
      });
    },
    error: function (err) {
      $('#sending').hide();
      $('#sent-error').show();
      $('#send-button').show();
    }
  });
});

// ...
// ... replaces ...
// ...

//jqBootstrapValidation + Formspree + Ajax
// $(function() {
//   $("input,textarea").jqBootstrapValidation({
//     preventSubmit: true,
//     submitError: function($form, event, errors) {
//       console.log("submitError!")
//     },
//     submitSuccess: function($form, event) {
//       console.log("submitSuccess!!!")
//       event.preventDefault();
//       $.ajax({
//         url: '//formspree.io/{{ site.email }}',
//         method: 'POST',
//         data: $(this).serialize(),
//         dataType: 'json',
//         beforeSend: function() {
//           $('#send-button').hide();
//           $('#sending').show();
//         },
//         success: function (data) {
//           $('#sending').hide();
//           $('.input-element').fadeOut(1000, function() {
//             $('#sent-success').show();
//           });
//        },
//         error: function (err) {
//           $('#sending').hide();
//           $('#sent-error').show();
//           $('#send-button').show();
//         }
//       });
//     },
//     filter: function() {
//       return $(this).is(":visible");
//     },
//   });

//   $("a[data-toggle=\"tab\"]").click(function(e) {
//     e.preventDefault();
//     $(this).tab("show");
//   });
// });
