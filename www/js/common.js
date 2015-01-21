function standardJsonFormat(jsonObj)
{
	var result = [];
	angular.forEach(jsonObj.DATA, function(rowValue, rowNum){
		var row = new Object();

		angular.forEach(jsonObj.COLUMNS, function(colName, position){
			row[colName.toLowerCase()] = rowValue[position];
		});
		result.push(row);
	});
	return result;
}
