import { formatTime, getAqiLabel } from "@/utils/weather";
import { CloudRain, Sunrise, Sunset, Wind } from "lucide-react";
import { motion } from "motion/react";
import type { AdditionalMetrics } from "../backend.d";

interface MetricsSectionProps {
  metrics: AdditionalMetrics;
  isDark: boolean;
}

export default function MetricsSection({
  metrics,
  isDark,
}: MetricsSectionProps) {
  const aqiInfo = getAqiLabel(metrics.airQualityIndex);

  const cards = [
    {
      icon: Wind,
      label: "Air Quality Index",
      value: String(Number(metrics.airQualityIndex)),
      sub: aqiInfo.label,
      subColor: aqiInfo.color,
      glow: "glow-cyan",
      accent: "text-sky-cyan",
      bg: "bg-sky-cyan/10",
      id: "metrics.aqi.card",
    },
    {
      icon: CloudRain,
      label: "Precipitation",
      value: `${metrics.precipitation.toFixed(1)} mm`,
      sub:
        metrics.precipitation > 5
          ? "Heavy"
          : metrics.precipitation > 1
            ? "Moderate"
            : "Light",
      subColor: isDark ? "text-white/50" : "text-sky-navy/50",
      glow: "glow-violet",
      accent: "text-sky-violet",
      bg: "bg-sky-violet/10",
      id: "metrics.precipitation.card",
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(metrics.sunriseTime),
      sub: "Golden Hour",
      subColor: "text-sky-gold",
      glow: "glow-gold",
      accent: "text-sky-gold",
      bg: "bg-sky-gold/10",
      id: "metrics.sunrise.card",
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(metrics.sunsetTime),
      sub: "Evening Glow",
      subColor: "text-orange-400",
      glow: "glow-gold",
      accent: "text-orange-400",
      bg: "bg-orange-400/10",
      id: "metrics.sunset.card",
    },
  ];

  return (
    <section className="py-8 px-4" data-ocid="metrics.section">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`font-display font-bold text-lg uppercase tracking-widest mb-6 ${
            isDark ? "text-white/70" : "text-sky-navy/70"
          }`}
        >
          Additional Metrics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              data-ocid={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-3xl p-6 shadow-glass transition-transform hover:-translate-y-1 ${
                isDark ? "glass" : "glass-light"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-4`}
              >
                <card.icon className={`w-6 h-6 ${card.accent}`} />
              </div>
              <p
                className={`text-xs font-bold uppercase tracking-widest ${
                  isDark ? "text-white/40" : "text-sky-navy/40"
                }`}
              >
                {card.label}
              </p>
              <p
                className={`text-2xl font-display font-black mt-2 ${
                  isDark ? "text-white" : "text-sky-navy"
                }`}
              >
                {card.value}
              </p>
              <p className={`text-sm font-semibold mt-1 ${card.subColor}`}>
                {card.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
