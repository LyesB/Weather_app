async function weather(location) {
  const locatioContent = document.getElementById("location")
  const icon = document.getElementById("icon")
  const weather = document.getElementById("text")
  const lastUpdated = document.getElementById("lastupdated")
  const temperature = document.getElementById("temp")
  const feelsLike = document.getElementById("feelslike")

  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=315f142ba3e043d8b50153659231311&q=" +
        location,
      { mode: "cors" }
    )
    response.json().then(function (response) {
      console.log(response)

      if (response.error) {
        weather.textContent = response.error.message
      } else {
        locatioContent.textContent =
          response.location.name + ", " + response.location.country

        weather.textContent = response.current.condition.text
        weatherConditionIcon(response.current.condition.text, icon)

        const date = response.current.last_updated
        const formated = new Date(Date.parse(date))
        lastUpdated.textContent = formated.toUTCString()

        temperature.textContent = response.current.temp_c + "°C"

        feelsLike.textContent =
          "Feels Like " + response.current.feelslike_c + "°C"
      }
    })
  } catch (error) {
    alert(error)
  }
}

async function weatherConditionIcon(weatherCondition, icon) {
  const container = document.getElementById("container")
  const bgImageCredit = document.getElementById("bg-image-credit")
  const response = await fetch(
    "https://www.weatherapi.com/docs/weather_conditions.json",
    { mode: "cors" }
  )
  response.json().then(function (response) {
    for (let i = 0; i < response.length; i++) {
      if (weatherCondition === response[i].day) {
        icon.src =
          "/home/geedorah/repos/Weather_app/weather/64x64/day/" +
          response[i].icon +
          ".png"
      }
    }
    if (weatherCondition === "sunny") {
      container.style.backgroundImage =
        'url("/home/geedorah/repos/Weather_app/courtney-cook-HClKQKUodF4-unsplash.jpg")'
      bgImageCredit.innerHTML =
        "<a href='https://unsplash.com/photos/sunflower-field-under-white-clouds-and-blue-sky-HClKQKUodF4'>Background Image ©</a>"
    } else if (weatherCondition === "Partly cloudy" || "Overcast") {
      container.style.backgroundImage =
        "url('/home/geedorah/repos/Weather_app/daria-nepriakhina-auMjWDfTFhI-unsplash.jpg' )"
      bgImageCredit.innerHTML =
        "<a href='https://unsplash.com/photos/white-clouds-over-field-auMjWDfTFhI'>Background Image ©</a>"
    } else if (weatherCondition === "Cloudy" || "Thundery outbreaks possible") {
      container.style.backgroundImage =
        "url(/home/geedorah/repos/Weather_app/raychel-sanner-dydirN1ot04-unsplash.jpg)"
      bgImageCredit.innerHTML =
        "<a href='https://unsplash.com/photos/green-grass-field-under-cloudy-sky-during-daytime-dydirN1ot04'>Background Image ©</a>"
    } else if (
      weatherCondition === "Blowing snow" ||
      "Blizzard" ||
      "Moderate snow" ||
      "Patchy heavy snow" ||
      "Heavy snow"
    ) {
      container.style.backgroundImage =
        "url(/home/geedorah/repos/Weather_app/tom-wheatley-1aFqFawzcAk-unsplash.jpg)"
      bgImageCredit.innerHTML =
        "<a href='https://unsplash.com/photos/benches-and-trees-covered-with-snow-1aFqFawzcAk'>Background Image ©</a>"
    } else if (
      weatherCondition === "Patchy light rain" ||
      "Light rain" ||
      "Moderate rain at times" ||
      "Heavy rain at times" ||
      "Heavy rain"
    ) {
      container.style.backgroundImage =
        "url(/home/geedorah/repos/Weather_app/joy-stamp-pGQbWXBC1dA-unsplash.jpg)"
      bgImageCredit.innerHTML =
        "<a href='https://unsplash.com/photos/glass-with-dew-pGQbWXBC1dA'>Background Image ©</a>"
    }
  })
}

function searchLocation() {
  let location = document.getElementById("search-input").value
  weather(location)
}

const input = document.getElementById("search-input")
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault()
    searchLocation()
  }
})

weather("batna")
