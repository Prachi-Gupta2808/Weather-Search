let weather = {
  apiKey: "67b92f0af5416edbfe58458f502b0a31",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Update weather details
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    // Weather comment based on description
    const commentElement = document.querySelector("#weather-comment");
    let weatherComment = "";

    if (description.includes("clear")) {
      weatherComment = "Be aware of the sun today, it's clear and bright!";
    } else if (description.includes("cloudy")) {
      weatherComment = "It looks cloudy today, a great day to stay cozy!";
    } else if (description.includes("rain")) {
      weatherComment = "Don't forget your umbrella, it's raining!";
    } else if (description.includes("snow")) {
      weatherComment = "It's snowing! Time for a snowball fight!";
    } else if (description.includes("storm")) {
      weatherComment = "Stay safe, there might be a storm today!";
    } else {
      weatherComment = "Keep an eye on the weather today!";
    }

    commentElement.innerText = weatherComment;

    // Remove loading state
    document.querySelector(".weather").classList.remove("loading");

    // Change background image based on city
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Default search when page loads
weather.fetchWeather("Patna");
