function AjaxCallBack(url,method,data,manga){
    $.ajax({
        url: "assets/data/" + url,
        method: method,
        dataType: data,
        success: manga,
        error: function(stat, exception){
            var allert = '';
            if (stat.status === 0) {
            allert = 'Not connect.\n Verify Network.';
            } else if (stat.status == 404) {
            allert = 'Requested page not found. [404]';
            } else if (stat.status == 500) {
            allert = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            allert = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            allert = 'Time out error.';
            } else if (exception === 'abort') {
            allert = 'Ajax request aborted.';
            } else {
            allert = 'Uncaught Error.\n' + stat.responseText;
            }
            console.log(allert);
        }
    })
}
window.onload = function(){

    var path = window.location.pathname.split("/").pop();
    var navProba = [];

    if(path == "index.html" || path == ""){
        AjaxCallBack("manga.json","GET","json",function(manga){
            saveLS("GotovaManga",manga);
            mangaIspisSest(manga);
        });
        navProba = ["","active","","","",""];
        let carousel = "";
        var navBaner = ["banner-item-01","banner-item-02","banner-item-03"];
        var navh4 = ["Best offer","Flash Deals","Last Minute"];
        var navh2 = ["New Arrivals On Sale","Get your best manga","Grab last minute deals"]
        for(let i = 0 ; i<navBaner.length ; i++){
            carousel += `
            <div class="${navBaner[i]}">
            <div class="text-content">
              <h4>${navh4[i]}</h4>
              <h2>${navh2[i]}</h2>
            </div>
            </div>
            `
        }
        document.querySelector("#carousel-js").innerHTML = carousel;
            
        var liName = ["Easy-to-navigate","Discounts","Frequent sales","Fast and reliable shipping"]
        let ulAbout = "";
        for(let i = 0 ; i<liName.length ; i++){
            ulAbout += `
                <li><a href="#" class="notclicable">${liName[i]}</a></li>
            `
        }
        document.querySelector("#ul-about").innerHTML = ulAbout;
    }


    else if(path == "manga.html"){
        navProba = ["","","active","","",""];
        AjaxCallBack("manga.json","GET","json",function(manga){
            mangaIspisSve(manga);
            let nesto = document.querySelectorAll(".kliknutiKorpa");
            console.log(nesto.length);
            var korpica = [];
            document.querySelectorAll(".kliknutiKorpa").forEach(button =>{
                button.addEventListener("click", function(){
                    let value = button.getAttribute('data-')
                    korpica.push(parseInt(value));
                    console.log(korpica)
                    saveLS("Korpa",korpica);
                })
            })
        });
        AjaxCallBack("mangaCat.json","GET","json",function(checkbox){
            checkBoxW(checkbox);
        })
        let sortValue = [1,2,3];
        let sortName = ["by Score","by Price","by Year"]
        let write = "<select id='sorting' name='sorting'><option value=0> SORT </option>";
        for(let i = 0 ; i<sortValue.length ; i++){
            write += `
                <option value="${sortValue[i]}">${sortName[i]}</option>
            `
        }
        write += "</select>"
        document.querySelector("#borderMangas").innerHTML = write;


    }


    else if(path == "about.html"){
        navProba = ["","","","active","",""];
        iconsPrint(["https://sr-rs.facebook.com","https://twitter.com","https://linkedin.com","sitemap.xml","dokumentacija.pdf"],["fa fa-facebook","fa fa-twitter","fa fa-linkedin","fa-solid fa-sitemap","fa-solid fa-file"], "#ul-about-us");
        AjaxCallBack("member.json","GET","json",function(member){
            teamMembersWrite(member);
        })
        let partnersImg = ["assets/images/client-01.png","assets/images/client-02.png","assets/images/client-04.png","assets/images/client-05.png","assets/images/client-06.png"];
        let partnersAlt = ["partner1","partner2","partner4","partner5","partner6"];
        let aboutWrite = "";
        for(let i = 0 ; i<partnersAlt.length ; i++){
            aboutWrite +=`
            <div class="client-item">
                <img src="${partnersImg[i]}" alt="${partnersAlt[i]}">
            </div>
            `
        }
        document.querySelector("#partnersAttach").innerHTML = aboutWrite;
  
    }


    else if(path == "contact.html"){
        navProba = ["","","","","active",""];
        iconsPrint(["https://sr-rs.facebook.com","https://twitter.com","https://linkedin.com","https://www.instagram.com"],["fa fa-facebook","fa fa-twitter","fa fa-linkedin","fa-brands fa-square-instagram"], "#checkOutIcon")
        
        if(reachLS("Korisnik")){
            let nesto = reachLS("Korisnik");
            formElementsText("col-md-6","inputEmail","Email","inputEmail","joedoe@gmail.com", nesto[0]);
            formElementsText("col-md-6","inputFullName","Full Name","inputFullName","Joe Doe", nesto[1]);
            formElementsText("col-12","inputAddress","Address","inputAddress","Joe Does 8", nesto[2]);
            formElementsText("col-12","inputAddress2","Address 2","inputAddress2","If you want. Not necessary",nesto[3]);
            formElementsText("col-md-6","inputCity","City","inputCity","Belgrade", nesto[4]);
            formDropDown("col-md-4","inputState","State","inputState",[1,2,3,4,5,6,7,8,9,10],["Serbia","Russia","China","Argentina","Germany","France","Italy","Spain","Poland","Japanese"]);
            formElementsText("col-md-2","inputZip","Zip","inputZip","", nesto[5]);
        }
        else{
            formElementsText("col-md-6","inputEmail","Email","inputEmail","joedoe@gmail.com");
            formElementsText("col-md-6","inputFullName","Full Name","inputFullName","Joe Doe");
            formElementsText("col-12","inputAddress","Address","inputAddress","Joe Does 8");
            formElementsText("col-12","inputAddress2","Address 2","inputAddress2","If you want. Not necessary");
            formElementsText("col-md-6","inputCity","City","inputCity","Belgrade");
            formDropDown("col-md-4","inputState","State","inputState",[1,2,3,4,5,6,7,8,9,10],["Serbia","Russia","China","Argentina","Germany","France","Italy","Spain","Poland","Japanese"]);
            formElementsText("col-md-2","inputZip","Zip","inputZip","");
        }
        var ch = "";
        ch = `
        <div class="col-12">
            <div class="displayForm">
                <label for="gridCheck">Remember me</label>
                <input type="checkbox" id="gridCheck" value="1"/>
            </div> 
        </div>
        `
        document.querySelector("#formAttach").innerHTML += ch;

        document.querySelector("#FORgetme").addEventListener("click", function(){
            localStorage.removeItem("Korisnik");
        });

        buttonFrom("col-12","Order");
        

        var Email,flname,Address,City,Zip,DropDown
        var reEmail,reflName,reAddress,reCity,reZip
        Email = document.querySelector("#inputEmail");
        flname = document.querySelector("#inputFullName");
        Address = document.querySelector("#inputAddress");
        City = document.querySelector("#inputCity");
        Zip = document.querySelector("#inputZip");
        DropDown = document.querySelector("#inputState");
        checkBoxCheck = document.querySelector("#gridCheck");

        reEmail = /^[a-z]+([\.]?[a-z]*[\d]*)*\@[a-z]+([\.]?[a-z]+)*(\.[a-z]{2,3})+$/;
        reflName = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})+$/;
        reAddress = /^[A-Za-z]+(?: [A-Za-z]+)? \d+$/;
        reZip = /^\d{5}$/;
        reCity =  /^[A-Za-z]+(?: [A-Za-z]+)*$/;

        emailMess = "Email was not typed correctly";
        flnameMess = "Name was not typed correctly";
        cityMess = "City was not typed correctly";
        addressMess = "City was not typed correctly";
        zipMess = "City was not typed correctly";
        dropDownMess = "Please select state";

        Email.addEventListener("blur", function(){
            formCheck(reEmail,Email,emailMess)
        });
        flname.addEventListener("blur", function(){
            formCheck(reflName,flname,flnameMess)
        })
        City.addEventListener("blur", function(){
            formCheck(reCity,City,cityMess)
        })
        Address.addEventListener("blur", function(){
            formCheck(reAddress,Address,addressMess)
        })
        Zip.addEventListener("blur", function(){
            formCheck(reZip,Zip,zipMess)
        })
        DropDown.addEventListener("change", function(){
            var drop = DropDown.options[DropDown.selectedIndex].value
            if(drop == "0"){
                DropDown.nextElementSibling.classList.remove("erorrs")
                DropDown.nextElementSibling.innerHTML = dropDownMess;
                DropDown.classList.add("warning");
            }
            else{
                DropDown.nextElementSibling.classList.add("erorrs")
                DropDown.nextElementSibling.innerHTML = "";
                DropDown.classList.remove("warning");
            }
        })

        document.querySelector("#buttonSend").addEventListener("click", function(){
            buttonFormCheck();
        })


    }
    else if(path == "author.html"){
        navProba = ["","","","","","active"];
    }
    else{
        navProba = ["active","","","","",""]
        
        let GotovaManga = reachLS("GotovaManga");
        let cartLS = reachLS("Korpa")
        let filtrirani;
        console.log(cartLS)
        if(cartLS != null){
            filtrirani = GotovaManga.filter((x) => {
                for(let i = 0 ; i < cartLS.length ; i++){
                    if(x.id === cartLS[i]){
                        return true;
                    }
                }
                return false
            })
            if(filtrirani.length > 3){
                document.querySelector(".positioning").classList.remove('positioning');
            }
            console.log(filtrirani);
            mangaIspisSveCart(filtrirani);
        }
        else{
            let message = `<h2 id="mess"> The cart is empty!!!</h2>`
            document.querySelector("#mangaispiscart").innerHTML = message;
        }
    }
    var navListHref = ["cart.html","index.html","manga.html","about.html","contact.html","author.html"];
    var navName = ["<i class='fa-solid fa-cart-shopping'></i>","Home","Manga","About us","Check out","Author"];
    var ispis ="";
    for(let i = 0 ; i<navListHref.length ; i++){
        ispis += `
            <li class="nav-item">
                <a class="nav-link ${navProba[i]}" href="${navListHref[i]}">${navName[i]}</a>
            </li>`
    }
    
    document.querySelector(".nakacitise").innerHTML = ispis;
    
    $(document).on("change","#sorting",change);
    $(document).on("click",".category",change);


}

function buttonFormCheck(){
    var Email,flname,Address,City,Zip,DropDown
    var reEmail,reflName,reAddress,reCity,reZip
    var erorrs = 0;
    var supp = 0;

    Email = document.querySelector("#inputEmail");
    flname = document.querySelector("#inputFullName");
    Address = document.querySelector("#inputAddress");
    City = document.querySelector("#inputCity");
    Zip = document.querySelector("#inputZip");
    DropDown = document.querySelector("#inputState");

    reEmail = /^[a-z]+([\.]?[a-z]*[\d]*)*\@[a-z]+([\.]?[a-z]+)*(\.[a-z]{2,3})+$/;
    reflName = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})+$/;
    reAddress = /^[A-Za-z]+(?: [A-Za-z]+)? \d+$/;
    reZip = /^\d{5}$/;
    reCity =  /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    emailMess = "Email was not typed correctly";
    flnameMess = "Name was not typed correctly";
    cityMess = "City was not typed correctly";
    addressMess = "Address was not typed correctly";
    zipMess = "Zip was not typed correctly";
    dropDownMess = "Please select state";

    erorrs += formCheck(reEmail,Email,emailMess);
    erorrs += formCheck(reflName,flname,flnameMess);
    erorrs += formCheck(reAddress,Address,addressMess);
    erorrs += formCheck(reCity,City,cityMess);
    erorrs += formCheck(reZip,Zip,zipMess);


    let statCheck = "";
    if(checkBoxCheck.checked){
        statCheck = checkBoxCheck.value;
    }

    var drop = DropDown.options[DropDown.selectedIndex].value
    if(drop == "0"){
        DropDown.nextElementSibling.classList.remove("erorrs")
        DropDown.nextElementSibling.innerHTML = dropDownMess;
        DropDown.classList.add("warning");
        supp = 1;
    }
    else{
        DropDown.nextElementSibling.classList.add("erorrs")
        DropDown.nextElementSibling.innerHTML = "";
        DropDown.classList.remove("warning");
        supp = 0;
    }

    erorrs += supp;
    if(!erorrs){
        let checkIfChecked = document.querySelector("#gridCheck");
        if(checkIfChecked.checked){
            let saveLocalStorage = [];
            $('.catchAll').each(function(x){
                saveLocalStorage.push($(this).val());
            })
            let selectDD = document.querySelector("#inputState");
            let selectOp = selectDD.options[selectDD.selectedIndex];
            let selectOpTx = selectOp.textContent;
            saveLocalStorage.push(selectOpTx);
            console.log(saveLocalStorage);
            saveLS("Korisnik",saveLocalStorage);

        }


        let print = document.querySelector("#nesto");
        print.setAttribute("class","alert alert-success mb-3");

        let prints = "The order was successfully executed";
        print.innerHTML = prints;
        document.getElementById("buttonSend");
        document.getElementById("formAttach").reset();
    }
    console.log(erorrs);
}

function formCheck(reg,element,mess){
    if(!reg.test(element.value)){
        element.nextElementSibling.classList.remove("erorrs")
        element.nextElementSibling.innerHTML = mess;
        element.classList.add("warning");
        return 1;
    }
    else{
        element.nextElementSibling.classList.add("erorrs")
        element.nextElementSibling.innerHTML = "";
        element.classList.remove("warning");
        return 0;
    }
}

function buttonFrom(divCol,buttonName){
    write = "";
    write +=`
        <div class="${divCol}">
            <input type="button" class="btn btn-primary" id="buttonSend" value="${buttonName}"/>
        </div>
        <p id="nesto"></p>
    `
    document.querySelector("#formAttach").innerHTML += write
}

function optionsForm(nizValue,nizName){
    write = "";
    for(i = 0 ; i<nizValue.length ; i++){
        write += `
            <option value="${nizValue[i]}">${nizName[i]}</option>
        `
    }
    console.log(write)
    return write;
}

function formDropDown(divCol,LabelFor,LabelName,Id,nizValue,nizName){
    write = "";
    write +=`
    <div class="${divCol}">
        <label for="${LabelFor}" class="form-label">${LabelName}</label>
        <select id="${Id}" class="form-select">
            <option value="0">Select</option>
            ${optionsForm(nizValue,nizName)}
        </select>
        <p class="alert alert-danger erorrs" id="margin-tops"></p>
    </div>
    `
    document.querySelector("#formAttach").innerHTML += write;
}

function formElementsText(divCol,LabelFor,LabelName,id,placeholder,val){
    write = "";
    if(reachLS("Korisnik")){
        write += `
        <div class="${divCol}">
            <label for="${LabelFor}" class="form-label">${LabelName}</label>
            <input type="text" class="form-control inputText catchAll" id="${id}" placeholder="${placeholder}" value="${val}"/>
            <p class="alert alert-danger erorrs"></p>
        </div>
        `
        document.querySelector("#formAttach").innerHTML += write;
    }
    else{
        write += `
        <div class="${divCol}">
            <label for="${LabelFor}" class="form-label">${LabelName}</label>
            <input type="text" class="form-control inputText catchAll" id="${id}" placeholder="${placeholder}"/>
            <p class="alert alert-danger erorrs"></p>
        </div>
        `
        document.querySelector("#formAttach").innerHTML += write;
    }
}

function teamMembersWrite(team){
    let write = "";
    for(let i of team){
        write += `
        <div class="col-md-4">
        <div class="team-member">
          <div class="thumb-container">
            <img src="${i.image.src}" alt="${i.image.alt}">
            <div class="hover-effect">
              <div class="hover-content">
                <ul class="social-icons">
                ${iconsPrintMembers(["https://sr-rs.facebook.com","https://twitter.com","https://linkedin.com"],["fa fa-facebook","fa fa-twitter","fa fa-linkedin"], "#ul-about-us")}
                </ul>
              </div>
            </div>
          </div>
          <div class="down-content">
            <h4>${i.name}</h4>
            <span>${i.job}</span>
          </div>
        </div>
      </div>
        `
    }
    // console.log(write);
    document.querySelector("#attachTeam").innerHTML += write;
}

function iconsPrint(iconHref,iconType,attach){
    let write = "";
    for(let i = 0 ; i<iconHref.length ; i++){
        write += `
            <li><a href="${iconHref[i]}"><i class="${iconType[i]}"></i></a></li>
        `
    }
    document.querySelector(attach).innerHTML = write;
}

function iconsPrintMembers(iconHref,iconType){
    let write = "";
    for(let i = 0 ; i<iconHref.length ; i++){
        write += `
            <li><a href="${iconHref[i]}"><i class="${iconType[i]}"></i></a></li>
        `
    }
    return write;
}


function checkBoxW(mangaCat){
    let write = "<div id='divWidth'>"
    for(let i of mangaCat){
        write += `
        <label for="${i.mangaCatName}">${i.mangaCatName}</label>
        <input type="checkbox" name="${i.mangaCatName}" class="category marginright" value="${i.mangaCat}"/>
        `
    }
    write += "</div>"
    document.querySelector("#borderMangas").innerHTML += write
}

function change(){
    let proizvodi = reachLS("GotovaManga");
    proizvodi = sort(proizvodi);
    proizvodi = filter(proizvodi);
    mangaIspisSve(proizvodi);
}

function filter(mangaOri){
    let ChoosedGenres = [];
    $('.category:checked').each(function(x){
        ChoosedGenres.push(parseInt($(this).val()));
    })
    $('#mangaispis').fadeOut(300)
    // console.log(ChoosedGenres);
    if(ChoosedGenres.length != 0){
        $('#mangaispis').fadeIn(300)
        return mangaOri.filter(x => x.genreCat.some(y => ChoosedGenres.includes(y)));    
    }
    $('#mangaispis').fadeIn(500)
    return mangaOri
}

function sort(mangaOri){
    let sortManga = [];
    let choosed = $("#sorting").val();
    // console.log(choosed);
    if(choosed == 0){
        sortManga = mangaOri;
    }
    else{
        // console.log(mangaOri);
        sortManga = mangaOri.sort(function(a,b){
            if(choosed == 1){
                if(a.score > b.score){
                    return 1;
                }
                else if(a.score < b.score){
                    return -1;
                }
                else{
                    return 0;
                }
            }
            if(choosed == 2){
                if(a.price > b.price){
                    return -1;
                }
                else if(a.price < b.price){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            if(choosed == 3){
                if(a.relaseDate > b.relaseDate){
                    return 1;
                }
                else if(a.relaseDate < b.relaseDate){
                    return -1;
                }
                else{
                    return 0;
                }
            }
        })
    }
    return sortManga;
}

function saveLS(name,value){
    localStorage.setItem(name,JSON.stringify(value));
}

function reachLS(name){
    return JSON.parse(localStorage.getItem(name));
}

$(document).ready(function(){
    $("#back-Top").hide();

    $(window).scroll(function(){
        if ($(this).scrollTop() > 500) {
            $("#back-Top").fadeIn("slow");
          } else {
            $("#back-Top").fadeOut("slow");
          }
    });
    $("#back-Top").click(function(){
        $("html").animate({
            scrollTop: 0
        }, 500)
    });
});

function newItem(status){
    let ispis ="";
    if(status){
        ispis += "<div class='new'><p>NEW</p></div>"
    }
    return ispis
}

function ispisZanrova(zanrovi){
    let ispis ="";
    for(let i of zanrovi){
        ispis += ` ${i.genre} `
    }
    return ispis;
}

function discountCheck(di,pr){
    let ispis = "";
    if(di == null){
        ispis += `<p class="font-weight">&euro;&nbsp;&nbsp;${pr}</p>`
    }
    else{
        ispis += `
        <p class="old-price">&euro;&nbsp;&nbsp;${pr}</p>
        <p class="font-weight">&euro;&nbsp;&nbsp;${di}</p>`
    }
    return ispis;
}

function mangaIspisSest(Manga){
    let ispis = "";
    let br=0;
    for(let i of Manga){
        if(i.relaseStatus){
           ispis += `
            <div class="col-lg-4 col-md-6 col-12 resp">
                <div class="flexing spacing">
                    <div class="new"><p>NEW</p></div>
                    <img class="img-size" src="${i.image.src}" alt="${i.image.alt}">
                    <div class="info">
                    <h6>${i.name}</h6>
                    <p class="font-weight year">${i.relaseDate}</p>
                    <p><span class="colorSpan">Genre:</span>${ispisZanrova(i.genres)}</p>
                    <p><span class="colorSpan">Author:</span> ${i.author}</p>
                    <p><i class="fa-solid fa-star sr"></i>${i.score}</p>
                    <div class="displayFlex">
                    <p class="old-price">&euro;&nbsp;&nbsp;${i.price}</p>
                    <p class="font-weight">&euro;&nbsp;&nbsp;${i.discount}</p>
                    </div>
                </div>
                </div>
            </div>
            `
            br++;
            if(br==6) break;
        }
    }
    document.querySelector("#ispis").innerHTML = ispis;
}

// ISPISIVANJE SVIH MANGI
function mangaIspisSve(manga){
    var ispis = "";
    for(let i of manga){
        ispis += `
        <div class="col-lg-4 col-md-6 col-12 resp">
            <div class="flexing spacing">
                ${newItem(i.relaseStatus)}
                <img class="img-size" src="${i.image.src}" alt="${i.image.alt}">
                <div class="info">
                <h6>${i.name}</h6>
                <p class="font-weight year">${i.relaseDate}</p>
                <p><span class="colorSpan">Genre:</span>${ispisZanrova(i.genres)}</p>
                <p><span class="colorSpan">Author:</span>${i.author}</p>
                <p><i class="fa-solid fa-star"></i>${i.score}</p>
                <div class="displayFlex">
                ${discountCheck(i.discount,i.price)}
                </div>
                <div id="centriranje"><input type="button" data-="${i.id}" name="buttonCard" value="Add to cart" class="kliknutiKorpa btn btn-primary buttonCart"/></div>
            </div>
            </div>
        </div>
        `
    }
    document.querySelector("#mangaispis").innerHTML = ispis;
}

function mangaIspisSveCart(manga){
    var ispis = "";
    for(let i of manga){
        ispis += `
        <div class="col-lg-4 col-md-6 col-12 resp">
            <div class="flexing spacing">
                ${newItem(i.relaseStatus)}
                <img class="img-size" src="${i.image.src}" alt="${i.image.alt}">
                <div class="info">
                <h6>${i.name}</h6>
                <p class="font-weight year">${i.relaseDate}</p>
                <p><span class="colorSpan">Genre:</span>${ispisZanrova(i.genres)}</p>
                <p><span class="colorSpan">Author:</span>${i.author}</p>
                <p><i class="fa-solid fa-star"></i>${i.score}</p>
                <div class="displayFlex">
                ${discountCheck(i.discount,i.price)}
                </div>
                <div id="centriranje"><input type="button" data-="${i.id}" name="buttonCard" value="Remove" class="kliknutiKorpa btn btn-primary buttonCart"/></div>
            </div>
            </div>
        </div>
        `
    }
    document.querySelector("#mangaispiscart").innerHTML = ispis;
}