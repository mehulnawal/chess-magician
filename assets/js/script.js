document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    let isScrolling; // To detect when scrolling has stopped

    // Function to update the active class on the navbar
    function updateActiveClass() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // Adjust for navbar height
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if the section is in the viewport
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        // Remove the active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove("active");
            // Add the active class to the corresponding link
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    // Set the first section as active on page load
    updateActiveClass();

    // Update active class when scrolling
    window.addEventListener("scroll", function () {
        window.clearTimeout(isScrolling); // Clear the previous timeout

        // After the user stops scrolling, run the updateActiveClass function
        isScrolling = setTimeout(updateActiveClass, 200); // Wait 200ms after scroll stops
    });

    // Smooth scroll to section on navbar link click
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                top: target.offsetTop - 50, // Adjust for navbar height
                behavior: "smooth"
            });
        });
    });
});
