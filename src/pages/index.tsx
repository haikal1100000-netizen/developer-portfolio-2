import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Network,
  Cpu,
  Wrench,
  MonitorSmartphone,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "2+" },
  { label: "Technologies mastered", value: "9+" },
  { label: "Tech Bootcamps", value: "4+" },
];

const projects = [
  {
    title: "Unqueue",
    description: "E-commerce platform for selling digital products",
    image: "/assets/unqueue.webm",
    href: "https://unqueue.shop/",
  },
  {
    title: "InfiniteVPS",
    description: "High performance VPS hosting solution",
    image: "/assets/infinitevps.webm",
    href: "#",
  },
  {
    title: "TranslateBot",
    description: "Powerful Multilingual Translation Bot for Discord",
    image: "/assets/translate_bot.webm",
    href: "https://translatebot.app/",
  },
  {
    title: "Wrona",
    description: "Robotics-focused technology company",
    image: "/assets/wrona.jpeg",
    href: "https://www.wrona.com/",
  },
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/portfolio.webm",
    href: "https://github.com/haikal1100000-netizen/developer-portfolio-2",
  },
];

const services = [
  {
    service: "Programming & Software Development",
    description:
      "Building simple applications and software solutions using programming languages such as C++, Java, and Python.",
    icon: Code2,
    category: "Programming",
  },
  {
    service: "Computer Networking",
    description:
      "Studying computer network configuration, TCP/IP fundamentals, IP addressing, and network troubleshooting.",
    icon: Network,
    category: "Networking",
  },
  {
    service: "Web Development",
    description:
      "Creating simple websites using HTML, CSS, and JavaScript, with a focus on structure, visual design, and user experience.",
    icon: MonitorSmartphone,
    category: "Web Development",
  },
  {
    service: "Computer Systems & Digital Logic",
    description:
      "Studying digital systems, Boolean logic, logic circuits, and the fundamentals of embedded systems as part of Computer Engineering.",
    icon: Cpu,
    category: "Computer Engineering",
  },
  {
    service: "IT Support & Troubleshooting",
    description:
      "Understanding the basics of identifying computer hardware and software issues, as well as the process of resolving technical problems.",
    icon: Wrench,
    category: "IT Support",
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="relative isolate mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div aria-hidden="true" className={styles.heroPortrait} />
          <div className={cn(styles.intro, "relative z-20")}>
            <div className="flex flex-col items-start gap-1.5">
              <div
                data-scroll
                data-scroll-direction="horizontal"
                data-scroll-speed=".09"
                className="flex flex-wrap items-center gap-1.5"
              >
                <span className={styles.pill}>Python</span>
                <span className={styles.pill}>Java</span>
                <span className={styles.pill}>HTML</span>
                <span className={styles.pill}>CSS</span>
                <span className={styles.pill}>Git</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={styles.pill}>
                  Basic Network Configuration
                </span>
                <span className={styles.pill}>Network Troubleshooting</span>
                <span className={styles.pill}>Microsoft Office</span>
              </div>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Muhammad Haikal Budi Kusnan
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Computer Engineering Student at Diponegoro University |
                Interested in Software Development, Robotics, Embedded Systems
                & Computer Networking
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:haikal1100000@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="relative z-10 mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I am passionate about technology, problem-solving, and innovation,
              with practical knowledge of Python, Java, Object-Oriented
              Programming (OOP), HTML, CSS, and basic network configuration and
              troubleshooting. I also have experience using Git and Microsoft
              Office applications, including Word, Excel, and PowerPoint.
              Through leadership roles, organizational activities, and event
              coordination, I have developed strong communication, teamwork,
              analytical thinking, and attention to detail. I am eager to apply
              my technical skills to real-world projects, gain hands-on
              experience, and continuously grow both personally and
              professionally.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-border p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need a tech solution?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    Let&apos;s build it.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  I&apos;m a Computer Engineering student passionate about
                  programming, computer networks, and technology. I&apos;m
                  always learning, exploring new ideas, and building projects
                  to develop my technical skills.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md border border-border bg-card p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                  <span className="mt-3 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">
                    {service.category}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className={cn(
              styles.contactCard,
              "flex flex-col items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/[6.5%] to-background px-6 py-14 text-center shadow-xl shadow-black/10 sm:px-10 sm:py-16 xl:py-20",
            )}
          >
            <div className="mb-6 flex w-full max-w-md items-center gap-5">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                CONTACT
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="text-4xl font-medium tracking-tighter sm:text-5xl xl:text-6xl">
              Let&apos;s{" "}
              <span className="text-gradient clash-grotesk">Connect</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed tracking-tight text-muted-foreground sm:text-lg">
              Interested in technology, software development, and computer
              networking? I&apos;m always eager to learn new things, explore
              innovative ideas, and connect with people who share similar
              interests. Feel free to reach out for collaboration, discussions,
              or new opportunities!
            </p>
            <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <Link
                href="https://github.com/haikal1100000-netizen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-accent"
              >
                <Github className="h-9 w-9" aria-hidden="true" />
                <span className="font-medium">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/muhammad-haikal-budi-kusnan-7897a1375"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-accent"
              >
                <Linkedin className="h-9 w-9" aria-hidden="true" />
                <span className="font-medium">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/vernativenitch_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-accent"
              >
                <Instagram className="h-9 w-9" aria-hidden="true" />
                <span className="font-medium">Instagram</span>
              </Link>
            </div>
            <Link href="mailto:haikal1100000@gmail.com" passHref>
              <Button className="mt-8">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
