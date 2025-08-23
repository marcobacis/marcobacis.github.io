window.onload = function () {
    const nav = document.querySelector("nav");
    const navbarCollapse = document.getElementById("navbarMediumish");
    const navbarToggler = document.querySelector(".navbar-toggler");

    let lastScrollTop = 0;
    const delta = 5;

    // --- Navbar open/close
    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    navbarCollapse.querySelectorAll("a.nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navbarCollapse.classList.remove("show");
        });
    });

    // --- Hide/Show navbar on scroll ---
    window.addEventListener("scroll", () => {
        const st = window.scrollY;

        if (Math.abs(lastScrollTop - st) <= delta) return;

        const a = st > lastScrollTop;
        const b = st > nav.offsetHeight

        console.log("scrolling", a, b)
        if (st > lastScrollTop && st > nav.offsetHeight) {
            // Scroll down → hide nav
            nav.classList.remove("nav-down");
            nav.classList.add("nav-up");
        } else {
            // Scroll up → show nav
            if (st + window.innerHeight < document.documentElement.scrollHeight) {
                nav.classList.remove("nav-up");
                nav.classList.add("nav-down");
            }
        }

        lastScrollTop = st;
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // --- Handle hash on page load ---
    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
};
