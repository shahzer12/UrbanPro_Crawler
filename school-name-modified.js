var fs = require('fs'),
  knex = require('knex')({
    client: 'mysql',
    connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'hello',
    database: 'schooper_test'}
  }),
  object = {},
  skip_schools = ["Hello Kids"],
  name, modify_name, mk, school_id,
  getHashcode = function (str) {
    'use strict';

    return Math.abs(str.split('')
      .reduce(function (a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0));
  };


fs.readFile('./Crawler_for_schools/final.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  object = JSON.parse(data);
  for(area in object) {

    for(var i = 0; i < object[area].length; i++){

      name = (object[area])[i].name;
      if (name.startsWith(skip_schools[0])) {
        mk = name.split('-');
        modify_name =  mk[0] + '(' + mk[1] + ')';
      } else {
        if (name.indexOf('(') >= 0) {
          modify_name = name.substring(0,name.indexOf('(')-1)
        } else if (name.indexOf('-') >= 0){
          modify_name = name.substring(0,name.indexOf('-')-1)
        } else if (name.indexOf(',') >= 0){
          modify_name = name.substring(0,name.indexOf(','))
        } else {
           modify_name = name;
         }
      }

      school_id = getHashcode (modify_name + Date.now());

      knex('schools').insert({
        area: area,
        name: modify_name,
        address: (object[area])[i].address,
        board: (object[area])[i].board,
        medium: (object[area])[i].medium,
        description: (object[area])[i].description,
        id: school_id

      })
     .then(function (ret) {
       //cb(ret);
      })
      .catch(function (error) {
        //cb(error);
      });

    }
  }

});


