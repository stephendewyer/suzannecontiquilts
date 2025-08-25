<script>
	import { onDestroy, beforeUpdate, afterUpdate, onMount } from 'svelte';
	import quilts from '$lib/data/quilts.json';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import QuiltResultsPanel from '$lib/components/quiltsResultsPanel/QuiltResultsPanel.svelte';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import SearchInput from '$lib/components/inputs/SearchInput.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import RadioButtons from '$lib/components/inputs/RadioButtons.svelte';
  	import Tabs from '$lib/components/tabPanel/Tabs.svelte';
	import TabPanel from '$lib/components/tabPanel/Panel.svelte';
	import ClearFiltersButton from "$lib/components/buttons/CancelButton.svelte";
	import patterns from "$lib/data/patterns.json";
	import techniques from "$lib/data/techniques.json";
	import options from "$lib/data/options.json";
	import SearchToggleButton from "$lib/components/buttons/SearchToggleButton.svelte";
	import { v4 as uuidv4 } from "uuid";
  	import ArrowButton from '../../lib/components/buttons/ArrowButton.svelte';
	import { PUBLIC_DOMAIN } from '$env/static/public';

	let searchFormIsActive = false;

	onMount(() => {
		if (innerWidth <= 1200) {
			searchFormIsActive = false;
		} else if (innerWidth > 1200) {
			searchFormIsActive = true;
		};	
	});

	// initialize the active quilts tab to 0
	let activeQuiltsTab = 0;

	let searchQuilts = [];

	// create a new array from quilts with search terms

	$: searchQuilts = quilts.map((quilt) => ({
		...quilt,
		searchTerms: {
			name: `${quilt.name}`,
			patterns: quilt.patterns,
			techniques: quilt.techniques
		}
	}));

	const sortByAlpha = (items) => {
		const sortedItems = items.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		const sortedItemsWithIDs = sortedItems.map((item, index) => ({
			...item, id: index
		}));
		return sortedItemsWithIDs;
	};

	let techniquesByAlpha = sortByAlpha(techniques);

	let patternsByAlpha = sortByAlpha(patterns);

	// begin filters

	// initialize the searchStore FILTER BEFORE SORT!!

	$: searchStore = createSearchStore(searchQuilts);

	$: unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	$: filteredQuilts = ($searchStore.filtered) ? $searchStore.filtered : searchQuilts;

	let searchValue = "";
	let quiltPatternsSearchValues = [];
	let quiltTechniquesSearchValues = [];

	// load all the selected patterns in an array

	// initialize the pagination activePageID to 0
	let activePageID = 0;

	// initialize the search quilts by name input value change variable to false
	let searchValueChanged = false;

	// if the search quilts by name input value has changed, 
	// update the searchStore.search value to empty input value
	// update the pagination activePageID to first page (0)
	// finally, update searchValueChanged to false
	$: if (searchValueChanged) {
		$searchStore.search.name = searchValue;
		activePageID = 0;
		searchValueChanged = false;
	};

	// if the user changes a checkbox, set activePageID to 0 and updated the checkboxValueChanged to false

	let checkboxValueChanged = false;

	$: if (checkboxValueChanged) {

		activePageID = 0;
		
		afterUpdate(() => {
			quiltPatternsSearchValues = [];
			// load all the selected patterns in an array
			patternsByAlpha.forEach((item) => {
				if (item.value === true) {
					quiltPatternsSearchValues = [...quiltPatternsSearchValues, item.label];
				};
			});
			quiltTechniquesSearchValues = [];
			// load all the selected techniques in an array
			techniquesByAlpha.forEach((item) => {
				if (item.value === true) {
					quiltTechniquesSearchValues = [...quiltTechniquesSearchValues, item.label];
				};
			});
		});
		
		checkboxValueChanged = false;

	};

	$: $searchStore.search.patterns = [...quiltPatternsSearchValues];

	$: $searchStore.search.techniques = [...quiltTechniquesSearchValues];

	let clearFiltersClicked = false;

	$: if (clearFiltersClicked) {
		// clear the search quilts by name input value if not empty
		if (searchValue !== "") {
			searchValue = "";
			searchValueChanged = true;
		};

		// clear the quilt patterns search input values
		quiltPatternsSearchValues = [];

		// clear the quilt techniques search input values
		quiltTechniquesSearchValues = [];
		
		// clear the techniques filters
		techniquesByAlpha.forEach((technique, index) => {
			techniquesByAlpha[index].value = false;
		});

		// clear the patterns filters
		patternsByAlpha.forEach((pattern, index) => {
			patternsByAlpha[index].value = false;
		});
		// finally, update clear filter clicked variable to false
		clearFiltersClicked = false;
	};

	// sort the filtered quilts SORT AFTER FILTER!!

	let radioValue = "alphabetical";

	let sortedAndFilteredQuilts = [];

	$: if (radioValue === "alphabetical") {
		const quiltsByAlpha = filteredQuilts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
		sortedAndFilteredQuilts = [...quiltsByAlpha];
	} else if (radioValue === "latest") {
		const quiltsByLatest = filteredQuilts.sort((a, b) => {
			return new Date(b.date_finished) - new Date(a.date_finished);
		}); 
		sortedAndFilteredQuilts = [...quiltsByLatest];
	} else if (radioValue === "earliest") {
		const quiltsByEarliest = filteredQuilts.sort((a, b) => {
			return new Date(a.date_finished) - new Date(b.date_finished);
		});
		sortedAndFilteredQuilts = [...quiltsByEarliest];
	};
	
	let quiltsBySuzanneConti = [];

	let quiltsBySuzanneContiAncestors = [];

	// clear quilts by Suzanne Conti and quilts by Suzanne Conti ancestors before update to avoid duplication

	beforeUpdate(() => {
		quiltsBySuzanneConti = [];
		quiltsBySuzanneContiAncestors = [];
	});

	// create new arrays for quilts by Suzanne Conti and quilts by ancestors of Suzanne Conti

	$: sortedAndFilteredQuilts.forEach((quilt) => {
		if (quilt.quilter === "Suzanne Conti") {
			quiltsBySuzanneConti = [...quiltsBySuzanneConti, quilt];
		} else {
			quiltsBySuzanneContiAncestors = [...quiltsBySuzanneContiAncestors, quilt];
		};
	});

	let quiltsTabPanels = [];

	$: quiltsTabPanels = [
		{
			id: uuidv4(),
			index: 0,
			label: "all quilts",
			panel: QuiltResultsPanel,
			data: sortedAndFilteredQuilts
		},
		{
			id: uuidv4(),
			index: 1,
			label: "quilts by Suzanne",
			panel: QuiltResultsPanel,
			data: quiltsBySuzanneConti
		},
		{
			id: uuidv4(),
			index: 2,
			label: "Suzanne's ancestors' quilts",
			panel: QuiltResultsPanel,
			data: quiltsBySuzanneContiAncestors
		}
	];

	let y = 0;
	let innerWidth = 0;
	let searchContainerHeight = 0;
	let searchHeight = 0;
	let quiltsNavHeight = 0;
	let searchQuiltsNavBarElement;
	let searchContainerElement;
	let searchContainerTopPosition = 0;
    let quiltsTabsSticky = false;
	let searchContainerSticky = false;
    let currentQuiltsTabsStickyPosition = 0;
	let searchAbsolutePosition = 0;
	let searchAbsolute = false;
	let clearFiltersButtonHeight = 0;
	let quiltSearchResultsHeight = 0;
	let mobileScrollableSearchHeight = 0;
	let scrollableSearchHeight = 0;
	let innerHeight = 0;

    onMount(() => {
		searchContainerTopPosition = searchContainerElement?.getBoundingClientRect().top + window.scrollY;
		currentQuiltsTabsStickyPosition = searchQuiltsNavBarElement?.getBoundingClientRect().top + window.scrollY;
    });

	afterUpdate(() =>  {
		mobileScrollableSearchHeight =  innerHeight - (searchContainerElement?.getBoundingClientRect().top) - clearFiltersButtonHeight;
		searchAbsolutePosition = searchContainerElement?.getBoundingClientRect().top + window.scrollY + (searchContainerHeight - searchHeight- quiltsNavHeight);
	});

    $: if (quiltSearchResultsHeight <= searchHeight) {
		// quilt search results height is less than search container = no search absolute position
		// handle for both mobile and desktop
		searchAbsolute = false;
		searchContainerSticky = false;
		if (y > currentQuiltsTabsStickyPosition) {
			quiltsTabsSticky = true;
		} else if (y <= currentQuiltsTabsStickyPosition) {
			quiltsTabsSticky = false;
		};
	} else if (quiltSearchResultsHeight > (scrollableSearchHeight + clearFiltersButtonHeight)) {
		// quilt search results height is more than search container = include search absolute position
		if (innerWidth <= 1200) {
			// mobile = no search absolute position
			searchAbsolute = false;
			if (y > currentQuiltsTabsStickyPosition) {
				quiltsTabsSticky = true;
				searchContainerSticky = true;
			} else if (y <= currentQuiltsTabsStickyPosition) {
				quiltsTabsSticky = false;
				searchContainerSticky = false;
			};
		} else if (innerWidth > 1200) {
			if ((y > currentQuiltsTabsStickyPosition) && (y > searchAbsolutePosition)) {
				quiltsTabsSticky = true;
				searchContainerSticky = true;
				searchAbsolute = true;
			} else if (y > currentQuiltsTabsStickyPosition && y <= searchAbsolutePosition) {
				quiltsTabsSticky = true;
				searchContainerSticky = true;
				searchAbsolute = false;
			} else if (y <= currentQuiltsTabsStickyPosition && y <= searchAbsolutePosition) {
				quiltsTabsSticky = false;
				searchContainerSticky = false;
				searchAbsolute = false;
			};
		};
	};

	$: scrollableSearchHeight = innerHeight - clearFiltersButtonHeight - searchContainerTopPosition;

	let pageElement;

	const windowResizeHandler = () => {
		currentQuiltsTabsStickyPosition = pageElement?.getBoundingClientRect().top + window.scrollY;
		searchContainerTopPosition = searchContainerElement?.getBoundingClientRect().top + window.scrollY;
	};

	let disableClearFiltersButton = false;

	$: if (searchValue !== "") {
		disableClearFiltersButton = false;
	} else if (quiltPatternsSearchValues.length > 0) {
		disableClearFiltersButton = false;
	} else if (quiltTechniquesSearchValues.length > 0) {
		disableClearFiltersButton = false;
	} else {
		disableClearFiltersButton = true;
	};

	
</script>

<svelte:head>
	<title>Quilt Gallery | Suzanne Conti Quilts</title>
	<meta name="description" content="Browse the quilt gallery by Suzanne Conti and her ancestors. Each quilt tells a story through patterns, fabrics, and craftsmanship." />
	<link rel="canonical" href="https://suzannecontiquilts.vercel.app/quilts" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Quilt Gallery | Suzanne Conti Quilts" />
	<meta property="og:description" content="Browse the quilt gallery by Suzanne Conti and her ancestors. Each quilt tells a story through patterns, fabrics, and craftsmanship." />
	<meta property="og:url" content="https://suzannecontiquilts.vercel.app/quilts" />
	<meta property="og:image" content={`${PUBLIC_DOMAIN}${quiltHeader}`} />
</svelte:head>
<svelte:window 
	bind:innerWidth 
	bind:scrollY={y} 
	bind:innerHeight
	on:resize={() => windowResizeHandler()}
/>
<div 
	class="page"
	bind:this={pageElement}
>
	<div 
		id="quilts_nav_bar"
		bind:this={searchQuiltsNavBarElement}
		class={quiltsTabsSticky ? "search_quilts_nav_bar_sticky" : "search_quilts_nav_bar_relative"}
		bind:clientHeight={quiltsNavHeight}
	>
		<div class="toggle_filters_and_sort_container">
			<SearchToggleButton bind:searchFormIsActive />
		</div>
		<div class="quilts_tabs_container">
			<Tabs
				tabPanels={quiltsTabPanels}
				bind:activeTab={activeQuiltsTab}
				bind:activePageID={activePageID}
			/>
		</div>
		{#if (innerWidth <= 1200)}
			<div 
				id="quilts_search_form_container_mobile"
				class="{(searchFormIsActive) ? "quilt_search_form_container_open" : "quilt_search_form_container_closed"}"
				style={ searchFormIsActive ? `height: ${searchHeight}px; top: ${quiltsNavHeight}px;` : `height: 0px; top: ${quiltsNavHeight}px;` }
				bind:this={searchContainerElement}
				bind:clientHeight={searchContainerHeight}
			>
				<form 
					id="search"
					noValidate 
					autoComplete="off"
					on:submit|preventDefault
					bind:clientHeight={searchHeight}
				>
					<div 
						class="scrollable_search_container"
						style={`height: ${mobileScrollableSearchHeight}px;`}
					>
						<ArrowButton bind:openFilters={searchFormIsActive} />
						<h2>filters</h2>
						<div class="filters">
							<SearchInput 
								bind:searchValue={searchValue}
								bind:searchValueChanged={searchValueChanged}
							>
								search quilts by name
							</SearchInput>
							<div class="inputs_container">
								<h3 class="category_name">
									techniques
								</h3>
								<div class="checkboxes">
									{#each techniquesByAlpha as technique, i}
										<Checkbox 
											bind:checked={technique.value}
											bind:value={technique.label}
											bind:valueChanged={checkboxValueChanged}
										>
											{technique.label}
										</Checkbox>
									{/each}
								</div>
								<h3 class="category_name">
									patterns
								</h3>
								<div class="checkboxes">
									{#each patternsByAlpha as pattern, index}
										<Checkbox 
											bind:value={pattern.label}
											bind:checked={pattern.value}
											bind:valueChanged={checkboxValueChanged}
										>
											{pattern.label}
										</Checkbox>
									{/each}
								</div>
							</div>
						</div>
						<div class="sort">
							<h2>sort</h2>
							<div class="radio_buttons">
								<RadioButtons 
									options={options}
									bind:userSelected={radioValue}
								/>
							</div>
						</div>
					</div>
					<div 
						class="clear_filters_container"
						bind:clientHeight={clearFiltersButtonHeight}
					>
						<ClearFiltersButton 
							bind:clicked={clearFiltersClicked}
							disabled={disableClearFiltersButton}>
							clear filters
						</ClearFiltersButton>
					</div>
				</form>
			</div>
		{/if}
	</div>
	<div 
		class="quilt_search_and_results"
		style={searchContainerSticky ? `padding-top: ${quiltsNavHeight}px;` : "padding-top: 0px;"}
	>
		{#if (innerWidth > 1200)}
			<div 
				id="quilts_search_form_container"
				class="{(searchFormIsActive) ? "quilt_search_form_container_open" : "quilt_search_form_container_closed"}"
				style={ (innerWidth <= 1200) ? searchFormIsActive ? `height: ${searchHeight}px` : 'height: 0px;' : "" }
				bind:this={searchContainerElement}
				bind:clientHeight={searchContainerHeight}
			>
				<form 
					id="search"
					noValidate 
					autoComplete="off"
					on:submit|preventDefault
					bind:clientHeight={searchHeight}
					class={ searchContainerSticky ? !searchAbsolute ? "search_sticky" : "search_absolute" : "search_relative" }
					style={ searchContainerSticky ? searchAbsolute ? "" : `top: ${quiltsNavHeight}px;` : "top: 0;"}
				>
					<div 
						class="scrollable_search_container"
						style={`height: ${scrollableSearchHeight}px;`}
					>
					<ArrowButton bind:openFilters={searchFormIsActive} />
					<h2>filters</h2>
						<div class="filters">
							<SearchInput 
								bind:searchValue={searchValue}
								bind:searchValueChanged={searchValueChanged}
							>
								search quilts by name
							</SearchInput>
							<div class="inputs_container">
								<h3 class="category_name">
									techniques
								</h3>
								<div class="checkboxes">
									{#each techniquesByAlpha as technique, i}
										<Checkbox 
											bind:checked={technique.value}
											bind:value={technique.label}
											bind:valueChanged={checkboxValueChanged}
										>
											{technique.label}
										</Checkbox>
									{/each}
								</div>
								<h3 class="category_name">
									patterns
								</h3>
								<div class="checkboxes">
									{#each patternsByAlpha as pattern, index}
										<Checkbox 
											bind:value={pattern.label}
											bind:checked={pattern.value}
											bind:valueChanged={checkboxValueChanged}
										>
											{pattern.label}
										</Checkbox>
									{/each}
								</div>
							</div>
						</div>
						<div class="sort">
							<h2>sort</h2>
							<div class="radio_buttons">
								<RadioButtons 
									options={options}
									bind:userSelected={radioValue}
								/>
							</div>
						</div>
					</div>
					<div 
						class="clear_filters_container"
						bind:clientHeight={clearFiltersButtonHeight}
					>
						<ClearFiltersButton 
							bind:clicked={clearFiltersClicked}
							disabled={disableClearFiltersButton}
						>
							clear filters
						</ClearFiltersButton>
					</div>
				</form>
			</div>
		{/if}
		<div 
			class="quilt_search_results"
			bind:clientHeight={quiltSearchResultsHeight}
		>
			<TabPanel
				tabPanels={quiltsTabPanels}
				bind:activeTab={activeQuiltsTab}
				bind:activePageID={activePageID}
			/>
		</div>
	</div>
</div>

<style>
	.page {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	#quilts_nav_bar {
		padding: 0;
		background-color: #F2D7F9;
		width: 100%;
	}

	.search_quilts_nav_bar_relative {
		position: relative;
	}

	.search_quilts_nav_bar_sticky {
		position: fixed;
		top: 0;
		z-index: 1;
	}

	#quilts_search_form_container {
		position: relative;
		background-color: #FBECEC;
		width: 26rem;
		min-width: 26rem;
		will-change: margin-left;
		transition: margin-left 0.3s ease-out;
	}

	#quilts_search_form_container_mobile {
		position: absolute;
		background-color: #FBECEC;
		top: 0;
	}

	.quilt_search_form_container_open {
		margin-left: 0;
	}

	.quilt_search_form_container_closed {
		margin-left: -26rem;
	}

	#search {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: center;
	}

	.search_absolute {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.search_relative {
		position: relative;
		width: 100%;
	}

	.search_sticky {
		position: fixed;
		width: 26rem;
	}

	.scrollable_search_container {
		overflow-y: auto;
	}

	.toggle_filters_and_sort_container {
		position: absolute;
		padding: 0.5rem 1rem;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.quilts_tabs_container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.category_name {
		padding: 1rem 0;
		margin: 0 auto;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.checkboxes {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.radio_buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}

	.inputs_container {
		padding: 0;
	}

	.clear_filters_container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
		width: 100%;
		padding: 1rem;
		border-top: 1px;
        border-right: 0;
        border-left: 0;
        border-bottom: 0;
        border-style: solid;
        border-color: #3B3E29;
	}

	.filters {
		background-color: #FBECEC;
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.sort {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 0 1rem 0;
		background-color: #DCE0E5;
		width: 100%;
	}

	.quilt_search_and_results {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.quilt_search_results {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		padding: 0 1rem;
	}

	@media (max-width: 1200px) {

		/* begin mobile quilt search  */

		#quilts_nav_bar {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.toggle_filters_and_sort_container {
			position: relative;
			right: 0;
			top: 0;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: flex-end;
		}

		.quilt_search_and_results {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}
		
		.quilt_search_results {
			padding: 0.75rem;
		}

		#quilts_search_form_container_mobile {
			position: absolute;
			width: 100%;
			overflow-y: hidden;
			will-change: height;
        	transition: height 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
			min-width: 100%;
			z-index: 1;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.quilt_search_form_container_open {
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 100%;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		.quilt_search_form_container_closed {
			width: 100%;
			min-width: 100%;
			margin-left: 0;
			height: 0;
			will-change: height;
			overflow: hidden;
			transition: height 0.3s ease-out;
		}

		#search {
			position: relative;
		}

		.scrollable_search_container {
			position: relative;
			overflow-y: auto;
		}

		.sort {
			padding: 0 0.75rem 0.75rem 0.75rem;
			width: 100%;
			min-width: 100%;
		}

		.category_name {
			padding: 1rem 0;
			font-size: 1.175rem;
		}

	}

	@media (max-width: 750px) {

		.toggle_filters_and_sort_container {
			padding: 0.25rem;
		}

		.category_name {
			font-size: 1rem;
		}

		/* begin mobile quilt search  */

		.filters {
			padding: 0.5rem;
		}

		.filters {
			gap: 0.5rem;
		}

		.sort {
			gap: 0.25rem;
			padding: 0 0.5rem 0.25rem 0.5rem;
		}

		.inputs_container {
			padding: 0;
		}

		.radio_buttons {
			padding: 0 0.25rem;
		}

		/* end mobile quilt search */

		.quilt_search_results {
			padding: 0.5rem;
		}
	}

</style>
