allUserRef= firebase.database().ref('users/'); 
var friend
var PossibleFriends = []
var friendName


    function findFriends(){ 
        
            searchName = document.getElementById('friendsFinder').value
            allUserRef.on("value", function(snapshot) {
                
                

                snapshot.forEach(childSnapshot => {

                    childSnapshot.forEach(data => {
                        
                        
                        check = data.key
                        isName = false
                            
                        if(check == 'name' ){
                        isName = true
                                
                        
            
                            tempy = []
                            if (isName == true) {
                                tempy.push(data.val())
                                
                            
                            tempy.forEach(function(obj){
                                PossibleFriends.push(obj.name);
                                
                            });

                        }
                        
                        friend = false
                        
                        for (i=0; i<PossibleFriends.length; i++){
                       
                    
                        
                            if (searchName == PossibleFriends[i]) {
                                friendName = PossibleFriends[i]
                                friend = true
                            }
                        }

                        if (friend){
                                friendDiv =  document.createElement('div')
                                friendDiv.id = 'friendHolder'
                                if (document.getElementById('friendHolder')){
                                document.getElementById('friendHolder').innerHTML = ''}

                                friendNamep = document.createElement('p');
                                friendNamep.innerHTML = friendName + '    '
                                friendNamep.className = 'display1';
                        
                                addFriendBtn = document.createElement("BUTTON");   
                                addFriendBtn.innerHTML = "AddFriend";
                                addFriendBtn.className = 'friendsFinderbtnn1';   
                                addFriendBtn.onclick= addFriend;
                                
                                
                                friendDiv.appendChild(friendNamep)
                                friendDiv.appendChild(addFriendBtn)
                                document.getElementById('friendsResults').appendChild(friendDiv);
                        
                            }
                            else if (friend == false) {
                                friend = false
                                PossibleFriends = []
                                friendDiv =  document.createElement('div')
                                friendDiv.id = 'friendHolder'
                                if (document.getElementById('friendHolder')){
                                document.getElementById('friendHolder').innerHTML = ''}
                                
                                friendNamep = document.createElement('p');
                                friendNamep.innerHTML = "'Sorry, your search didn't match the names of anybody on our site'"
                                friendNamep.className = 'display1';
                                
                                
                                friendDiv.appendChild(friendNamep)
                                document.getElementById('friendsResults').innerHTML= ''
                                document.getElementById('friendsResults').appendChild(friendDiv);
                    
                            }
                
                        }; 
                    });        
                });

            });         
            

    }
                
      
        
    


function addFriend() {
    value= []
    tValue=[]
    allUserRef.on("value", function(snapshot) {
        

        snapshot.forEach(childSnapshot => {

            childSnapshot.forEach(data => {
            

            check = data.key
                isName = false
                    
                if(check == 'name' ){
                isName = true
            
            }
                
                
                if (isName){
            
                    value.push(data.val())
                    isInside = false
                    
                    value.forEach(function(obj){
                        for(i=0; i<tValue.length; i++){
                            if (obj.name==tValue[i]) {
                                isInside = true
                                
                            }
                            
                        }
                        if(isInside==false){
                            tValue.push(obj.name)
                        }
                            
                        
                    })

              
                    
                }
                var friendId
                for(i=0; i<tValue.length; i++){
                    if (tValue[i]== friendName) {
                        if (getParent(data)!= 'undefined'){
                        friendId = getParent(data)
                        }
                    }
                }

                friendRef = firebase.database().ref('users/'+ friendId + '/friendRequests'); 

                friendData = {
                    requestFrom: myUid
                }
                if (friendId != undefined){
                friendRef.set(friendData)
                }

            })
        })
    })


}


function FriendSelectData() {

    SearchingForId = document.getElementById('friendsSelector').value
    dataGatherRef = firebase.database().ref('users/' + SearchingForId + '/data/');


    var friendHighestSteps 
    var friendCurrentStreak = []
                if (dataGatherRef != null) {
                    dataGatherRef
                    .orderByChild('steps')
                    .limitToLast(1)
                    dataGatherRef.on('child_added', snapshot => {
                    friendHighestSteps = snapshot.val().steps
                    if( document.getElementById('friendHighest')){
                        document.getElementById('friendHighest').innerHTML=friendHighestSteps + ' Steps'
                    }
                    
                    
                });}


                if (document.getElementById('friendsSelector').value == "Which of Your friends' data would you like to see?") {
                    document.getElementById('friendHighest').innerHTML = ''
                }


                
    function friendStreakFinder() {
        var friendLoggedDays

        dataGatherRef.on("value", function(snapshot) {
            friendLoggedDays = []
        
            snapshot.forEach(childSnapshot => {
                    check = childSnapshot.key.split('')
                    
                    for (i=0; i<check.length; i++){
                    if(check[i]== '-'){
                    friendLoggedDays.push(childSnapshot.key)
                    }
                }
                
            })
            var currentDate = new Date();
            var sDay = currentDate.getDate();
            var sMonth = currentDate.getMonth(); 
            var today = sDay + '-' + sMonth
            var temp
            var oneDay = false
            var friendCurrentStreakDay

        
            i=0
            while(i<friendLoggedDays.length) {
            temp = friendLoggedDays[i]
                if (temp == today) {oneDay = true} 
                i++;
            }


            if (oneDay) {
                friendCurrentStreak.push(today.split('-'))
                for (i=0; i<friendLoggedDays.length; i++) {
                    if (friendLoggedDays[i] == today){friendCurrentStreakDay = today.split('-') }}
                
                for (i=0; i<friendLoggedDays.length; i++) {
                    temp = friendLoggedDays[i].split('-')
                    if (temp[0] == friendCurrentStreakDay[0]-1 && temp[1] == friendCurrentStreakDay[1]|| 
                        friendCurrentStreakDay[1]== 0 /*jan */  && temp[1] == 11 /*dec*/ && temp[0] == 31 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 1 /*feb */  && temp[1] == 0 /*jan*/  && temp[0] == 31 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 2 /*march */&& temp[1] == 1 /*feb*/  && temp[0] == 28 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 3 /*april */&& temp[1] == 2 /*march*/&& temp[0] == 28 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 4 /*may */  && temp[1] == 3 /*april*/&& temp[0] == 30 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 5 /*june */ && temp[1] == 4 /*may*/  && temp[0] == 31 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 6 /*july */ && temp[1] == 5 /*june*/ && temp[0] == 30 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 7 /*august*/&& temp[1] == 6 /*july*/ && temp[0] == 30 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 8 /*sept*/  && temp[1] == 7 /*Aug*/  && temp[0] == 31 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 9 /*oct*/   && temp[1] == 8 /*sept*/ && temp[0] == 30 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 10 /*nov*/  && temp[1] == 9 /*oct*/  && temp[0] == 31 && friendCurrentStreakDay[0] ==1 ||
                        friendCurrentStreakDay[1]== 11 /*dec*/  && temp[1] == 10 /*nov*/ && temp[0] == 30 && friendCurrentStreakDay[0] ==1){
                    
                        
                        inside = false

                        for (t=0; t<friendCurrentStreak.length; t++){
                            if (friendCurrentStreak[t]== temp) {
                            inside = true
                            }
                        }
                        
                        if (inside==false){
                            friendCurrentStreak.push(temp)
                            friendCurrentStreakDay = temp
                            i=-1
                        }
                    }                               
                }            
            } 
            
        if (document.getElementById('friendStreak')) {
            if (oneDay == false){document.getElementById('friendStreak').innerHTML = ''}
            else if(oneDay == true) {document.getElementById('friendStreak').innerHTML = friendCurrentStreak.length + ' days'}
            else if(document.getElementById('friendsSelector').value == "Which of Your friends' data would you like to see?"){
                document.getElementById('friendStreak').innerHTML = ''
            }
            }
        })
    }

    friendStreakFinder()
    

}




