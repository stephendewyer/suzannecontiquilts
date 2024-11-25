<script>
    import SewingNeedle from "$lib/images/icons/sewing_needle_icon.svg?raw";
    export let tabPanels = [];
    export let activeTab = 0;
    export let activePageID = 0;

    const tabSelected = (tabIndex) => {
        activeTab = tabIndex;
        activePageID = 0;
    };

    let sewingNeedleHeight = 0;

    let sewingNeedleWidth = 0;

</script>

<ul class="tabs_container">
    {#each tabPanels as tab, i}
        <li
            class={activeTab === tab.index ? "active_tab" : "tab"}
            on:click={tabSelected(tab.index)}
            on:keydown={tabSelected(tab.index)}
            id={`tabpanel_header_${tab.label}`}
        >   
            <p class="label">
                {tab.label}
            </p>
            {#if (activeTab === tab.index)}
                <div 
                    class="sewing_needle_container" 
                    bind:clientHeight={sewingNeedleHeight}
                    bind:clientWidth={sewingNeedleWidth}
                >
                    {@html SewingNeedle}
                </div>
            {:else}
                <div style={`height: ${sewingNeedleHeight}px; min-width: ${sewingNeedleWidth}px;`} />
            {/if}
        </li>
    {/each}
</ul>

<style>

    .tabs_container {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0.25rem 0;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    li {
        position: relative;
        pointer-events: all;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        max-width: 15rem;
        margin: 0;
        cursor: pointer;
        gap: 0.5rem;
    }

    .label {
        position: relative;
        font-size: 1.25rem;
        font-weight: 600;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: color 300ms ease-out, opacity 300ms linear; 
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .tab {
        color: rgb(59, 62, 41);
        opacity: 65%;
    }

    .tab:active {
        color: #858B6A;
    }

    .tab:hover {
        color: #ED6545;
        transition: color 300ms ease-out;
    }

    .active_tab {
        opacity: 100%;
        color: #3B3E29;
        transition: color 300ms ease-out;
    }

    .active_tab:active {
        color: #858B6A;
    }

    .active_tab:hover {
        color: #ED6545;
        transition: color 300ms ease-out;
    }

    .active_tab > .sewing_needle_container {
        fill: #3B3E29;
        transition: fill 300ms ease-out;
    }

    .active_tab:active > .sewing_needle_container {
        fill: #858B6A;
    }

    .active_tab:hover > .sewing_needle_container {
        fill: #ED6545;
		transition: fill 300ms ease-out;
    }

    .sewing_needle_container {
        position: relative;
        width: 10rem;
        display: flex;
        transition: fill 300ms ease-out;
    }

    @media (max-width: 1200px) {

        .tabs_container {
            gap: 0.75rem;
        }

        .label {
            font-size: 1.175rem;
        }

    }

    @media (max-width: 750px) {

        .tabs_container {
            gap: 0.5rem;
            padding: 0 0.5rem;
        }

        .label {
            font-size: 1rem;
            min-width: 5rem;
        }

        .sewing_needle_container {
            width: 100%;
            max-width: 5rem;
            text-align: center;
        }
        
    }
</style>