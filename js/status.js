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

{
    // content showing
    let bagadiMonths;
    let caurastaMonths;
    
    let chartJS = document.createElement("script");
    chartJS.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.getElementById("container").appendChild(chartJS);

    chartJS.onload = function(){
        // bagadi month base sheet id
        let sheetId = "12u3ecrf5kSaPrQlvnVYNaYnk8RU3PriwtW7t6AskLNw";
        let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=bagadi`;
        fetch(url).then(res => res.text()).then(response => {
            bagadiMonths = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
            
            // caurast month base sheet id
            let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=courasta`;
            fetch(url).then(res => res.text()).then(response => {
                caurastaMonths = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
                fetch("./contents/status.html?t=" + new Date().getTime()).then(res => res.text()).then(response => {
                    document.getElementById("container").innerHTML = response;

                    // month list
                    document.getElementById("monthList").innerHTML = "";
                    for(let i = 1; i <= new Date().getMonth(); i++){
                        let option = document.createElement("option");
                        option.value = i;
                        option.innerText = bagadiMonths[i].c[0].v;
                        document.getElementById("monthList").appendChild(option);
                    }
                    document.getElementById("monthList").value = new Date().getMonth();
                    monthChange(new Date().getMonth());
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))

        }).catch(err => console.log(err))
    }

    function getDate(date){
        return date.substr(4, 11).replace(/ /g, ", ").replace(",", "");
    }

    function getTime(time){
        //console.log(time)
        time = new Date(time);
        let hours = time.getHours();
        //let minutes = time.getMinutes();
        let suffix = " AM";
        if(hours > 12){
            hours = hours - 12;
            suffix = " PM";
            //if(hours == 24 && minutes == 0) suffix = " AM";
        }
        if(hours == 12) suffix = " PM";
        return String(hours).padStart(2, 0) + ":00" + suffix;
    }

    function createChart(bagadi, caurasta, b, c){
        document.getElementById("chartDiv").innerHTML = "";
        let canvas = document.createElement("canvas");
        document.getElementById("chartDiv").appendChild(canvas);
        let dataSets =  [{
                            label: 'Bagadi',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data:  bagadi
                        },
                        {
                            label: 'Caurasta',
                            backgroundColor: 'rgba(54, 162, 235)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            data: caurasta
                        }
                        ];
        if(c > b) {
            let tem = dataSets[0]; 
            dataSets[0] = dataSets[1]; 
            dataSets[1] = tem;
        }
        let config = {
                type: 'line',
                data: {
                    datasets: dataSets,
                    },

                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        interaction: {
                            intersect: false
                        },
                    }
                };
        new Chart(canvas, config);
    }

    function monthChange(value){
        let statusDiv = document.getElementById("statusDiv");
        let loading = document.getElementById("loading");
        statusDiv.style.display = "none";
        loading.style.display = "block";
        let bagadiSheetId = bagadiMonths[value].c[1].v;
        let caurastaSheetId = caurastaMonths[value].c[1].v;
        let bagadiMonthData = {};
        let caurastaMonthData = {};
        // monthly bagadi debit data
        console.log(bagadiSheetId)
        console.log(caurastaSheetId)
        let url = `https://docs.google.com/spreadsheets/d/${bagadiSheetId}/gviz/tq?tqx=out:json&sheet=monthly-debit`;
        fetch(url).then(res => res.text()).then(response => {
            let debitData = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
                // add to bagadi chart data
                for(let i = 0; i < debitData.length; i++){
                    bagadiMonthData[getDate(debitData[i].c[0].v)]= debitData[i].c[4].v;
                }

                // monthly bagadi credit data
                url = `https://docs.google.com/spreadsheets/d/${bagadiSheetId}/gviz/tq?tqx=out:json&sheet=monthly-credit`;
                fetch(url).then(res => res.text()).then(response => {
                    let creditData = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
                    // remove to bagadi chart data
                    console.log(creditData)
                    for(let i = 0; i < creditData.length; i++){
                        bagadiMonthData[getDate(creditData[i].c[0].v)] = Number(bagadiMonthData[getDate(creditData[i].c[0].v)]) -  Number(creditData[i].c[4].v);
                    }
                    
                    // caurasta monthly  debit
                    url = `https://docs.google.com/spreadsheets/d/${caurastaSheetId}/gviz/tq?tqx=out:json&sheet=monthly-debit`;
                    fetch(url).then(res => res.text()).then(response => {
                        let debitData2 = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
                            // add to caurasta chart data
                            for(let i = 0; i < debitData2.length; i++){
                                caurastaMonthData[getDate(debitData2[i].c[0].v)]= debitData2[i].c[4].v;
                            }

                            // monthly caurasta credit data
                            url = `https://docs.google.com/spreadsheets/d/${caurastaSheetId}/gviz/tq?tqx=out:json&sheet=monthly-credit`;
                            fetch(url).then(res => res.text()).then(response => {
                                 let creditData2 = JSON.parse(String(response).substr(47).slice(0, -2)).table.rows;
                                // remove to bagadi chart data
                                for(let i = 0; i < creditData2.length; i++){
                                    caurastaMonthData[getDate(creditData2[i].c[0].v)] = Number(caurastaMonthData[getDate(creditData2[i].c[0].v)]) -  Number(creditData2[i].c[4].v);
                                }

                                // create chart 
                                createChart(bagadiMonthData, caurastaMonthData, debitData.length, debitData2.length);
                                statusDiv.style.display = "block";
                                loading.style.display = "none";
                            }).catch(err => console.log(err))
                    }).catch(err => console.log(err))    
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
}