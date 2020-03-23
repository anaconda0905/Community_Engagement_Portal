// $(document).ready(function() {
;(function ($) {
  "use strict";
  var window_width = $(window).width(),
  window_height = window.outerHeight,
  header_height = $("#header").height() + 10,
  fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height / 2 + header_height);

  if (document.getElementById("default-select")) {
    $("select").niceSelect();
  }

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show"
    },
    speed: 400
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container")
      .clone()
      .prop({
        id: "mobile-nav"
      });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: ""
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function(e) {
      $(this)
        .next()
        .toggleClass("menu-item-active");
      $(this)
        .nextAll("ul")
        .eq(0)
        .slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function(e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this)
            .closest("li")
            .addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  $(document).ready(function() {
    $("html, body").hide();
    if (window.location.hash) {
      setTimeout(function() {
        $("html, body")
          .scrollTop(0)
          .show();
        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top - 108
          },
          1000
        );
      }, 0);
    } else {
      $("html, body").show();
    }
  });

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  
  

  var form = $("#review-form");
  form.validate({
      errorPlacement: function errorPlacement(error, element) {
           // element.before(error); 
         var input = $('.incident-regarding .input200');

         console.log(input.length);
         for(var i=0; i<input.length; i++) {
           if(validate(input[i]) == false){
             // console.log('validate false');
             showValidate(input[i]);
           } else if(validate(input[i]) == true){
             console.log('validate true');
             hideValidate(input[i]);
           }
         }

         input = $('.review-regarding .input200');
         console.log(input.length);
         for(var i=0; i<input.length; i++) {
           if(validate(input[i]) == false){
             // console.log('validate false');
             showValidate(input[i]);
           } else if(validate(input[i]) == true){
             console.log('validate true');
             hideValidate(input[i]);
           }
         }
      },
      rules: {
          feeling : {
              required: true,
          },
          feedback_regarding : {
              required: true,
          },
          feedback_categories : {
              required: true,
          },
          bus_no : {
              required: true,
          },
          incident_date : {
              required: true,
          },
          incident_time : {
              required: true,
          },
          route_no : {
              required: true,
          },
          route_name : {
              required: true,
          },
          locname:{
              required:true,
          },
          bus_operator : {
              required: true,
          },
          quick_review : {
              required: true,
          },
          event: {
              required: true,
          },
          comment: {
              required: true,
          },
      },
      onfocusout: function(element) {
          $(element).valid();
      },
      highlight : function(element, errorClass, validClass) {
          // $(element.form).find('.actions').addClass('form-error');
          // $(element).removeClass('valid');
          // $(element).addClass('error');
      },
      unhighlight: function(element, errorClass, validClass) {
          // $(element.form).find('.actions').removeClass('form-error');
          // $(element).removeClass('error');
          // $(element).addClass('valid');
      }
  });
  var mapContainerFlag = false;
  form.steps({
      headerTag: "h4",
      bodyTag: "section",
      transitionEffect: "fade",
      enablePagination: true,
      labels: {
          previous : '«',
          next : 'Next',
          finish : 'Submit',
          current : ''
      },
      titleTemplate : '<span class="title">#title#</span>',
      onStepChanging: function (event, currentIndex, newIndex)
      {
          form.validate().settings.ignore = ":disabled,:hidden";
          return form.valid();
      },

      onStepChanged: function (event, currentIndex, priorIndex){
          if(currentIndex == 3 && mapContainerFlag == false){
              mapContainerFlag = true;
              mapShow();
          }
      },
      onFinishing: function (event, currentIndex)
      {
          form.validate().settings.ignore = ":disabled";
          return form.valid();
      },
      onFinished: function (event, currentIndex)
      {
          // $('#reviewSubmitModalForm').modal('show');
          $("#review-form").submit();
      },
      // onInit : function (event, currentIndex) {
      //     event.append('demo');
      // }
  });

  $('.input200').each(function(){
      $(this).on('blur', function(){
          if($(this).val().trim() != "") {
              $(this).addClass('has-val');
          }
          else {
              $(this).removeClass('has-val');
          }
      })    
  })

  function validate (input) {
    if($(input).val().trim() == ''){
        console.log('empty');
        return false;
    } else {
      console.log('not empty');
        return true;
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate-2');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate-2');
  }

  $('.incident-regarding .input200').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
  });

  $('.review-regarding .input200').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
  });

  jQuery.extend(jQuery.validator.messages, {
      required: "",
      remote: "",
      email: "",
      url: "",
      date: "",
      dateISO: "",
      number: "",
      digits: "",
      creditcard: "",
      equalTo: "",
      bus_no: "",
      locname:"",
      incident_date: "",
      incident_time: "",
      route_no: "",
      route_name: "",
      bus_operator: "",
      quick_review: "",
      event: "",
      comment: "",
  });

  $(document).ready(function(){
      $('.custom-control-input').click(function() {
          $('.custom-control-input').not(this).prop('checked', false);
          $(this).prop('checked',true);
      });
  });

  
  const labels = document.querySelectorAll('.label');
  for(var i = 1; i < labels.length-1; i++)
  {
      const chars = labels[i].textContent.split('');
       labels[i].innerHTML = '';
       chars.forEach(char => {
           labels[i].innerHTML += `<span>${char === ' ' ? '&nbsp' : char}</span>`;
       });
  }



  $('#quick_review').parent().append('<ul  class="list-item" id="newpayment_type" name="newpayment_type"></ul>');
  $('#quick_review').parent().append('<input type="hidden" id="selectone" name="selectone" value="">');
  $('#quick_review option').each(function(){
      $('#newpayment_type').append('<li value="' + $(this).val() + '' + '" data-symbol="' + '&#xf2f9;' + '">' + $(this).text()+'</li>');
  });

  $('#quick_review').remove();
  $('#newpayment_type').attr('id', 'quick_review');
  $('#quick_review li').first().addClass('init');

  $("#quick_review").on("click", ".init", function() {
      $(this).closest("#quick_review").children('li:not(.init)').toggle();

  });
  
  var PaymentsOptions = $("#quick_review").children('li:not(.init)');
  $("#quick_review").on("click", "li:not(.init)", function() {
      PaymentsOptions.removeClass('selected');
      $(this).addClass('selected');
      $('#quick_review li').first().text($(this).text());
      $('#selectone').val($('#quick_review li').first().text());

      PaymentsOptions.toggle();
  });

function mapShow() {

        var map = L.map('googleMap', {
            center: L.latLng(3.141916, 101.6867),
            zoom: 16
        });
        map.invalidateSize();

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 30
        }).addTo(map);
        L.Control.geocoder().addTo(map);
        var lc = L.control.locate({
            position: 'topleft',
            strings: {
                title: "Show me where I am, yo!"
            }
        }).addTo(map);
    var rememberLat = document.getElementById('latitude').value;
    var rememberLong = document.getElementById('longitude').value;
    if (!rememberLat || !rememberLong) {
        rememberLat = -3.141916;
        rememberLong = 174.82082;
    }



        var marker = L.marker([rememberLat, rememberLong], {
            draggable: true
        }).addTo(map);
        marker.on('dragend', function (e) {
            updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
        });
        map.on('click', function (e) {
            marker.setLatLng(e.latlng);
            updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
        });

        function updateLatLng(lat, lng, reverse) {
            if (reverse) {
                marker.setLatLng([lat, lng]);
                map.panTo([lat, lng]);
            } else {
                document.getElementById('latitude').value = marker.getLatLng().lat;
                document.getElementById('longitude').value = marker.getLatLng().lng;
                $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + marker.getLatLng().lat + '&lon=' + marker.getLatLng().lng, function (data) {
                    if(data.address.road)
                        document.getElementById('locname').value = data.address.road;
                });
                // marker.bindPopup('I am in Baltimore.<br> Looking for Stop.');
                // marker.openPopup();
                map.panTo([lat, lng]);
            }
        }
    }

  var imgUpload = document.getElementById('upload_imgs')
    , imgPreview = document.getElementById('img_preview')
    , imgUploadForm = document.getElementById('img-upload-form')
    , totalFiles
    , img;

  imgUpload.addEventListener('change', previewImgs, false);
  // imgUploadForm.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   alert('Images Uploaded! (not really, but it would if this was on your website)');
  // }, false);

  function previewImgs(event) {
    
    totalFiles = imgUpload.files.length;
    
    if(!!totalFiles) {
      // imgPreview.classList.remove('quote-imgs-thumbs--hidden');
      $(".active-post-carusel").remove();
      $('.carousel-wrapper').append('<div class="owl-carousel active-post-carusel quote-imgs-thumbs quote-imgs-thumbs--hidden" id="img_preview" aria-live="polite"></div>');
      var imgPreview = document.getElementById('img_preview');
    }
    

    for(var i = 0; i < totalFiles; i++) {
      img = document.createElement('img');
      img.src = URL.createObjectURL(event.target.files[i]);
      img.classList.add('img-preview-thumb');
      imgPreview.appendChild(img);
      console.log('imgs are added!');
    }

    $(".active-post-carusel").owlCarousel({
        items: 3,
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        // autoplay: 2500,
        navText: [
          // "<span class='lnr lnr-arrow-up'></span>",
          // "<span class='lnr lnr-arrow-down'></span>"
        ]
    });
  }
})(jQuery);



