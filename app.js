const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");
var date = new Date();
var hours = date.getHours();
var mins = date.getMinutes();
var secs = date.getSeconds();

var currentTime = hours+":"+mins+":"+secs;

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html");

});

app.get("/coordinates",function(req,res) {
  res.sendFile(__dirname+"/index2.html");

});

app.post("/",function(req,res){

    var cityname = req.body.cityName;
    var appId = "0f871056c1dab081a447965f8702e88a";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+appId+"&units=metric";
    https.get(url,function(response){
      response.on("data",function(data){

        const weatherData = JSON.parse(data);

        const status=weatherData.cod;
        if(status == 404){
          res.render("failure",{page:"City Name"});

        }
        if(status!=404){

                  var temp = weatherData.main.temp;

                  const minTemp = weatherData.main.temp_min;

                  const maxTemp = weatherData.main.temp_max;

                  const weatherDescription= weatherData.weather[0].description;

                  const humidity = weatherData.main.humidity;

                  const pressure = weatherData.main.pressure;

                  const windSpeed = weatherData.wind.speed;

                  const imgUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
                  const cityName = weatherData.name;
                  const country = weatherData.sys.country;
                  const condition = weatherData.weather[0].main;

              res.render("index",{currentTemp:temp,ImgUrl:imgUrl,weatherDescription:weatherDescription,countryCode:country,cityName:cityName,maxTemp:maxTemp,minTemp:minTemp,humidity:humidity,pressure:pressure,windSpeed:windSpeed,currentTime:currentTime,condition:condition});

        }

      })

    })

})


app.post("/coordinates",function(req,res){

    var lat = req.body.lat;
    var long = req.body.long;
    var appId = "0f871056c1dab081a447965f8702e88a";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid="+appId+"&units=metric";
      https.get(url,function(response){
      response.on("data",function(data){


        const weatherData = JSON.parse(data);

        const status=weatherData.cod;
        if(status == 400 || status ==404){

          res.render("failure",{page:"Co-ordinates"});

        }
        if(status !=400){

                  var temp = weatherData.main.temp;

                  const minTemp = weatherData.main.temp_min;

                  const maxTemp = weatherData.main.temp_max;

                  const weatherDescription= weatherData.weather[0].description;

                  const humidity = weatherData.main.humidity;

                  const pressure = weatherData.main.pressure;

                  const windSpeed = weatherData.wind.speed;

                  const imgUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
                  const cityName = weatherData.name;
                  const country = weatherData.sys.country;
                  const condition = weatherData.weather[0].main;


              res.render("index",{currentTemp:temp,ImgUrl:imgUrl,weatherDescription:weatherDescription,countryCode:country,cityName:cityName,maxTemp:maxTemp,minTemp:minTemp,humidity:humidity,pressure:pressure,windSpeed:windSpeed,currentTime:currentTime,condition:condition});


        }


      });


    });


});


app.get("/location", function (req, res) {
  res.sendFile(__dirname + "/location.html");
});
app.post("/location", function (req, res) {
  console.log(req.body);
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const appId = "0f871056c1dab081a447965f8702e88a";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    appId +
    "&units=metric";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const status = weatherData.cod;
      if (status == 400 || status == 404) {
        res.render("failure", { page: "Co-ordinates" });
      }
      if (status != 400) {
        var temp = weatherData.main.temp;

        const minTemp = weatherData.main.temp_min;

        const maxTemp = weatherData.main.temp_max;

        const weatherDescription = weatherData.weather[0].description;

        const humidity = weatherData.main.humidity;

        const pressure = weatherData.main.pressure;

        const windSpeed = weatherData.wind.speed;

        const imgUrl =
          "http://openweathermap.org/img/wn/" +
          weatherData.weather[0].icon +
          "@2x.png";
        const cityName = weatherData.name;
        const country = weatherData.sys.country;
        const condition = weatherData.weather[0].main;

        res.render("index", {
          currentTemp: temp,
          ImgUrl: imgUrl,
          weatherDescription: weatherDescription,
          countryCode: country,
          cityName: cityName,
          maxTemp: maxTemp,
          minTemp: minTemp,
          humidity: humidity,
          pressure: pressure,
          windSpeed: windSpeed,
          currentTime: currentTime,
          condition: condition,
        });
      }
    });
  });
});





app.listen(3000,function(){
  console.log("server started at port 3000");
});
