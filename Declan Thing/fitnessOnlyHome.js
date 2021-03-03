var AuthDiv


    function RegisterOrLogin(){
        
        AuthDiv = document.createElement("div");
        AuthDiv.id = "register";
        
        
        welcome = document.createTextNode('Welcome!')
        welcome.className= 'registerText'
        AuthDiv.appendChild(welcome)
        var br1 = document.createElement("br");
        AuthDiv.appendChild(br1);
        newContent = document.createTextNode(" to gain access to the site, please sign in below");
        newContent.className= 'registerText'
        AuthDiv.appendChild(newContent);
        var br2 = document.createElement("br");
        AuthDiv.appendChild(br2);
    

        var Loginbtn = document.createElement("BUTTON");   
        Loginbtn.innerHTML = "Login";
        Loginbtn.className = 'LoginBtnCSS'   
        Loginbtn.onclick= login;                
        AuthDiv.appendChild(Loginbtn);
        

        document.body.appendChild(AuthDiv)
        
    }
