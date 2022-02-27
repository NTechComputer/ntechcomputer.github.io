{
    function openMenu(){
        document.querySelector(".nav").style.display = "inline";
        document.getElementById("menu").style.left = "0";
    }

    function closeMenu(){
        document.querySelector(".nav").style.display = "none";
        document.getElementById("menu").style.left = "-300px";
    }

    function closeErr(){
        document.querySelector(".error").style.display = "none";
    }

    function closeSucc(){
        document.querySelector(".success").style.display = "none";
    }

    function openMenuItem(source){
        closeMenu()
        let content = document.getElementById("container");
        let loading = document.getElementById("loading");
        content.innerHTML = "";
        loading.style.display = "block";
        
        let script = document.createElement("script");
        script.src = "./js/" + source + ".js?t="  + new Date().getTime();
        script.onload = function(){
            document.getElementsByTagName("script")[0].remove();
        }
        document.body.appendChild(script);
    }

    function logout(){
        closeMenu();
        let content = document.getElementById("container");
        let loading = document.getElementById("loading");
        delete localStorage.userInfo;
        content.innerHTML = "";
        loading.style.display = "block";
        setTimeout(function(){window.location = "./"}, 1200);
    }
}

var items;
var itemsLength;
{
    items = {};
    itemsLength = 0;
    fetch("./contents/changePassword.html?t=" + new Date().getTime()).then(res => res.text()).then(response => {
        document.getElementById("container").innerHTML = response;
        document.title = "Change Password";
        
        let loading = document.getElementById("loading");
        loading.style.display = "none";
    }).catch(err => console.log(err))

    function changePassword(){
        let error = document.querySelector(".error");
        let success = document.querySelector(".success");
        let btn = document.getElementById("btn");
        btn.style.background = '#94d3a2';
        btn.style.color ='#eee';
        btn.disabled = true;
        btn.innerText = 'Changing in...';
        error.style.display = "none";
        success.style.display = "none";
        
        if(document.getElementById("oldPassword").value != JSON.parse(localStorage.userInfo).password){
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
            btn.innerText = 'Change';
            error.style.display = "flex";
            error.querySelector(".text").innerText = "Old Password incorrect!"
        }
        else{
            if(document.getElementById("newPassword").value != document.getElementById("conNewPassword").value){
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                btn.innerText = 'Change';
                error.style.display = "flex";
                error.querySelector(".text").innerText = "New password doesn't match!";
            }
            else{
                let form = new FormData();
                form.append("action", "changePassword");
                form.append("id", JSON.parse(localStorage.userInfo).id);
                form.append("password", document.getElementById("newPassword").value);

                let url = "https://script.google.com/macros/s/AKfycbyP3th_Q4UW8qV_m6WuiHDn_sk_AF7FQ2Dzu2Z_jQ/exec";
                fetch(url, {
                    method: "POST",
                    mode: "cors",
                    header: {
                        "Content-Type" : "application/json"
                    },
                    body: form
                }).then(res => res.text()).then(response => {
                    console.log(response)
                    response = JSON.parse(response);
                    if(response.result == "success"){
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.disabled = false;
                        btn.innerText = 'Change';
                        success.style.display = "flex";
                        let userInfo = JSON.parse(localStorage.userInfo);
                        userInfo.password = document.getElementById("newPassword").value;
                        localStorage.userInfo = JSON.stringify(userInfo);
                    }
                    else{
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.disabled = false;
                        btn.innerText = 'Change';
                        error.style.display = "flex";
                        error.querySelector(".text").innerText = "Error! Please try again.";
                    }
                }).catch(err => {console.log(err)})
            }
        }
    }
}