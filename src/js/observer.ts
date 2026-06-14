export function updateDots(sceneIndex: number): void {
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("dot-active", i === sceneIndex);
    });
}

export function setupObservers(): void {
    const dotNav = document.getElementById("dot-nav");
    const hook = document.getElementById("scene-0");

    if (hook && dotNav) {
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        dotNav.setAttribute("aria-hidden", "true");
                        dotNav.classList.remove("dot-nav-visible");
                    } else {
                        dotNav.removeAttribute("aria-hidden");
                        dotNav.classList.add("dot-nav-visible");
                    }
                });
            },
            { threshold: 0.4 },
        ).observe(hook);
    }

    document.querySelectorAll(".scene").forEach((scene) => {
        new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const idx = parseInt(scene.id.replace("scene-", ""), 10);
                    if (!isNaN(idx)) {
                        updateDots(idx);
                    }
                }
            },
            { threshold: 0.2 },
        ).observe(scene);
    });

    // Entrance animations: add scene-in when scene enters viewport
    document.querySelectorAll(".scene").forEach((scene) => {
        new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    scene.classList.add("scene-in");
                }
            },
            { threshold: 0.12 },
        ).observe(scene);
    });
}
