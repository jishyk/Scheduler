$(document).ready(function () {
  function displayCurrentDay() {
    var currentDay = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);
  }
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);


      

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past present");
        $(this).addClass("future");
      }
    });
  }



  function loadSavedEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var savedEvent = localStorage.getItem(hour);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }



  function saveEvent() {
    var hour = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(hour, eventText);
  }
  $(".saveBtn").on("click", saveEvent);
  updateTimeBlocks();
  loadSavedEvents();
  displayCurrentDay();
  setInterval(updateTimeBlocks, 60000);
});
  $("#resetBtn").on("click", resetSchedule);


