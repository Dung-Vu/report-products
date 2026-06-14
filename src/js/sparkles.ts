interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    alpha: number;
    alphaSpeed: number;
    direction: number;
    color: string;
}

export function initSparkles(): (() => void) | null {
    const canvas = document.getElementById(
        "sparkles-canvas",
    ) as HTMLCanvasElement | null;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    let sparklesAnimId: number | null = null;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const baseDensity = 1200; // Match React particleDensity={1200}

    function getParticleCount(): number {
        return Math.floor((width * height * baseDensity) / 160000);
    }

    const density = getParticleCount();

    function createParticle(randomize = true): Particle {
        // minSize=0.4, maxSize=1.0. Math.random() * 0.6 + 0.4 ensures size is in [0.4, 1.0]
        const size = Math.random() * 0.6 + 0.4;
        const colors = ["#ffffff", "#e0f2fe", "#f0fdf4", "#ccfbf1", "#a7f3d0"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: size,
            speedY: Math.random() * 0.12 - 0.06, // slow Y drift
            speedX: Math.random() * 0.12 - 0.06, // slow X drift
            alpha: randomize ? Math.random() * 0.8 + 0.2 : 0.15,
            alphaSpeed: Math.random() * 0.005 + 0.002, // slow twinkle
            direction: randomize ? (Math.random() > 0.5 ? 1 : -1) : 1,
            color: color,
        };
    }

    for (let i = 0; i < density; i++) {
        particles.push(createParticle(true));
    }

    function resize(): void {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;

        const newCount = getParticleCount();
        while (particles.length < newCount) {
            particles.push(createParticle(true));
        }
        if (particles.length > newCount) {
            particles.length = newCount;
        }
    }

    window.addEventListener("resize", resize);

    let isVisible = false;

    function draw(): void {
        if (!isVisible || !ctx) return; // Do not animate or clear when not visible

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.y += p.speedY;
            p.x += p.speedX;

            p.alpha += p.alphaSpeed * p.direction;
            if (p.alpha >= 1) {
                p.alpha = 1;
                p.direction = -1;
            } else if (p.alpha <= 0.15) {
                p.alpha = 0.15;
                p.direction = 1;
            }

            if (p.y < -5 || p.y > height + 5 || p.x < -5 || p.x > width + 5) {
                particles[i] = createParticle(false);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        }

        sparklesAnimId = requestAnimationFrame(draw);
    }

    // IntersectionObserver to pause the canvas updates/drawing when it is off-screen
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!isVisible) {
                        isVisible = true;
                        if (sparklesAnimId) {
                            cancelAnimationFrame(sparklesAnimId);
                        }
                        draw();
                    }
                } else {
                    isVisible = false;
                    if (sparklesAnimId) {
                        cancelAnimationFrame(sparklesAnimId);
                        sparklesAnimId = null;
                    }
                }
            });
        },
        {
            root: null, // Viewport
            threshold: 0, // Trigger as soon as the canvas is at least partially in the viewport
        },
    );

    observer.observe(canvas);

    return () => {
        window.removeEventListener("resize", resize);
        observer.disconnect();
        if (sparklesAnimId) {
            cancelAnimationFrame(sparklesAnimId);
            sparklesAnimId = null;
        }
    };
}
export default initSparkles;
