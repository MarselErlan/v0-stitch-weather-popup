"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, Wind } from "lucide-react"

interface WeatherData {
  temp: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

export function WeatherPopup() {
  const [weather, setWeather] = useState<WeatherData | null>({
    temp: 44,
    description: "scattered clouds",
    humidity: 65,
    windSpeed: 12,
    icon: "clouds",
  })
  const [loading, setLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    try {
      // Using OpenWeatherMap API - free tier with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=8a9380703f509f16b0ba9e40518dace0`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)

      if (!response.ok) {
        // Fallback to mock data for demo
        setWeather({
          temp: 45,
          description: "Partly cloudy",
          humidity: 65,
          windSpeed: 12,
          icon: "partly-cloudy",
        })
        setLoading(false)
        return
      }

      const data = await response.json()
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        icon: data.weather[0].main.toLowerCase(),
      })
    } catch (error) {
      // Fallback to mock data on error or timeout (already set as initial state)
      console.log("Weather API failed, keeping fallback data:", error)
    }
  }

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="w-8 h-8" />

    switch (weather.icon) {
      case "clear":
        return <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" />
      case "rain":
      case "drizzle":
        return <CloudRain className="w-8 h-8 text-blue-400 animate-bounce-slow" />
      case "clouds":
      case "partly-cloudy":
        return <Cloud className="w-8 h-8 text-gray-400 animate-float" />
      default:
        return <Cloud className="w-8 h-8 text-gray-400 animate-float" />
    }
  }

  const handleStitchClick = () => {
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div
      className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 overflow-hidden select-none h-screen w-screen"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Window Title Bar - draggable area for Electron */}
      <div
        className="bg-gradient-to-r from-purple-400 to-pink-400 px-4 pt-10 pb-3 flex items-center justify-center"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-white" />
          <h2 className="text-white font-bold text-lg tracking-wide">Chicago Weather</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
            <p className="mt-4 text-purple-600 font-semibold">Loading weather...</p>
          </div>
        ) : (
          <>
            {/* Temperature Display */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full p-4 shadow-lg animate-float">{getWeatherIcon()}</div>
                <div>
                  <div className="text-5xl font-bold text-purple-600 animate-fade-in">{weather?.temp}°F</div>
                  <div className="text-sm text-gray-600 capitalize mt-1">{weather?.description}</div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-md animate-slide-in-left">
                <div className="flex items-center gap-2 text-blue-600">
                  <Cloud className="w-4 h-4" />
                  <span className="text-xs font-semibold">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-gray-700 mt-1">{weather?.humidity}%</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-md animate-slide-in-right">
                <div className="flex items-center gap-2 text-teal-600">
                  <Wind className="w-4 h-4" />
                  <span className="text-xs font-semibold">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-gray-700 mt-1">{weather?.windSpeed} mph</div>
              </div>
            </div>

                    {/* Stitch Character */}
                    <div className="relative flex flex-col items-center">
                      <div className="relative cursor-pointer group" onClick={handleStitchClick}>
                        <div className="animate-stitch-bounce hover:animate-stitch-wiggle">
                          <img
                            src="data:image/jpeg;base64,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"
                            alt="Stitch"
                            width="200"
                            height="200"
                            className="drop-shadow-2xl animate-stitch-breathe"
                          />
                        </div>

                {/* Floating hearts */}
                <div className="absolute -top-4 -right-4 animate-float-slow">
                  <span className="text-3xl drop-shadow-lg">❤️</span>
                </div>
                <div className="absolute top-2 -left-4 animate-float opacity-70" style={{ animationDelay: "1s" }}>
                  <span className="text-2xl drop-shadow-lg">💙</span>
                </div>
              </div>

              {/* Speech Bubble */}
              {showMessage && (
                <div className="mt-4 bg-white rounded-2xl px-6 py-3 shadow-lg relative animate-bounce-in">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                  <p className="text-purple-600 font-bold text-center">Ohana means family! 🌺</p>
                </div>
              )}

              {!showMessage && (
                <div className="mt-4 bg-white rounded-2xl px-6 py-3 shadow-lg relative animate-fade-in">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                  <p className="text-gray-700 font-semibold text-center text-sm">
                    {weather?.temp && weather.temp > 60 ? "Perfect weather for adventures!" : "Bundle up, it's chilly!"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-4 animate-float-slow opacity-30">
        <Cloud className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-32 right-6 animate-float opacity-20">
        <Cloud className="w-6 h-6 text-white" />
      </div>
    </div>
  )
}
