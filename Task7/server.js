require("dotenv").config();

const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = process.env.PORT || 3006;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

console.log("=================================");
console.log("Task 7 Environment Check");
console.log("PORT:", PORT);
console.log("Weather API Key Loaded:", !!WEATHER_API_KEY);
console.log("=================================");

// ===============================
// VIEW ENGINE
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// RATE LIMITING
// ===============================

const weatherLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 30,

    message: {
        success: false,
        message: "Too many weather requests. Please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
});

// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {
    res.render("index");
});

// ===============================
// WEATHER API
// ===============================

app.get("/api/weather", weatherLimiter, async (req, res) => {

    try {

        const city = req.query.city;

        // -------------------------------
        // CHECK CITY
        // -------------------------------

        if (!city || city.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Please enter a city or state."
            });
        }

        // -------------------------------
        // CHECK API KEY
        // -------------------------------

        if (!WEATHER_API_KEY) {

            return res.status(500).json({
                success: false,
                message: "Weather API key is not configured."
            });
        }

        // -------------------------------
        // GEOCODING API
        // -------------------------------

        const geoURL =
            `https://api.openweathermap.org/geo/1.0/direct` +
            `?q=${encodeURIComponent(city.trim())}` +
            `&limit=1` +
            `&appid=${WEATHER_API_KEY}`;

        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {

            return res.status(502).json({
                success: false,
                message: "Unable to connect to the location service."
            });
        }

        const geoData = await geoResponse.json();

        // -------------------------------
        // LOCATION NOT FOUND
        // -------------------------------

        if (!geoData || geoData.length === 0) {

            return res.status(404).json({
                success: false,
                message: "City or state not found. Please enter a valid location."
            });
        }

        const location = geoData[0];

        const latitude = location.lat;
        const longitude = location.lon;

        const cityName = location.name;
        const state = location.state || "";
        const country = location.country || "";

        // -------------------------------
        // CURRENT WEATHER API
        // -------------------------------

        const weatherURL =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?lat=${latitude}` +
            `&lon=${longitude}` +
            `&appid=${WEATHER_API_KEY}` +
            `&units=metric`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {

            return res.status(502).json({
                success: false,
                message: "Unable to get current weather information."
            });
        }

        const weatherData = await weatherResponse.json();

        // -------------------------------
        // FORECAST API
        // -------------------------------

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast` +
            `?lat=${latitude}` +
            `&lon=${longitude}` +
            `&appid=${WEATHER_API_KEY}` +
            `&units=metric`;

        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {

            return res.status(502).json({
                success: false,
                message: "Unable to get forecast information."
            });
        }

        const forecastData = await forecastResponse.json();

        // -------------------------------
        // CREATE DAILY FORECAST
        // -------------------------------

        const dailyForecast = createDailyForecast(
            forecastData.list || []
        );

        // -------------------------------
        // RESPONSE
        // -------------------------------

        return res.json({

            success: true,

            weather: {

                city: cityName,

                state: state,

                country: country,

                temperature: weatherData.main.temp,

                feelsLike: weatherData.main.feels_like,

                humidity: weatherData.main.humidity,

                pressure: weatherData.main.pressure,

                visibility:
                    weatherData.visibility != null
                        ? weatherData.visibility / 1000
                        : null,

                windSpeed: weatherData.wind.speed,

                description:
                    weatherData.weather &&
                    weatherData.weather[0]
                        ? weatherData.weather[0].description
                        : "Unknown",

                main:
                    weatherData.weather &&
                    weatherData.weather[0]
                        ? weatherData.weather[0].main
                        : "Unknown",

                icon:
                    weatherData.weather &&
                    weatherData.weather[0]
                        ? weatherData.weather[0].icon
                        : "01d",

                sunrise: weatherData.sys.sunrise,

                sunset: weatherData.sys.sunset,

                latitude: latitude,

                longitude: longitude
            },

            forecast: dailyForecast
        });

    } catch (error) {

        console.error("Weather API Error:", error);

        return res.status(503).json({
            success: false,
            message:
                "Weather service is temporarily unavailable. Please try again later."
        });
    }
});

// ===============================
// DAILY FORECAST FUNCTION
// ===============================

function createDailyForecast(list) {

    const grouped = {};

    list.forEach(item => {

        const date = new Date(item.dt * 1000)
            .toISOString()
            .split("T")[0];

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push(item);
    });

    return Object.keys(grouped)
        .slice(0, 5)
        .map(date => {

            const items = grouped[date];

            const temperatures = items.map(
                item => item.main.temp
            );

            const averageTemperature =
                temperatures.reduce(
                    (sum, temp) => sum + temp,
                    0
                ) / temperatures.length;

            const minTemperature =
                Math.min(...temperatures);

            const maxTemperature =
                Math.max(...temperatures);

            const representative =
                items[Math.floor(items.length / 2)] ||
                items[0];

            return {

                date: date,

                temperature:
                    Number(averageTemperature.toFixed(1)),

                min:
                    Number(minTemperature.toFixed(1)),

                max:
                    Number(maxTemperature.toFixed(1)),

                description:
                    representative.weather[0].description,

                main:
                    representative.weather[0].main,

                icon:
                    representative.weather[0].icon
            };
        });
}

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Page or API endpoint not found."
    });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {

    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Task 7 server running at http://localhost:${PORT}`
    );

});