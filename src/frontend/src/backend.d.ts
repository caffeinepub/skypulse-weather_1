import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DayForecast {
    low: number;
    high: number;
    condition: string;
}
export interface WeatherCondition {
    temperature: number;
    pressure: bigint;
    windSpeed: number;
    uvIndex: number;
    humidity: bigint;
    feelsLike: number;
    visibility: number;
    condition: string;
}
export type Time = bigint;
export interface HourlyForecast {
    temperature: number;
    hour: bigint;
    condition: string;
}
export interface CityWeather {
    metrics: AdditionalMetrics;
    hourlyForecast: Array<HourlyForecast>;
    dailyForecast: Array<DayForecast>;
    current: WeatherCondition;
}
export interface AdditionalMetrics {
    precipitation: number;
    sunriseTime: Time;
    sunsetTime: Time;
    airQualityIndex: bigint;
}
export interface backendInterface {
    addCity(name: string, weather: CityWeather): Promise<void>;
    getAdditionalMetrics(city: string | null): Promise<AdditionalMetrics>;
    getAllCities(): Promise<Array<string>>;
    getCurrentWeather(city: string | null): Promise<WeatherCondition>;
    getDailyForecast(city: string | null): Promise<Array<DayForecast>>;
    getHourlyForecast(city: string | null): Promise<Array<HourlyForecast>>;
    searchCities(searchTerm: string): Promise<Array<string>>;
}
