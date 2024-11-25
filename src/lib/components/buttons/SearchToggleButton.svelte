<script>
    import Arrow from '$lib/images/icons/arrow.svg?raw';
	import Filter from '$lib/images/icons/filter_icon.svg?raw';
	import Sort from '$lib/images/icons/sort_icon.svg?raw';

    export let searchFormIsActive = false;

    let quiltSearchNavBarIsHovered = false;

</script>

<button 
    class="toggle_filters_and_sort"
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
> 
    
    <div class="toggle_button_items">
        <div class="button_container">
            <div 
                class="icon_container"
                style={quiltSearchNavBarIsHovered ? "fill: #ED6545;" : "fill: #3B3E29;"}
            >
                {@html Filter}
            </div>
            <h3 
                class="label"
                style={quiltSearchNavBarIsHovered ? "color: #ED6545;" : "color: #3B3E29;"}
            >
                filters
            </h3>
        </div>
        <div class="button_container">
            <div 
                class="icon_container"
                style={quiltSearchNavBarIsHovered ? "fill: #ED6545;" : "fill: #3B3E29;"}
            >
                {@html Sort}
            </div>
            <h3 
                class="label"
                style={quiltSearchNavBarIsHovered ? "color: #ED6545;" : "color: #3B3E29;"}
            >
                sort
            </h3>
        </div>	
    </div>
    <div class="{(searchFormIsActive) ? "arrow_container_active" : "arrow_container"}">
        <div class="{(quiltSearchNavBarIsHovered) ? "arrow_hovered" : "arrow"}" >
            {@html Arrow}
        </div>
    </div>
</button>

<style>

    .toggle_filters_and_sort {
        background: none;
        border:  2px solid #3B3E29;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		gap: 1rem;
        transition: border 300ms ease-out;
        padding: 0.5rem 1rem;
	}

    .toggle_filters_and_sort:hover {
        border:  2px solid #ED6545;
    }

	.toggle_button_items {
		display: flex;
        flex-direction: row;
        align-items: center;
		gap: 0.5rem;
	}

	.arrow_container_active {
		transform: rotateY(180deg);
		will-change: transform;
		transition: transform 300ms ease-out;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.arrow_container {
		transform: rotateY(0);
		will-change: transform;
		transition: transform 300ms ease-out;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.arrow {
		width: 1rem;
    	color: #3B3E29;
		fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;
        padding: 0 0.125rem;
	}

	.arrow_hovered {
		width: 1rem;
		color: #ED6545;
    	fill: #ED6545;
		will-change: fill;
		transition: fill 300ms ease-out;
        padding: 0 0.125rem;
	}
    
	.button_container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	}

    .icon_container {
		width: 1rem;
		height: auto;
		color: #3B3E29;
		fill: #3B3E29;
		will-change: fill;
		transition: fill 300ms ease-out;	
	}

    .label {
		font-size: 1rem;
        margin: 0;
		font-weight: 800;
		color: #3B3E29;
		will-change: color;
		transition: color 300ms ease-out;
	}

    @media screen and (max-width: 1200px) {

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
            width: 0.9rem;
        }

        .arrow_hovered {
            width: 0.9rem;
        }

    }

    @media screen and (max-width: 720px) {

        .toggle_filters_and_sort {
            border-width: 1px;
        }

        .toggle_filters_and_sort:hover {
            border-width: 1px;
        }

        .icon_container {
			width: 0.8rem;
			height: auto;
		}

		.label {
			font-size: 0.85rem;
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
			width: 0.8rem;
		}

		.arrow_hovered {
			width: 0.8rem;
		}		

    }

</style>