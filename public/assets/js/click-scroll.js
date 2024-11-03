// // jquery-click-scroll
// // by syamsul'isul' Arifin

// var sectionArray = [1, 2, 3, 4, 5];

// $(document).ready(function () {
//   // Initialize all nav links as inactive
//   $(".navbar-nav .nav-item .nav-link:link").addClass("inactive");
//   $(".navbar-nav .nav-item .nav-link").eq(0).addClass("active");

//   $.each(sectionArray, function (index, value) {
//     var sectionId = "section_" + value;

//     // Check if the section exists
//     if ($("#" + sectionId).length) {
//       var offsetSection = $("#" + sectionId).offset().top - 75;

//       $(document).scroll(function () {
//         var docScroll = $(document).scrollTop();

//         // Adjust offsetSection for scrolling
//         if (docScroll >= offsetSection) {
//           $(".navbar-nav .nav-item .nav-link").removeClass("active");
//           $(".navbar-nav .nav-item .nav-link:link").addClass("inactive");
//           $(".navbar-nav .nav-item .nav-link").eq(index).addClass("active");
//           $(".navbar-nav .nav-item .nav-link")
//             .eq(index)
//             .removeClass("inactive");
//         }
//       });

//       $(".click-scroll")
//         .eq(index)
//         .click(function (e) {
//           e.preventDefault();
//           $("html, body").animate(
//             {
//               scrollTop: offsetSection,
//             },
//             300
//           );
//         });
//     } else {
//       console.error("Section not found:", sectionId);
//     }
//   });
// });
