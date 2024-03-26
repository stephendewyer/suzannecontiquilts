<script>
	import { onDestroy, afterUpdate } from 'svelte';
	import quilts from '$lib/data/quilts.json';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import stitches from '$lib/images/icons/stitches.svg';
	import QuiltCard from '$lib/components/cards/QuiltCard.svelte';

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
	$: console.log("Page is", page);

	$: filteredQuilts = ($searchStore.filtered) ? $searchStore.filtered : searchQuilts;

	$: searchValue = ""

	const paginate = (items) => {
		console.log(items);

		const pages = Math.ceil(items.length / quiltsPerPage);

		const paginatedItems = Array.from({ length: pages }, (_, index) => {
			const start = index * quiltsPerPage;
			return items.slice(start, start + quiltsPerPage);
		});

		console.log("paginatedItems are", paginatedItems);
		pageCount = [...paginatedItems];
	}

	afterUpdate(() => {
		paginate(filteredQuilts);
		
	});

	const searchSubmitHandler = (event) => {
		event.preventDefault();
	}

	const inputSearchHandler = () => {
		page = 0;
		activePageId = page;
		$searchStore.search = searchValue;	
	}

	const setPage = (p) => {
		if (p >= 0 && p < pageCount.length) {
			page = p;
			activePageId = page;
			quilts_cont.scrollIntoView({
				behavior: 'smooth'
			});
		}
	}
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
			<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.18 568.32">
			<defs>
				<style>.cls-1{fill:#15060B;}</style>
			</defs>
			<path class="cls-1" d="M301.3,300.76L40.62,561.44c-9.17,9.17-24.03,9.17-33.2,0l-.54-.54c-9.17-9.17-9.17-24.03,0-33.2l243.54-243.54L6.88,40.62C-2.29,31.45-2.29,16.59,6.88,7.42l.54-.54C16.59-2.29,31.45-2.29,40.62,6.88L301.3,267.56c9.17,9.17,9.17,24.03,0,33.2Z"/></svg>
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
				onSubmit={searchSubmitHandler}
			>
            <input 
              id="quilt_search"
              type="search" 
              name="quilt_search" 
              class="search_input"
              placeholder="quilt title"
			  bind:value={searchValue}
			  on:keyup={inputSearchHandler}
			  on:input={inputSearchHandler}
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
		<nav class="pagination">
			<ul>
				<li>
					<button 
						type="button"
						disabled={page === 0} 
						on:click={() => setPage(page = 0)}
						class="paginationButton"
					>
						first
					</button>
				</li>
				<li>
					<button
						type="button"
						disabled={page === 0} 
						on:click={() => setPage(page - 1)}
						class="paginationButton"
					>
						previous
					</button>
				</li>
				{#each pageCount as page, i}
					<li>
						<button
							type="button"
							on:click={() => setPage(i)}
							class={activePageId == i ? "activePaginationButton" : "paginationButton"}
						>
							{i + 1}
						</button>
					</li>
				{/each}
				<li>
					<button
						type="button"
						disabled={page >= pageCount.length - 1}
						on:click={() => setPage(page + 1)}
						class="paginationButton"
					>
						next
					</button>
				</li>
				<li>
					<button 
						type="button"
						disabled={page >= pageCount.length - 1} 
						on:click={() => setPage(pageCount.length - 1)}
						class="paginationButton"
					>
						last
					</button>
				</li>
			</ul>
		</nav> 
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
	}

	.arrow_hovered {
		width: 1.5rem;
	}

	.arrow > svg > path {
    	fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;
	}

	.arrow_hovered > svg > path {
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

	.search_input {
		height: 3rem;
		width: 100%;
		font-size: 1.75rem;
		background-color: #ECF7FA;
		border-color: #3B3E29;
		border-width: 3px;
		border-style: solid;
		padding: 0.25rem 1rem 0.25rem 2.75rem;
		background-image: url('$lib/images/icons/magnifying_glass.svg');
		background-size: 1.5rem;
		background-repeat: no-repeat;
		background-position: 10px center;
		transition: border-color 0.3s ease-out;
	}
	
	.search_input:focus {
		outline: none;
		border-color: #BAE1D7;
	}

	/* end quilt search */

	/* begin pagination */

	.pagination {
		margin: 1rem auto 2rem auto;
	}

	ul {
		list-style: none;
		margin: 0;
		box-sizing: border-box;
		padding-inline-start: 0;
		margin-block-start: 0;
    	margin-block-end: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	li {
		float: left;
	}

	button {
		font-size: 1.75rem;
		/* margin: auto auto 1rem auto; */
	}

	.paginationButton {
		background: transparent;
		border-width: 1px;
		padding: 0.5rem 1rem;
		margin-left: 0.3rem;
		cursor: pointer;
		border-style: dashed;
	}

	.activePaginationButton {
		background: transparent;
		border-width: 3px;
		border-style: dashed;
		padding: 0.5rem 1rem;
		margin-left: 0.3rem;
		cursor: pointer;
	}

  	/* end pagination */

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

		.search_input {
			font-size: 1.25rem;
			border-width: 2px;
		}

		/* end mobile quilt search */

		/* begin mobile pagination */

		.pagination {
			margin: 1rem;
		}

		ul {
			flex-wrap: wrap;
		}

		button {
			font-size: 1rem;
			margin: 0.5rem auto auto auto;
		}

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

		.search_input {
			font-size: 1.25rem;
			border-width: 2px;
		}

		/* end mobile quilt search */

		/* begin mobile pagination */

		.pagination {
			margin: 1rem;
		}

		ul {
			flex-wrap: wrap;
		}

		button {
			font-size: 1rem;
			margin: 0.5rem auto auto auto;
		}

		/* end mobile pagination */
	}

</style>
