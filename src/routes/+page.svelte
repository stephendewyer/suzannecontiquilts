<script>
	import quiltBanner from '$lib/images/quilts/Oregon/Suzanne_Conti_Oregon_04.jpg';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import floatingQuilt from '$lib/images/quilts/floating_quilts/Suzanne_Conti_Massachusetts_floating.png';
	import PrimaryButton from "$lib/components/buttons/PrimaryButton.svelte";
	import { PUBLIC_DOMAIN } from '$env/static/public';
</script>

<svelte:head>
	<title>Suzanne Conti Quilts | Fine Quilts & Textile Art</title>
	<meta name="description" content="Quilts by Suzanne Conti and her ancestors, blending tradition and artistry into fine textile works." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="canonical" href="https://suzannecontiquilts.vercel.app/" />
	<meta property="og:title" content="Suzanne Conti Quilts | Fine Quilts & Textile Art" />
	<meta property="og:image" content={`${PUBLIC_DOMAIN}${quiltHeader}`} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://suzannecontiquilts.vercel.app/" />
</svelte:head>

<section>
	<div class="index_banner">
		<a href="/quilts/oregon" aria-label="link to Oregon Quilt page">
			<img src={quiltBanner} alt="Oregon Quilt banner" />
		</a>
	</div>
	<h1>quilts by Suzanne Conti and her ancestors</h1>
	<div class="see_quilts_button_container">
		<a href="/quilts" aria-label="link to Suzanne Conti Quilts quilts page">
			<PrimaryButton>
				all quilts
			</PrimaryButton>
		</a>
	</div>
	<div class="index_quilt_floating">
		<a href="/quilts/massachusetts" aria-label="link to Massachusetts Quilt">
			<img src={floatingQuilt} alt="Massachusetts Quilt floating" />
		</a>
	</div>
	<div class="about_Suzanne_Conti">
		<p>
			Suzanne made quilts for almost every state in the United States using techniques derived from generations. The quilts spread to homes of friends and family across the United States.
		</p> 
		<a href="/about" aria-label="link to Suzanne Conti Quilts about page">
			<PrimaryButton>
				learn about Suzanne
			</PrimaryButton>
		</a>
	</div>
	<div class="contact">
		<h2>Have something to share?</h2>
		<p>Suzanne would like to hear from you.</p>
		<a href="/contact" aria-label="link to contact Suzanne Conti page">
			<PrimaryButton>
				contact Suzanne
			</PrimaryButton>
		</a>
	</div>
</section>

<style>

	.index_banner {
		width: 100%;
		max-width: 2000px;
		margin: 0 auto 0 auto;
	}

	.index_quilt_floating {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto 0 auto;
	}

	h1 {
		font-size: 4rem;
		padding: 1rem;
		margin: 0 auto;
		max-width: 60rem;
	}

	.about_Suzanne_Conti {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.see_quilts_button_container {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.contact {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	@media screen and (max-width: 720px) {
		h1 {
			font-size: 2rem;
		}
	}

</style>
