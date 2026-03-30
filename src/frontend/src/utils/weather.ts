export function getWeatherEmoji(condition: string): string {
  const c = condition.toLowerCase();
  if (c.includes("thunder") || c.includes("storm")) return "⛈️";
  if (c.includes("heavy rain") || c.includes("downpour")) return "🌧️";
  if (c.includes("light rain") || c.includes("drizzle")) return "🌦️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("snow") || c.includes("blizzard")) return "❄️";
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return "🌫️";
  if (c.includes("partly cloudy") || c.includes("partly")) return "⛅";
  if (c.includes("overcast") || c.includes("cloudy")) return "☁️";
  if (c.includes("clear") || c.includes("sunny")) return "☀️";
  if (c.includes("windy") || c.includes("breezy")) return "💨";
  return "🌤️";
}

export function getConditionGlowClass(condition: string): string {
  const c = condition.toLowerCase();
  if (c.includes("thunder") || c.includes("storm")) return "glow-violet";
  if (c.includes("rain")) return "glow-cyan";
  if (c.includes("snow")) return "glow-cyan";
  if (c.includes("sunny") || c.includes("clear")) return "glow-gold";
  return "glow-cyan";
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function formatTemp(temp: number, unit: "C" | "F"): string {
  const value = unit === "F" ? celsiusToFahrenheit(temp) : Math.round(temp);
  return `${value}°${unit}`;
}

export function formatTime(unixSeconds: bigint | number): string {
  const ms =
    typeof unixSeconds === "bigint"
      ? Number(unixSeconds) * 1000
      : unixSeconds * 1000;
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getAqiLabel(aqi: bigint | number): {
  label: string;
  color: string;
} {
  const val = typeof aqi === "bigint" ? Number(aqi) : aqi;
  if (val <= 50) return { label: "Good", color: "text-emerald-400" };
  if (val <= 100) return { label: "Moderate", color: "text-yellow-400" };
  if (val <= 150)
    return { label: "Unhealthy (Sensitive)", color: "text-orange-400" };
  if (val <= 200) return { label: "Unhealthy", color: "text-red-400" };
  return { label: "Hazardous", color: "text-red-600" };
}

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDayName(offsetFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetFromToday);
  if (offsetFromToday === 0) return "Today";
  if (offsetFromToday === 1) return "Tomorrow";
  return DAY_NAMES[d.getDay()];
}

export function getMonthDay(offsetFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetFromToday);
  return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
}
