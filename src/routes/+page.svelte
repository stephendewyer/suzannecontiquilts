<script>
	import quiltBanner from '$lib/images/quilts/Nebraska/Suzanne_Conti_Nebraska_07.jpg';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import floatingQuilt from '$lib/images/quilts/floating_quilts/Suzanne_Conti_Massachusetts_floating.png';
</script>

<svelte:head>
	<title>index - Suzanne Conti Quilts</title>
	<meta name="description" content="Suzanne Conti Quilts index" />
	<meta property="og:image" content={quiltHeader} />
</svelte:head>

<section>
	<div class="index_banner">
		<a href="/quilts/nebraska" aria-label="link to Nebraska Quilt page">
			<img src={quiltBanner} alt="Nebraska Quilt banner" />
		</a>
	</div>
	<div class="index_quilt_floating">
		<a href="/quilts/massachusetts" aria-label="link to Massachusetts Quilt">
			<img src={floatingQuilt} alt="Massachusetts Quilt floating" />
		</a>
	</div>
</section>

<style>

	.index_banner {
		width: 100%;
		max-width: 2000px;
		margin: 0 auto 2rem auto;
	}

	.index_quilt_floating {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto 2rem auto;
	}

</style>
