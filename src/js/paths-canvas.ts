interface FloatingPath {
    position: number;
    index: number;
    width: number;
    baseOpacity: number;
    duration: number; // in seconds
    elapsedTime: number; // in seconds
}

export function initPathsCanvas(): (() => void) | null {
    const canvas = document.getElementById("paths-canvas") as HTMLCanvasElement | null;
    if (!canvas) return null;
    const activeCanvas = canvas;
    const ctx = activeCanvas.getContext("2d");
    if (!ctx) return null;

    let animFrameId: number | null = null;
    let width = (activeCanvas.width = activeCanvas.offsetWidth);
    let height = (activeCanvas.height = activeCanvas.offsetHeight);

    const paths: FloatingPath[] = [];

    // Create 36 paths for position = 1 and 36 paths for position = -1
    // Total 72 paths. Canvas can render this effortlessly.
    const createPaths = () => {
        paths.length = 0;
        for (const pos of [1, -1]) {
            for (let i = 0; i < 36; i++) {
                const duration = 20 + Math.random() * 10;
                paths.push({
                    position: pos,
                    index: i,
                    width: 0.5 + i * 0.03,
                    baseOpacity: 0.1 + i * 0.03,
                    duration: duration,
                    elapsedTime: Math.random() * duration, // randomize initial phase
                });
            }
        }
    };

    createPaths();

    function resize(): void {
        width = activeCanvas.width = activeCanvas.offsetWidth;
        height = activeCanvas.height = activeCanvas.offsetHeight;
    }

    window.addEventListener("resize", resize);

    let isVisible = false;
    let lastTime = performance.now();

    function draw(currentTime: number): void {
        if (!isVisible || !ctx) return;

        const deltaTime = (currentTime - lastTime) / 1000; // convert to seconds
        lastTime = currentTime;

        ctx.clearRect(0, 0, width, height);

        // Get computed color for var(--accent) dynamically from canvas styles
        const accent = window.getComputedStyle(activeCanvas).color || "#38bdf8";

        // Map drawing space from original SVG viewBox (0 0 696 316) to actual canvas size
        const scaleX = width / 696;
        const scaleY = height / 316;

        ctx.save();
        ctx.scale(scaleX, scaleY);

        for (let i = 0; i < paths.length; i++) {
            const p = paths[i];
            p.elapsedTime += deltaTime;
            const progress = (p.elapsedTime / p.duration) % 1.0;

            // Math identical to React component's motion.path
            // pathLength goes from 0.3 to 1.0
            const currentPathLength = 0.3 + 0.7 * progress;
            // pathOffset goes from 0 to 1
            const currentOffset = progress;
            // opacity goes from 0.3 to 0.6, then back to 0.3
            const opacityMultiplier = 0.3 + 0.3 * Math.sin(progress * Math.PI);
            const opacity = p.baseOpacity * opacityMultiplier;

            // Bezier curve control points
            const iVal = p.index;
            const pos = p.position;
            const startX = -(380 - iVal * 5 * pos);
            const startY = -(189 + iVal * 6);
            const cp2X = -(312 - iVal * 5 * pos);
            const cp2Y = 216 - iVal * 6;
            const end1X = 152 - iVal * 5 * pos;
            const end1Y = 343 - iVal * 6;
            const cp3X = 616 - iVal * 5 * pos;
            const cp3Y = 470 - iVal * 6;
            const cp4X = 684 - iVal * 5 * pos;
            const cp4Y = 875 - iVal * 6;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            // First Bezier segment
            ctx.bezierCurveTo(startX, startY, cp2X, cp2Y, end1X, end1Y);
            // Second Bezier segment
            ctx.bezierCurveTo(end1X, end1Y, cp3X, cp3Y, cp4X, cp4Y);

            // Configure stroke styles
            ctx.lineWidth = p.width;
            ctx.strokeStyle = accent;
            ctx.globalAlpha = opacity;

            // Apply line dash to simulate motion.path pathLength and pathOffset
            const PATH_LEN = 1500; // approximate length of these curved paths
            const dashLength = currentPathLength * PATH_LEN;
            const gapLength = PATH_LEN;
            const offset = currentOffset * PATH_LEN;

            ctx.setLineDash([dashLength, gapLength]);
            ctx.lineDashOffset = -offset;

            ctx.stroke();
        }

        ctx.restore();

        animFrameId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!isVisible) {
                        isVisible = true;
                        lastTime = performance.now();
                        if (animFrameId) {
                            cancelAnimationFrame(animFrameId);
                        }
                        animFrameId = requestAnimationFrame(draw);
                    }
                } else {
                    isVisible = false;
                    if (animFrameId) {
                        cancelAnimationFrame(animFrameId);
                        animFrameId = null;
                    }
                }
            });
        },
        {
            root: null,
            threshold: 0,
        }
    );

    observer.observe(activeCanvas);

    return () => {
        window.removeEventListener("resize", resize);
        observer.disconnect();
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
    };
}

export default initPathsCanvas;
