<script lang="ts">
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<main>
    <header>
        <h1>{data.form.name}</h1>
    </header>
    <slot />
</main>

<style lang="scss">
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;

        width: 100vw;
        padding: 0 16px;
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
    }
</style>
