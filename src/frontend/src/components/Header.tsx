import { Button } from "@/components/ui/button";
import { MapPin, Moon, Sparkles, Sun, Thermometer, User } from "lucide-react";

type NavItem = "Home" | "Forecast" | "Maps" | "News" | "Settings";

interface HeaderProps {
  theme: "dark" | "light";
  unit: "C" | "F";
  city: string;
  onThemeToggle: () => void;
  onUnitToggle: () => void;
  activeNav: NavItem;
  onNavChange: (item: NavItem) => void;
}

const NAV_ITEMS: NavItem[] = ["Home", "Forecast", "Maps", "News", "Settings"];

export default function Header({
  theme,
  unit,
  city,
  onThemeToggle,
  onUnitToggle,
  activeNav,
  onNavChange,
}: HeaderProps) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isDark
          ? "glass border-b border-white/10"
          : "glass-light border-b border-sky-200/60"
      }`}
      data-ocid="header.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-cyan/20 shadow-glow">
              <Sparkles className="w-5 h-5 text-sky-cyan" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className={isDark ? "text-white" : "text-sky-navy"}>
                Sky
              </span>
              <span className="text-sky-cyan">Pulse</span>
            </span>
          </div>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item}
                data-ocid={`header.${item.toLowerCase()}.link`}
                onClick={() => onNavChange(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeNav === item
                    ? "bg-sky-cyan/20 text-sky-cyan shadow-glow"
                    : isDark
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-sky-navy/70 hover:text-sky-navy hover:bg-sky-navy/10"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                isDark ? "bg-white/10" : "bg-sky-navy/10"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-cyan" />
              <span className={isDark ? "text-white/80" : "text-sky-navy/80"}>
                {city}
              </span>
              <span className="text-lg">🌐</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              data-ocid="header.unit.toggle"
              onClick={onUnitToggle}
              className={`rounded-full px-3 h-8 text-xs font-bold border ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-sky-navy/20 text-sky-navy hover:bg-sky-navy/10"
              }`}
            >
              <Thermometer className="w-3.5 h-3.5 mr-1" />°{unit}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              data-ocid="header.theme.toggle"
              onClick={onThemeToggle}
              className={`rounded-full w-9 h-9 ${
                isDark
                  ? "text-sky-gold hover:bg-white/10"
                  : "text-sky-navy hover:bg-sky-navy/10"
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              data-ocid="header.avatar.button"
              className={`rounded-full w-9 h-9 ${
                isDark
                  ? "bg-sky-cyan/20 text-sky-cyan hover:bg-sky-cyan/30"
                  : "bg-sky-navy/20 text-sky-navy hover:bg-sky-navy/30"
              }`}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
