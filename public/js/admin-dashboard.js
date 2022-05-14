$(document).ready(function () {
  function ajaxGET(path, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        callback(this.responseText, this.status);
      }
    };
    xhr.open("GET", path);
    xhr.send();
  }

  ajaxGET("/users", (data, status) => {
    const { users, message } = JSON.parse(data);
    if (status === 200) {
      const userTableBody = document.getElementById("user-table-body");

      const template = document.getElementById("template-user-row");
      users.forEach(({ name, email, role }) => {
        let userRow = template.content.cloneNode(true);
        userRow.querySelector(".user-row-name").innerHTML = name;
        userRow.querySelector(".user-row-email").innerHTML = email;
        userTableBody.appendChild(userRow);
      });
    }
  });

  $('[data-toggle="tooltip"]').tooltip();
  // Append table with add row form on add new button click
  $(".add-new").click(function () {
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
	var actions = $("table td:last-child").html();
    var row =
      "<tr>" +
      '<td><input type="text" class="form-control" name="name" id="new-user-name"></td>' +
      '<td><input type="text" class="form-control" name="email" id="new-user-email"></td>' +
      '<td><input type="text" class="form-control" name="password" id="new-user-password"></td>' +
      "<td>" +
      actions +
      "</td>" +
      "</tr>";
    $("table").append(row);
    $("table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle();
    $('[data-toggle="tooltip"]').tooltip();
  });
  // Add row on add button click
  $(document).on("click", ".add", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function () {
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function () {
        $(this).html(
          '<input type="text" class="form-control" value="' +
            $(this).text() +
            '" required>'
        );
      });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });
  // Delete row on delete button click
  $(document).on("click", ".delete", function () {
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  });
});

$(document).ready(function () {
  $(".profile .icon_wrap").click(function () {
    $(this).parent().toggleClass("active");
  });
});
