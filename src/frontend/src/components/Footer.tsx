import { Sparkles } from "lucide-react";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      className={`mt-16 border-t py-10 px-4 ${
        isDark ? "border-white/10" : "border-sky-navy/10"
      }`}
      data-ocid="footer.section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-cyan/20">
                <Sparkles className="w-5 h-5 text-sky-cyan" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className={isDark ? "text-white" : "text-sky-navy"}>
                  Sky
                </span>
                <span className="text-sky-cyan">Pulse</span>
              </span>
            </div>
            <p
              className={`text-sm ${isDark ? "text-white/40" : "text-sky-navy/40"}`}
            >
              Real-time weather intelligence for every corner of the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                isDark ? "text-white/40" : "text-sky-navy/40"
              }`}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {["Home", "Forecast", "Maps", "News", "Settings"].map((link) => (
                <button
                  type="button"
                  key={link}
                  data-ocid={`footer.${link.toLowerCase()}.link`}
                  className={`text-sm text-left transition-colors ${
                    isDark
                      ? "text-white/50 hover:text-sky-cyan"
                      : "text-sky-navy/50 hover:text-sky-cyan"
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                isDark ? "text-white/40" : "text-sky-navy/40"
              }`}
            >
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: SiGithub, label: "GitHub" },
                { Icon: SiX, label: "X (Twitter)" },
                { Icon: SiInstagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isDark
                      ? "bg-white/10 text-white/60 hover:bg-sky-cyan/20 hover:text-sky-cyan"
                      : "bg-sky-navy/10 text-sky-navy/60 hover:bg-sky-cyan/20 hover:text-sky-cyan"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${
            isDark
              ? "border-white/10 text-white/30"
              : "border-sky-navy/10 text-sky-navy/30"
          }`}
        >
          <p>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p>Weather data provided by SkyPulse Network</p>
        </div>
      </div>
    </footer>
  );
}
