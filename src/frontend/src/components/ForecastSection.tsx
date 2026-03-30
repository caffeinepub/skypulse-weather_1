import {
  formatTemp,
  getDayName,
  getMonthDay,
  getWeatherEmoji,
} from "@/utils/weather";
import { motion } from "motion/react";
import type { DayForecast } from "../backend.d";

interface ForecastSectionProps {
  forecasts: DayForecast[];
  unit: "C" | "F";
  isDark: boolean;
}

export default function ForecastSection({
  forecasts,
  unit,
  isDark,
}: ForecastSectionProps) {
  return (
    <section className="py-8 px-4" data-ocid="forecast.section">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`font-display font-bold text-lg uppercase tracking-widest mb-6 ${
            isDark ? "text-white/70" : "text-sky-navy/70"
          }`}
        >
          7-Day Forecast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecasts.slice(0, 7).map((day, i) => (
            <motion.div
              key={`${day.condition}-${i}`}
              data-ocid={`forecast.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`rounded-2xl p-4 text-center shadow-glass transition-transform hover:-translate-y-1 ${
                isDark ? "glass" : "glass-light"
              } ${i === 0 ? "ring-1 ring-sky-cyan/40" : ""}`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-wide ${
                  i === 0
                    ? "text-sky-cyan"
                    : isDark
                      ? "text-white/60"
                      : "text-sky-navy/60"
                }`}
              >
                {getDayName(i)}
              </p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-white/30" : "text-sky-navy/40"}`}
              >
                {getMonthDay(i)}
              </p>
              <div className="text-3xl my-3">
                {getWeatherEmoji(day.condition)}
              </div>
              <p
                className={`text-base font-bold ${isDark ? "text-white" : "text-sky-navy"}`}
              >
                {formatTemp(day.high, unit)}
              </p>
              <p
                className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-sky-navy/40"}`}
              >
                {formatTemp(day.low, unit)}
              </p>
              <p
                className={`text-xs mt-2 leading-tight ${isDark ? "text-white/50" : "text-sky-navy/50"}`}
              >
                {day.condition}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
