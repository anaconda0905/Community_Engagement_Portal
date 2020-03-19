$(document).ready(function() {
  "use strict";

  var window_width = $(window).width(),
  window_height = window.outerHeight,
  // header_height = $(".default-header").height(),
  header_height = $("#header").height() + 10,
  // header_height_static = $(".site-header.static").outerHeight(),
  fitscreen = window_height - header_height;

  // console.log('window_height',window_height);
  // console.log('header_height',header_height);
  // console.log('header_height_static',header_height_static);
  // console.log('fitscreen',fitscreen);
  console.log('header height',header_height);
  $(".fullscreen").css("height", window_height / 2 + header_height);
  // $(".fitscreen").css("height", fitscreen);
  $('#review_section').css("height",window_height - header_height * 2);
  $('#review_detail_home').css("height",window_height - header_height * 4 - 30);
  $('#review_detail_home').css("margin-top", header_height);

  // if(window_width <= 420) {
  //   // $('#email_detail_home').removeAttr('height');
  //   $('#email_section').css("height",window_height);
  //   $('#email_detail_home').css("height",window_height - header_height - 30);
  //   $('#email_detail_home').css("margin-top", header_height);
  // } else {
  //   $('#email_section').css("height",window_height - header_height * 2);
  //   $('#email_detail_home').css("height",window_height - header_height * 4 - 30);
  //   $('#email_detail_home').css("margin-top", header_height);
  // }
  

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
});


