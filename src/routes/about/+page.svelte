<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/skyblue';
	import stitches from '$lib/images/icons/stitches.svg';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import quiltPattern from '$lib/images/quilts/Michigan/Suzanne_Conti_Michigan_07.jpg';
	import aboutImage01 from '$lib/images/about/about-Suzanne_Conti_01.jpg';
	import aboutImage02 from '$lib/images/about/about-Suzanne_Conti_02.jpg';
	import aboutImage04 from '$lib/images/about/about-Suzanne_Conti_04.jpg';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import inspiration01 from '$lib/images/inspiration/inspiration-Katherine_Marie_Jurkiewicz.jpg';
	import inspiration02 from '$lib/images/inspiration/inspiration-grandson.jpg';
	import inspiration03 from '$lib/images/inspiration/inspiration-family.jpg';
	import inspiration04 from '$lib/images/inspiration/inspiration-Savannah,_Georgia.jpg';

	let hoveredInspoCardId = null;
	let quiltCardIsHovered = false;

	const inspiration = [
		{
			"id": 1,
			"name": "Suzanne's grandma Kate, Katherine Guzinski",
			"image": inspiration01,
			"alt": "portrait of Katherine Guzinski (Suzanne's grandma Kate)",
			"button": PrimaryButton,
			"path": "/quilts/Grandma_Kate_Quilt"
		},
		{
			"id": 2,
			"name": "grandson",
			"image": inspiration02,
			"alt": "photo of Suzanne Conti with grandson",
			"button": null,
			"path": null
		},
		{
			"id": 4,
			"name": "Savannah, Georgia",
			"image": inspiration04,
			"alt": "photo of an oak tree in Savannah, Georgia",
			"button": null,
			"path": null
		}
	];

	const options = {
		rewind  : true,
		gap     : '1rem',
		autoplay: true,
		type      : 'loop',
		arrows  : true,
		perPage: 1,
	}
</script>

<svelte:head>
	<title>about - Suzanne Conti Quilts</title>
	<meta name="description" content="about Suzanne Conti" />
	<meta property="og:image" content="{quiltHeader}" />
</svelte:head>

<div class="text-column">
	<section 
		class="quilt_pattern_background"
		style="background-image: url({quiltPattern});"
	>
		<div class="about_content_container">
			<div class="aboutCarousel">
				<Splide
					options={ options }
				>
					<SplideSlide>
						<img 
							class="aboutImage"
							src="{aboutImage01}"
							alt="about Suzanne Conti 01" 
						/>
					</SplideSlide>
					<SplideSlide>
						<img 
							class="aboutImage"
							src="{aboutImage02}"
							alt="about Suzanne Conti 02"
						/>
					</SplideSlide>
					<SplideSlide>
						<img 
							class="aboutImage"
							src="{aboutImage04}"
							alt="about Suzanne Conti 04"
						/>
					</SplideSlide>
				</Splide>
			</div>
			<div class="about_story">
				<h1 class="about_heading">
					about
				</h1>
				<img 
					src="{stitches}"
					class="stitches"
					alt="stitches"
				/>
				<p class="about_paragraphs">
					Suzanne Conti has been making quilts for friends and family for over twenty-five years.  Her quilts use techniques including applique, paper piecing, machine piecing and block piecing.  Suzanne has created quilts for almost every state in the U.S.<br /><br />
					Suzanne comes from a family of quilters.  Her patterns reflect the pinwheel style of that of her grandmother Kate&#39;s quilts.<br /><br />
					Suzanne was born in Detroit, Michigan and currently lives in Savannah, Georgia with her husband, Paul Conti.
				</p>
			</div>
		</div>
	</section>
	<section class="inspiration">
		<div class="inspiration_heading">
			<h2 class="inspiration_heading_text">
				inspiration
			</h2>
			<img 
				src="{stitches}"
				class="stitches"
				alt="stitches"
			/>
		</div>
		<div class="inspiration_container">
			{#each inspiration as item, i}
				{#if (item.button !== null)}
					<a href={`${item.path}`} class="inspiration_card_container">
						<div 
							on:mouseover={() => {
								hoveredInspoCardId = i;
							}} 
							on:focus={() => {
								hoveredInspoCardId = i;
							}}
							on:blur={() => {
								hoveredInspoCardId = null;
							}}
							on:mouseout={() => {
								hoveredInspoCardId = null;
							}}
						>
							<img 
								class="inspiration_thumbnail"
								src="{item.image}" 
								alt="{item.alt}"
							/>
							<div class="inspiration_info_container">
								<h3 class="inspiration_name">
									{item.name}
								</h3>
							</div>
						</div>
					</a>
				{:else }
					<div 
						class="inspiration_card_container"
					>
						<img 
							class="inspiration_thumbnail"
							src="{item.image}" 
							alt="{item.alt}"
						/>
						<div class="inspiration_info_container">
							<h3 class="inspiration_name">
								{item.name}
							</h3>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>
</div>

<style>

	.quilt_pattern_background {
		width: 100%;
		position: relative;
		background-repeat: repeat-y;
		background-size: cover;
		padding: 2rem;
	}

	.about_content_container {
		max-width: 2000px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.aboutCarousel {
		position: relative;
		width: 100%;
		max-width: 35rem;
	}

	.aboutImage {
		width: 100%;
		height: 100%;
		max-height: 28rem;
		object-fit: cover;
	}

	.about_story {
		padding: 1rem 2rem 3rem 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba(255,255,255,0.7);
		border-radius: 3rem;
	}

	.about_heading {
		margin: 0 auto;
		text-align: center;
		font-size: 2.5rem;
	}

	.stitches {
		max-width: 12rem;
		margin: 1rem auto;
	}

	.inspiration {
		margin: 2rem auto 2rem auto;
	}

	.inspiration_heading {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.inspiration_heading_text {
		margin: 0 auto;
	}

	.inspiration_container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		max-width: 2000px;
		width: 100%;
		margin: 1rem auto auto auto;
	}

	.inspiration_card_container {
		position: relative;
		max-width: 24rem;
		height: 20rem;
		width: 100%;
		margin: auto 1rem 1rem 1rem;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
	}

	.inspiration_thumbnail {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.inspiration_info_container {
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
		background: linear-gradient(0deg, rgba(233,237,255,1) 0%, rgba(233,237,255,0.7525385154061625) 20%, rgba(233,237,255, 0.10) 50%, rgba(0,0,0,0) 100%);
	}

	.inspiration_name {
		text-align: center;
		color: #15060B;
		margin: 0 auto 1rem auto;
		transition: all 600ms;
		will-change: color;
	}

	.action_button_container {
		display: flex;
		justify-content: center;
	}


	@media (max-width: 750px) {
		.quilt_pattern_background {
			padding: 1rem;
		}

		.aboutCarousel {
			position: relative;
			width: 100%;
			max-width: 100%;
		}
		.about_content_container {
			max-width: 100%;
			margin: 0;
			flex-direction: column;
			gap: 1rem;
		}

		.about_heading {
			margin: 0 auto;
			text-align: center;
			font-size: 1.5rem;
		}

		.about_story {
			padding: 1rem;
		}

		.stitches {
			max-width: 8rem;
			margin: 0.5rem auto;
		}

		.inspiration_card_container {
			margin: auto 1rem 1rem 1rem;
			height: 20rem;
		}

	}
</style>