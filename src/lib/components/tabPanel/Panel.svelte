<script>
    export let tabPanels = [];
    export let activeTab = 0;
    export let activePageID = 0;
</script>

{#each tabPanels as tabPanel, i}
    {#if activeTab === tabPanel.index}
        <svelte:component
            this={tabPanel.panel}
            id={`${tabPanel.label}_tabpanel`}
            role="tabpanel"
            tabindex={-i}
            aria-labelledby={`tabpanel_header_${tabPanel.label}`}
            panel_data={tabPanel.data}
            bind:activePageID={activePageID}
        />
    {/if} 
{/each}