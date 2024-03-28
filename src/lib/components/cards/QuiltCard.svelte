<script>
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';

    export let quiltData;

    $: quiltData;

    let cardHovered = false;

    const cardHoverHandler = () => {

        cardHovered = true;

    };

    const cardExitHandler = () => {

        cardHovered = false;

    };

</script>

<div
    role="treeitem"
    aria-selected={cardHovered}
    on:focus={() => cardHoverHandler()}
    on:blur={() => cardExitHandler()}
    on:mouseenter={() => cardHoverHandler()}
    on:mouseover={() => cardHoverHandler()}
    on:mouseleave={() => cardExitHandler()}
    on:mouseout={() => cardExitHandler()}
    class={(cardHovered) ? "quilt_card_hovered" : "quilt_card"}
>
    <img 
        class="quilt_thumbnail"
        src="/images/quilts/thumbnails{quiltData.images[0]}" 
        alt="{quiltData.name} thumbnail" 
    />
    <div class="quilt_info_container">
        <PrimaryButton quiltCardIsHoveredProp={cardHovered}>
            {quiltData.name}
        </PrimaryButton>
    </div>
</div>

<style>
    .quilt_card {
		position: relative;
		max-width: 24rem;
        min-width: 24rem;
		height: 26rem;
		width: 100%;
        will-change: filter;
        transition: filter 0.2s linear;
		filter: none;
	}

    .quilt_card_hovered {
		position: relative;
		max-width: 24rem;
        min-width: 24rem;
		height: 26rem;
		width: 100%;
        will-change: filter;
        transition: filter 0.2s linear;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
	}

	.quilt_thumbnail {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: bottom;
	}

	.quilt_info_container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background: rgb(233,237,255);
		background: linear-gradient(0deg, rgba(233,237,255,1) 0%, rgba(233,237,255,0.7525385154061625) 35%, rgba(0,0,0,0) 100%);
	}

    @media (max-width: 750px) {
        .quilt_card {
            max-width: 100%;
            min-width: 100%;
        }

        .quilt_card_hovered {
            max-width: 100%;
            min-width: 100%;
        }
    }

</style>