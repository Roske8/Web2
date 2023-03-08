function AjaxCallBack(url,method,data,manga){
    $.ajax({
        url: "assets/data/" + url,
        method: method,
        dataType: data,
        success: manga,
        error: function(jqXHR, exception){
            // console.log(jqXHR);
            var msg = '';
            if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
            msg = 'Time out error.';
            } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
            } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
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
        navProba = ["active","","",""];
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
        navProba = ["","active","",""];
        AjaxCallBack("manga.json","GET","json",function(manga){
            mangaIspisSve(manga);
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
        navProba = ["","","active",""];
        iconsPrint(["https://sr-rs.facebook.com","https://twitter.com","https://linkedin.com","sitemap.xml","dokumentacija.pdf"],["fa fa-facebook","fa fa-twitter","fa fa-linkedin","fa-solid fa-sitemap","fa-solid fa-file"], "#ul-about-us");
        AjaxCallBack("member.json","GET","json",function(member){
            teamMembersWrite(member);
        })
  
    }


    else{
        navProba = ["","","","active"];
    }

    var navListHref = ["index.html","manga.html","about.html","contact.html"];
    var navName = ["Home","Manga","About us","Check out"];
    
    var ispis ="";
    for(let i = 0 ; i<navListHref.length ; i++){
        ispis += `
            <li class="nav-item">
                <a class="nav-link ${navProba[i]}" href="${navListHref[i]}">${navName[i]}</a>
            </li>`
    }
    
    document.querySelector("#nakacitise").innerHTML = ispis;
    
    $(document).on("change","#sorting",change);
    $(document).on("click",".category",change);


};

function teamMembersWrite(team){
    console.log(team);
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
    console.log(write);
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
    console.log(ChoosedGenres);
    if(ChoosedGenres.length != 0){
        return mangaOri.filter(x => x.genreCat.some(y => ChoosedGenres.includes(y)));
    }
    return mangaOri;
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
                    <div id="centriranje"><input type="button" name="buttonCard" value="Add to cart" class="btn btn-primary buttonCart"></div>
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
                <div id="centriranje"><input type="button" name="buttonCard" value="Add to cart" class="btn btn-primary buttonCart"></div>
            </div>
            </div>
        </div>
        `
    }
    document.querySelector("#mangaispis").innerHTML = ispis;
}

// LOCAL STORAGE  SVIM BUTTONIMA DAJEM KLASU I ISTO RADIM KAO SA CHECK BOXOVIMA NA CLICK I PREKO QUERY SELECT SA THISI UBACUJEM U NIZ GDE CE BITI LOCALSTORAGE