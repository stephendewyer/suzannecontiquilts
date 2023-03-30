<script>
    import { page } from '$app/stores';
    import quilts from '$lib/data/quilts.json';
    import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
    import { onMount } from 'svelte';
    // Default theme
    import '@splidejs/svelte-splide/css/skyblue';

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
        fixedWidth: '100%',
        rewind: true,
        autoplay: true,
        arrows: false,
    };

    const thumbsOptions = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : false,
        fixedWidth  : 120,
        fixedHeight : 70,
        cover       : true,
        isNavigation: true,
        updateOnMove: true,
        focus      : 'center'
    }

    onMount( () => {
    if ( main && thumbs ) {
      main.sync( thumbs.splide );
    }
  } );

  // end Splide

</script>

<svelte:head>
	<title>{title} - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
</svelte:head>

<div class="quilt">
    {#each quilts as quilt, i}
        {#if pageSlug === quilt.slug}
            <div class="main_splide_container">
                <Splide 
                    aria-label="quilt images" 
                    options={ mainOptions } 
                    bind:this={ main }
                >
                    {#each quilt.images as quiltImage, ix}
                        <SplideSlide>
                            <img 
                                class="slide_image"
                                src={`/images/quilts/${quiltImage}`} 
                                alt="{quilt.name} image {ix}" 
                            />
                        </SplideSlide>
                    {/each} 
                </Splide> 
            </div>
            <div class="thumbnails_splide_container">
                <div class="thumbnails">
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
                </div>
            </div> 
            <h2>{quilt.name}</h2>
        {/if}
    {/each}

</div>
<style>
    .main_splide_container {
        max-width: 2000px;
        width: 100%;
        height: auto;
        max-height: 1333px;
        overflow: hidden;
        margin: 0 auto 2rem auto;
    }

    .slide_image {
        width: 100%;
        height: 100%;
        max-height: 1333px;
        object-fit: cover;
    }

    .thumbnails_splide_container {
        width: 100%;
        max-width: 2000px;
    }

    .thumbnails {
        padding: 0 10rem;
    }

    @media (max-width: 750px) {

        .main_splide_container {
            margin: 0 0 1rem 0;
        }
        .thumbnails {
            padding: 0 1rem;
        }
    }

</style>