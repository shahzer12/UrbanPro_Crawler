fs = require('fs');
var knex = require('knex')({
  client: 'mysql',
  connection: {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'school_practice'}
});
var object="";

fs.readFile('./schools/final.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  object=JSON.parse(data);

  for( area in object) {

    for(var j=0;j < object[area].length; j++){

      knex('bangalore').insert({
        area: area,
        name: (object[area])[j].name,
        address: (object[area])[j].address,
        board: (object[area])[j].board,
        medium: (object[area])[j].medium,
        description: (object[area])[j].description

      })
     .then(function (ret) {
  //  cb(ret);
      })
      .catch(function (error) {
    //cb(error);
      });
    }
  }
});
