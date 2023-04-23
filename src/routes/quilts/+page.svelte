<script>
	import quilts from '$lib/data/quilts.json';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';

	let quiltCardIsHovered = false;

	let hoveredQuiltCardId = null;

</script>

<svelte:head>
	<title>search quilts - Suzanne Conti Quilts</title>
	<meta name="description" content="search Suzanne Conti Quilts" />
	<meta property="og:image" content="{quiltHeader}" />
</svelte:head>

<div>
	<div class="quilts_container">
		{#each quilts as quilt, i}
			<div
				on:mouseover={() => {
					hoveredQuiltCardId = quilt.id;
				}} 
				on:focus={() => {
					hoveredQuiltCardId = quilt.id;
				}}
				on:blur={() => {
					hoveredQuiltCardId = null;
				}}
				on:mouseout={() => {
					hoveredQuiltCardId = null;
				}}
				class="quilt_card_container"
			>
			<a href={`/quilts/${quilt.slug}`} aria-label="link to ${quilt.name}">
				<img 
					class="quilt_thumbnail"
					src="/images/quilts/thumbnails{quilt.images[0]}" 
					alt="{quilt.name} thumbnail" 
				/>
				<div class="quilt_info_container">
					<h2 class="{hoveredQuiltCardId == quilt.id ? "quilt_name_hovered" : "quilt_name"}">
						{quilt.name}
					</h2>
					<PrimaryButton quiltCardIsHoveredProp={hoveredQuiltCardId == quilt.id ? quiltCardIsHovered = true : quiltCardIsHovered = false}>
						view
					</PrimaryButton>
				</div>
				</a>
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
		position: relative;
		max-width: 24rem;
		height: 26rem;
		width: 100%;
		margin: auto 1rem 3rem 1rem;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
	}

	.quilt_thumbnail {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: bottom;
	}

	.quilt_info_container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background: rgb(233,237,255);
		background: linear-gradient(0deg, rgba(233,237,255,1) 0%, rgba(233,237,255,0.7525385154061625) 35%, rgba(0,0,0,0) 100%);
	}

	.quilt_name {
		text-align: center;
		color: #15060B;
		margin: 0 auto 1rem auto;
		transition: all 600ms;
		will-change: color;
	}

	.quilt_name_hovered {
		text-align: center;
		color: #57766B;
		margin: 0 auto 1rem auto;
		transition: all 600ms;
		will-change: color;

	}

	@media (max-width: 750px) {
		.quilt_card_container {
			margin: auto 1rem 1rem 1rem;
		}
	}

</style>
