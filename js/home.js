window.addEventListener("load", function() {
    loadSeasonSectionPreviews();
})
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
            "fallItemABk" : [18, 33],
            "fallItemPBk" : [42, 107],
            "fallItemSLBk" : [8, 15],
            "fallItemDNCBk" : [4, 7],
            "fallItemGPBk" : [34, 39],
            "winItemABk" : [110, 125],
            "winItemSLBk" : [130, 131],
            "winItemDNCBk" : [126, 129],
            "winItemGPBk" : [134, 139],
            "sprItemABk" : [142, 153],
            "sprItemSLBk" : [160, 165],
            "sprItemDNCBk" : [166, 167],
            "sprItemGPBk" : [154, 159]
    };
    for (var i in seasonSections) {
        page = randInt(seasonSections[i][0], seasonSections[i][1])
        var ele = document.getElementById(i), 
            imageData = "url('" + distanceFromHome + "media/pages/" + page + "_small.jpg')"
        ele.style.backgroundImage = imageData;
    }
}