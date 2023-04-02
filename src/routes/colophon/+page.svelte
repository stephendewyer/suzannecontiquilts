<script>
    import quiltPattern from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_04.jpg';
    import stitches from '$lib/images/icons/stitches.svg';
</script>

<svelte:head>
	<title>colophon - Suzanne Conti Quilts</title>
	<meta name="description" content="about the Suzanne Conti Quilts website" />
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
        <p>
            Suzanne Conti Quilts is designed, developed, maintained and deployed by <a href="https://artintechservices.com" target="_blank"  rel="noopener noreferrer" aria-label="link to Art in Tech Services Inc website" >Art in Tech Services Inc</a>.<br /><br />
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
        padding: 1rem 2rem 3rem 2rem;
		width: 100%;
        max-width: 45rem;
		background-color: rgba(255,255,255,0.7);
		border-radius: 3rem;
	}

    .colophon_heading_container {
        display: flex;
        flex-direction: column;
        align-items: center;
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