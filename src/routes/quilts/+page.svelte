<script>
	import quilts from '$lib/data/quilts.json';
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
					src="/src/lib/images/quilts/{quilt.images[0]}" 
					alt="{quilt.name} thumbnail" 
				/>
				<h2>
					{quilt.name}
				</h2>
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

</style>
