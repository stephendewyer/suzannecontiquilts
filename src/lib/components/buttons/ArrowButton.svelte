<script>
    import Arrow from "$lib/images/icons/arrow.svg?raw";
    export let openFilters = false;
</script>

<button 
    id="toggle_filters_button_sidedrawer_container"
    class={openFilters ? "toggle_filters_button_sidedrawer_open" : "toggle_filters_button_sidedrawer_closed"}
    on:click={() => openFilters = !openFilters}
    on:keyup={() => openFilters = !openFilters}

>
    {@html Arrow}
</button>

<style>
    #toggle_filters_button_sidedrawer_container {
		position: absolute;
		right: 2rem;
		top: 1rem;
		width: 2rem;
		background: none;
		border: none;
		fill: #3B3E29;
		cursor: pointer;
        transition: transform 300ms ease-out, fill 0.3s linear;
	}

	#toggle_filters_button_sidedrawer_container:hover {
		fill: #ED6545;
	}

	.toggle_filters_button_sidedrawer_open {
		transform: rotate(180deg) rotateY(0deg);
	}

	.toggle_filters_button_sidedrawer_closed {
		transform: rotate(180deg) rotateY(180deg);
	}

	@media screen and (max-width: 1200px) {

		#toggle_filters_button_sidedrawer_container {
			right: 1rem;
		}
		.toggle_filters_button_sidedrawer_open {
			transform: rotate(270deg) rotateY(0deg);
		}

		.toggle_filters_button_sidedrawer_closed {
			transform: rotate(270deg) rotateY(180deg);
		}
	}
</style>