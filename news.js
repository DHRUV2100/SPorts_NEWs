console.log("THIS IS A NEWS WEBSITE!");


let option = document.querySelector("#option");
option.addEventListener("change", showNews);
function showNews() {
    //instantiate an XHR object
    const xhr = new XMLHttpRequest();

    let country = "";
    //open the object
    if (option.value == 1)
        country = "in";
    else if (option.value == 2)
        country = "ca";
    else if (option.value == 3)
        country = "de";
    else if (option.value == 4)
        country = "fr";
    else if (option.value == 5)
        country = "au";
    else {
        let elem = document.querySelector("#newsBody");
        elem.innerHTML = `<div class="alert alert-danger" role="alert">
    Select one of the countries
</div>`;
        return;
    }

    xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apiKey=5a389cf5d24842099a6348c6d12f0dcd`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let elem = document.querySelector("#newsBody");
            let cN = JSON.parse(this.responseText);
            let comingNews = cN.articles;
            let news = ``;
            for (let i = 0; i < comingNews.length; i++) {
                news += ` <div class="accordion-item" style="border: 1px solid #c2dbfe;">
            <h2 class="accordion-header" id="flush-heading${i + 1}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i + 1}" aria-expanded="false" aria-controls="flush-collapse${i + 1}">
              (${i + 1})  <mark>${comingNews[i].description}</mark>
              </button>
            </h2>
            <div id="flush-collapse${i + 1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">${comingNews[i].content}
              <a href="${comingNews[i].url}">READ MORE</a></div>
            </div>
          </div>`
            }
            elem.innerHTML = news;
        }
        else {
            console.log("NO");
        }
    }
    xhr.send();
}

let srch = document.querySelector("#searchBox");
console.log(srch.innerHTML);
srch.addEventListener("input", show);

function show() {
    let elem = document.querySelector("#newsBody");
    elem.innerHTML = ``;
    let country = "";
    //open the object
    if (option.value == 1)
        country = "in";
    else if (option.value == 2)
        country = "ca";
    else if (option.value == 3)
        country = "de";
    else if (option.value == 4)
        country = "fr";
    else if (option.value == 5)
        country = "au";
    else {
        let elem = document.querySelector("#newsBody");
        elem.innerHTML = `<div class="alert alert-danger" role="alert">
    Select one of the countries
</div>`;
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&apiKey=5a389cf5d24842099a6348c6d12f0dcd`, true);
    xhr.onload = function () {
        if (this.status === 200) {

            let cN = JSON.parse(this.responseText);
            let comingNews = cN.articles;
            let news = ``;
            let txt = document.querySelector("#searchBox").value;
            txt=txt.toLowerCase();
            for (let i = 0; i < comingNews.length; i++) {
                if (comingNews[i].description.toLowerCase().includes(txt) == true) {
                    news += ` <div class="accordion-item" style="border: 1px solid #c2dbfe;">
            <h2 class="accordion-header" id="flush-heading${i + 1}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i + 1}" aria-expanded="false" aria-controls="flush-collapse${i + 1}">
              (${i + 1})  <mark>${comingNews[i].description}</mark>
              </button>
            </h2>
            <div id="flush-collapse${i + 1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">${comingNews[i].content}
              <a href="${comingNews[i].url}">READ MORE</a></div>
            </div>
          </div>`;
                }
                else
                    // console.log(comingNews[i].description + " " + txt);

                elem.innerHTML = news;
            }
        }
        else {
            console.log("NO");
        }
    }
    xhr.send();
}