var meh = function () {
	var data = window.location.search.substring(1).split("&"), newData = {};
	for (var i = 0; i < data.length; i++) {
    		var workingVar = data[i].split("=");
    		var varName = workingVar[0];
    		var dataVal = workingVar[1];
    		newData[varName] = dataVal;
	} 
	console.log(newData)
}