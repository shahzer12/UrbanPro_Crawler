var Crawler = require("crawler");
var url = require('url');
var $ = require("jquery");
var fs = require('fs');
var final_object={};
var c = new Crawler({
    maxConnections : 50,
    // This will be called for each crawled page
    callback : function (error, result, $) {

        if(result){

          var uri=result.uri.split('/'),
            name=uri[uri.length-1],
            html = $.parseHTML(result.body),
            d= $(html).find( '.schoolDescription' ),
            a= $(html).find( '.schoolDetail' ),
            arr=[],
            obj,i,b,c;
          if(name == "schools"){
            name="locality";
          }

          for (i = 0; i < a.length; i++){
            obj={};
            var alpha=i.toString();

            b=(a[alpha].children)
            try {
              c=((b[1].children)[1].children)[0].data;
              obj.name=c.trim();
            }
            catch(err) {
               obj.name="";
            }

            try {
              obj.address=((b[5].children)[1].data).trim()
            }
            catch(err) {
              obj.address="";
            }

            try {
               obj.board=(((b[7].children)[2].children)[0].data).trim();
            }
            catch(err) {
              obj.board="";
            }

            try {
              obj.medium=((((b[7].children)[2].children)[1].children)[0].data).trim();
            }
            catch(err){
              obj.medium="";
            }

            try {
              b=(d[alpha].children);
              obj.description=(b[0].data).trim();
            }
            catch(err) {
                obj.description="";
            }

            arr.push(obj);
          }

          final_object[name]=arr;

          fs.writeFile("./schools/"+name+".json", JSON.stringify(arr), function(err) {
            if(err) {
              return console.log(err);
            }
             console.log("The file was saved!");
          });

          fs.writeFile("./schools/final.json", JSON.stringify(final_object), function(err) {
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
c.queue('https://www.urbanpro.com/bangalore/schools/j-p-nagar');
c.queue('https://www.urbanpro.com/bangalore/schools/vijaynagar');
c.queue('https://www.urbanpro.com/bangalore/schools/r-t-nagar');
c.queue('https://www.urbanpro.com/bangalore/schools/banashankari');
c.queue('https://www.urbanpro.com/bangalore/schools/bannerghatta-road');
c.queue('https://www.urbanpro.com/bangalore/schools/basavanagudi');
c.queue('https://www.urbanpro.com/bangalore/schools/malleswaram');
c.queue('https://www.urbanpro.com/bangalore/schools/banaswadi');
c.queue('https://www.urbanpro.com/bangalore/schools/jayanagar');
c.queue('https://www.urbanpro.com/bangalore/schools/rajajinagar');
c.queue('https://www.urbanpro.com/bangalore/schools/koramangala');
c.queue('https://www.urbanpro.com/bangalore/schools/basaveshwara-nagar');
c.queue('https://www.urbanpro.com/bangalore/schools/banashankari-3rd-stage');
c.queue('https://www.urbanpro.com/bangalore/schools/j-p-nagar');
c.queue('https://www.urbanpro.com/bangalore/schools/frazer-town');

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


