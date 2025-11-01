"use client"

import { WeatherPopup } from "@/components/weather-popup"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4">
      <WeatherPopup />
    </main>
  )
}
