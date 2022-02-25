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
    // content section
    let sheetId = "1xIFFwO5SD7evh6uHPQFPmrc7KARGMqJZ8ec6N35XIsc";
    let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=emailList`;
    fetch(url).then(res => res.text()).then(response => {
        let data = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
        // console.log(data)
        fetch("./contents/instructions.html?t=" + new Date().getTime()).then(res => res.text()).then(response => {
            document.getElementById("container").innerHTML = response;
            document.title = "Email List";
            document.querySelector("h1").innerText = "Email List";
            document.querySelector(".container .title").innerText = "Email Address";
            document.
            itemsLength = data.length;
            items["item" + 0] = [data[0].c[0].v,  data[0].c[1].v];
                for(let i = 1; i < data.length; i++){
                    items["item" + i] = [data[i].c[0].v,  data[i].c[1].v];
                    let edit = document.createElement("div");
                    edit.innerHTML = `
                                <div id="item${i}">
                                    <div class="edit">
                                        <svg onclick = "editItem(${i})"  enable-background="new 0 0 29 30" style="height: 20px; margin-right: 10px; cursor: pointer;" version="1.1" viewBox="0 0 29 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#231F20" height="22.68" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)" width="10.846" x="7.536" y="5.169"/><path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" fill="#231F20"/><polygon fill="#231F20" points="0,30 7.088,30 0,22.28  "/></g></svg>
                                        <svg onclick = "deleteItem(${i})" style="width: 20px; fill:#ff8182; cursor: pointer;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64">    <path d="M 26.9375 4 C 26.0435 4 25.203813 4.3940781 24.632812 5.0800781 C 24.574813 5.1490781 24.527234 5.2256406 24.490234 5.3066406 L 22.357422 10 L 11 10 C 9.346 10 8 11.346 8 13 L 8 19 C 8 20.654 9.346 22 11 22 L 13 22 L 13 57 C 13 58.654 14.346 60 16 60 L 48 60 C 49.654 60 51 58.654 51 57 L 51 22 L 53 22 C 54.654 22 56 20.654 56 19 L 56 13 C 56 11.346 54.654 10 53 10 L 41.644531 10 L 39.511719 5.3066406 C 39.474719 5.2256406 39.426141 5.1480781 39.369141 5.0800781 C 38.797141 4.3940781 37.957453 4 37.064453 4 L 26.9375 4 z M 26.9375 6 L 37.0625 6 C 37.3225 6 37.569906 6.1003437 37.753906 6.2773438 L 39.447266 10 L 24.552734 10 L 26.246094 6.2773438 C 26.431094 6.1003438 26.6775 6 26.9375 6 z M 11 12 L 53 12 C 53.551 12 54 12.448 54 13 L 54 19 C 54 19.552 53.551 20 53 20 L 11 20 C 10.449 20 10 19.552 10 19 L 10 13 C 10 12.448 10.449 12 11 12 z M 14 14 C 13.448 14 13 14.447 13 15 L 13 17 C 13 17.553 13.448 18 14 18 C 14.552 18 15 17.553 15 17 L 15 15 C 15 14.447 14.552 14 14 14 z M 19 14 C 18.448 14 18 14.447 18 15 L 18 17 C 18 17.553 18.448 18 19 18 C 19.552 18 20 17.553 20 17 L 20 15 C 20 14.447 19.552 14 19 14 z M 24 14 C 23.448 14 23 14.447 23 15 L 23 17 C 23 17.553 23.448 18 24 18 C 24.552 18 25 17.553 25 17 L 25 15 C 25 14.447 24.552 14 24 14 z M 29 14 C 28.448 14 28 14.447 28 15 L 28 17 C 28 17.553 28.448 18 29 18 C 29.552 18 30 17.553 30 17 L 30 15 C 30 14.447 29.552 14 29 14 z M 35 14 C 34.448 14 34 14.447 34 15 L 34 17 C 34 17.553 34.448 18 35 18 C 35.552 18 36 17.553 36 17 L 36 15 C 36 14.447 35.552 14 35 14 z M 40 14 C 39.448 14 39 14.447 39 15 L 39 17 C 39 17.553 39.448 18 40 18 C 40.552 18 41 17.553 41 17 L 41 15 C 41 14.447 40.552 14 40 14 z M 45 14 C 44.448 14 44 14.447 44 15 L 44 17 C 44 17.553 44.448 18 45 18 C 45.552 18 46 17.553 46 17 L 46 15 C 46 14.447 45.552 14 45 14 z M 50 14 C 49.448 14 49 14.447 49 15 L 49 17 C 49 17.553 49.448 18 50 18 C 50.552 18 51 17.553 51 17 L 51 15 C 51 14.447 50.552 14 50 14 z M 15 22 L 49 22 L 49 57 C 49 57.552 48.551 58 48 58 L 16 58 C 15.449 58 15 57.552 15 57 L 15 56 L 38 56 C 38.552 56 39 55.553 39 55 C 39 54.447 38.552 54 38 54 L 15 54 L 15 22 z M 20 28 C 19.448 28 19 28.447 19 29 L 19 41 C 19 41.553 19.448 42 20 42 C 20.552 42 21 41.553 21 41 L 21 29 C 21 28.447 20.552 28 20 28 z M 28 28 C 27.448 28 27 28.447 27 29 L 27 49 C 27 49.553 27.448 50 28 50 C 28.552 50 29 49.553 29 49 L 29 29 C 29 28.447 28.552 28 28 28 z M 36 28 C 35.448 28 35 28.447 35 29 L 35 49 C 35 49.553 35.448 50 36 50 C 36.552 50 37 49.553 37 49 L 37 29 C 37 28.447 36.552 28 36 28 z M 44 28 C 43.448 28 43 28.447 43 29 L 43 33 C 43 33.553 43.448 34 44 34 C 44.552 34 45 33.553 45 33 L 45 29 C 45 28.447 44.552 28 44 28 z M 44 36 C 43.448 36 43 36.447 43 37 L 43 49 C 43 49.553 43.448 50 44 50 C 44.552 50 45 49.553 45 49 L 45 37 C 45 36.447 44.552 36 44 36 z M 20 44 C 19.448 44 19 44.447 19 45 L 19 49 C 19 49.553 19.448 50 20 50 C 20.552 50 21 49.553 21 49 L 21 45 C 21 44.447 20.552 44 20 44 z M 42 54 C 41.448 54 41 54.447 41 55 C 41 55.553 41.448 56 42 56 L 46 56 C 46.552 56 47 55.553 47 55 C 47 54.447 46.552 54 46 54 L 42 54 z"/></svg>
                                    </div>
                                    <div class="instraction">
                                    ${(data[i].c[0].v).replace(/\\n/g, "<br>")}
                                    </div>
                                    <div class="footer">${data[i].c[1].v}</div>
                                </div>
                                `;
                    document.getElementById("content").appendChild(edit)
                    
                }
            let loading = document.getElementById("loading");
            loading.style.display = "none";
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))

    function addItem(){
        document.getElementById("addEdit").value = "";
        document.querySelector(".container").style.display = "flex";
        setTimeout(function(){
            document.querySelector(".addEdit").style.transform = "scale(1)";
        }, 50)
        document.getElementById("addEditBtn").removeAttribute("onclick");
        document.getElementById("addEditBtn").setAttribute("onclick", `addEditDone('add', ${itemsLength++})`)
    }

    function editItem(i){
        let value = document.getElementById("item" + i).querySelector(".instraction").innerText;
        document.getElementById("addEdit").value = value;
        document.querySelector(".container").style.display = "flex";
        setTimeout(function(){
            document.querySelector(".addEdit").style.transform = "scale(1)";
        }, 50)
        document.getElementById("addEditBtn").removeAttribute("onclick");
        document.getElementById("addEditBtn").setAttribute("onclick", `addEditDone('edit', ${i})`);
    }

    function deleteItem(i){
        let con = confirm("Are you sure for deleting?");
        if(con){
            delete items["item" + i];
        document.getElementById("item" + i).remove();
        }
    }

    function addEditDone(type, i){
        let userInfo = JSON.parse(localStorage.userInfo);
        let data  = [String(document.getElementById("addEdit").value).split("\n")[0], "Added by " + userInfo.name];
        if(type == "edit") {
            data[1] = "Modified by " + userInfo.name;
            document.getElementById("item" + i).querySelector(".instraction").innerText = data[0];
            document.getElementById("item" + i).querySelector(".footer").innerText = data[1];
        }
        else{
            let edit = document.createElement("div");
                    edit.innerHTML = `
                                <div id="item${i}">
                                    <div class="edit">
                                        <svg onclick = "editItem(${i})"  enable-background="new 0 0 29 30" style="height: 20px; margin-right: 10px; cursor: pointer;" version="1.1" viewBox="0 0 29 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect fill="#231F20" height="22.68" transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)" width="10.846" x="7.536" y="5.169"/><path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" fill="#231F20"/><polygon fill="#231F20" points="0,30 7.088,30 0,22.28  "/></g></svg>
                                        <svg onclick = "deleteItem(${i})" style="width: 20px; fill:#ff8182; cursor: pointer;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64">    <path d="M 26.9375 4 C 26.0435 4 25.203813 4.3940781 24.632812 5.0800781 C 24.574813 5.1490781 24.527234 5.2256406 24.490234 5.3066406 L 22.357422 10 L 11 10 C 9.346 10 8 11.346 8 13 L 8 19 C 8 20.654 9.346 22 11 22 L 13 22 L 13 57 C 13 58.654 14.346 60 16 60 L 48 60 C 49.654 60 51 58.654 51 57 L 51 22 L 53 22 C 54.654 22 56 20.654 56 19 L 56 13 C 56 11.346 54.654 10 53 10 L 41.644531 10 L 39.511719 5.3066406 C 39.474719 5.2256406 39.426141 5.1480781 39.369141 5.0800781 C 38.797141 4.3940781 37.957453 4 37.064453 4 L 26.9375 4 z M 26.9375 6 L 37.0625 6 C 37.3225 6 37.569906 6.1003437 37.753906 6.2773438 L 39.447266 10 L 24.552734 10 L 26.246094 6.2773438 C 26.431094 6.1003438 26.6775 6 26.9375 6 z M 11 12 L 53 12 C 53.551 12 54 12.448 54 13 L 54 19 C 54 19.552 53.551 20 53 20 L 11 20 C 10.449 20 10 19.552 10 19 L 10 13 C 10 12.448 10.449 12 11 12 z M 14 14 C 13.448 14 13 14.447 13 15 L 13 17 C 13 17.553 13.448 18 14 18 C 14.552 18 15 17.553 15 17 L 15 15 C 15 14.447 14.552 14 14 14 z M 19 14 C 18.448 14 18 14.447 18 15 L 18 17 C 18 17.553 18.448 18 19 18 C 19.552 18 20 17.553 20 17 L 20 15 C 20 14.447 19.552 14 19 14 z M 24 14 C 23.448 14 23 14.447 23 15 L 23 17 C 23 17.553 23.448 18 24 18 C 24.552 18 25 17.553 25 17 L 25 15 C 25 14.447 24.552 14 24 14 z M 29 14 C 28.448 14 28 14.447 28 15 L 28 17 C 28 17.553 28.448 18 29 18 C 29.552 18 30 17.553 30 17 L 30 15 C 30 14.447 29.552 14 29 14 z M 35 14 C 34.448 14 34 14.447 34 15 L 34 17 C 34 17.553 34.448 18 35 18 C 35.552 18 36 17.553 36 17 L 36 15 C 36 14.447 35.552 14 35 14 z M 40 14 C 39.448 14 39 14.447 39 15 L 39 17 C 39 17.553 39.448 18 40 18 C 40.552 18 41 17.553 41 17 L 41 15 C 41 14.447 40.552 14 40 14 z M 45 14 C 44.448 14 44 14.447 44 15 L 44 17 C 44 17.553 44.448 18 45 18 C 45.552 18 46 17.553 46 17 L 46 15 C 46 14.447 45.552 14 45 14 z M 50 14 C 49.448 14 49 14.447 49 15 L 49 17 C 49 17.553 49.448 18 50 18 C 50.552 18 51 17.553 51 17 L 51 15 C 51 14.447 50.552 14 50 14 z M 15 22 L 49 22 L 49 57 C 49 57.552 48.551 58 48 58 L 16 58 C 15.449 58 15 57.552 15 57 L 15 56 L 38 56 C 38.552 56 39 55.553 39 55 C 39 54.447 38.552 54 38 54 L 15 54 L 15 22 z M 20 28 C 19.448 28 19 28.447 19 29 L 19 41 C 19 41.553 19.448 42 20 42 C 20.552 42 21 41.553 21 41 L 21 29 C 21 28.447 20.552 28 20 28 z M 28 28 C 27.448 28 27 28.447 27 29 L 27 49 C 27 49.553 27.448 50 28 50 C 28.552 50 29 49.553 29 49 L 29 29 C 29 28.447 28.552 28 28 28 z M 36 28 C 35.448 28 35 28.447 35 29 L 35 49 C 35 49.553 35.448 50 36 50 C 36.552 50 37 49.553 37 49 L 37 29 C 37 28.447 36.552 28 36 28 z M 44 28 C 43.448 28 43 28.447 43 29 L 43 33 C 43 33.553 43.448 34 44 34 C 44.552 34 45 33.553 45 33 L 45 29 C 45 28.447 44.552 28 44 28 z M 44 36 C 43.448 36 43 36.447 43 37 L 43 49 C 43 49.553 43.448 50 44 50 C 44.552 50 45 49.553 45 49 L 45 37 C 45 36.447 44.552 36 44 36 z M 20 44 C 19.448 44 19 44.447 19 45 L 19 49 C 19 49.553 19.448 50 20 50 C 20.552 50 21 49.553 21 49 L 21 45 C 21 44.447 20.552 44 20 44 z M 42 54 C 41.448 54 41 54.447 41 55 C 41 55.553 41.448 56 42 56 L 46 56 C 46.552 56 47 55.553 47 55 C 47 54.447 46.552 54 46 54 L 42 54 z"/></svg>
                                    </div>
                                    <div class="instraction">
                                    ${(data[0]).replace(/\n/g, "<br>")}
                                    </div>
                                    <div class="footer">${data[1]}</div>
                                </div>
                                `;
                    document.getElementById("content").appendChild(edit)
        }
        items["item" + i] = data;
        closeAddEdit()
    }

    function closeAddEdit(){
        document.querySelector(".addEdit").style.transform = "scale(0)";
        setTimeout(function(){
            document.querySelector(".container").style.display = "none";
        }, 50);
    }

    function submitItems(){
        let btn =  document.querySelector(".btn");
        btn.style.background = '#94d3a2';
        btn.style.color ='#eee';
        btn.disabled = true;
        btn.innerText = 'Submitting...';
        document.querySelector(".nav").style.display = "inline";
        document.getElementById("loading").style.display = "block";

        let form = new FormData();
        form.append("action", "emailList");
        form.append("data", JSON.stringify(Object.values(items)));

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
                }
                else{
                    document.querySelector(".error").style.display = "flex";
                }
        }).catch(err => {console.log(err)})
    }
}