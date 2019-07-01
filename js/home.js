window.addEventListener("load", function() {
    loadSeasonSectionPreviews()
    assignSeasonImgs()
})
function viewSeasonImg(btnID) {
    var ele = document.getElementById(btnID)
    buttonPress(btnID)
    JSLink("newtab", ele.dataset.page, 250)
}

function assignSeasonImgs() {
    // update with actual ranges
    var pages,
        seasons = {
            "fall" : [[2, 3], ["fallPreview1", "fallPreview2"]],
            "winter" : [[2, 3], ["winterPreview1", "winterPreview2"]],
            "spring" : [[2, 3], ["springPreview1", "springPreview2"]]
        };
    
    for (var s in seasons) {
        pages = choosePages(seasons[s][0], seasons[s][1].length);
        for (var p in pages) {
            // change src attribute value to actual filepath
            var ele = document.getElementById(seasons[s][1][p]),
                attribData = "media/testing/" + pages[p] + "_small.jpg";
            ele.setAttribute("src", attribData)
        }
    }
}
function choosePages(range, length) {
    /*
        in order to not repeat: 
        value of range[1] - range[0] + 1 must be 
        equal to or less than length
    */
    // chooses randmon numbers from the range until
    // an array of size length is full
    var chosenPages = [],
        pageNum = null;
    while (chosenPages.length < length) {
        pageNum = randInt(range[0], range[1]);
        if (chosenPages.indexOf(pageNum) == -1) {
            chosenPages.push(pageNum);
        }
    }
    return chosenPages
}

function loadSeasonSectionPreviews() {
    var page, 
        seasonSections = {
        "fallItem11Bk" : [1, 2],
        "fallItem12Bk" : [3, 4],
        "fallItem21Bk" : [5, 6],
        "fallItem22Bk" : [7, 8],
        "fallItem23Bk" : [9, 10]
    };
    /*
        seasonSections:
        key is id of element
        2 digit number is row + column
        21 is row two first item
    */
    for (var i in seasonSections) {
        page = randInt(seasonSections[i][0], seasonSections[i][1])
        var ele = document.getElementById(i), 
            imageData = "url('" + distanceFromHome + "media/testing/" + page + "_small.jpg')"
        ele.style.backgroundImage = imageData
    }
}

function seasonItemOpen(btnID) {
    var aniDur = 400;
    addClassDelay(btnID, "seasonSectionRowItemSelected", aniDur);
    var page = document.getElementById(btnID).dataset.page;
    JSLink("external", page, aniDur)
}