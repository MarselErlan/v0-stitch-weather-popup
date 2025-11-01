"use client"

import { WeatherPopup } from "@/components/weather-popup"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <WeatherPopup />
    </main>
  )
}
