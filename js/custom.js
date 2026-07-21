(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
    });


    // HOME SLIDER & COURSES & CLIENTS
    $('.home-slider').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      dots:false,
      autoplayHoverPause: true,
      autoplay: true,
      smartSpeed: 1000,
    })

    
    // SMOOTHSCROLL
    $(function() {
      $('.custom-navbar a, #home a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
            event.preventDefault();
      });
    });  

})(jQuery);

$(document).ready(function () {

 $(document).on("click", ".user-modal-trigger", function () {
    $("#modalImg").attr("src", $(this).data("img"));
    $("#modalTitle").text($(this).data("name"));
    $("#modalText").html($(this).data("info"));

    $("#userModal").addClass("active");
    $("body").addClass("modal-open");
});

  // Close button
  $(".custom-close").click(function () {
    $("#userModal").removeClass("active");
    $("body").removeClass("modal-open");
  });

  // Click outside modal content
  $("#userModal").click(function (e) {
    if (e.target === this) {
      $(this).removeClass("active");
      $("body").removeClass("modal-open");
    }
  });

  // Escape key
  $(document).keydown(function (e) {
    if (e.key === "Escape") {
      $("#userModal").removeClass("active");
      $("body").removeClass("modal-open");
    }
  });

});

async function loadEvents() {

    const response = await fetch("/events.json");
    const events = await response.json();

    const container = document.getElementById("events-container");

    events.forEach(event => {

        const eventHTML = `
            <div class="item">
                <div class="courses-thumb text-center p-3">

                    <div class="tst-image mb-3">
                        <img src="${event.image}" 
                             class="img-responsive rounded"
                             alt="${event.title}">
                    </div>

                    <h3>${event.title}</h3>

                    <p>${event.location} • ${event.date}</p>

                    <p>
                        ${event.description}
                        ${event.link ? 
                        `<br>
                        <a href="${event.link}" target="_blank">
                            Find Out More
                        </a>` 
                        : ""}
                    </p>

                </div>
            </div>
        `;

        container.innerHTML += eventHTML;

        $('.owl-courses').owlCarousel({
      animateOut: 'fadeOut',
      loop: true,
      autoplayHoverPause: true,
      autoplay: true,
      autoHeight: true,
      autoWidth: false,
      smartSpeed: 1000,
      dots: false,
      nav:true,
      navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          margin: 0,
          nav: true,
        },
        1000: {
          items: 3,
          margin: 10,
          nav: true,
        }
      }
    });


    });


    $(".owl-carousel").owlCarousel({
        items: 3,
        loop: true,
        margin: 20,
        nav: true,
        dots: true
    });

}


loadEvents();