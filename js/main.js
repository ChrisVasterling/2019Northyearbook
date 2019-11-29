window.addEventListener("load", function(){
    loadPage()
    if (getCookie("theme") == "") {
        setCookie("theme", "dark", 360);
    }
    setTheme(getCookie("theme"));
})
window.addEventListener("resize", function(){
    setTopContBox()
})
function randInt(low, high) {
    var origin = high - low;
    var number = Math.floor(Math.random()*(origin+1)) + low;
    return number
}
function loadPage() {
    var textEleCont = document.getElementById("topTextCont"),
        textEle = document.getElementById("topText"),
        imgEle = document.getElementById("topImg");
    
    /*var randomImageIndex = randInt(0, randomImages.length-1),
        randomImagePath = randomImages[randomImageIndex];*/
    imgEle.style.backgroundImage = "url('" + distanceFromHome + "media/background1.jpg" + "')";
    setTopContBox()
    if (textEle != null) {
        textEle.textContent = pageName;
        setTimeout(function(){
            textEleCont.classList.add("topTextOpen")
        }, 750)
    }
}
function setTopContBox() {
    // sets the size of the box that fills up the rest of
    // the area in the top
    var topConBx = document.getElementById("topContentBox"),
        navBarHeight = document.getElementById("navBar").offsetHeight;
    topConBx.style.top = navBarHeight + "px"
    topConBx.style.height = "calc(100% - " + navBarHeight + "px)"
}

var shortBtnDelay = 250;
function toggleTheme() {
    var newTheme;
    togClassDelay("cssThemeTog", "buttonSelected", shortBtnDelay)
    if (getCookie("theme") == "light") {
        newTheme = "dark";
    }
    else if (getCookie("theme") == "dark") {
        newTheme = "light";
    }
    setTimeout(function(){
        setTheme(newTheme)
    }, shortBtnDelay)
}
function setTheme(theme) {
    var ele = document.getElementById("cssTheme");
    ele.href = distanceFromHome + "css/" + theme + ".css";
    setCookie("theme", theme, 360);
}
function backToTop(btnID) {
    var ele = document.getElementById(btnID);
    togClassDelay(btnID, "buttonSelected", shortBtnDelay);
    setTimeout(function(){
        window.scrollTo(0,0)
    }, shortBtnDelay)
}
function goHome(btnID) {
    var ele = document.getElementById(btnID);
    togClassDelay(btnID, "buttonSelected", shortBtnDelay);
    var page = distanceFromHome + "index.html"
    JSLink("external", page, shortBtnDelay*2)
}
function togClassDelay(id, className, delay) {
    var ele = document.getElementById(id);
    ele.classList.add(className)
    setTimeout(function(){
        ele.classList.remove(className)
    }, delay)
}
function JSLink(IntExt, page, delay) {
    setTimeout(function(){
        if (IntExt.toLowerCase() == 'external') {
            window.open(page, "_self")
        } else if (IntExt.toLowerCase() == 'newtab') {
            window.open(page, "_blank")
        } else if (IntExt.toLowerCase() == 'back') {
            window.history.back()
        } else if (IntExt.toLowerCase() == 'internal') {
            var location = document.getElementById(btn).dataset.innerpage,
                section = document.getElementById(location).offsetTop - 10;
            window.scrollTo(0, section);
        }
    }, delay)
}



function LinkViaBtn(btnID) {
    // when a button is pressed
    
    togClassDelay(btnID, "buttonSelected", shortBtnDelay);
    var page = distanceFromHome + document.getElementById(btnID).dataset.pagefromroot;
    JSLink("external", page, shortBtnDelay*2)
}
function LinkViaImg(btnID) {
    // when an image is pressed
    togClassDelay(btnID, "buttonSelected", shortBtnDelay);
    var page = distanceFromHome + document.getElementById(btnID).dataset.pagefromroot;
    JSLink("newtab", page, shortBtnDelay*2)
}

var menuOpen = false;
function toggleMenu(eleID) {
    var togBtn = document.getElementById("eleID"),
        mnu = document.getElementById("menu"),
        cvr = document.getElementById("cover"),
        delay = 0;
    if (eleID == "navBarMenuToggle") {
        togClassDelay("navBarMenuToggle", "buttonSelected", shortBtnDelay)
        delay = shortBtnDelay*2
    }
    setTimeout(function(){
        
        if (menuOpen) {
            mnu.classList.remove("menuOpen")
            cvr.classList.remove("coverOpen")
        } else {
            mnu.classList.add("menuOpen")
            cvr.classList.add("coverOpen")
        }
        // toggle the menu state
        menuOpen = !menuOpen
    }, delay)
}


function loadYBPages(firstPage, lastPage) {
    loadImages("media/pages/", firstPage, lastPage, "_small.jpg")
}
function loadImages(pathFromRoot, first, last, suffix) {
    var root = document.getElementById("ybImgs");
    for (i=first; i <= last; i++) {
        var wrapper = document.createElement("button"),
            borderWrapper = document.createElement("div"),
            b1 = document.createElement("div"),
            b2 = document.createElement("div"),
            b3 = document.createElement("div"),
            b4 = document.createElement("div"),
            cover = document.createElement("div"),
            contentWrapper = document.createElement("div"),
            ybImg = document.createElement("img"),
            ybImgPath = distanceFromHome + pathFromRoot;
        
        wrapper.setAttribute("class", "mainButton ybButton");
        wrapper.setAttribute("id", "ybImage" + i);
        wrapper.setAttribute("onclick", "LinkViaImg(this.id)");
        wrapper.setAttribute("data-pagefromroot", pathFromRoot + i + ".jpg");
        
        borderWrapper.setAttribute("class", "buttonBorder");
            
        cover.setAttribute("class", "ybImgCover");
        
        contentWrapper.setAttribute("class", "buttonContent");
        
        ybImg.setAttribute("class", "ybImg");
        ybImg.setAttribute("src", ybImgPath + i + suffix);
        
        
        if (pathFromRoot == "media/submitted/student/") {
            // add overlay information on cover
            var infoBar = document.createElement("div"),
                imageData = submittedMetadata[i],
                information = "",
                imageNote = imageData["notes"],
                imageNames = imageData["names"],
                imageEvents = imageData["event"],
                imageEvent = "";
            
            wrapper.classList.add("ybButtonSubmitted");
            
            infoBar.setAttribute("class", "ybImgInfoBar")
            if (imageNote == "") {
                imageNote = "Submitted by: Unknown"
            }
            information = information.concat(imageNote, "<br/><br/>");
            
            
            for (k=0; k < imageNames.length; k++) {
                // looping through rows
                information = information.concat("Row ", k+1, ": ")
                for (l=0; l < imageNames[k].length; l++) {
                    information = information.concat(imageNames[k][l][0], " ", imageNames[k][l][1], ", ")
                }
                information = information.concat("<br/><br/>")
            }
            
            
            
            if (imageEvents[1].toLowerCase() != "unknown") {
                imageEvent = imageEvents[1];
            } else if (imageEvents[0].toLowerCase() != "unknown") {
                imageEvent = imageEvents[0];
            }
            
            
            if (imageEvent != "") {
                information = information.concat("Event: ", imageEvent, "<br/>")
            }
            if (imageData["date"].toLowerCase() != "unknown") {
                information = information.concat("Date: ", imageData["date"], "<br/>")
            }
            
            infoBar.innerHTML = information;
        }
        
        contentWrapper.appendChild(ybImg);
        
        if (pathFromRoot == "media/submitted/student/") {
            contentWrapper.appendChild(infoBar);
        }
        
        borderWrapper.appendChild(b1);
        borderWrapper.appendChild(b2);
        borderWrapper.appendChild(b3);
        borderWrapper.appendChild(b4);
        
        
        
        wrapper.appendChild(cover);
        
        wrapper.appendChild(borderWrapper);
                
        wrapper.appendChild(contentWrapper)
        
        root.appendChild(wrapper);
    }
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}













