$(document).ready(function () {
  const categoryCreatingForm = $("#categoryCreatingForm");
  const url = "http://todo.reworkstaging.name.ng/v1";
  const loggedUser = JSON.parse(localStorage.getItem("Task_Manager_User"));

  function postTags() {
    const tagTitle = $("#categoryTitle").val();
    const color = $("#categoryColor").val();

    const tagInfo = {
      user_id: loggedUser.id,
      title: tagTitle,
      color: color,
    };

    //create

    $.ajax({
      url: `${url}/tags`,
      method: "POST",
      data: tagInfo,
      success: function (successFeedback) {
        // if (successFeedback.code = 404) {
        //   alert(successFeedback.msg);
        //   console.log(successFeedback);
        //   return;
        // } else {
        //   alert("Tag created");
        // }
      },
      error: function (errorFeedback) {
        alert("Tags creation failed");
        console.log(errorFeedback);
      },
    });
    $("form")[0].reset();
  }

  // Get

  function getTags() {
    $.ajax({
      method: "GET",
      url: `${url}/tags?user_id=${loggedUser.id}`,
      success: function (data) {
        $.each(data, function (i, tag) {
          $("#todo-lists-category").append(
            `<li id='${tag.id}' class='single_tags'>
                            <div style='background-color: ${tag.color}'></div>
                            ${tag.title}
                                                          <div class="btn-holder">
               <button class="category-edit-btn category-action-btn"><img src="./images/icons8-edit-32.png" alt="" class="images"></button>
               <button class="category-delete-btn category-action-btn"><img src="./images/icons8-delete-24 (1).png" alt="" class="images"></button>
            </div>
                        </li> `
          );
          $("#tag_id").append(`
                        <option value='${tag.id}'>${tag.title}</option>
                    `);
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
  getTags();

  $(".add-category-btn").click(function (event) {
    event.preventDefault();
    postTags();
    $(".categoryModal").hide();
    categoryCreatingForm[0].reset();
  });

  $(".cancel-category-btn").click(function (event) {
    event.preventDefault();
    $(".categoryModal").hide();
    categoryCreatingForm[0].reset();
  });

 //Edit

     $(document).on("click", ".category-edit-btn", function () {
       var parentLi = $(this).closest("li");
       var categoryId = parentLi.attr("id");
       var categoryTitle = parentLi.find(".single_tags").text().trim();
       $(".updateCategoryModal").show();
       $("#newCategoryTitle").val(categoryTitle);
       $(".update-category-btn").click(function (event) {
         event.preventDefault();
         var updatedCategoryTitle = $("#newCategoryTitle").val();
         var updatedCategory = {
           title: updatedCategoryTitle,
         };
         $.ajax({
           method: "PUT",
           url: `${url}/tags/${categoryId}`,
           data: updatedCategory,
           success: function (data) {
             parentLi.find(".single_tags").text(updatedCategoryTitle);
             $(".updateCategoryModal").hide();  
           },
           error: function (err) {
             console.log(err);
           },
         });
       });
       $(".category-update-cancel-btn").click(function (event) {
         event.preventDefault();
         $(".updateCategoryModal").hide(); 
       });
     });

//Delete

     $(document).on("click", ".category-delete-btn", function () {
       var parentLi = $(this).closest("li");
       var categoryId = parentLi.attr("id");
       var confirmation = confirm(
         "Are you sure you want to delete this category?"
       );

       if (confirmation) {
         $.ajax({
           method: "DELETE",
           url: `${url}/tags/${categoryId}`,
           success: function (data) {
             parentLi.remove();
           },
           error: function (err) {
             console.log(err);
           },
         });
       }
     });

    });


