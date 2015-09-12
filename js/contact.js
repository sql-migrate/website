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

//jqBootstrapValidation
$(function() {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
    },
    submitSuccess: function($form, event) {
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

//Formspree
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
      $('#sent-success').show();
      $('.input-element').hide();
    },
    error: function (err) {
      $('#sending').hide();
      $('#sent-error').show();
      $('#send-button').show();
    }
  });
});