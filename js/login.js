{
    let now = new Date().getTime();
    if(localStorage.lastUpadate){
        if(now - Number(localStorage.lastUpadate) > 10000){
            localStorage.lastUpadate = now;
            console.log("updated");
            window.location.reload();
        }
    }
    else{
        localStorage.lastUpadate = now;
    }
}
{
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let error = document.querySelector(".error");
    let btn = document.getElementById("btn");

    function closeErr(){
        error.style.display = "none";
    }

    function login(){
        btn.style.background = '#94d3a2';
        btn.style.color ='#eee';
        btn.disabled = true;
        btn.innerText = 'Loging in...';
        error.style.display = "none";
        let form = new FormData();
        form.append("username", username.value);
        form.append("password", password.value);

        let url = "https://ntechform.herokuapp.com/ntech.php";
        fetch(url, {
            method: "POST",
            mode: "cors",
            header: {
                "Content-Type" : "application/json"
            },
            body: form
        }).then(res => res.text()).then(response => {
            if(response != 401){
                if(response == 404){
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                    btn.innerText = 'Login';
                    error.style.display = "flex";
                }
                else{
                    console.log(response)
                }
            }
            else{
                alert("401")
            }
        }).catch(err => {console.log(err)})
    }
}