<script>
    import { page } from '$app/stores';
    import quilts from '$lib/data/quilts.json';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import { onMount } from 'svelte';
    // Default theme
    import '@splidejs/svelte-splide/css/core';

    // begin set title for header

    const pagePath = $page.url.pathname;

    const pageSlug = pagePath.slice(8);

    let title = "";

    let quilt01 = [];

    for (quilt01 of quilts) {
        if (pageSlug === quilt01.slug) {
            title = quilt01.name;
        }
    }

    // end set title for header

    // begin Splide

    let main = Splide;
    let thumbs = SplideSlide;

    const mainOptions = {
        type      : 'loop',
        perPage   : 1,
        perMove   : 1,
        gap       : '1rem',
        pagination: false,
        height    : 'auto',
        width: '100%',
        rewind: true,
        autoplay: true,
    };

    const thumbsOptions = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : false,
        fixedWidth  : 110,
        fixedHeight : 70,
        cover       : true,
        focus       : 'center',
        isNavigation: true,
        updateOnMove: true,
    }

    onMount( () => {
    if ( main && thumbs ) {
      main.sync( thumbs.splide );
    }
  } );

</script>

<svelte:head>
	<title>{title} - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
</svelte:head>

<div class="quilt">
    {#each quilts as quilt, i}
        {#if pageSlug === quilt.slug}
            <h2>{quilt.name}</h2>
            <Splide 
                aria-label="quilt images" 
                options={ mainOptions } 
                bind:this={ main }
            >
                {#each quilt.images as quiltImage, ix}
                    <SplideSlide>
                        <img src={`/images/quilts/${quiltImage}`} alt="{quilt.name} image {ix}" />
                    </SplideSlide>
                {/each} 
            </Splide>
            <Splide 
                aria-label="quilt thumbnails" 
                options={ thumbsOptions }
                bind:this={ thumbs }
            >
                { #each quilt.images as quiltImage, ix}
                    <SplideSlide>
                        <img src={`/images/quilts/${quiltImage}`} alt="{quilt.name} image {ix}">
                    </SplideSlide>
                { /each }
            </Splide>

                        
        {/if}
    {/each}
</div>
<style>

</style>