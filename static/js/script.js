$(document).ready(() => {
  $('.delete-article').on('click', event => {
    $target = $(event.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/article/' + id,
      success: function(response) {
        alert('Deleting Article');
        window.location.href = '/';
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
