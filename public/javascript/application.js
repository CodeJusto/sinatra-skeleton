$(document).ready(function() {

  loadContacts();
  $('.editor').hide();
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
    if (column_number > 5) {
      return column_number = 1;
    } else {
      return column_number += 1;
    }
  }

  function loadContacts() {
    $('.column').empty();
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
          $('#contact_' + contact.id).append(contact.name, "<br>");
          $('#email_' + contact.id).append(contact.email, "<br>");           
        });
      }
    });
  }

  //EDIT
  $('.results').on('click','.edit',function(e) {
    e.stopPropagation();
    e.preventDefault();
    thisID = $(this).parent().data("id");
    console.log("Now editing contact number " + thisID);
     $.ajax({
      url: '/show/'+ thisID,
      method: 'GET',
      success: function(data) {
       console.log(data);
       var $displayName = data.name;
       var $displayEmail = data.email;
       $('.editUser').empty();
       $('.editUser').append(
        '<article class="media">\
          <figure class="media-left">\
            <p class="image is-64x64">\
              <img src="http://placehold.it/128x128">\
            </p>\
          </figure>\
          <div class="media-content">\
            <div class="content">\
              <p>\
                <strong ="userName">'+ $displayName + '</strong> <small class="userEmail">' + $displayEmail + '</small>\
                <br>\
                <em class="userDesc">Enter a description about this contact here!</em>\
              </p>\
            </div>\
          </div>\
        </article>'
        )
    $('.modal').addClass('is-active');
      }
    });
    // var contactDiv = $('[data-id="' + thisID + '"]')
    // debugger

    //TODO
  });

  $('.modal-close').on('click', function() {
    $(this).closest('.modal').removeClass('is-active');
  });

  //DELETE
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
        }
      });
  });

  //CREATE
  $('.addContact').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.post('/create', {name: $('.nameInput').val(), email: $('.emailInput').val()},
      function(returnedData) {
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
});
