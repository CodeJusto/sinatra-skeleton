$(document).ready(function() {

  $('.hideButton').on('click', function() {
    console.log("hello")
    // $('#name').empty();
    $('.allResults').empty();
    $(this).addClass('hidden');
    $('.showButton').removeClass('hidden');
    // $(this).removeClass('hideButton');
  });

  $('.showButton').on('click', function() {
    $.ajax({
      url: '/contacts',
      method: 'GET',
      success: function(data) {
        data.forEach(function(contact) {
          $('#name').append(contact.name, "<br>");
          $('#email').append(contact.email, "<br>");           
        });
      }
    });
    $('.hideButton').removeClass('hidden')
    $(this).addClass('hidden');
  });

  $('.addContact').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.post('/create', {name: $('.nameInput').val(), email: $('.emailInput').val()},
        function(returnedData) {
          console.log(returnedData);
        });
  });

    // $.ajax({
    //   url: '/create',
    //   method: 'POST',
    //   success: function(data) {
    //     $('.nameInput').val('');
    //     $('.emailInput').val('');
    //   }
    // })
  // });



  // $(function () {
  //   var button = $('#load-more-posts');
  //   button.one('click', function () {
  //     $.ajax({
  //       url: 'more-posts.html',
  //       method: 'GET',
  //       success: function (morePostsHtml) {
  //         button.replaceWith(morePostsHtml);
  //       }
  //     });
  //   });
  // });
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
