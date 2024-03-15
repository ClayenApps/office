<script lang="ts">
    import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
    import Options from "./Options.svelte";

    export let data: PageServerData;

    let now = new Date();
    $: time = data.form.closes_at ? formatTimeDiff(now, data.form.closes_at) : undefined;

    onMount(() => {
        now = new Date();
        let interval = setInterval(() => {
            now = new Date();
        }, 500);
        return () => {
            clearInterval(interval);
        };
    });

    function formatTimeDiff(d1: Date, d2: Date): string {
        const diff_ms = Math.abs(d1.getTime() - d2.getTime());
        let seconds = formatNum((diff_ms / 1000) % 60);
        let minutes = formatNum((diff_ms / 60000) % 60);
        let hours = formatNum(diff_ms / 3600000);
        return `${hours}:${minutes}:${seconds}`;

        function formatNum(n: number): string {
            n = Math.floor(n);
            return n.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        }
    }
</script>

<svelte:head>
    <title>{data.form.name} - ClayenForms</title>
</svelte:head>

<main>
    <header>
        <h1>{data.form.name}</h1>
        {#if time}
            <span>{time}</span>
        {/if}
    </header>
    <section class="questions">
        {#each data.questions as { title, options, multiple, required }}
            <section class="card">
                <header>
                    <span>{title}</span>
                    {#if required}
                        <span class="required">*</span>
                    {/if}
                </header>
                <Options {options} {multiple} {required} />
            </section>
        {/each}
    </section>
    <section class="submit">
        <button>Submit</button>
    </section>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 32px;
        padding-bottom: 56px;

        > header {
            display: flex;
            align-items: center;
            padding: 0 20px;

            width: 100vw;
            height: 60px;

            border-bottom: 1px solid $border-light;

            h1 {
                font-size: 21px;
                margin-right: auto;
            }
        }
        > section {
            width: min(100vw, $md);
            padding: 0 16px;

            &.questions {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            &.submit {
                display: flex;
                justify-content: space-between;
                button {
                    padding: 8px 16px;
                    color: $text-contrast;
                    background-color: $background-accent;
                    border-radius: 4px;
                    &:hover {
                        background-color: $background-hover;
                    }
                }
            }
        }
    }
    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;

        border: 1px solid $border-light;
        border-radius: 4px;
        padding: 16px;

        span {
            &.required {
                color: #db0f0f;
            }
        }
    }
</style>
