(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000);
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
    let modalContent = $(this).data("info");

if ($(this).data("contact")) {
    modalContent += `<br><br>✉️ <a href="mailto:${$(this).data("contact")}">${$(this).data("contact")}</a>`;
}

if ($(this).data("website")) {
    modalContent += `<br><br>🌐 <a href="${$(this).data("website")}" target="_blank">Visit Website</a>`;
}

$("#modalText").html(modalContent);

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
      $("#facilityModal").removeClass("active");
      $("body").removeClass("modal-open");
    }
  });

  function closefacilityModal() {
    $("#facilityModal").removeClass("active");
    $("body").removeClass("modal-open");
  }

  function setfacilityMainImage(src, index) {
    $("#facilityModalImg").attr("src", src);
    $("#facilityThumbnails .facility-thumbnail").removeClass("active");
    $("#facilityThumbnails .facility-thumbnail").eq(index).addClass("active");
  }

  $(document).on("click", ".facility-modal-trigger", function () {
    const images = JSON.parse($(this).attr("data-images"));
    const title = $(this).data("title");
    const description = $(this).data("description");

    $("#facilityModalTitle").text(title);
    $("#facilityModalText").html(description);

    const $thumbnails = $("#facilityThumbnails").empty();
    images.forEach(function (src, index) {
      $("<img>", {
        src: src,
        alt: title + " photo " + (index + 1),
        class: "facility-thumbnail" + (index === 0 ? " active" : ""),
        "data-index": index
      }).appendTo($thumbnails);
    });

    setfacilityMainImage(images[0], 0);

    $("#facilityModal").addClass("active");
    $("body").addClass("modal-open");
  });

  $(document).on("click", ".facility-thumbnail", function (e) {
    e.stopPropagation();
    const index = $(this).data("index");
    setfacilityMainImage($(this).attr("src"), index);
  });

  $(".facility-close").click(closefacilityModal);

  $("#facilityModal").click(function (e) {
    if (e.target === this) {
      closefacilityModal();
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
                <div class="carousel-card text-center p-3">

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

    });


    // Initialise events carousel AFTER adding items
    $("#events-container").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            1000:{
                items:3
            }
        }
    });

}


loadEvents();

async function loadUsers() {

    const response = await fetch("/users.json");
    const users = await response.json();

    const container = document.getElementById("users-container");

    users.forEach(user => {

        const userHTML = `
            <div class="item user-modal-trigger"
     data-img="${user.image}"
     data-name="${user.name}"
     data-info="${user.description}"
     data-contact="${user.contact}"
     data-website="${user.website}">

                <div class="carousel-card text-center p-3">

                    <div class="user-card-image mb-3">
                        <img src="${user.image}"
                             class="img-responsive rounded"
                             alt="${user.name}">
                    </div>

                    <h3>${user.name}</h3>

                    <p>${user.summary}</p>

                </div>

            </div>
        `;

        container.innerHTML += userHTML;

    });


    // Initialise carousel after adding items
    $("#users-container").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

}


loadUsers();
