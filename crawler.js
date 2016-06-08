var Crawler = require("crawler");
var url = require('url');
var $ = require("jquery");
var fs = require('fs');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {

        if(result){
            var html = $.parseHTML(result.body);
            var d= $(html).find( '.schoolDescription' );
            var a= $(html).find( '.schoolDetail' );
            var i,b,c;
            var saved="[\n";
            for (i = 0; i < a.length; i++){
                console.log(i);
                var alpha=i.toString();
                saved+='{ '
                b=(a[alpha].children)
                c=((b[1].children)[1].children)[0].data;
                console.log("name: "+c.trim());
                saved+="name: \""+c.trim()+"\",\n";

                console.log("address: "+((b[5].children)[1].data).trim());
                saved+="address: \""+((b[5].children)[1].data).trim()+"\",\n";

                console.log("board: "+(((b[7].children)[2].children)[0].data).trim());
                saved+="board: \""+(((b[7].children)[2].children)[0].data).trim()+"\",\n";

           //  if(i!=16)  {
                console.log("medium: "+((((b[7].children)[2].children)[1].children)[0].data).trim());
                saved+="medium: \""+((((b[7].children)[2].children)[1].children)[0].data).trim()+"\",\n";
           //}

                b=(d[alpha].children);
                console.log("description: "+(b[0].data).trim());
                saved+="description: \""+(b[0].data).trim()+"\"\n";

                console.log('\n');
                if(i!=(a.length-1))
                saved+='},\n';
            }
             saved+="}\n]";
            fs.writeFile("./folder/locality.txt", saved, function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            });
      }
  }
});
// Queue just one URL, with default callback
c.queue('https://www.urbanpro.com/bangalore/schools');

/*
URL Required for fetching data
1: https://www.urbanpro.com/bangalore/schools [for current locality]

Location wise
2: https://www.urbanpro.com/bangalore/schools/j-p-nagar
3: https://www.urbanpro.com/bangalore/schools/vijaynagar
4: https://www.urbanpro.com/bangalore/schools/r-t-nagar
5: https://www.urbanpro.com/bangalore/schools/banashankari
6: https://www.urbanpro.com/bangalore/schools/bannerghatta-road
7: https://www.urbanpro.com/bangalore/schools/basavanagudi
8: https://www.urbanpro.com/bangalore/schools/malleswaram
9: https://www.urbanpro.com/bangalore/schools/banaswadi
10: https://www.urbanpro.com/bangalore/schools/jayanagar
11: https://www.urbanpro.com/bangalore/schools/rajajinagar
12: https://www.urbanpro.com/bangalore/schools/koramangala
13: https://www.urbanpro.com/bangalore/schools/basaveshwara-nagar
14: https://www.urbanpro.com/bangalore/schools/banashankari-3rd-stage
15: https://www.urbanpro.com/bangalore/schools/yelahanka
16: https://www.urbanpro.com/bangalore/schools/frazer-town

Other categories
17: https://www.urbanpro.com/bangalore/icse-schools
18: https://www.urbanpro.com/bangalore/international-schools
19: https://www.urbanpro.com/bangalore/state-board-schools
20: https://www.urbanpro.com/bangalore/pre-schools
21: https://www.urbanpro.com/bangalore/montessori-schools
22: https://www.urbanpro.com/bangalore/residential-schools
23: https://www.urbanpro.com/bangalore/day-schools
24: https://www.urbanpro.com/bangalore/cbse-schools
25: https://www.urbanpro.com/bangalore/igcse-schools
26: https://www.urbanpro.com/bangalore/play-schools
27: https://www.urbanpro.com/bangalore/kindergarten-schools
28: https://www.urbanpro.com/bangalore/ib-schools
29: https://www.urbanpro.com/bangalore/boarding-schools

*/


