import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function init() {
    var root = document.querySelector(':root');
    
    var smoother, scrollY;
    
    const darkModeBtn = document.getElementById("dark-mode-toggle");
    darkModeBtn.addEventListener("click", toggleLDModes);

    createSmoothScroll();
    pinCarousel();

    function createSmoothScroll() {
        // create the scrollSmoother before your scrollTriggers
        smoother = ScrollSmoother.create({
            smooth: 2,
            speed: 1,
            effects: true,
            // normalizeScroll: true,
            smoothTouch: 0.1,
            onUpdate: (self) => {
                let scrollY = self.scrollTop();
                navbarTransition(scrollY);
            }
            
        });

        // document.addEventListener('astro:before-swap', () => smoother.destroy(), { once: true });
    
        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();
    }

    function convertRemToPixels(rem) {    
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    
    function navbarTransition(scrollTop) {
        const navbar = document.getElementById('navbar');

        if (Math.round(scrollTop * 100) / 100 > 2) {
            navbar.classList.add("scrolledDown");
        }
        else {
            navbar.classList.remove("scrolledDown");
        }
    }

    function pinCarousel() {
        let sections = gsap.utils.toArray(".carousel-item-div");
        const pixels = convertRemToPixels(6);
        const endValue = 1000 * (sections.length - 1);

        console.log(sections.length - 1);

        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none", // <-- IMPORTANT!
            scrollTrigger: {
                trigger: ".project-carousel",
                pin: true,
                scrub: 1,
                //snap: directionalSnap(1 / (sections.length - 1)),
                start: `top ${pixels}px`,
                end: `+=${endValue}`,
            }
        });
    }

    function toggleLDModes() {

        if (darkModeBtn.classList.contains("dark-mode-btn")) {

            // First, toggle the button itself.
            darkModeBtn.classList.remove("dark-mode-btn");
            darkModeBtn.classList.add("light-mode-btn");


            // Next, toggle the classes of the Font Awesome Icon.
            const icon = darkModeBtn.firstElementChild;
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");


            // Finally, change the CSS variables.
            root.style.setProperty("--text-color", "rgba(0,0,0,1)");
            root.style.setProperty("--opposite-text-color", "rgba(255,255,255,1)");
            root.style.setProperty("--bg-color", "rgba(240,240,240,1)");
        }

        else if (darkModeBtn.classList.contains("light-mode-btn")) {

            // First, toggle the button itself.
            darkModeBtn.classList.remove("light-mode-btn");
            darkModeBtn.classList.add("dark-mode-btn");
            

            // Next, toggle the classes of the Font Awesome Icon.
            const icon = darkModeBtn.firstElementChild;
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            
            // Finally, change the CSS variables.
            root.style.setProperty("--text-color", "rgba(255,255,255,1)");
            root.style.setProperty("--opposite-text-color", "rgba(0,0,0,1)");
            root.style.setProperty("--bg-color", "rgba(15,15,15,1)");
        }

        console.log(darkModeBtn.classList);

    }
}

init();
document.addEventListener("astro:after-swap", init);

