"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, Wind, X, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface WeatherData {
  temp: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

export function WeatherPopup() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    fetchWeather()
    // Center the popup on mount
    setPosition({
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight / 2 - 250,
    })
  }, [])

  const fetchWeather = async () => {
    try {
      setLoading(true)
      // Using OpenWeatherMap API - free tier
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=YOUR_API_KEY`,
      )

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
      // Fallback to mock data
      setWeather({
        temp: 45,
        description: "Partly cloudy",
        humidity: 65,
        windSpeed: 12,
        icon: "partly-cloudy",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

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

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-2xl p-3 cursor-pointer hover:scale-105 transition-transform animate-bounce-in"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2 text-white font-bold">
          <Cloud className="w-5 h-5" />
          <span>Weather</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-2xl shadow-2xl overflow-hidden cursor-move select-none animate-bounce-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "400px",
        border: "4px solid white",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.5) inset",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Title Bar */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-white" />
          <h2 className="text-white font-bold text-lg tracking-wide">Chicago Weather</h2>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors"
            onClick={() => setIsMinimized(true)}
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
            onClick={() => window.close()}
          >
            <X className="w-4 h-4 text-white" />
          </Button>
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
                  <Image
                    src="/stitch-transparent.jpg"
                    alt="Stitch"
                    width={200}
                    height={200}
                    className="drop-shadow-2xl animate-stitch-breathe"
                    priority
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
