<script>
    import Pagination from "$lib/components/pagination/Pagination.svelte";
    import QuiltCard from "$lib/components/cards/QuiltCard.svelte";
    import LoadingSpinner from "$lib/components/loadingSpinners/LoadingSpinner.svelte";
    import { onDestroy, afterUpdate } from "svelte";

    export let panel_data;

    $: panel_data;

    let quilts_cont;
    let activePageId = 0;
	let page = 0;
	let pageCount = [];
	let currentPageQuilts = [];
	let quiltsPerPage = 8;

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
                <a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}" class="quilt_card_container">
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
        bind:activePageId={activePageId}
    />
</div>
<style>
    .quilt_card_container {
		width: auto;
	}

    /* end quilt search */

	.quilts_container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 1rem;
		max-width: 2000px;
		width: 100%;
		padding: 1rem;
		width: 0 auto;
	}

	.loading_spinner_container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

    @media (max-width: 1200px) {
        /* end mobile quilt search */

		.quilts_container {
			justify-content: center;
		}
    }

    @media (max-width: 750px) {
        .quilt_card_container {
			width: 100%;
		}
    }

</style>