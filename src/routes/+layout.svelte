<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';

	let footerElHeight;

</script>

<div class="app">
	<Header />
	<main style="padding-bottom: {footerElHeight}px">
		<slot />
	</main>
	<Footer bind:footerHeight={footerElHeight}/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
	}
</style>
