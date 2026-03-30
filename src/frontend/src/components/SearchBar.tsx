import { useSearchCities } from "@/hooks/useQueries";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ALL_CITIES = [
  "Mumbai",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Sydney",
  "Dubai",
  "Singapore",
  "Bangkok",
  "Berlin",
  "Toronto",
  "Seoul",
  "Cairo",
  "Lagos",
  "Buenos Aires",
];

interface SearchBarProps {
  isDark: boolean;
  onSelectCity: (city: string) => void;
  currentCity: string;
}

export default function SearchBar({
  isDark,
  onSelectCity,
  currentCity,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [] } = useSearchCities(query);

  const filteredLocal =
    query.length > 1
      ? ALL_CITIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
      : [];

  const suggestions = results.length > 0 ? results : filteredLocal;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(city: string) {
    onSelectCity(city);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={containerRef}>
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-full shadow-glass transition-all ${
          isDark
            ? "glass border-white/20 focus-within:border-sky-cyan/50 focus-within:shadow-glow"
            : "glass-light border-sky-200 focus-within:border-sky-cyan/70 focus-within:shadow-glow"
        }`}
      >
        <Search className="w-5 h-5 text-sky-cyan flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          data-ocid="search.input"
          placeholder="Search for city or zip code..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={`flex-1 bg-transparent outline-none text-sm font-medium placeholder:opacity-50 ${
            isDark
              ? "text-white placeholder:text-white/50"
              : "text-sky-navy placeholder:text-sky-navy/50"
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          data-ocid="search.submit_button"
          onClick={() => suggestions[0] && handleSelect(suggestions[0])}
          className="px-4 py-1.5 rounded-full bg-sky-cyan text-sky-deep text-sm font-bold hover:opacity-90 transition-opacity shadow-glow"
        >
          Search
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <div
          className={`absolute top-full mt-2 w-full rounded-2xl overflow-hidden shadow-glass z-50 ${
            isDark
              ? "glass border border-white/15"
              : "glass-light border border-white/70"
          }`}
          data-ocid="search.dropdown_menu"
        >
          {suggestions.slice(0, 8).map((city) => (
            <button
              type="button"
              key={city}
              data-ocid={`search.item.${ALL_CITIES.indexOf(city) + 1}`}
              onClick={() => handleSelect(city)}
              className={`w-full px-5 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-sky-navy hover:bg-sky-navy/10"
              } ${city === currentCity ? "text-sky-cyan" : ""}`}
            >
              <Search className="w-4 h-4 opacity-40" />
              {city}
              {city === currentCity && (
                <span className="ml-auto text-xs text-sky-cyan">Current</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
