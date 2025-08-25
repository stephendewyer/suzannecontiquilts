<script>
    import quiltPattern from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_04.jpg';
    import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
    import stitches from '$lib/images/icons/stitches.svg';
    import ArtInTechServicesLogo from "$lib/images/logo/Art_in_Tech_Services_logo.svg?raw";
    import { PUBLIC_DOMAIN } from '$env/static/public';
</script>

<svelte:head>
	<title>Colophon | Suzanne Conti Quilts</title>
    <meta name="description" content="Colophon for Suzanne Conti Quilts — learn about the design, development, and inspiration behind this website and quilting project." />
    <link rel="canonical" href="https://suzannecontiquilts.vercel.app/colophon" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="Colophon | Suzanne Conti Quilts" />
    <meta property="og:description" content="Discover the design, development, and creative credits behind the Suzanne Conti Quilts website." />
    <meta property="og:url" content="https://suzannecontiquilts.vercel.app/colophon" />
    <meta property="og:image" content={`${PUBLIC_DOMAIN}${quiltHeader}`} />
</svelte:head>

<section 
		class="quilt_pattern_background"
		style="background-image: url({quiltPattern});"
	>
    <div class="colophon_content_container">
        <div class="colophon_heading_container">
            <h1 class="colophon_heading">colophon</h1>
            <img 
                class="stitches"
                src="{stitches}" 
                alt="stitches" 
            />
        </div>
        <div class="Art_in_Tech_Services_section">
            <div class="Art_in_Tech_Services_logo">
                {@html ArtInTechServicesLogo}
            </div>
            <p class="Art_in_Tech_Services_paragraphs">
                Suzanne Conti Quilts is designed, developed, maintained and deployed by <a href="https://artintechservices.com" target="_blank"  rel="noopener noreferrer" aria-label="link to Art in Tech Services Inc website" >Art in Tech Services Inc</a>.
            </p>
        </div>
        <p >
            The site uses technologies including SvelteKit, SendGrid and Splide.  Vercel hosts the site.  The site's code repository is available on GitHub <a href="https://github.com/stephendewyer/suzannecontiquilts" target="_blank"  rel="noopener noreferrer" aria-label="link to Suzanne Conti Quilts GitHub repository" >HERE</a>.<br /><br />
        </p>
    </div>
    
</section>

<style>

    .quilt_pattern_background {
		width: 100%;
		position: relative;
		background-repeat: repeat-y;
		background-size: cover;
		padding: 2rem;
	}

    .colophon_content_container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem 2rem 3rem 2rem;
		width: 100%;
        max-width: 45rem;
		background: rgba(255,255,255,0.7);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
		border-radius: 3rem;
	}

    .colophon_heading_container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Art_in_Tech_Services_section {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .Art_in_Tech_Services_logo {
        color: #3B3E29;
        width: 100%;
    }

    .Art_in_Tech_Services_paragraphs {
        width: 100%;
    }

    .colophon_heading {
		margin: 0 auto;
		text-align: center;
		font-size: 2.5rem;
	}

	.stitches {
		max-width: 12rem;
		margin: 1rem auto;
	}

    @media (max-width: 750px) {


        .colophon_heading {
            margin: 0 auto;
            text-align: center;
            font-size: 1.5rem;
        }

        .stitches {
            max-width: 8rem;
            margin: 0.5rem auto;
        }
    }

</style>