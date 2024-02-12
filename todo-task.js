$(document).ready(function(){
const taskBoard = $("#taskBoard");
const taskForm = $("#taskForm");
const url = "http://todo.reworkstaging.name.ng/v1";
const loggedUser = JSON.parse(localStorage.getItem("Task_Manager_User"));

function postTask() {
  const tagId = $("#tag_id").val();
  const taskTitle = $("#task_title").val();
  const content = $("#content").val();

  const taskInfo = {
    tag_id: tagId,
    title: taskTitle,
    content: content,
  };

  $.ajax({
    url: `${url}/tasks`,
    method: "POST",
    data: taskInfo,
    success: function (successFeedback) {
      console.log(successFeedback);
    },
    error: function (errorFeedback) {
      console.log(errorFeedback);
    },
  });
  $("form")[0].reset();
}

function getTask() {
  $.ajax({
    url: `${url}/tasks?user_id=${loggedUser.id}`,
    method: "GET",
    success: function (data) {
      console.log("Received data:", data);

      $.each(data, function (i, task) {
        const taskPinner = $(`<div class="task-display-board"></div>`);
        taskPinner.append(`<div class="task-holder" id="taskHolder">
          <div class="task-title-and-option-bar">
            <p class="task-title" id="taskTitle ${task.id}">${task.title}</p>
            <div>
              <button class="edit-btn action-btn" id="editBtn">
                <img src="./images/icons8-edit-32.png" alt="" class="images">
              </button>
              <button class="delete-btn action-btn" id="deleteBtn">
                <img src="./images/icons8-delete-24 (1).png" alt="" class="images">
              </button>
            </div>
          </div>
          <div class="task-details" id="taskDetails">${task.content}</div>
          <div class="category-color-and-task-marker">
            <div class="content-tag" id="contentTag">Tag: ${task.tag}</div>
            <div class="task-marker-section">
              <label for=""><input type="checkbox" name="done" id="taskMarker"
                class="task-marker">Done</label>
            </div>
          </div>
        </div>`);
        taskBoard.append(taskPinner);
      });
    },
    error: function (errorFeedback) {
      console.log(errorFeedback);
    },
  });
}

getTask();


$(".create-category-btn").click(function () {
  $(".categoryModal").show();
});

$(".task-adder").click(function () {
  $(".modal").show();
  taskForm.trigger("reset");
});

$(".add-btn").click(function (event) {
  event.preventDefault();
  postTask();
  $(".modal").hide();
  taskForm.trigger("reset");
});


$(document).on("click", ".edit-btn", function () {
  var parentTaskHolder = $(this).closest(".task-holder");
  var taskId = parentTaskHolder.find(".task-title").attr("id");
  taskId = taskId.split(" ")[1];
  var taskTitle = parentTaskHolder.find(".task-title").text().trim();
  var taskDescription = parentTaskHolder.find(".task-details").text().trim();
  $(".update-modal").show();
  $("#newTitleBox").val(taskTitle);
  $("#newtaskDescription").val(taskDescription);


  $(".update-btn").click(function (event) {
    event.preventDefault();
    var updatedTitle = $("#newTitleBox").val();
    var updatedDescription = $("#newtaskDescription").val();

    var updatedTask = {
      title: updatedTitle,
      content: updatedDescription,
    };

    $.ajax({
      method: "PUT",
      url: `${url}/tasks/${taskId}`,
      data: updatedTask,
      success: function (data) {
        parentTaskHolder.find(".task-title").text(updatedTitle);
        parentTaskHolder.find(".task-details").text(updatedDescription);
        $(".update-modal").hide();
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $(".modal-update-cancel-btn").click(function (event) {
    event.preventDefault();
    $(".update-modal").hide(); 
  });
});


$(document).on("click", ".delete-btn", function () {
  var parentTaskHolder = $(this).closest(".task-holder");
  var taskId = parentTaskHolder.find(".task-title").attr("id");
  taskId = taskId.split(" ")[1];
  var confirmation = confirm("Are you sure you want to delete this task?");

  if (confirmation) {
    $.ajax({
      method: "DELETE",
      url: `${url}/tasks/${taskId}`,
      success: function (data) {
        parentTaskHolder.remove();
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
});

}); 