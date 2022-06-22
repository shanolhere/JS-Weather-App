const text = document.querySelector(".text");
const submitBtn = document.querySelector(".submit");

const outputBox = document.querySelector(".outputBox");

var city = document.querySelector(".city");
var description = document.querySelector(".description");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humi");
var icon = document.querySelector(".icon");

var error = document.querySelector(".error");

var apiKey = "3045dd712ffe6e702e3245525ac7fa38";

// kelvin to celsius
function conversion(val) {
  return (val - 273).toFixed(2);
}

submitBtn.addEventListener("click", () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      text.value +
      "&appid=" +
      apiKey
  )
    .then((res) => {
      if (!res.ok) {
        outputBox.style.display = "none";
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      let nameValue = data["name"];
      let humidityValue = data["main"]["humidity"];
      let tempValue = data["main"]["temp"];
      let windValue = data["wind"]["speed"];
      let descValue = data["weather"][0]["description"];
      let iconValue = data["weather"][0]["icon"];

      city.innerHTML = `${nameValue}`;
      icon.src = "https://openweathermap.org/img/wn/" + iconValue + ".png";
      description.innerHTML = `Description: ${descValue}`;
      temp.innerHTML = `Temperature: ${conversion(tempValue)} °C`;
      humidity.innerHTML = `Humidity: ${humidityValue} %`;
      wind.innerHTML = `Wind Speed: ${windValue} km/hr`;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + nameValue + "')";
      outputBox.style.display = "block";
      error.style.display = "none";
    });
});
