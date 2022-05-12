$(function () {
  // Super pro functionality for toggle buttons
  $('.btn-toggle').click(function () {
    const description = $(this).closest('.movie').find('.description');
    if ($(this).text() === 'Show more') {
      description.show();
      $(this).text("Show less");
    } else {
      description.hide();
      $(this).text("Show more");
    }
  });
});
