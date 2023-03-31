<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/splide/dist/css/themes/splide-default.min.css';
	import quiltPattern from '$lib/images/quilts/Michigan/Suzanne_Conti_Michigan_07.jpg';
	import aboutImage01 from '$lib/images/about/about-Suzanne_Conti_01.jpg';
	import aboutImage02 from '$lib/images/about/about-Suzanne_Conti_02.jpg';

	const options = {
		rewind  : true,
		gap     : '1rem',
		autoplay: true,
		type      : 'loop',
		arrows  : true,
		fixedHeight: '32rem',
		height: '32rem',
		width: '35rem',
		perPage: 1,
	}
</script>

<svelte:head>
	<title>about - Suzanne Conti Quilts</title>
	<meta name="description" content="about Suzanne Conti" />
</svelte:head>

<div class="text-column">
	<div class="quilt_pattern_background">
		<img src={quiltPattern} alt="quilt pattern" />
		<div class="quilt_pattern_overlay" />
		<div class="about_content_container">
			<div class="aboutCarousel">
				<Splide
					options={ options }
				>
					<SplideSlide>
						<img 
							class="aboutImage"
							src={ aboutImage01 } 
							alt="about Suzanne Conti 01" 
						/>
					</SplideSlide>
					<SplideSlide>
						<img 
							class="aboutImage"
							src={ aboutImage02 } 
							alt="about Suzanne Conti 02"
						/>
					</SplideSlide>
				</Splide>
			</div>
		</div>
	</div>
</div>

<style>

	.quilt_pattern_background {
		width: 100%;
		height: auto;
		position: relative;
		margin: 0 0 2rem 0;
	}

	.quilt_pattern_overlay {
		background-color: #ffffff;
		opacity: 50%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.about_content_container {
		position: absolute;
		max-width: 2000px;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		top: 5rem;
	}

	.aboutCarousel {
		position: relative;
		margin-left: 2rem;

	}

	.aboutImage {
		width: 100%;
		height: 100%;
		max-height: 28rem;
		object-fit: cover;
	}
</style>