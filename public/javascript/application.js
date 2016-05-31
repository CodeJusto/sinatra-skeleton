$(document).ready(function() {

  loadContacts();
  // $('.hideButton').on('click', function() {
  //   console.log("hello")
  //   // $('#name').empty();
  //   $('.allResults').empty();
  //   $(this).addClass('hidden');
  //   $('.showButton').removeClass('hidden');
  //   // $(this).removeClass('hideButton');
  // });

  // $('.showButton').on('click', function() {
    // $.ajax({
    //   url: '/contacts',
    //   method: 'GET',
    //   success: function(data) {
    //     data.forEach(function(contact) {
    //       $('#name').append(contact.name, "<br>");
    //       $('#email').append(contact.email, "<br>");           
    //     });
    //   }
    // });
    // $('.hideButton').removeClass('hidden')
    // $(this).addClass('hidden');
  // });
  
  var column_number = 0;

  function count() {
    if (column_number > 6) {
      return column_number = 1;
    } else {
      return column_number += 1;
    }
  }

  function loadContacts() {
     $.ajax({
      url: '/contacts',
      method: 'GET',
      success: function(data) {
        data.forEach(function(contact) {
          $('.col' + count()).append(
            '<div class="box" data-id="' + contact.id + '">\
              <p id="contact_' + contact.id + '"></p>\
              <p id="email_' + contact.id + '"></p>\
              <a class="edit" href="#">Edit</a>\
              <a class="erase" href="#">Delete</a>\
            </div>'
            )
          $('#contact_' + contact.id).append('<span id=' + contact.id + '>' + contact.name + '</span>', "<br>");
          $('#email_' + contact.id).append(contact.email, "<br>");           
        });
      }
    });
  }

  $('.results').on('click','.edit',function(e) {
    e.stopPropagation();
    e.preventDefault();
    thisID = $(this).parent().data("id");
    console.log("Now editing contact number " + thisID);
  });

  $('.results').on('click','.erase',function(e) {
    e.stopPropagation();
    e.preventDefault();
    thisID = $(this).parent().data("id");    
    console.log("Now deleting contact number " + thisID);
    $.ajax({
        url: '/delete/'+thisID,
        type: 'GET',
        success: function(data) {
          console.log(data)
          $('[data-id="' + data.id + '"]').remove();
          // $(this).parent().remove();
        }
      });
  });




  $('.addContact').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.post('/create', {name: $('.nameInput').val(), email: $('.emailInput').val()},
      function(returnedData) {
       // $('.results').append(
          $('.col' + count()).append(
            '<div class="box" data-id="' + returnedData.id + '">\
              <p id="contact_' + returnedData.id + '"></p>\
              <p id="email_' + returnedData.id + '"></p>\
              <a class="edit" href="#">Edit</a>\
              <a class="erase" href="#">Delete</a>\
            </div>');
          $('#contact_' + returnedData.id).append('<span id=' + returnedData.id + '>' + returnedData.name + '</span>', "<br>");
          $('#email_' + returnedData.id).append(returnedData.email, "<br>"); 
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
