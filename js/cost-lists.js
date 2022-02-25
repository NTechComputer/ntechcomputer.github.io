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
        delete localStorage.userInfo;
        content.innerHTML = "";
        loading.style.display = "block";
        setTimeout(function(){window.location = "./"}, 1200);
    }
}

var itemsLength;
{
    branchChange("bagadi")
    function branchChange(value){
        // document.querySelector(".nav").style.display = "inline";
        document.getElementById("container").innerHTML = "";
        document.getElementById("loading").style.display = "block";
        itemsLength = 0;
        // content section
        let sheetId = "1VRTUEZawCxjwC0j4g33NCSZ72mT2AJMbzOKm-xeBJNg";
        let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${value}-credit-list`;
        fetch(url).then(res => res.text()).then(response => {
            let data = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
            // console.log(data)
            fetch("./contents/lists.html?t=" + new Date().getTime()).then(res => res.text()).then(response => {
                document.getElementById("container").innerHTML = response;
                document.title = "Services List";
                document.querySelector("h1").innerText = "Cost Lists";
                document.querySelector(".container .title2").innerText = "Cost";
                document.getElementById("branch").style.display = "inline";
                document.getElementById("branch").value = value;
                itemsLength = data.length;
                    for(let i = 0; i < data.length; i++){
                        // items["item" + i] = [data[i].c[0].v,  data[i].c[1]?data[i].c[1].v:"", data[i].c[2].v];
                        let edit = document.createElement("div");
                        edit.innerHTML = `
                                    <div id="item${i}">
                                        <div class="edit">
                                            <svg onclick = "editItem(${i})"  enable-background="new 0 0 29 30" style="height: 20px; margin-right: 10px; cursor: pointer;" version="1.1" viewBox="0 0 29 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#231F20" height="22.68" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)" width="10.846" x="7.536" y="5.169"/><path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" fill="#231F20"/><polygon fill="#231F20" points="0,30 7.088,30 0,22.28  "/></g></svg>
                                        </div>
                                        <div class="header">${data[i].c[2].v}</div>
                                        <div class="instraction">
                                        <div class="service">${(data[i].c[0].v).replace(/\\n/g, "<br>")}</div>
                                        <div class="link price">Cost: ${data[i].c[1]?data[i].c[1].v:""}</div>
                                        </div>
                                        
                                    </div>
                                    `;
                        document.getElementById("content").appendChild(edit)
                        
                    }
                let loading = document.getElementById("loading");
                loading.style.display = "none";
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }

    function addItem(){
        document.getElementById("services-name").value = "";
        document.getElementById("link").value = "";
        document.querySelector(".container").style.display = "flex";
        setTimeout(function(){
            document.querySelector(".addEdit").style.transform = "scale(1)";
        }, 50)
        document.getElementById("addEditBtn").removeAttribute("onclick");
        document.getElementById("addEditBtn").setAttribute("onclick", `submitItems('add', ${itemsLength++})`)
    }

    function editItem(i){
        let item = document.getElementById("item" + i)
        document.getElementById("services-name").value = item.querySelector(".service").innerText;
        document.getElementById("link").value = item.querySelector(".link").innerText.replace("Cost: ", "");
        document.querySelector(".container").style.display = "flex";
        setTimeout(function(){
            document.querySelector(".addEdit").style.transform = "scale(1)";
        }, 50)
        document.getElementById("addEditBtn").removeAttribute("onclick");
        document.getElementById("addEditBtn").setAttribute("onclick", `submitItems('edit', ${i})`);
    }

    function addEditDone(type, i){
        let userInfo = JSON.parse(localStorage.userInfo);
        let data  = [document.getElementById("services-name").value, document.getElementById("link").value.replace("Cost: ", "").trim().split(" ")[0], "Added by " + userInfo.name];
        if(type == "edit") {
            data[2] = "Modified by " + userInfo.name;
            document.getElementById("item" + i).querySelector(".service").innerText = data[0];
            document.getElementById("item" + i).querySelector(".link").innerText = "Cost: " + data[1];
            document.getElementById("item" + i).querySelector(".header").innerText = data[2];
        }
        else{
            let edit = document.createElement("div");
                    edit.innerHTML = `
                                <div id="item${i}">
                                    <div class="edit">
                                        <svg onclick = "editItem(${i})"  enable-background="new 0 0 29 30" style="height: 20px; margin-right: 10px; cursor: pointer;" version="1.1" viewBox="0 0 29 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#231F20" height="22.68" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)" width="10.846" x="7.536" y="5.169"/><path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" fill="#231F20"/><polygon fill="#231F20" points="0,30 7.088,30 0,22.28  "/></g></svg>
                                    </div>
                                    <div class="header">${data[2]}</div>
                                    <div class="instraction">
                                    <div class="service">${(data[0]).replace(/\\n/g, "<br>")}</div>
                                    <div class="link price">Cost: ${data[1]}</div>
                                    </div>
                                </div>
                                `;
                    document.getElementById("content").appendChild(edit);
        }
        // items["item" + i] = data;
        // closeAddEdit();
    }

    function closeAddEdit(){
        document.querySelector(".addEdit").style.transform = "scale(0)";
        setTimeout(function(){
            document.querySelector(".container").style.display = "none";
            closeErr(); closeSucc();
        }, 50);
    }

    function submitItems(type, i){
        closeErr(); closeSucc();
        let userInfo = JSON.parse(localStorage.userInfo);
        let data  = [document.getElementById("services-name").value, document.getElementById("link").value.replace("Cost: ", "").trim().split(" ")[0], "Added by " + userInfo.name];
        if(type == "edit") data[2] = "Modified by " + userInfo.name;
        let btn =  document.querySelector(".btn");
        btn.style.background = '#94d3a2';
        btn.style.color ='#eee';
        btn.disabled = true;
        btn.innerText = 'Submitting...';
        document.querySelector(".nav").style.display = "inline";
        document.getElementById("loading").style.display = "block";

        let form = new FormData();
        form.append("action", document.getElementById("branch").value + "-credit-list");
        form.append("data", JSON.stringify([data]));
        form.append("index", (Number(i) + 1))

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
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                btn.innerText = 'Submit';
                document.querySelector(".nav").style.display = "none";
                document.getElementById("loading").style.display = "none";
                if(response.result == "success"){
                    document.querySelector(".success").style.display = "flex";
                    addEditDone(type, i);
                }
                else{
                    document.querySelector(".error").style.display = "flex";
                }
        }).catch(err => {console.log(err)})
    }
}