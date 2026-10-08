document.addEventListener('DOMContentLoaded', async () => {
    const marquee = document.getElementById('video-marquee');
    const track = document.getElementById('video-marquee-track');

    if (!marquee || !track) return;

    const style = document.createElement('style');

    style.textContent = `
        /* =========================================================
           Vertex GDNA - YouTube Marquee
           Theme-matched + hover-safe spacing
           ========================================================= */

        .video-marquee {
            position: relative;
            width: 100%;
            overflow: visible;
            padding: 1.75rem 0 2.25rem;
        }

        /*
         * Use a mask instead of a solid-colored fade.
         * This allows the actual website background to remain visible
         * and makes the marquee blend naturally with the red/pink theme.
         */
        .video-marquee-viewport {
            width: 100%;
            overflow: hidden;
            padding: 1.35rem 0 1.5rem;

            -webkit-mask-image: linear-gradient(
                90deg,
                transparent 0%,
                #000 7%,
                #000 93%,
                transparent 100%
            );

            mask-image: linear-gradient(
                90deg,
                transparent 0%,
                #000 7%,
                #000 93%,
                transparent 100%
            );
        }

        .video-marquee-track {
            display: flex;
            width: max-content;
            will-change: transform;
            transform: translate3d(0, 0, 0);
        }

        .video-marquee-group {
            display: flex;
            align-items: stretch;
            gap: 1.5rem;
            flex-shrink: 0;
            padding-right: 1.5rem;
        }

        .video-marquee-card {
            position: relative;
            flex: 0 0 clamp(280px, 30vw, 430px);
            overflow: hidden;

            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 1rem;

            /*
             * Match the glass-card appearance used elsewhere
             * on the website.
             */
            background: rgba(2, 6, 23, 0.48);

            -webkit-backdrop-filter:
                blur(20px) saturate(120%);

            backdrop-filter:
                blur(20px) saturate(120%);

            box-shadow:
                0 18px 45px rgba(0, 0, 0, 0.24),
                inset 0 1px 0 rgba(255, 255, 255, 0.04);

            transition:
                transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
                filter 350ms ease,
                opacity 350ms ease,
                border-color 350ms ease,
                box-shadow 350ms ease;
        }

        /*
         * Hover card expands in place.
         * No upward translation, so the upper edge is not cut off.
         */
        .video-marquee-card:hover {
            transform: scale(1.025);

            border-color:
                rgba(244, 63, 94, 0.42);

            box-shadow:
                0 24px 60px rgba(0, 0, 0, 0.38),
                0 0 0 1px rgba(244, 63, 94, 0.08),
                0 0 34px rgba(236, 72, 153, 0.10);
        }

        /*
         * When hovering one card:
         * - marquee stops
         * - all other cards blur
         * - hovered card stays clear
         */
        .video-marquee.is-hovering
        .video-marquee-card:not(.is-hovered) {
            filter: blur(6px);
            opacity: 0.22;
        }

        .video-marquee-card.is-hovered {
            z-index: 4;
        }

        /* =========================================================
           YouTube Thumbnail
           ========================================================= */

        .video-marquee-thumb {
            position: relative;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            background: #111827;
        }

        .video-marquee-thumb img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;

            transition:
                transform 500ms ease;
        }

        .video-marquee-card:hover
        .video-marquee-thumb img {
            transform: scale(1.04);
        }

        /*
         * Subtle dark overlay matching the existing theme.
         */
        .video-marquee-overlay {
            position: absolute;
            inset: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
                linear-gradient(
                    180deg,
                    rgba(2, 6, 23, 0.02) 0%,
                    rgba(2, 6, 23, 0.12) 55%,
                    rgba(2, 6, 23, 0.38) 100%
                );
        }

        /* =========================================================
           YouTube Play Button
           ========================================================= */

        .video-marquee-play {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 3.25rem;
            height: 3.25rem;

            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.34);

            background:
                rgba(77, 32, 122, 0.96);

            color: #fff;

            font-size: 1.15rem;
            line-height: 1;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.34);

            transition:
                transform 250ms ease,
                background 250ms ease,
                box-shadow 250ms ease;
        }

        .video-marquee-card:hover
        .video-marquee-play {
            transform: scale(1.08);

            background:
                rgba(77, 32, 122, 0.96);

            box-shadow:
                0 12px 34px rgba(220, 38, 38, 0.28);
        }

        /* =========================================================
           Card Information
           ========================================================= */

        .video-marquee-info {
            padding: 1rem 1.1rem 1.15rem;
        }

        .video-marquee-title {
            margin: 0;

            color: #fff;

            font-size: 1.05rem;
            line-height: 1.35;
            font-weight: 500;
        }

        .video-marquee-meta {
            margin-top: 0.45rem;

            color:
                rgba(255, 255, 255, 0.48);

            font-size: 0.82rem;
        }

        /* =========================================================
           Desktop
           Extra vertical space prevents hover clipping.
           ========================================================= */

        @media (min-width: 768px) {

            .video-marquee {
                padding-top: 2.25rem;
                padding-bottom: 2.75rem;
            }

            .video-marquee-viewport {
                padding-top: 1.65rem;
                padding-bottom: 1.8rem;
            }
        }

        /* =========================================================
           Mobile
           ========================================================= */

        @media (max-width: 640px) {

            .video-marquee {
                padding-top: 1.1rem;
                padding-bottom: 1.65rem;
            }

            .video-marquee-viewport {
                padding-top: 1.15rem;
                padding-bottom: 1.3rem;
            }

            .video-marquee-group {
                gap: 1rem;
                padding-right: 1rem;
            }

            .video-marquee-card {
                flex-basis:
                    min(78vw, 340px);
            }
        }

        /* =========================================================
           Accessibility
           ========================================================= */

        @media (prefers-reduced-motion: reduce) {

            .video-marquee-track {
                transform: none !important;
            }

            .video-marquee-card,
            .video-marquee-thumb img,
            .video-marquee-play {
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);

    /*
     * Extract YouTube video ID.
     */
    const getVideoId = (url) => {
        try {
            const parsed = new URL(url);

            if (parsed.hostname.includes('youtube.com')) {

                if (
                    parsed.pathname.startsWith('/embed/')
                ) {
                    return parsed.pathname
                        .split('/embed/')[1]
                        .split('/')[0];
                }

                return parsed.searchParams.get('v');
            }

            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname
                    .slice(1)
                    .split('/')[0];
            }

        } catch (error) {
            return null;
        }

        return null;
    };

    /*
     * Create one YouTube card.
     */
    const createCard = (url, index) => {

        const videoId = getVideoId(url);

        if (!videoId) return null;

        const card = document.createElement('a');

        card.className =
            'video-marquee-card';

        card.href = url;

        card.target = '_blank';

        card.rel =
            'noopener noreferrer';

        card.setAttribute(
            'aria-label',
            `Watch YouTube video ${index + 1}`
        );

        card.innerHTML = `
            <div class="video-marquee-thumb">

                <img
                    src="https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg"
                    alt="YouTube video thumbnail ${index + 1}"
                    loading="lazy"
                >

                <div class="video-marquee-overlay">

                    <span
                        class="video-marquee-play"
                        aria-hidden="true"
                    >
                        ▶
                    </span>

                </div>

            </div>

            <div class="video-marquee-info">

                <p class="video-marquee-title">
                    Vertex GDNA — YouTube Video ${index + 1}
                </p>

                <p class="video-marquee-meta">
                    Watch on YouTube · Vertex GDNA
                </p>

            </div>
        `;

        return card;
    };

    try {

        /*
         * Load the existing videos.json.
         */
        const response = await fetch(
            'videos.json',
            {
                cache: 'no-cache'
            }
        );

        if (!response.ok) {
            throw new Error(
                `Unable to load videos.json (${response.status})`
            );
        }

        const data =
            await response.json();

        const videos =
            Array.isArray(data.videos)
                ? data.videos
                : [];

        if (!videos.length) {
            marquee.style.display =
                'none';

            return;
        }

        /*
         * Duplicate the video group so the marquee
         * can loop continuously.
         */
        const groupOne =
            document.createElement('div');

        const groupTwo =
            document.createElement('div');

        groupOne.className =
            'video-marquee-group';

        groupTwo.className =
            'video-marquee-group';

        videos.forEach((url, index) => {

            const cardOne =
                createCard(url, index);

            const cardTwo =
                createCard(url, index);

            if (cardOne) {
                groupOne.appendChild(cardOne);
            }

            if (cardTwo) {
                groupTwo.appendChild(cardTwo);
            }
        });

        if (!groupOne.children.length) {
            marquee.style.display =
                'none';

            return;
        }

        track.append(
            groupOne,
            groupTwo
        );

        /*
         * Marquee state.
         */
        let position = 0;

        let lastTime =
            performance.now();

        let groupWidth = 0;

        let paused = false;

        /*
         * Speed in pixels per second.
         */
        const speed = 55;

        /*
         * Measure one full group.
         */
        const measure = () => {

            groupWidth =
                groupOne.getBoundingClientRect().width;
        };

        /*
         * Hover state.
         */
        const setHoverState =
            (card, hovering) => {

                paused = hovering;

                marquee.classList.toggle(
                    'is-hovering',
                    hovering
                );

                card.classList.toggle(
                    'is-hovered',
                    hovering
                );
            };

        /*
         * Attach hover events.
         */
        marquee
            .querySelectorAll(
                '.video-marquee-card'
            )
            .forEach((card) => {

                card.addEventListener(
                    'mouseenter',
                    () => {
                        setHoverState(
                            card,
                            true
                        );
                    }
                );

                card.addEventListener(
                    'mouseleave',
                    () => {
                        setHoverState(
                            card,
                            false
                        );
                    }
                );
            });

        /*
         * Recalculate on resize.
         */
        window.addEventListener(
            'resize',
            measure,
            {
                passive: true
            }
        );

        measure();

        /*
         * Continuous marquee animation.
         */
        const animate = (time) => {

            const delta =
                Math.min(
                    time - lastTime,
                    50
                );

            lastTime = time;

            if (
                !paused &&
                !window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                ).matches
            ) {

                position +=
                    (speed * delta) / 1000;

                /*
                 * Reset seamlessly after
                 * one complete group.
                 */
                if (
                    position >= groupWidth
                ) {
                    position -= groupWidth;
                }

                track.style.transform =
                    `translate3d(${-position}px, 0, 0)`;
            }

            requestAnimationFrame(
                animate
            );
        };

        requestAnimationFrame(
            animate
        );

    } catch (error) {

        console.error(
            'Error loading video marquee:',
            error
        );
    }
});