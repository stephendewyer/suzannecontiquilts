<script>
    import SewingNeedle from "$lib/images/icons/sewing_needle_icon.svg?raw";
    export let tabPanels = [];
    export let activeTab = 0;

    const tabSelected = (tabIndex) => {
        activeTab = tabIndex;
    };

</script>

<ul class="tabs_container">
    {#each tabPanels as tab, i}
        <li
            class={activeTab === tab.index ? "active_tab" : "tab"}
            on:click={tabSelected(tab.index)}
            on:keydown={tabSelected(tab.index)}
            id={`tabpanel_header_${tab.label}`}
        >
            {tab.label}
            {#if (activeTab === tab.index)}
                <div class="sewing_needle_container">
                    {@html SewingNeedle}
                </div>
            {/if}
        </li>
    {/each}
</ul>

<style>

    .tabs_container {
        list-style: none;
        margin: 0;
        padding: 0 1rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        font-size: 1.5rem;
    }

    .tab {
        color: #3B3E29;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: flex-end;
        width: 100%;
        max-width: 12rem;
        padding-bottom: 0.15rem;
        cursor: pointer;
        transition: color 300ms ease-out;
    }

    .tab:hover {
        color: #ED6545;
        transition: color 300ms ease-out;
    }

    .active_tab {
        color: #3B3E29;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: flex-end;
        width: 100%;
        max-width: 12rem;
        cursor: pointer;
        transition: color 300ms ease-out;
    }

    .active_tab:hover {
        color: #ED6545;
        transition: color 300ms ease-out;
    }

    .active_tab > .sewing_needle_container {
        fill: #3B3E29;
        transition: fill 300ms ease-out;
    }

    .active_tab:hover > .sewing_needle_container {
        fill: #ED6545;
		transition: fill 300ms ease-out;
    }

    .sewing_needle_container {
        width: 10rem;
        height: 0.15rem;
        text-align: center;
    }

    @media (max-width: 1200px) {

    }

    @media (max-width: 750px) {
        .tabs_container {
            gap: 0.5rem;
            font-size: 1.25rem;
        }

        .tab {
            padding-bottom: 0.2rem;
        }

        .sewing_needle_container {
            width: 5rem;
            height: 0.2rem;
            text-align: center;
        }
    }
</style>