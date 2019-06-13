window.addEventListener("load", function(){
    loadPage()
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
    textEle.textContent = pageName;
    imgEle.style.backgroundImage = "url('" + randomImagePath + "')";
    setTimeout(function(){
        textEleCont.classList.add("topTextOpen")
    }, 750)
}
var currentTheme = "light"
function toggleTheme() {
    var ele = document.getElementById("cssTheme");
    var newTheme;
    if (currentTheme == "light") {
        newTheme = "dark";
    }
    else if (currentTheme == "dark") {
        newTheme = "light";
    }
    currentTheme = newTheme;
    ele.href = distanceFromHome + "css/" + newTheme + ".css"
}

function buttonPress(btnID) {
    addClassDelay(btnID, "buttonSelected", 250);
}
function addClassDelay(id, className, delay) {
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
            var location = document.getElementById(btn).dataset.page,
                section = document.getElementById(location).offsetTop - 10;
            window.scrollTo(0, section);
        }
    }, delay)
}