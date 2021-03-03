var config = 
{
    apiKey: "AIzaSyCjfoTDT04X_ZRm4G8genhBUz57AMcHyeQ",
    authDomain: "idktest-e335c.firebaseapp.com",
    databaseURL: "https://idktest-e335c.firebaseio.com",
    projectId: "idktest-e335c",
    storageBucket: "idktest-e335c.appspot.com",
    messagingSenderId: "25967339910",
    appId: "1:25967339910:web:e9ff681dd7d1388e482407",
    measurementId: "G-F0P8TH474Y"
};
firebase.initializeApp(config);
database = firebase.database();
var friendList = []
var myUid 
var user
var userData

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        SignOut = document.createElement("li");
        SignOut.innerHTML='Sign Out';
        SignOut.onclick=logout;
        SignOut.className= 'So';
        SignOut.style.padding = '42px';
        SignOut.style.float = 'right';
        SignOut.style.fontsize = 'large';
        Nav = document.getElementById('Navigator');
        Nav.appendChild(SignOut);
        user.email == "declan.smith@ucc.on.ca"
        
        userRef= firebase.database().ref('users/' + user.uid);
        nameRef = firebase.database().ref('users/' + user.uid +'/name');
        Sname = user.email.split('@')[0]
        SSname= Sname.split('.')
        nameData= {
           name: SSname[0] + ' ' + SSname[1]
        }

       nameRef.set(nameData)
       
        
       
        
        userStepRef = firebase.database().ref('users/' + myUid + '/data/')
        var highestSteps 
        var CurrentStreak = []
                    if (userStepRef != null) {
                        userStepRef
                        .orderByChild('steps')
                        .limitToLast(1)
                        userStepRef.on('child_added', snapshot => {
                        highestSteps = snapshot.val().steps
                        if( document.getElementById('highest')){
                            document.getElementById('highest').innerHTML=highestSteps + ' Steps'
                        }
                        
                        
                    });

                    }
                    else {
                    if( document.getElementById('highest')){
                        document.getElementById('highest').innerHTML= '0 Steps'

                    }
                }


                    
        function streakFinder() {
            var loggedDays

            userStepRef.on("value", function(snapshot) {
                loggedDays = []
                checkList = []
            
                snapshot.forEach(childSnapshot => {
                        check = childSnapshot.key.split('')
                        
                        for (i=0; i<check.length; i++){
                        if(check[i]== '-'){
                        loggedDays.push(childSnapshot.key)
                        }
                    }
                    
                })
                var currentDate = new Date();
                var sDay = currentDate.getDate();
                var sMonth = currentDate.getMonth(); 
                var today = sDay + '-' + sMonth
                var temp
                var oneDay = false
                var currentStreakDay

            
                i=0
                while(i<loggedDays.length) {
                temp = loggedDays[i]
                    if (temp == today) {oneDay = true} 
                    i++;
                }


                if (oneDay) {
                    CurrentStreak.push(today.split('-'))
                    for (i=0; i<loggedDays.length; i++) {
                        if (loggedDays[i] == today){currentStreakDay = today.split('-') }}
                    
                    for (i=0; i<loggedDays.length; i++) {
                        temp = loggedDays[i].split('-')
                        if (temp[0] == currentStreakDay[0]-1 && temp[1] == currentStreakDay[1]|| 
                            currentStreakDay[1]== 0 /*jan */  && temp[1] == 11 /*dec*/ && temp[0] == 31 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 1 /*feb */  && temp[1] == 0 /*jan*/  && temp[0] == 31 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 2 /*march */&& temp[1] == 1 /*feb*/  && temp[0] == 28 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 3 /*april */&& temp[1] == 2 /*march*/&& temp[0] == 28 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 4 /*may */  && temp[1] == 3 /*april*/&& temp[0] == 30 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 5 /*june */ && temp[1] == 4 /*may*/  && temp[0] == 31 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 6 /*july */ && temp[1] == 5 /*june*/ && temp[0] == 30 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 7 /*august*/&& temp[1] == 6 /*july*/ && temp[0] == 30 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 8 /*sept*/  && temp[1] == 7 /*Aug*/  && temp[0] == 31 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 9 /*oct*/   && temp[1] == 8 /*sept*/ && temp[0] == 30 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 10 /*nov*/  && temp[1] == 9 /*oct*/  && temp[0] == 31 && currentStreakDay[0] ==1 ||
                            currentStreakDay[1]== 11 /*dec*/  && temp[1] == 10 /*nov*/ && temp[0] == 30 && currentStreakDay[0] ==1){
                        
                            
                            inside = false

                            for (t=0; t<CurrentStreak.length; t++){
                                if (CurrentStreak[t]== temp) {
                                inside = true
                                }
                            }
                            
                            if (inside==false){
                                CurrentStreak.push(temp)
                                currentStreakDay = temp
                                i=-1
                            }
                        }                               
                    }            
                } 
                
            if (document.getElementById('streak')) {
                if (oneDay == false){document.getElementById('streak').innerHTML = 'Not currently on a streak'}
                else if(oneDay == true) {document.getElementById('streak').innerHTML = CurrentStreak.length + ' days'}
                }
            })
        }

        streakFinder()    
                        
       
                        
        } else {
            RegisterOrLogin()
        }
        function fillUser(){
        window.user = firebase.auth().currentUser
        }
        fillUser()
        
})  
    




        function login() {
            provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult()
            .then((result) => {
                console.log(result);
                user = result.user;
                document.getElementById('register').innerHTML= '';
                


            }).catch(function(error) {
        
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
            
            
        };

        
   

        
    

        function logout() {
            firebase.auth().signOut()
                
        };
        inputs = document.getElementsByTagName('input')
        for (i=0; i<inputs.length; i++){
            inputs[i].setAttribute('size', inputs[i].getAttribute('placeholder').length);
        }

        function getParent(snapshot) {
            var ref = snapshot.ref;
            return ref.parent.key;
        }


        
    
    
    
function AfterSignin(){
    firebase.auth().getRedirectResult()
    .then((result) => {
        myUid = firebase.auth().currentUser.uid;
        var nameOfFriendRequester 
        var idOfFriendRequestor
        var indivdual


        friendsRef =  firebase.database().ref('users/'+ myUid + '/friendRequests');

            friendsRef.on('value', function(snapshot){
                snapshot.forEach(function(obj){
                    idOfFriendRequestor=obj.val()



                    friendNameRef = firebase.database().ref('users/' + idOfFriendRequestor +'/name');

                        nameRef.on('value', function(snapshot){
                            snapshot.forEach(function(obj){
                                nameOfFriendRequester=obj.val()

                        


                            indivdual = {
                                name: nameOfFriendRequester,
                                id: idOfFriendRequestor
                                
                            }
                        
                    
                            friendList.push(indivdual)
                
                        
                        }) 
                            friendNames = []
                            friendIds = []
                            
                            friendList.forEach(function(obj){ 
                                console.log(obj)
                                friendNames.push(obj.name)
                                friendIds.push(obj.id)
                            })

                            function createOption( text, Ovalue){
        
                            friendOption = document.createElement('option');
                            var friendText = document.createTextNode(text);
                            
                            friendOption.appendChild(friendText);
                            
                            friendOption.setAttribute('value', Ovalue);
                            friendOption.id= 'friendOption-' + Ovalue;
                            
                            document.getElementById('friendsSelector').appendChild(friendOption);
                            }
                            

                            
                            
                            if (friendNames.length == friendIds.length){
                            if(document.getElementById('friendsSelector')){
                            for(i=0; i<friendNames.length; i++){
                                createOption( friendNames[i], friendIds[i] )
                                console.log(friendNames[i], friendIds[i])
                            
                            }
                            }
                            }
                            else if(friendNames.length != friendIds.length){
                                console.log("for some reason their weren't the same number of ids and names")
                            }

                            


                })
            })
        })
    })

       
    

}
AfterSignin()

