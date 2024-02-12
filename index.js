$(document).ready(function () {

  function validateMe() {
    let agreedBox = document.getElementById("agreedBox");
    let strikethrough = document.getElementById("strikeThrough");
    let strikeThroughSecond = document.getElementById("strikeThroughSecond");

    if (agreedBox.checked == true) {
      strikethrough.style.textDecoration = "line-through";
    } else {
      strikethrough.style.textDecoration = "none";
    }

    if (agreedBox.checked == true) {
      strikeThroughSecond.style.textDecoration = "line-through";
    } else {
      strikeThroughSecond.style.textDecoration = "none";
    }
  }
  $("#agreedBox").click(function () {
    validateMe();
  });

  $("#todoBold").click(function () {
    let todoWord = document.getElementById("todoWord");
    let todoBold = document.getElementById("todoBold");
  });

  $("#taskHider").click(function () {
    $("#taskHolder").toggle();
  });

  $("#signUpBtn").click(function (event) {
    event.preventDefault();
    let name = $("#userName").val();
    let email = $("#email").val();
    let password = $("#password").val();

    if (name == "") {
      let nameError = document.getElementById("nameError");
      nameError.textContent = "field cannot be empty";
      nameError.style.color = "red";
      error = true;
      return false;
    } else if (name.length <= 2) {
      let nameError = document.getElementById("nameError");
      nameError.textContent = "Length too small";
      nameError.style.color = "red";
      error = true;
      return false;
    } else {
      let nameError = document.getElementById("nameError");
      nameError.textContent = "good";
      nameError.style.color = "green";
      error = false;
    }
    if (email == "") {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "email field cannot be empty";
      emailError.style.color = "red";
      error = true;
      return false;
    } else if (
      email.indexOf("@") < 1 ||
      email.indexOf("@") > email.length - 5
    ) {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "@ is required";
      emailError.style.color = "red";
      error = true;
      return false;
    } else {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "good";
      emailError.style.color = "green";
      error = false;
    }

    let userDetails = {
      name: name,
      email: email,
      password: password,
    };

    $.ajax({
      url: "http://todo.reworkstaging.name.ng/v1/users",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(userDetails),
      success: function (response) {
          alert("Your registration is successful!");
           window.location.href = "login.html";   
           console.log(response);                    
      },
      error: function (error) {
        console.log("Registration error:", error);
        alert("Registration Error.");
      },
    });

    $("form")[0].reset();
  });

  $("#loginBtn").click(function (event) {
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();

    if (email == "") {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "email field cannot be empty";
      emailError.style.color = "red";
      error = true;
      return false;
    } else if (
      email.indexOf("@") < 1 ||
      email.indexOf("@") > email.length - 5
    ) {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "@ is required";
      emailError.style.color = "red";
      error = true;
      return false;
    } else {
      let emailError = document.getElementById("emailError");
      emailError.textContent = "good";
      emailError.style.color = "green";
      error = false;
    }

    let userDetails = {
      email: email,
      password: password,
    };

    $.ajax({
      url: "http://todo.reworkstaging.name.ng/v1/users/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(userDetails),
      success: function (feedback) {
        console.log("Login response:", feedback);

        if (feedback.code == 404 || feedback.type == "NOT_EXISTS") {
          alert("Sorry, your username or password is incorrect.");
        } else {
          alert("Login successful");
          window.location.href = "todo.html";
        }
      },
      error: function (error) {
        console.log("Login error:", error);
        alert("Login Error.");
      },
    });

    $("form")[0].reset();
  });
   
});
