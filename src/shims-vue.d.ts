/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace IPlanet {
  type Position = 'top' | 'center' | 'bottom' | 'absoluteCenter'
  type Planets = 'Mars' | 'Earth' | 'Moon' | 'Saturn' | 'Neptune' | 'Jupiter'

  interface SphereConfig {
    map: string
    bumpMap?: string
    bumpScale?: number
    shininess?: number
    specularMap?: string
    light: {
      x: number,
      y: number,
      z: number[],
      intensity: number
    }
    camera: {
      x: number,
      y: number,
      z: number[]
    }
    cloud?: string
    degrees?: number
    originalRotationY: number
  }
}

declare namespace IConfigs {
  type WeatherUnit = 'standard' | 'metric' | 'imperial'
  type TimeFormat = '12-Hour' | '24-Hour' | 'AM/PM'
  type PlanetPerformance = 'low' | 'medium' | 'high'

  type Bookmark = {
    url: string
    title: string
    favicon: string
  }

  interface Config {
    isFreshConfig: boolean

    language: string
    location: string
    locationCoordinates: {
      lat: number
      lon: number
    }

    enableSearchWidget: boolean
    enableVimkeyWidget: boolean
    enableDockBarWidget:boolean
    enableWeatherWidget: boolean

    timeFormat: TimeFormat
    timeShowSeconds: boolean
    timeFlashSeparator: boolean
    timeFontStyle: IClockFontType
    timeShowLunarCalendar: boolean

    weatherUnit: WeatherUnit
    weatherUpdatedTimestamp: number
    cacheWeatherInfo: {
      aqi: number
      weather: IWeather.WeatherData | object
    }

    planetName: IPlanet.Planets
    planetRotationSpeed: number
    planetPosition: IPlanet.Position
    planetPerformance: PlanetPerformance

    autoDetectCurrentLocation: boolean

    bookmarks: {
      [key: string]: Bookmark
    }

    searchEngine: string

    vimkeySwitchToPreTab: string
    vimkeySwitchToNextTab: string
  }
}