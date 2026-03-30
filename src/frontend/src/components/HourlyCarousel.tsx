import { formatTemp, getWeatherEmoji } from "@/utils/weather";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type { HourlyForecast } from "../backend.d";

interface HourlyCarouselProps {
  hourly: HourlyForecast[];
  unit: "C" | "F";
  isDark: boolean;
}

function formatHour(h: bigint | number): string {
  const hour = typeof h === "bigint" ? Number(h) : h;
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

export default function HourlyCarousel({
  hourly,
  unit,
  isDark,
}: HourlyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-8 px-4" data-ocid="hourly.section">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`font-display font-bold text-lg uppercase tracking-widest mb-6 ${
            isDark ? "text-white/70" : "text-sky-navy/70"
          }`}
        >
          Hourly Breakdown
        </h2>

        <div
          className={`relative rounded-3xl shadow-glass overflow-hidden ${isDark ? "glass" : "glass-light"}`}
        >
          <button
            type="button"
            data-ocid="hourly.pagination_prev"
            onClick={() => scroll("left")}
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-sky-navy/10 hover:bg-sky-navy/20 text-sky-navy"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide px-14 py-5"
          >
            {hourly.map((slot, i) => (
              <motion.div
                key={`hour-${Number(slot.hour)}-${i}`}
                data-ocid={`hourly.item.${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl min-w-[80px] transition-colors cursor-default ${
                  isDark ? "hover:bg-white/10" : "hover:bg-sky-navy/10"
                }`}
              >
                <p
                  className={`text-xs font-medium ${isDark ? "text-white/50" : "text-sky-navy/50"}`}
                >
                  {formatHour(slot.hour)}
                </p>
                <span className="text-2xl">
                  {getWeatherEmoji(slot.condition)}
                </span>
                <p
                  className={`text-sm font-bold ${isDark ? "text-white" : "text-sky-navy"}`}
                >
                  {formatTemp(slot.temperature, unit)}
                </p>
                <p
                  className={`text-xs text-center leading-tight ${isDark ? "text-white/40" : "text-sky-navy/40"}`}
                >
                  {slot.condition}
                </p>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="hourly.pagination_next"
            onClick={() => scroll("right")}
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-sky-navy/10 hover:bg-sky-navy/20 text-sky-navy"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
