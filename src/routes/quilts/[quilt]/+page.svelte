<script>
    import { page } from '$app/stores';
    import quilts from '$lib/data/quilts.json';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import { onMount } from 'svelte';
    import '@splidejs/svelte-splide/css/skyblue';
    import stitches from '$lib/images/icons/stitches.svg';

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
            <div class="quilt_details">
                <h2 class="quilt_title">
                    {quilt.name}
                    <div class="underline_stitches">
                        <img src={stitches} alt="stitches"/>
                    </div>
                </h2>
                <div class="quilt_info">
                    <ul>  
                        <li class="quilt_info_list_item list_item_background">
                            <h3 class="quilt_info_heading">
                                Date started: 
                            </h3>
                            {#if (quilt.date_start !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.date_start}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item">
                            <h3 class="quilt_info_heading">
                                Date finished:
                            </h3>
                            {#if (quilt.date_finished !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.date_finished}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item list_item_background">
                            <h3 class="quilt_info_heading">
                                Size:
                            </h3>
                            {#if (quilt.size !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.size}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item">
                            <h3 class="quilt_info_heading">
                                Techniques:
                            </h3>
                            <p class="quilt_info_paragraphs">
                                {#if quilt.machine_pieced !== (null || false)}
                                    machine pieced
                                {/if}
                                {#if quilt.machine_pieced !== (null || false) && (quilt.hand_quilted !== (null || false)) || (quilt.applique !== (null || false)) || (quilt.paper_pieced !== (null || false))}
                                ,
                                {/if}
                                {#if quilt.hand_quilted !== (null || false)}
                                    hand quilted
                                {/if}
                                {#if quilt.hand_quilted !== (null || false) && (quilt.applique !== (null || false)) || (quilt.paper_pieced !== (null || false))}
                                ,
                                {/if}
                                {#if quilt.applique !== (null || false)}
                                    applique
                                {/if}
                                {#if quilt.applique !== (null || false) && (quilt.paper_pieced !== (null || false))}
                                and
                                {/if}
                                {#if quilt.paper_pieced !== (null || false)}
                                    paper pieced
                                {/if}
                            </p>
                        </li>
                        <li class="quilt_info_list_item list_item_background">
                            <h3 class="quilt_info_heading">
                                Blocks:
                            </h3>
                            {#if (quilt.blocks !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.blocks}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item">
                            <h3 class="quilt_info_heading">
                                Orphan blocks:
                            </h3>
                            {#if (quilt.orphan_blocks !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.orphan_blocks}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item list_item_background">
                            <h3 class="quilt_info_heading">
                                Pattern:
                            </h3>
                            {#if (quilt.pattern !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.pattern}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item">
                            <h3 class="quilt_info_heading">
                                Details:
                            </h3>
                            {#if (quilt.details !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.details}
                                </p>
                            {/if}
                        </li>
                        <li class="quilt_info_list_item list_item_background">
                            <h3 class="quilt_info_heading">
                                Collection:
                            </h3>
                            {#if (quilt.collection !== (false || null))}
                                <p class="quilt_info_paragraphs">
                                    {quilt.collection}
                                </p>
                            {/if}
                        </li>
                    </ul>
                </div> 
            </div>
            
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
        margin: 0 auto;
    }

    .thumbnails {
        padding: 0 10rem;
    }

    .quilt_details {
        max-width: 40rem;
        width: 100%;
        padding: 0 1rem;
        margin: 1rem auto;
    }

    .quilt_title {
        width: 100%;
        margin: 4rem auto 1rem 2rem;
        text-align: center;
        font-size: 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .underline_stitches {
        width: 15rem;
        margin: 1rem auto auto auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .quilt_info {
        text-align: left;
        
    }

    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

    .quilt_info_list_item {
        display: flex;
        flex-direction: row;
        padding: 0.5rem 1rem;
    }

    .list_item_background {
        background-color: rgba(233, 237, 255, 0.5);
    }

    .quilt_info_heading {
        margin: 0;
        padding: 0 0.5rem 0 0;
        width: 40%;
        height: 100%;
        font-size: 1.75rem;
        text-align: left;
    }

    .quilt_info_paragraphs {
        margin: 0;
        width: 60%;
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