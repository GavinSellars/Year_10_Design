var Date
var sDay
var sMonth

function currentTime() {
    var currentDate = new Date();
    var sDay = currentDate.getDate();
    var sMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    setSteps(sDay, sMonth)
    
}

function setSteps(sDay, sMonth) {
var dataLogCount
console.log('here')
var Ssteps = document.getElementById("stepsInput").value;
stepLogRef = firebase.database().ref('users/' + myUid + '/data/' + sDay + '-' + sMonth)
stepLogRef.transaction(function (current_value) {
    dataLogCount = (current_value || 0) + 1;
});
sData = {
    steps : Ssteps,
}
stepLogRef.set(sData)
}


