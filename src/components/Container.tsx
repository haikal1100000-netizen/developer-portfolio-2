import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";
import { Moon, Sun } from "lucide-react";

type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#projects", text: "Projects" },
  { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Muhammad Haikal Budi Kusnan",
    description: `Full-stack website developer and TypeScript enthusiast.`,
    image: "/assets/logo.webp",
    type: "website",
    ...customMeta,
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  // preloader effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#0b0b13" : "#f8fafc"}
        />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://www.wendoj.codes${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.wendoj.codes${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Muhammad Haikal Budi Kusnan" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Muhammad Haikal Budi Kusnan" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <nav
        className={cn(
          styles.nav,
          isScrolled
            ? "bg-gradient-to-br from-background to-transparent shadow-md backdrop-blur transition"
            : "bg-transparent",
        )}
      >
        <div className="absolute inset-y-0 right-4 flex items-center gap-2 sm:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              styles.burger,
              "inline-flex transform items-center justify-center rounded-md p-2 transition-all duration-300 focus:outline-none",
            )}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? "Close main menu" : "Open main menu"}
            </span>
            <MenuIcon data-hide={isOpen} />
            <CrossIcon data-hide={!isOpen} />
          </button>
        </div>
        <Link href="/">
          <span className="text-lg font-semibold">Haikal</span>
        </Link>

        {/* Desktop menu */}
        <ul className={styles["desktop-nav"]}>
          {navLinks.map((link, i) => (
            <NavItem
              key={link.href}
              href={link.href}
              text={link.text}
              i={i}
              className="text-base"
            />
          ))}
        </ul>
        <div className="hidden sm:block">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Mobile menu */}
        <AnimatePresence key="menu">
          {isOpen && (
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1, type: "spring", bounce: 0.25 }}
            >
              {/* Expandable menu */}
              <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b pl-[22px] pr-1">
                <span className="text-base font-medium lowercase">Menu</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle theme={theme} onToggle={toggleTheme} />
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.burger}
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                  >
                    <span className="sr-only">Close main menu</span>
                    <CrossIcon data-hide={!isOpen} />
                  </button>
                </div>
              </div>
              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                {/* Links */}
                <ul className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[58px]">
                  {navLinks.map((link, i) => (
                    <button key={link.href} onClick={() => setIsOpen(false)}>
                      <NavItem
                        href={link.href}
                        text={link.text}
                        i={i}
                        className="text-xl"
                      />
                    </button>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex min-h-fit w-full flex-col space-y-8 px-[22px] py-10">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Haikal. All rights reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
          html,
          body {
            overflow-y: ${isOpen ? "hidden" : "initial"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
            touch-action: ${isOpen ? "none" : "unset"};
            -ms-touch-action: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "dark" | "light";
  onToggle: () => void;
}) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/80 text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-5 w-5 text-foreground"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 2.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className="absolute h-5 w-5 text-foreground"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
