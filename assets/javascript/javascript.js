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
    var trainTime = $("#time-input").val().trim();
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

    var freq = parseInt(trainFrequency);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
    // var firstTimeConverted = moment(time,'hh:mm').subtract(1, 'years');
    var firstTimeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    console.log("DATE CONVERTED: " + firstTimeConverted);

    var departure = moment(firstTimeConverted).format('HH:mm');
    console.log("TRAIN TIME : " + departure);

    var finalTimeConverted = moment(departure, 'HH:mm').subtract(1, 'years');

    var diffTime = moment().diff(moment(finalTimeConverted), 'minutes');
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //REMAINDER 
    var tRemainder = diffTime % freq;
    console.log("TIME REMAINING: " + tRemainder);

    //MINUTES UNTIL NEXT TRAIN
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES UNTIL NEXT TRAIN: " + tMinutesTillTrain);

    //NEXT TRAIN
    var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});