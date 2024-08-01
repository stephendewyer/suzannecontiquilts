<script>
    import Pagination from "$lib/components/pagination/Pagination.svelte";
    import QuiltCard from "$lib/components/cards/QuiltCard.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { onDestroy, afterUpdate } from "svelte";

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
<div style="width: 100%;">
    <div 
        class="quilts_container" 	
        bind:this={quilts_cont}	
    >
        {#if (pending)}
            <div class="loading_spinner_container">
                <LoadingSpinner/>
            </div>
        {:else}
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
        {/if}
    </div>
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
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
        gap: 1rem;
	}

    .quilt_card_container {
        width: 32.5%;
    }

	.loading_spinner_container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

    @media (max-width: 1900px) {
        .quilt_card_container {
            width: 48%;
        }
    }

    @media screen and (max-width: 1200px) {
        .quilts_container {
            gap: 0.75rem;
        }
    }

    @media (max-width: 750px) {
        .quilt_card_container {
            width: 100%;
        }

        .quilts_container {
            gap: 0.5rem;
        }
    }

</style>