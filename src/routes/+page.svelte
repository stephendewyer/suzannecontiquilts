<script>
	import quiltBanner from '$lib/images/quilts/Nebraska/Suzanne_Conti_Nebraska_07.jpg';
	import floatingQuilt from '$lib/images/quilts/floating_quilts/Suzanne_Conti_Massachusetts_floating.png';
</script>

<svelte:head>
	<title>index - Suzanne Conti Quilts</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="index_banner">
		<img src={quiltBanner} alt="Nebraska Quilt banner" />
	</div>
	<div class="index_quilt_floating">
		<img src={floatingQuilt} alt="Massachusetts Quilt floating" />
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
