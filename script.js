
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCSeJTuVO9rrgjzci7kbEEwIneLzyGtEmo",
    authDomain: "train-schedule-3efed.firebaseapp.com",
    databaseURL: "https://train-schedule-3efed.firebaseio.com",
    projectId: "train-schedule-3efed",
    storageBucket: "",
    messagingSenderId: "644640746260"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (childSnapshot) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var tFrequency = childSnapshot.val().tFrequency;
    var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
    var nextTrain = childSnapshot.val().nextTrain;

    $("#trainTable > tbody").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

//get info from the form
$("#submit").on("click", function () {
    event.preventDefault();

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var tFrequency = $("#t-frequency").val().trim();


    //ensures that each input has a value
    if (name == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTime == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (tFrequency == "") {
        alert('Enter a frequency');
        return false;
    }

    //MATH for the time
    var nextTrain = moment(firstTime, "hh:mm");
    var currentTime = moment();

    while (nextTrain.isBefore(currentTime)) {
        nextTrain = nextTrain.add(tFrequency, "minutes");
    }

    var tMinutesTillTrain = Math.round(nextTrain.diff(currentTime, "second") / 60);
    var firstTimeStr = firstTime.toString();
    var nextTrainStr = nextTrain.format("hh:mm A");

    var newTrain = {
        name: name,
        destination: destination,
        firstTime: firstTimeStr,
        tFrequency: tFrequency,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrain: nextTrainStr
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#t-frequency").val("");

    return false;
});





