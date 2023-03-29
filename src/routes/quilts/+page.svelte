<script>
	import quilts from '$lib/data/quilts.json';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
</script>

<svelte:head>
	<title>search quilts - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
</svelte:head>

<div>
	<div class="quilts_container">
		{#each quilts as quilt, i}
			<div class="quilt_card_container">
				<img 
					class="quilt_thumbnail"
					src="/images/quilts/thumbnails{quilt.images[0]}" 
					alt="{quilt.name} thumbnail" 
				/>
				<div class="quilt_info_container">
					<h2 class="quilt_name">
						{quilt.name}
					</h2>
					<PrimaryButton>
						view
					</PrimaryButton>
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
