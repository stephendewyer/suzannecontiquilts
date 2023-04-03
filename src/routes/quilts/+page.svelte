<script>
	import quilts from '$lib/data/quilts.json';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
</script>

<svelte:head>
	<title>search quilts - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
	<meta property="og:image" content="{quiltHeader}" />
</svelte:head>

<div>
	<div class="quilts_container">
		{#each quilts as quilt, i}
			<div class="quilt_card_container">
				<a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}">
					<img 
						class="quilt_thumbnail"
						src="/images/quilts/thumbnails{quilt.images[0]}" 
						alt="{quilt.name} thumbnail" 
					/>
				</a>
				<div class="quilt_info_container">
					<a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}">
						<h2 class="quilt_name">
							{quilt.name}
						</h2>
					</a>
					<a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}">
						<PrimaryButton>
							view
						</PrimaryButton>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.quilts_container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		max-width: 2000px;
		width: 100%;
		margin: 1rem auto auto auto;
	}

	.quilt_card_container {
		background-color: #FDFCE8;
		max-width: 24rem;
		width: 100%;
		margin: auto 1rem 3rem 1rem;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
	}

	.quilt_thumbnail {
		width: 100%;
		height: 16rem;
		object-fit: cover;
	}

	.quilt_info_container {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.quilt_name {
		text-align: center;
		color: #15060B;
		margin: 0 auto 1rem auto;
	}

</style>
