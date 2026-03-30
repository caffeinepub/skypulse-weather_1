import { useQuery } from "@tanstack/react-query";
import type {
  AdditionalMetrics,
  DayForecast,
  HourlyForecast,
  WeatherCondition,
} from "../backend.d";
import { useActor } from "./useActor";

// --- Mock data ---
const MOCK_CITIES = [
  "Mumbai",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Sydney",
  "Dubai",
  "Singapore",
];

const MOCK_CURRENT: WeatherCondition = {
  temperature: 28,
  feelsLike: 31,
  condition: "Partly Cloudy",
  humidity: BigInt(72),
  windSpeed: 18,
  uvIndex: 6,
  visibility: 12,
  pressure: BigInt(1013),
};

const CONDITIONS = [
  "Sunny",
  "Partly Cloudy",
  "Cloudy",
  "Light Rain",
  "Thunderstorm",
  "Clear",
  "Overcast",
];

const MOCK_DAILY: DayForecast[] = [
  { low: 22, high: 31, condition: "Sunny" },
  { low: 20, high: 28, condition: "Partly Cloudy" },
  { low: 19, high: 26, condition: "Light Rain" },
  { low: 18, high: 24, condition: "Thunderstorm" },
  { low: 21, high: 29, condition: "Clear" },
  { low: 23, high: 32, condition: "Sunny" },
  { low: 22, high: 30, condition: "Partly Cloudy" },
];

const MOCK_HOURLY: HourlyForecast[] = Array.from({ length: 24 }, (_, i) => ({
  hour: BigInt(i),
  temperature: 22 + Math.round(Math.sin((i / 24) * Math.PI * 2) * 6),
  condition: CONDITIONS[i % CONDITIONS.length],
}));

const now = Date.now();
const MOCK_METRICS: AdditionalMetrics = {
  airQualityIndex: BigInt(42),
  precipitation: 3.2,
  sunriseTime: BigInt(Math.floor(now / 1000) - 3600 * 8),
  sunsetTime: BigInt(Math.floor(now / 1000) + 3600 * 4),
};

// --- Hooks ---

export function useAllCities() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      if (!actor) return MOCK_CITIES;
      try {
        const result = await actor.getAllCities();
        return result.length > 0 ? result : MOCK_CITIES;
      } catch {
        return MOCK_CITIES;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useSearchCities(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["cities", "search", term],
    queryFn: async () => {
      if (!actor || !term) return [];
      try {
        return await actor.searchCities(term);
      } catch {
        return MOCK_CITIES.filter((c) =>
          c.toLowerCase().includes(term.toLowerCase()),
        );
      }
    },
    enabled: !isFetching && term.length > 1,
    staleTime: 30_000,
  });
}

export function useCurrentWeather(city: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<WeatherCondition>({
    queryKey: ["weather", "current", city],
    queryFn: async () => {
      if (!actor) return MOCK_CURRENT;
      try {
        return await actor.getCurrentWeather(city);
      } catch {
        return MOCK_CURRENT;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: MOCK_CURRENT,
  });
}

export function useDailyForecast(city: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<DayForecast[]>({
    queryKey: ["weather", "daily", city],
    queryFn: async () => {
      if (!actor) return MOCK_DAILY;
      try {
        const result = await actor.getDailyForecast(city);
        return result.length > 0 ? result : MOCK_DAILY;
      } catch {
        return MOCK_DAILY;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: MOCK_DAILY,
  });
}

export function useHourlyForecast(city: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<HourlyForecast[]>({
    queryKey: ["weather", "hourly", city],
    queryFn: async () => {
      if (!actor) return MOCK_HOURLY;
      try {
        const result = await actor.getHourlyForecast(city);
        return result.length > 0 ? result : MOCK_HOURLY;
      } catch {
        return MOCK_HOURLY;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: MOCK_HOURLY,
  });
}

export function useAdditionalMetrics(city: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<AdditionalMetrics>({
    queryKey: ["weather", "metrics", city],
    queryFn: async () => {
      if (!actor) return MOCK_METRICS;
      try {
        return await actor.getAdditionalMetrics(city);
      } catch {
        return MOCK_METRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
    placeholderData: MOCK_METRICS,
  });
}
