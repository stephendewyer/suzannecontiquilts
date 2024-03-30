<script>
    import SewingNeedle from "$lib/images/icons/sewing_needle_icon.svg?raw";
    export let tabPanels = [];
    export let activeTab = 0;

</script>

<ul class="tabs_container">
    {#each tabPanels as tab, i}
        <li
            class={activeTab === tab.index ? "active_tab" : "tab"}
            on:click={() => activeTab = tab.index}
            on:keydown={() => activeTab = tab.index}
            id={`tabpanel_header_${tab.label}`}
            role="tab"
            aria-selected={activeTab === i ? true : false}
            tabindex={-i}
        >
            {tab.label}
            <div class="sewing_needle_container">
                {@html SewingNeedle}
            </div>
        </li>
    {/each}
</ul>

<style>
    .sewing_needle_container {
        width: 3rem;
        height: 0.5rem;
    }
</style>