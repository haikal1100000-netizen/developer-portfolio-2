import Link from "next/link";
import {
  ArrowUp,
  Github,
  Instagram,
  Linkedin,
  Monitor,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Experience", href: "#experiences" },
  { label: "Interest", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/haikal1100000-netizen",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-haikal-budi-kusnan-7897a1375",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vernativenitch_/",
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/70 bg-card/30">
      <div className="container mx-auto grid gap-12 py-14 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.7fr)] md:py-16">
        <div className="max-w-md">
          <a href="#home" className="inline-flex items-center gap-3">
            <Monitor
              className="h-7 w-7 text-primary"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Muhammad Haikal
            </span>
          </a>
          <p className="mt-5 inline-flex rounded-md border border-border bg-background/70 px-3 py-2 font-mono text-xs font-medium tracking-[0.16em] text-primary">
            COMPUTER ENGINEERING
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Exploring software development, computer networks, and technology.
            Always learning and building with curiosity.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-5 font-mono text-sm font-medium tracking-[0.16em] text-muted-foreground">
            EXPLORE
          </h2>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 font-mono text-sm font-medium tracking-[0.16em] text-muted-foreground">
            CONNECT
          </h2>
          <ul className="space-y-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container relative mx-auto flex min-h-20 items-center justify-center border-t border-border/70 py-5 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Muhammad Haikal Budi Kusnan. All rights
          reserved.
        </p>
        <a
          href="#home"
          aria-label="Back to top"
          className="absolute right-0 grid h-12 w-12 place-items-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
