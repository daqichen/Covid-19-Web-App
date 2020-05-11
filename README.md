# Covid-19-Web-App
Using Google App Script
### 1. [Coronavirus COVID19 API](https://covid19api.com/)
Using ```UrlFetchApp()``` to access ["Live By Country And Status (e.g. South Africa)"](https://api.covid19api.com/live/country/south-africa/status/confirmed) data from the API
### [Online access to this project](https://script.google.com/macros/s/AKfycbz1zs6qjsGeOnOr1Y1InV_2FedzecxsCV9pSiGs_kZlEVikwEug/exec)

### 2. [JavaScript code](https://github.com/daqichen/Covid-19-Web-App/blob/master/Code.gs)
a. Function,```fetchCovidData(country, province)```, takes in the country name and look up the "Slug" name for directing to specific API site.

b. Then parse the retrieved data in JSON into a 2D array, or "chart"
 
### 3. [HTML code](https://github.com/daqichen/Covid-19-Web-App/blob/master/interactive.html)
a. Within <script> </script>, Call function ```fetchCovidData()``` using ```google.script.run()```

b. When Success: Use SuccessHandler and convert the resulting 2D Array into html table
```
var result = "<table>";
for(var i=0; i<chart.length; i++) {
   result += "<tr>";
   for(var j=0; j<chart[i].length; j++){
     result += "<td>"+chart[i][j]+"</td>";
   }
   result += "</tr>";
   }
result += "</table>";
          
```
