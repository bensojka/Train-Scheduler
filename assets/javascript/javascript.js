// Initialize Firebase
var config = {
  apiKey: "AIzaSyDzwOiKUArt163il1pUj3d8uEVhCKsfZQg",
  authDomain: "train-scheduler-1c774.firebaseapp.com",
  databaseURL: "https://train-scheduler-1c774.firebaseio.com",
  projectId: "train-scheduler-1c774",
  storageBucket: "train-scheduler-1c774.appspot.com",
  messagingSenderId: "494121248708"
};

firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// YOUR TASK!!!
// Code in the logic for storing and retrieving the most recent user.
// Don't forget to provide initial data to your Firebase database.
var trainName = $("#name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
var trainFrequency = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding train data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  time: trainTime,
  frequency: trainFrequency
};

// Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

// Alert
alert("Train successfully added");

// Clears all of the text-boxes
$("#name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  console.log("firstTimeConverted" + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});