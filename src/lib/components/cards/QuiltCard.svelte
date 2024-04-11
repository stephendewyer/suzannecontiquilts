<script>
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
    import { afterUpdate } from 'svelte';
    import LoadingSpinner from '$lib/components/loadingSpinners/LoadingSpinner.svelte';
    export let quiltData;

    $: quiltData;
        
    const imageModules = import.meta.glob("$lib/images/thumbnails_quilts/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}", {
        eager: true
    });

    const imageUrls = Object.values(imageModules).map((module) => {
        return module.default;
    });

    $: quiltImageFileNameNoFileExtension = (quiltData.images[0].split(".")[0]).split("/")[2];

    $: imageSrc = imageUrls.filter((imageUrl) => {
        const splitImageUrl = imageUrl.split("/");
        const fileNameNoFileExtension = splitImageUrl[splitImageUrl.length - 1].split(".")[0];
        if (fileNameNoFileExtension === quiltImageFileNameNoFileExtension) {
            return imageUrl;
        } else {
            return;
        };
    });

    let cardHovered = false;

    const cardHoverHandler = () => {

        cardHovered = true;

    };

    const cardExitHandler = () => {

        cardHovered = false;

    };

    let pending = true;

    afterUpdate(() => {
        pending = false;
    })

</script>

{#if (pending)}
    <LoadingSpinner />
{:else}
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
            src={imageSrc} 
            alt="{quiltData.name} thumbnail" 
        />
        <div class="quilt_info_container">
            <PrimaryButton quiltCardIsHoveredProp={cardHovered}>
                {quiltData.name}
            </PrimaryButton>
        </div>
    </div>
{/if}

<style>
    .quilt_card {
		position: relative;
        width: 100%;
        margin: 0;
		height: 34rem;
        will-change: filter;
        transition: filter 0.2s linear;
		filter: none;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
	}

    .quilt_card_hovered {
		position: relative;
		width: 100%;
        height: 34rem;
        will-change: filter;
        transition: filter 0.2s linear;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
	}

	.quilt_thumbnail {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
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

	}

    @media (max-width: 1900px) {
        .quilt_card {
            height: 30rem;
        }

        .quilt_card_hovered {
            height: 30rem;
        }
    }

    @media (max-width: 1200px) {
        .quilt_card {
            height: 26rem;
        }

        .quilt_card_hovered {
            height: 26rem;
        }

    }

    @media (max-width: 750px) {

        .quilt_card {
            height: 22rem;
        }

        .quilt_card_hovered {
            height: 22rem;
        }
    }

</style>