function doGet() {
  return HtmlService.createHtmlOutputFromFile("interactive");
}

function fetchCovidData(country, province){
  
  var countryPool = UrlFetchApp.fetch("https://api.covid19api.com/countries");
  var pool = JSON.parse(countryPool.getContentText());
  // Logger.log(pool);
  
  // Check to see the country input is valid
  for (i in pool) {
    if (pool[i]['Slug'] === country){
      var response = UrlFetchApp.fetch("https://api.covid19api.com/live/country/" +country+ "/status/confirmed");
    }
  }
  
  // Give warning for invalid input
  if(response === undefined){
    return "Please check and make sure the country name is valid";  
  } 
  
  //Now parse the live data
  var content = response.getContentText();
  var fullJson = JSON.parse(content);
  
 // Make a list for the specific province
 var list = [];
 for(i in fullJson){
   if(fullJson[i]['Province'] === province){
     list.push(fullJson[i]);
   }
 }
  
 // Give warning for invalid input
 if(list[0] === undefined && province !== "all"){
    return "Please check and make sure the province/state name is valid, put 'all' to view data of the entire country";
   
 } else {
  // If there is a valid province, the work begins
   var chart = [];
   var temp = country.split("-");
   if (temp[1] !== undefined){
     var temp1 = temp[0].charAt(0).toUpperCase()+temp[0].slice(1);
     var temp2 = temp[1].charAt(0).toUpperCase()+temp[1].slice(1);
     chart[0] = [temp1+" "+temp2, province];
   } else {
     var temp1 = temp[0].charAt(0).toUpperCase()+temp[0].slice(1);
     chart[0] = [temp1, province];
   }
   chart[1] = ['Confirmed','Deaths','Active','Date'];
   for (i in list){
     chart.push([list[i]['Confirmed'],list[i]['Deaths'],list[i]['Active'],reformat(list[i]['Date'])]);
   }   
 }
  
 return chart;
}

function reformat(sth) {
  var temp = sth.split("T");
  return temp[0];
}

//function makeTableHTML() {
//    var myTableDiv = document.getElementById("myTable");
//    var table = document.createElement('TABLE');
//    table.border='1';
//    
//    var tableBody = document.createElement('TBODY');
//    table.appendChild(tableBody);
//      
//    for (var i=0; i<3; i++){
//       var tr = document.createElement('TR');
//       tableBody.appendChild(tr);
//       
//       for (var j=0; j<4; j++){
//           var td = document.createElement('TD');
//           td.width='75';
//           td.appendChild(document.createTextNode("Cell " + i + "," + j));
//           tr.appendChild(td);
//       }
//    }
//    myTableDiv.appendChild(table);
//}
