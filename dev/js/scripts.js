$(document).ready(function() {

  // Animate scroll to target when clicking on .scroll-link links
  $('.scroll-link').click(function(e) {
    e.preventDefault();

    const targetID = $(this).attr('href');

    $('html').animate({
      scrollTop: $(targetID).offset().top
    }, 500);
  })
});
