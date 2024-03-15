<script lang="ts">
    import { createDropdownMenu, melt } from "@melt-ui/svelte";
    import { page } from "$app/stores";

    $: app =
        $page.url.pathname
            .split("/")
            .filter(x => x)
            .at(0) ?? "";
    $: appName = appNameMapping[app] ?? "Apps";
    const appNameMapping: Record<string, string> = {
        docs: "Docs",
        slides: "Slides",
        forms: "Forms"
    };

    const {
        elements: { menu, item, trigger, arrow }
    } = createDropdownMenu();
</script>

<div id="wrapper">
    <header>
        <h1>Clayen{appName}</h1>
        <a href={`/${app}`}>Home</a>
        <button use:melt={$trigger}>
            <img src="https://avatars.githubusercontent.com/u/1162160?v=4" alt="Profile" />
        </button>
        <div class="dropdown-menu" use:melt={$menu}>
            <button class="item" use:melt={$item}>Owned forms</button>
            <button class="item" use:melt={$item}>Pending forms</button>
            <button class="item" use:melt={$item}>Sign out</button>
            <div class="arrow" use:melt={$arrow} />
        </div>
    </header>
    <slot />
    <nav class="footer-nav" aria-label="Footer">
        <section>
            <h2>Products</h2>
            <ul>
                <li><a href="/docs">Docs</a></li>
                <li><a href="/slides">Slides</a></li>
                <li><a href="/forms">Forms</a></li>
            </ul>
        </section>
        <section>
            <h2>Powered by</h2>
            <ul>
                <li><a href="https://svelte.dev">Svelte</a></li>
                <li><a href="https://fastify.dev">Fastify</a></li>
                <li><a href="https://caddyserver.com">Caddy</a></li>
                <li><a href="https://www.docker.com">Docker</a></li>
                <li><a href="https://firstbyte.ru">FirstByte</a></li>
            </ul>
        </section>
        <section>
            <h2>See also</h2>
            <ul>
                <li><a href="https://clayenkitten.ru">Personal website</a></li>
                <li><a href="https://github.com/ClayenApps/office">Source code</a></li>
                <li><a href="https://clayenkitten.ru/blog">Blog</a></li>
            </ul>
        </section>
        <section>
            <h2>Contacts</h2>
            <ul>
                <li><a href="mailto:admin@clayenkitten.ru">Email</a></li>
                <li><a href="https://github.com/ClayenKitten">GitHub</a></li>
            </ul>
        </section>
    </nav>
    <footer>
        <span class="copyright">© 2024, ClayenApps</span>
        <a>Language</a>
        <section></section>
    </footer>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
        align-items: center;
    }

    header {
        display: flex;
        align-items: center;

        width: 100%;
        height: 70px;

        background-color: $background-tint;

        > h1 {
            display: flex;
            align-items: center;
            padding-left: 16px;
            margin-right: auto;

            color: $text-contrast;
            font-size: 28px;
        }

        > a {
            color: $text-contrast;
            text-decoration: none;
            &:hover {
                filter: brightness(85%);
            }
        }
        > button {
            display: block;

            aspect-ratio: 1;
            height: 100%;
            padding: 12px;
            margin-left: 16px;

            background-color: transparent;
            overflow: hidden;
            > img {
                aspect-ratio: 1;
                height: 100%;
                border-radius: 999px;
                cursor: pointer;
            }
            &:hover > img {
                box-sizing: content-box;
                border: 2px solid hsl(0, 0%, 85%, 0.5);
                margin: -2px;
            }
        }
    }

    nav.footer-nav {
        margin-top: auto;

        display: flex;
        justify-content: space-evenly;

        width: 100%;
        padding: 32px calc((100vw - $lg) / 2);

        color: $text-contrast;
        background-color: $background-tint;

        section {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            h2 {
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
            }
            ul {
                display: flex;
                flex-direction: column;
                gap: 4px;
                a {
                    color: $text-contrast;
                    font-size: 18px;
                    text-decoration: none;
                    &:hover {
                        filter: brightness(85%);
                    }
                }
            }
        }
    }
    footer {
        display: flex;
        align-items: center;

        width: 100%;
        height: 50px;
        padding: 0 20px;

        color: $text-contrast;
        background-color: $background-dark;
        .copyright {
            display: block;
            margin-right: auto;
        }
        a {
            color: $text-contrast;
        }
    }

    .dropdown-menu {
        display: flex;
        flex-direction: column;

        max-height: 300px;
        min-width: 220px;

        border-radius: 8px;
        background-color: $background-accent;
        padding: 4px;
        user-select: none;

        box-shadow: 0px 6px 12px rgb(0, 0, 0, 0.3);

        .item {
            text-align: start;
            min-width: 0;
            height: 24px;
            user-select: none;
            border-radius: 4px;
            padding-left: 24px;
            padding-right: 4px;

            color: $text-contrast;
            background-color: transparent;

            &:hover {
                text-decoration: underline;
                background-color: $background-hover;
            }
        }

        .icon {
            height: 13px;
            width: 13px;
        }
    }
</style>
