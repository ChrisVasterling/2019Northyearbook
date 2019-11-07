window.addEventListener("load", function(){
    loadPage()
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
        imgEle = document.getElementById("topImg"),
        randomImageIndex = randInt(0, randomImages.length-1),
        randomImagePath = randomImages[randomImageIndex];
    imgEle.style.backgroundImage = "url('" + randomImagePath + "')";
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
var currentTheme = "dark"
var shortBtnDelay = 250;
function toggleTheme() {
    var ele = document.getElementById("cssTheme");
    var newTheme;
    togClassDelay("cssThemeTog", "buttonSelected", shortBtnDelay)
    if (currentTheme == "light") {
        newTheme = "dark";
    }
    else if (currentTheme == "dark") {
        newTheme = "light";
    }
    currentTheme = newTheme;
    setTimeout(function(){
        ele.href = distanceFromHome + "css/" + newTheme + ".css";
    }, shortBtnDelay)
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
    togClassDelay(btnID, "buttonSelected", shortBtnDelay);
    var page = distanceFromHome + document.getElementById(btnID).dataset.pagefromroot;
    JSLink("external", page, shortBtnDelay*2)
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