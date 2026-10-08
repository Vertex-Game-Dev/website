document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.getElementById("team-story");

    const imageWrap =
        document.querySelector(
            "#team-story .team-story-image-wrap"
        );

    const image =
        document.querySelector(
            "#team-story .team-story-image"
        );


    if (
        !section ||
        !imageWrap ||
        !image ||
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }


    gsap.registerPlugin(ScrollTrigger);


    // Keep mobile as a normal stacked section.
    if (window.innerWidth <= 767) {
        return;
    }


    /*
     * Image expansion is directly connected to scroll.
     *
     * The section first enters the viewport normally.
     * Once its top reaches about 78% of the viewport,
     * the image starts expanding.
     */
    gsap.timeline({
        scrollTrigger: {
            trigger: section,

            start: "top 78%",

            /*
             * Finish when the complete story section
             * has passed through the viewport.
             */
            end: "bottom top",

            scrub: 1.1,

            invalidateOnRefresh: true
        }
    })

    .to(
        imageWrap,
        {
            top: "0%",

            right: "0%",

            width: "100vw",

            height: "100vh",

            borderRadius: "0px",

            ease: "none",

            duration: 1
        }
    )

    .to(
        image,
        {
            scale: 1.04,

            ease: "none",

            duration: 1
        },
        "<"
    );


    /*
     * Recalculate positions after page/images load.
     */
    window.addEventListener(
        "load",
        () => {
            ScrollTrigger.refresh();
        }
    );

});