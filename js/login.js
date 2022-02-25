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

    if(localStorage.userInfo){
        let userInfo = JSON.parse(localStorage.userInfo);
        username.value = userInfo.username;
        password.value = userInfo.password;
        login();
    }

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
                    let url = "./contents/main.html?t=" + new Date().getTime();
                    let data = JSON.parse(response);
                    data.username = username.value;
                    data.password = password.value;
                    localStorage.userInfo = JSON.stringify(data);
                    fetch(url).then(res => res.text()).then(response => {
                        let link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = "css/main.css?t=" + new Date().getTime();
                        link.onload = function(){
                            document.getElementById("stylesheet").remove();
                            this.id = "stylesheet";

                            document.body.innerHTML = "";
                            document.body.innerHTML = response;
                            document.title = "Instructions";
                            let script = document.createElement("script");
                            script.src = "js/instructions.js?t=" + new Date().getTime();
                            script.onload = function(){
                                document.getElementById("userName").innerText = data.name;
                                document.getElementById("userPhoto").src = data.photo ? data.photo : "./user.svg";
                                document.getElementsByTagName("script")[0].remove();
                            }
                            document.body.appendChild(script);
                            
                        }
                        document.head.appendChild(link);
                    })
                    .catch(err => {console.log(err)})
                }
            }
            else{
                alert("401")
            }
        }).catch(err => {console.log(err)})
    }
}

function invokeServiceWorkerUpdateFlow(registration) {
    // TODO implement your own UI notification element
    notification.show("New version of the app is available. Refresh now?");
    notification.addEventListener('click', () => {
        if (registration.waiting) {
            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    })
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('/management/sw.js')

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration)
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time')
                        }
                    }
                })
            }
        })

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })
    })
}

