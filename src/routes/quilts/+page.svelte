<script>
	import { onDestroy, beforeUpdate } from 'svelte';
	import quilts from '$lib/data/quilts.json';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import QuiltResultsPanel from '$lib/components/quiltsResultsPanel/QuiltResultsPanel.svelte';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import SearchInput from '$lib/components/inputs/SearchInput.svelte';
	import Arrow from '$lib/images/icons/arrow.svg?raw';
	import Filter from '$lib/images/icons/filter_icon.svg?raw';
	import Sort from '$lib/images/icons/sort_icon.svg?raw';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import RadioButtons from '$lib/components/inputs/RadioButtons.svelte';
  	import Tabs from '$lib/components/tabPanel/Tabs.svelte';
	import TabPanel from '$lib/components/tabPanel/Panel.svelte';
	import ClearFiltersButton from "$lib/components/buttons/CancelButton.svelte";
	import patterns from "$lib/data/patterns.json";
	import techniques from "$lib/data/techniques.json";
	import options from "$lib/data/options.json";

	import { v4 as uuidv4 } from 'uuid';

	let quiltSearchNavBarIsHovered = false;
	let searchFormIsActive = true;

	// techniques

	let appliqueChecked = false;
	let blockPiecingChecked = false;
	let handPiecedChecked = false;
	let handQuiltedChecked = false;
	let machinePiecedChecked = false;
	let paperPiecedChecked = false;

	// patterns

	let activeQuiltsTab = 0;

	let searchQuilts = [];

	$: searchQuilts = quilts.map((quilt) => ({
		...quilt,
		search_terms: `${quilt.name}`
	}));

	// begin filters

	// initialize the searchStore FILTER BEFORE SORT!!

	$: searchStore = createSearchStore(searchQuilts);

	$: unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	$: filteredQuilts = ($searchStore.filtered) ? $searchStore.filtered : searchQuilts;

	$: searchValue = "";

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

	let searchValueChanged = false;

	let activePageID = 0;

	$: activePageID;

	// $: console.log("active page ID: ", activePageID);

	$: if (searchValueChanged) {
		$searchStore.search = searchValue;
		activePageID = 0;
		searchValueChanged = false;
	};

	let clearFiltersClicked = false;

	$: if (clearFiltersClicked) {
		console.log("clear filters checked")
		flyingDutchmanChecked = false;
	};

	// $: console.log(flyingDutchmanChecked)

	const techniquesByAlpha = techniques.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));

	let flyingDutchmanChecked = false;
	let gypsyWifeChecked = false;
	let gardenChecked = false;
	let gardenMazeChecked = false;
	let allOverChecked = false;
	let pinwheelChecked = false;
	let oldMaidsPuzzleChecked = false;
	let hourGlassChecked = false;
	let squareInASquareChecked = false;
	let halfsquareTrianglesChecked = false;
	let hopeOfHartfordChecked = false;
	let castleWallChecked = false;
	let patienceCornerChecked = false;
	let toTheNinesChecked = false;
	let endlessStairsChecked = false;
	let starOfVirginiaChecked = false;
	let risingStarChecked = false;
	let illusionChecked = false;
	let centerIllusionChecked = false;
	let borderPianoKeysChecked = false;
	let notBlocksBorderChecked = false;
	let kaleidoscopeKitesChecked = false;
	let honeybeeChecked = false;
	let animalChecked = false;
	let letterChecked = false;
	let cornCobChecked = false;
	let NewYorkBeautyChecked = false;
	let halfcirclesChecked = false;
	let doubleAsterChecked = false;
	let nauticalFlagChecked = false;
	let snailsTrailChecked = false;
	let crownedCrossChecked = false;
	let dollyMadisonStarChecked = false;
	let coxeysCampChecked = false;
	let oldTippecanoeAndTylerTooChecked = false;
	let crownOfThornsChecked = false;
	let lincolnsLogCabinChecked = false;
	let mrsClevelandsChoiceChecked = false;
	let swingInTheCenterChecked = false;
	let courthouseStepsChecked = false;
	let patrioticFlagsChecked = false;
	let shermansMarchChecked = false;
	let lincolnsPlatformChecked = false;
	let brownGooseChecked = false;
	let wholeClothMedallionCenterChecked = false;
	let quatrefoilChecked = false;
	let centerPanelMedallionChecked = false;
	let loveInMistChecked = false;
	let kansasChecked = false;
	let sussanahChecked = false;
	let louisianaChecked = false;
	let attractionChecked = false;
	let callCrossingChecked = false;
	let cascadingQuarterLogCabinChecked = false;
	let tumblingChecked = false;
	let oddFellowChainChecked = false;
	let farmhouseFavoriteChecked = false;

	const sortPatternsByAlpha = (patterns) => {
		const sortedPatterns = patterns.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		const sortedPatternsWithIDs = sortedPatterns.map((pattern, i) => ({
			...pattern, id: i
		}));
		return sortedPatternsWithIDs;
	};

	let patternsByAlpha = [];

	$: patternsByAlpha = sortPatternsByAlpha(patterns);

	let selectedPatterns = patternsByAlpha.map(() => false);

	$: console.log("selected patterns: ", selectedPatterns)

	let quiltsBySuzanneConti = [];

	let quiltsBySuzanneContiAncestors = [];

	// clear quilts by Suzanne Conti and quilts by Suzanne Conti ancestors before update to avoid duplication

	beforeUpdate(() => {
		quiltsBySuzanneConti = [];
		quiltsBySuzanneContiAncestors = [];
	});

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
			label: "quilts by ancestors of Suzanne",
			panel: QuiltResultsPanel,
			data: quiltsBySuzanneContiAncestors
		}
	];

	// $: console.log(patternsByAlpha);

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
	<h2 class={(quiltSearchNavBarIsHovered) ? "search_heading_hovered": "search_heading"}>
		search
	</h2>
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
				<div class="filters">
					<div id="filter_button_container" class="button_container">
						<div class="icon_container">
							{@html Filter}
						</div>
						<p class="label">filter</p>
					</div>
					<SearchInput 
						bind:searchValue={searchValue}
						bind:searchValueChanged={searchValueChanged}
					>
						search quilts by name
					</SearchInput>
					<h3 class="category_name">
						techniques:
					</h3>
					<div class="checkboxes">
						{#each techniquesByAlpha as technique, i}
							<Checkbox bind:checked={technique.value}>
								{technique.label}
							</Checkbox>
						{/each}
					</div>
					<h3 class="category_name">
						patterns:
					</h3>
					<div class="checkboxes">
						{#each patternsByAlpha as pattern, index}
							<Checkbox bind:checked={selectedPatterns[index]}>
								{pattern.label}
							</Checkbox>
						{/each}
					</div>
					<div class="button_container">
						<ClearFiltersButton bind:clicked={clearFiltersClicked}>
							clear filters
						</ClearFiltersButton>
					</div>
				</div>
				<div class="sort">
					<div id="sort_button_container" class="button_container">
						<div class="icon_container">
							{@html Sort}
						</div>
						<p class="label">sort</p>
					</div>
					<h3 class="category_name">
						order by:
					</h3>
					<div class="checkboxes">
						<RadioButtons 
							options={options}
							bind:userSelected={radioValue}
						/>
					</div>
				</div>
				
          </form>
		</div>
	</div>
	<div class="{(searchFormIsActive) ? "quilt_search_results" : "quilt_search_results_full"}">
		<div class="quilts_tabs_container">
			<Tabs
				tabPanels={quiltsTabPanels}
				bind:activeTab={activeQuiltsTab}
				bind:activePageID={activePageID}
			/>
		</div>
		<TabPanel
			tabPanels={quiltsTabPanels}
			bind:activeTab={activeQuiltsTab}
			bind:activePageID={activePageID}
		/>
	</div>
</div>

<style>

	.category_name {
		padding: 1rem 0;
		margin: 0 auto;
		font-size: 1.5rem;
	}

	.checkboxes {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.search_heading {
		width: 100%;
		text-align: center;
		color: #3B3E29;
		will-change: color;
		transition: color 300ms ease-out;
	}

	.search_heading_hovered {
		width: 100%;
		text-align: center;
		color: #ED6545;
		will-change: color;
		transition: color 300ms ease-out;
	}

	.button_container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 0 0 0;
		gap: 0.5rem;
	}

	#filter_button_container {
		background-color: #FBECEC;
		padding: 0.5rem 1rem;
	}

	#sort_button_container {
		background-color: #DCE0E5;
		padding: 0.5rem 1rem;
	}

	.icon_container {
		width: 2rem;
		height: auto;
		color: #3B3E29;
		fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;	}

	.filters {
		background-color: #FBECEC;
		padding: 1rem;
	}

	.sort {
		background-color: #DCE0E5;
		padding: 1rem;
	}

	.label {
		font-size: 1.5rem;
		color: #3B3E29;
		will-change: color;
		transition: color 300ms ease-out;
	}

	.quilt_search_and_results {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.quilt_search_results {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 2rem;
		width: 100%;
		margin: 0;
	}

	.quilt_search_results_full {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 2rem;
		width: 100%;
		margin: 0;
	}

	/* begin quilt search  */

	.quilt_search_nav_bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 26rem;
		padding: 0;
		cursor: pointer;
		gap: 1rem;
	}

	.arrow_container_active {
		transform: rotateY(180deg);
		will-change: transform;
		transition: transform 300ms ease-out;
		margin: auto;
	}

	.arrow_container {
		transform: rotateY(0);
		will-change: transform;
		transition: transform 300ms ease-out;
		margin: auto;
	}

	.arrow {
		width: 1.25rem;
    	color: #3B3E29;
		fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;
	}

	.arrow_hovered {
		width: 1.25rem;
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
		width: 100%;
		will-change: transform;
		transform: translateX(0);
		transition: transform 0.3s ease-out;
		text-align: center;
	}

	.quilt_search_form_closed {
		position: relative;
		transform: translateX(-100%);
		width: 100%;
		will-change: transform;
		transition: transform 0.3s ease-out;
		text-align: center;
	}

	@media (max-width: 1200px) {

		/* begin mobile quilt search  */

		.quilt_search_nav_bar {
			justify-content: center;
			align-items: flex-start;
			width: auto;
			margin: 0 auto;
		}

		.quilt_search_and_results {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}

		.quilt_search_results {
			gap: 1.5rem;
			padding: 1rem 0 0 0;
		}

		.quilt_search_results_full {
			gap: 1.5rem;
			padding: 1rem 0 0 0;
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
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(0) translateX(0);
			transition: transform 0.3s ease-out;
		}

		.quilt_search_form_closed {
			position: relative;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(-100%) translateX(0);
			transition: transform 0.3s ease-out;
		}

	}

	@media (max-width: 750px) {

		.category_name {
			font-size: 1.25rem;
		}

		/* begin mobile quilt search  */

		.quilt_search_nav_bar {
			justify-content: center;
			align-items: flex-start;
			width: auto;
			margin: 0 auto;
		}

		.icon_container {
			width: 1.5rem;
			height: auto;
		}

		.icon_container_hovered {
			width: 1.5rem;
			height: auto;
		}

		.label {
			font-size: 1rem;
		}

		.label_hovered {
			font-size: 1rem;
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
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(0) translateX(0);
			transition: transform 0.3s ease-out;
		}

		.quilt_search_form_closed {
			position: relative;
			width: 100%;
			height: 100%;
			will-change: transform;
			transform: translateY(-100%) translateX(0);
			transition: transform 0.3s ease-out;
		}

		/* end mobile quilt search */

		.quilt_search_results {
			gap: 1rem;
		}

		.quilt_search_results_full {
			gap: 1rem;
		}

	}

</style>
