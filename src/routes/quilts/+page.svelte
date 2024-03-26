<script>
	import { onDestroy, afterUpdate } from 'svelte';
	import quilts from '$lib/data/quilts.json';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import stitches from '$lib/images/icons/stitches.svg';
	import QuiltCard from '$lib/components/cards/QuiltCard.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SearchInput from '$lib/components/inputs/SearchInput.svelte';
	import Arrow from '$lib/images/icons/arrow.svg?raw'

	let quilts_cont;
	let quiltSearchNavBarIsHovered = false;
	let searchFormIsActive = true;
	let activePageId = 0;
	let page = 0;
	let pageCount = [];
	let currentPageQuilts = [];
	let quiltsPerPage = 8;

	// sort the quilts by alphabetical order

	const quiltsByAlpha = quilts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

	const searchQuilts = quiltsByAlpha.map((quilt) => ({
		...quilt,
		search_terms: `${quilt.name}`
	}));

	const searchStore = createSearchStore(searchQuilts);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	// set the current page quilts use reactive

	$: currentPageQuilts = pageCount.length > 0 ? pageCount[page] : [];

	$: filteredQuilts = ($searchStore.filtered) ? $searchStore.filtered : searchQuilts;

	$: searchValue = "";

	const paginate = (items) => {

		const pages = Math.ceil(items.length / quiltsPerPage);

		const paginatedItems = Array.from({ length: pages }, (_, index) => {
			const start = index * quiltsPerPage;
			return items.slice(start, start + quiltsPerPage);
		});

		pageCount = [...paginatedItems];
	};

	afterUpdate(() => {
		paginate(filteredQuilts);
	});

	let pageChanged = false;

	$: if (pageChanged) {
		quilts_cont.scrollIntoView({
				behavior: 'smooth'
		});
		pageChanged = false;
	};

	let searchValueChanged = false;

	$: if (searchValueChanged) {
		page = 0;
		activePageId = page;
		$searchStore.search = searchValue;	
		searchValueChanged = false;
	};

</script>

<svelte:head>
	<title>search quilts - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
	<meta property="og:image" content="{quiltHeader}" />
</svelte:head>
<div 
	on:click={() => {
		searchFormIsActive = !searchFormIsActive;
	}}
	on:keydown={() => {
		searchFormIsActive = !searchFormIsActive;
	}}
	on:mouseover={() => {
		quiltSearchNavBarIsHovered = true;
	}} 
	on:focus={() => {
		quiltSearchNavBarIsHovered = true;
	}}
	on:blur={() => {
		quiltSearchNavBarIsHovered = false;
	}}
	on:mouseout={() => {
		quiltSearchNavBarIsHovered = false;
	}}
	class="quilt_search_nav_bar"
>
	<h1 
		class="{(quiltSearchNavBarIsHovered) ? "quilt_search_heading_hovered" : "quilt_search_heading"}"
	>
		search quilts
		<div class="underline_stitches">
			<img src={stitches} alt="stitches"/>
		</div>
	</h1>
	<div class="{(searchFormIsActive) ? "arrow_container_active" : "arrow_container"}">
		<div class="{(quiltSearchNavBarIsHovered) ? "arrow_hovered" : "arrow"}">
			{@html Arrow}
		</div>
	</div>
</div>
<div class="quilt_search_and_results">
	<div class="{(searchFormIsActive) ? "quilt_search_form_container_open" : "quilt_search_form_container_closed"}">
		<div class="{(searchFormIsActive) ? "quilt_search_form_open" : "quilt_search_form_closed"}">
			<form 
				class="search_form"
				noValidate 
				autoComplete="off"
				on:submit|preventDefault
			>
				<SearchInput 
					bind:searchValue={searchValue}
					bind:searchValueChanged={searchValueChanged}
				/>
          </form>
		</div>
	</div>
	
	<div class="{(searchFormIsActive) ? "quilt_search_results" : "quilt_search_results_full"}">
		<div 
			class="quilts_container" 	
			bind:this={quilts_cont}	
		>
			{#each currentPageQuilts as quilt, i}
				<a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}" class="quilt_card_container">
					<QuiltCard quiltData={quilt} />
				</a>
				{:else}
					<p>No quilts fit search criteria.</p>
			{/each}
		</div>
		<Pagination 
			bind:page={page}
			bind:pageChanged={pageChanged}
			pageCount={pageCount} 
			bind:activePageId={activePageId}
		/>
	</div>
</div>

<style>

	.quilt_card_container {
		width: auto;
	}

	.quilt_search_and_results {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.quilt_search_results {
		position: relative;
		width: 100%;
		margin: auto;
	}

	.quilt_search_results_full {
		position: relative;
		width: 100%;
	}

	/* begin quilt search  */

	.quilt_search_nav_bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 26rem;
		padding: 1rem;
		cursor: pointer;
	}

	.quilt_search_heading {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 0 auto 0 auto;
		padding: 0;
		will-change: color;
		transition: color 300ms ease-out;
	}

	.quilt_search_heading_hovered {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 0 auto 0 auto;
		padding: 0;
		color: #ED6545;
		will-change: color;
		transition: color 300ms ease-out;
	}

	.underline_stitches {
		width: 12rem;
	}

	.arrow_container_active {
		transform: rotateY(180deg);
		will-change: transform;
		transition: transform 300ms ease-out;
	}

	.arrow_container {
		transform: rotateY(0);
		will-change: transform;
		transition: transform 300ms ease-out;
	}

	.arrow {
		width: 1.5rem;
    	color: #3B3E29;
		fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;
	}

	.arrow_hovered {
		width: 1.5rem;
		color: #ED6545;
    	fill: #ED6545;
		will-change: fill;
		transition: fill 300ms ease-out;
	}

	.quilt_search_form_container_open {
		position: relative;
		width: 26rem;
		min-width: 26rem;
		margin-left: 0;
		will-change: margin-left;
		transition: margin-left 0.3s ease-out;
	}

	.quilt_search_form_container_closed {
		position: relative;
		width: 26rem;
		min-width: 26rem;
		margin-left: -26rem;
		will-change: margin-left;
		transition: margin-left 0.3s ease-out;
	}

	.quilt_search_form_open {
		position: relative;
		padding: 1rem;
		width: 100%;
		will-change: transform;
		transform: translateX(0);
		transition: transform 0.3s ease-out;
		text-align: center;
	}

	.quilt_search_form_closed {
		position: relative;
		padding: 1rem;
		transform: translateX(-100%);
		width: 100%;
		will-change: transform;
		transition: transform 0.3s ease-out;
		text-align: center;
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

	@media (max-width: 1200px) {

		/* begin mobile quilt search  */

		.quilt_search_nav_bar {
			justify-content: center;
			align-items: flex-start;
			width: auto;
			margin: 0 auto;
			padding: 0 1rem;
		}

		.quilt_search_and_results {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}

		.quilt_search_heading {
			margin: 0 1rem 0 auto;
		}

		.quilt_search_heading_hovered {
			margin: 0 1rem 0 auto;
		}

		.underline_stitches {
			width: 8rem;
		}

		.arrow_container_active {
			transform: rotateY(0) rotateX(180deg) rotate(90deg);
			will-change: transform;
			transition: transform 300ms ease-out;
		}

		.arrow_container {
			transform: rotateY(0) rotateX(0) rotate(90deg);
			will-change: transform;
			transition: transform 300ms ease-out;
		}

		.arrow {
			width: 1rem;
		}

		.arrow_hovered {
			width: 1rem;
		}

		.quilt_search_form_container_open {
			position: relative;
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 100%;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		.quilt_search_form_container_closed {
			position: relative;
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 0;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		.quilt_search_form_open {
			position: relative;
			padding: 1rem;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(0) translateX(0);
			transition: transform 0.3s ease-out;
		}

		.quilt_search_form_closed {
			position: relative;
			padding: 1rem;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(-100%) translateX(0);
			transition: transform 0.3s ease-out;
		}

		/* end mobile quilt search */

		.quilts_container {
			justify-content: center;
		}

	}

	@media (max-width: 750px) {

		.quilt_card_container {
			width: 100%;
		}

		/* begin mobile quilt search  */

		.quilt_search_nav_bar {
			justify-content: center;
			align-items: flex-start;
			width: auto;
			margin: 0 auto;
			padding: 0 1rem;
		}

		.quilt_search_heading {
			margin: 0 1rem 0 auto;
		}

		.quilt_search_heading_hovered {
			margin: 0 1rem 0 auto;
		}

		.underline_stitches {
			width: 8rem;
		}

		.arrow_container_active {
			transform: rotateY(0) rotateX(180deg) rotate(90deg);
			will-change: transform;
			transition: transform 300ms ease-out;
		}

		.arrow_container {
			transform: rotateY(0) rotateX(0) rotate(90deg);
			will-change: transform;
			transition: transform 300ms ease-out;
		}

		.arrow {
			width: 1rem;
		}

		.arrow_hovered {
			width: 1rem;
		}

		.quilt_search_form_container_open {
			position: relative;
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 100%;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		.quilt_search_form_container_closed {
			position: relative;
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 0;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		.quilt_search_form_open {
			position: relative;
			padding: 1rem;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(0) translateX(0);
			transition: transform 0.3s ease-out;
		}

		.quilt_search_form_closed {
			position: relative;
			padding: 1rem;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(-100%) translateX(0);
			transition: transform 0.3s ease-out;
		}

		/* end mobile quilt search */

	}

</style>
