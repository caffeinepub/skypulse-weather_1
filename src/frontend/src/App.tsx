import Footer from "@/components/Footer";
import ForecastSection from "@/components/ForecastSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HourlyCarousel from "@/components/HourlyCarousel";
import MetricsSection from "@/components/MetricsSection";
import SearchBar from "@/components/SearchBar";
import { Toaster } from "@/components/ui/sonner";
import {
  useAdditionalMetrics,
  useCurrentWeather,
  useDailyForecast,
  useHourlyForecast,
} from "@/hooks/useQueries";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

type NavItem = "Home" | "Forecast" | "Maps" | "News" | "Settings";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [city, setCity] = useState<string>("Mumbai");
  const [activeNav, setActiveNav] = useState<NavItem>("Home");

  const isDark = theme === "dark";

  const { data: weather } = useCurrentWeather(city);
  const { data: dailyForecast = [] } = useDailyForecast(city);
  const { data: hourlyForecast = [] } = useHourlyForecast(city);
  const { data: metrics } = useAdditionalMetrics(city);

  const handleCitySelect = useCallback((newCity: string) => {
    setCity(newCity);
  }, []);

  const mockWeather = {
    temperature: 28,
    feelsLike: 31,
    condition: "Partly Cloudy",
    humidity: BigInt(72),
    windSpeed: 18,
    uvIndex: 6,
    visibility: 12,
    pressure: BigInt(1013),
  };

  const mockMetrics = {
    precipitation: 3.2,
    sunriseTime: BigInt(Math.floor(Date.now() / 1000) - 3600 * 8),
    sunsetTime: BigInt(Math.floor(Date.now() / 1000) + 3600 * 4),
    airQualityIndex: BigInt(42),
  };

  const currentWeather = weather ?? mockWeather;
  const currentMetrics = metrics ?? mockMetrics;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-storm" : "bg-daylight"
      }`}
    >
      {/* Background noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 20%, rgba(47,230,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(181,140,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <Header
          theme={theme}
          unit={unit}
          city={city}
          onThemeToggle={() =>
            setTheme((t) => (t === "dark" ? "light" : "dark"))
          }
          onUnitToggle={() => setUnit((u) => (u === "C" ? "F" : "C"))}
          activeNav={activeNav}
          onNavChange={setActiveNav}
        />

        {/* Search row */}
        <div className="py-6 px-4">
          <SearchBar
            isDark={isDark}
            onSelectCity={handleCitySelect}
            currentCity={city}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.main
            key={city}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection
              city={city}
              weather={currentWeather}
              unit={unit}
              isDark={isDark}
            />

            {dailyForecast.length > 0 && (
              <ForecastSection
                forecasts={dailyForecast}
                unit={unit}
                isDark={isDark}
              />
            )}

            {hourlyForecast.length > 0 && (
              <HourlyCarousel
                hourly={hourlyForecast}
                unit={unit}
                isDark={isDark}
              />
            )}

            <MetricsSection metrics={currentMetrics} isDark={isDark} />
          </motion.main>
        </AnimatePresence>

        <Footer isDark={isDark} />
      </div>

      <Toaster />
    </div>
  );
}
