$(function () {
  // Super pro functionality for toggle buttons
  $('.btn-toggle').click(function () {
    const description = $(this).closest('.movie').find('.description');
    if ($(this).text() === 'Show more') {
      description.css('visibility', 'visible');
      $(this).text("Show less");
    } else {
      description.css('visibility', 'hidden');
      $(this).text("Show more");
    }
  });
});
