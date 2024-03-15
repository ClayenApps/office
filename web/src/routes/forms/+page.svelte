<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<svelte:head>
    <title>ClayenForms</title>
</svelte:head>

<main>
    {#each data.forms as form, i}
        {@const too_early = form.opens_at && form.opens_at > new Date()}
        {@const too_late = form.closes_at && form.closes_at < new Date()}
        {@const locked = too_early || too_late}
        {@const has_detail = form.opens_at || form.closes_at || form.time_limit}

        <a
            class="card"
            href={locked ? undefined : `/forms/id${form.id}`}
            class:locked
            class:completed={form.completed}
        >
            <header>
                <div class="icon" class:rounded={has_detail}>
                    {#if form.completed}
                        <img src="/icons/check.svg" alt="Completed" />
                    {:else if form.kind === "survey"}
                        <img src="/icons/survey.svg" alt="Survey" />
                    {:else if form.kind === "test"}
                        <img src="/icons/test.svg" alt="Test" />
                    {/if}
                </div>
                <h1>
                    <span>{form.name}</span>
                </h1>
                <button on:click|preventDefault={() => (form.favourite = !form.favourite)}>
                    <img
                        src={`/icons/favourite-${form.favourite ? "full" : "empty"}.svg`}
                        alt="Favourite"
                    />
                </button>
                {#if form.owns}
                    <button
                        on:click|preventDefault={() => {
                            form.name = prompt("Type new name", form.name) ?? form.name;
                        }}
                    >
                        <img src="/icons/rename.svg" alt="Rename" />
                    </button>
                    <button
                        on:click|preventDefault={() => {
                            data.forms.splice(i, 1);
                            data.forms = data.forms;
                        }}
                    >
                        <img src="/icons/delete.svg" alt="Delete" />
                    </button>
                {/if}
            </header>
            {#if has_detail}
                <ul class="details">
                    {#if form.opens_at !== undefined}
                        <li>
                            <b>Opens:</b>
                            <span>
                                {form.opens_at.toLocaleString("ru-RU", {
                                    dateStyle: "short",
                                    timeStyle: "short"
                                })}
                            </span>
                            {#if too_early}
                                <img src="/icons/lock.svg" alt="Closed" />
                            {/if}
                        </li>
                    {/if}
                    {#if form.closes_at !== undefined}
                        <li>
                            <b>Closes:</b>
                            <span>
                                {form.closes_at.toLocaleString("ru-RU", {
                                    dateStyle: "short",
                                    timeStyle: "short"
                                })}
                            </span>
                            {#if too_late}
                                <img src="/icons/lock.svg" alt="Closed" />
                            {/if}
                        </li>
                    {/if}
                    {#if form.time_limit !== undefined}
                        <li>
                            <b>Time limit:</b>
                            <span>{form.time_limit} minutes</span>
                        </li>
                    {/if}
                </ul>
            {/if}
        </a>
    {/each}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 32px;

        width: min(100vw, $md);
        padding: 20px 20px 56px 20px;
    }

    .card {
        display: flex;
        flex-direction: column;

        border: 1px solid $border-light;
        border-radius: 8px;
        overflow: hidden;

        --color: #{$primary};
        &.locked {
            cursor: not-allowed;
            --color: #{$disabled};
        }
        &.completed {
            --color: #{$success};
        }

        color: $text;
        text-decoration: none;
        &:hover {
            border-color: var(--color);
        }

        header {
            display: flex;
            align-items: center;
            gap: 16px;
            padding-right: 16px;

            .icon {
                background-color: var(--color);
                padding: 12px;
                img {
                    width: 32px;
                    height: 32px;
                    filter: invert(1);
                }
                &.rounded {
                    border-end-end-radius: 8px;
                }
            }
            h1 {
                display: -webkit-box;
                -webkit-box-orient: vertical;

                gap: 8px;
                margin-right: auto;

                font-size: 21px;
                line-height: 24px;
                font-weight: bold;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;

                span {
                    text-overflow: ellipsis;
                    margin-right: 4px;
                }
            }
            button {
                flex: 0 0 36px;
                width: 36px;
                height: 36px;
                img {
                    width: 100%;
                    height: 100%;
                    &[src$="full.svg"] {
                        filter: invert(100%) sepia(85%) saturate(2356%) hue-rotate(336deg);
                    }
                }
                padding: 4px;

                cursor: pointer;
                border-radius: 4px;
                background-color: transparent;
                &:hover {
                    background-color: #eee;
                }
            }
        }

        .details {
            display: flex;
            flex-direction: column;
            gap: 8px;

            padding: 12px;
            margin: 16px 12px 16px 12px;

            background-color: #f0f0f0;
            border-radius: 4px;

            b {
                font-weight: bold;
            }
            img {
                display: inline;
                width: 18px;
                height: 18px;
                margin-left: 4px;
                vertical-align: sub;
            }
        }
    }
</style>
