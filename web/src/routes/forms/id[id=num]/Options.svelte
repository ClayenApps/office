<script lang="ts">
    export let multiple: boolean = false;
    export let required: boolean = false;

    export let options: string[];
    export let value: string | undefined | string[] = multiple ? [] : undefined;
</script>

<div>
    {#each options as option, i}
        <label>
            {#if multiple}
                <input
                    type="checkbox"
                    value={(Math.random() * 10000).toFixed(0)}
                    bind:group={value}
                />
            {:else}
                <input type="radio" value={(Math.random() * 10000).toFixed(0)} bind:group={value} />
            {/if}
            <span>{option}</span>
        </label>
    {/each}
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    label {
        display: flex;
        gap: 8px;
    }
</style>
