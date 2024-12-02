<script>
    import Pagination from "$lib/components/pagination/Pagination.svelte";
    import QuiltCard from "$lib/components/cards/QuiltCard.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { onDestroy, afterUpdate } from "svelte";
    import { fade } from "svelte/transition";

    export let panel_data;
    export let activePageID;

    $: panel_data;

    let quilts_cont;

	let page = 0;
	let pageCount = [];
	let currentPageQuilts = [];
	let quiltsPerPage = 9;

    let pending = true;

    const paginate = (items) => {
		const pages = Math.ceil(items.length / quiltsPerPage);

		const paginatedItems = Array.from({ length: pages }, (_, index) => {
			const start = index * quiltsPerPage;
			return items.slice(start, start + quiltsPerPage);
		});

		pageCount = [...paginatedItems];
	};

    // set the current page quilts use reactive

	$: currentPageQuilts = pageCount.length > 0 ? pageCount[page] : [];

	afterUpdate(() => {
        page = activePageID;;
		paginate(panel_data);
		pending = false;
	});

    let pageChanged = false;

    $: if (pageChanged) {
		pending = true;
		pageChanged = false;
	};

    onDestroy(() => {
        panel_data = [];
    });

</script>
<div 
    class="quilts_container"
    style="width: 100%;"
>
    {#if (pending)}
        <div class="loading_spinner_container">
            <LoadingSpinner/>
        </div>
    {:else}
        {#key activePageID}
            <div 
                class="quilts" 	
                bind:this={quilts_cont}	
                in:fade={{ delay: 250, duration: 300 }}
            >
                {#each currentPageQuilts as quilt, i}
                    <a 
                        class="quilt_card_container"
                        href={`/quilts/${quilt.slug}`} 
                        aria-label="link to ${quilt.name}"
                    >
                        <QuiltCard quiltData={quilt} />
                    </a>
                    {:else}
                        <p>No quilts fit search criteria.</p>
                {/each}
            </div>
        {/key}
    {/if}
    <Pagination 
        bind:page={page}
        bind:pageChanged={pageChanged}
        pageCount={pageCount} 
        bind:activePageID={activePageID}
    />
</div>
<style>

    /* end quilt search */

    .quilts_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

	.quilts {
		display: grid;
		width: 100%;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 1rem;
        row-gap: 1rem;
	}

    .quilt_card_container {
        width: 100%;
    }

	.loading_spinner_container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

    @media (max-width: 1900px) {
        .quilts {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 1200px) {
        .quilts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 1rem;
            row-gap: 1rem;
        }
    }

    @media screen and (max-width: 1080px) {
        .quilts {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            column-gap: 0.75rem;
            row-gap: 0.75rem;
        }
    }

    @media (max-width: 750px) {
        .quilt_card_container {
            width: 100%;
        }

        .quilts {
            grid-template-columns: repeat(1, minmax(0, 1fr));;
            column-gap: 0.5rem;
            row-gap: 0.5rem;
        }
    }

</style>