import {
  formatTemp,
  getConditionGlowClass,
  getWeatherEmoji,
} from "@/utils/weather";
import { Droplets, Eye, Gauge, Wind, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { WeatherCondition } from "../backend.d";

interface HeroSectionProps {
  city: string;
  weather: WeatherCondition;
  unit: "C" | "F";
  isDark: boolean;
}

export default function HeroSection({
  city,
  weather,
  unit,
  isDark,
}: HeroSectionProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const emoji = getWeatherEmoji(weather.condition);
  const glowClass = getConditionGlowClass(weather.condition);

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const metrics = [
    { icon: Wind, label: "Wind", value: `${weather.windSpeed} km/h` },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${Number(weather.humidity)}%`,
    },
    { icon: Zap, label: "UV Index", value: `${weather.uvIndex}` },
    { icon: Eye, label: "Visibility", value: `${weather.visibility} km` },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${Number(weather.pressure)} hPa`,
    },
  ];

  return (
    <section className="py-10 px-4" data-ocid="hero.section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left: city + temperature */}
          <motion.div
            className="lg:col-span-1 space-y-3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1
              className={`font-display font-black uppercase tracking-wider leading-none ${
                isDark ? "text-white" : "text-sky-navy"
              }`}
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              {city}
            </h1>
            <p
              className={`text-sm font-medium ${isDark ? "text-white/60" : "text-sky-navy/60"}`}
            >
              {dateStr}
            </p>
            <p className="text-sky-cyan font-mono text-lg font-bold">
              {timeStr}
            </p>

            <div className="flex items-end gap-4 mt-4">
              <span
                className={`font-display font-black leading-none text-glow-cyan ${
                  isDark ? "text-white" : "text-sky-navy"
                }`}
                style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
              >
                {formatTemp(weather.temperature, unit)}
              </span>
            </div>

            <p
              className={`text-xl font-semibold ${isDark ? "text-white/90" : "text-sky-navy/90"}`}
            >
              {weather.condition}
            </p>
            <p
              className={`text-sm ${isDark ? "text-white/50" : "text-sky-navy/50"}`}
            >
              Feels like {formatTemp(weather.feelsLike, unit)}
            </p>
          </motion.div>

          {/* Center: weather icon */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div className={`animate-float ${glowClass}`}>
              <span
                style={{ fontSize: "clamp(6rem, 18vw, 11rem)", lineHeight: 1 }}
              >
                {emoji}
              </span>
            </div>
          </motion.div>

          {/* Right: metrics card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div
              className={`rounded-3xl p-6 shadow-glass ${
                isDark ? "glass" : "glass-light"
              }`}
              data-ocid="hero.card"
            >
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                  isDark ? "text-white/40" : "text-sky-navy/40"
                }`}
              >
                Current Conditions
              </h3>
              <div className="space-y-4">
                {metrics.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-cyan/15 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-sky-cyan" />
                      </div>
                      <span
                        className={`text-sm ${isDark ? "text-white/60" : "text-sky-navy/60"}`}
                      >
                        {label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold ${isDark ? "text-white" : "text-sky-navy"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
