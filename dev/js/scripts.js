$(document).ready(function() {

  // Animate scroll to target when clicking on .scroll-link links
  $('.scroll-link').click(function(e) {
    e.preventDefault();

    // Get the target ID
    const targetID = $(this).attr('href');

    // Animate the scroll
    $('html, body').animate({
      scrollTop: $(targetID).offset().top - $('header').outerHeight()
    }, 500);
  })
});
