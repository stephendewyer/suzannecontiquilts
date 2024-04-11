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
		quilts_cont.scrollIntoView({
				behavior: 'smooth'
		});
		pageChanged = false;
	};

    onDestroy(() => {
        panel_data = [];
    });

</script>
<div>
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
		justify-content: flex-start;
		/* gap: 1rem; */
		width: 100%;
		padding: 1rem;
	}

    .quilt_card_container {
        width: 33.33%;
        padding: 0.5rem;
    }

	.loading_spinner_container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

    @media (max-width: 1900px) {
        .quilt_card_container {
            width: 50%;
            padding: 0.5rem;
        }
    }

    @media (max-width: 750px) {
        .quilt_card_container {
            width: 100%;
            padding: 0.5rem;
        }
    }

</style>