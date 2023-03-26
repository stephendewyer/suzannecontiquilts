<script>
	import SideDrawer from '$lib/components/navigation/sideDrawer/SideDrawer.svelte';
	import Backdrop from '$lib/components/navigation/sideDrawer/Backdrop.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';

	let open = false;

	let footerElHeight;

</script>

<div class="app">
	<Header bind:sideDrawer={open} />
	<main style="padding-bottom: {footerElHeight}px">
		<slot />
	</main>
	<Footer bind:footerHeight={footerElHeight}/>
	{#if (open)}
		<Backdrop bind:open />
	{/if}
	<SideDrawer bind:open />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
	}
</style>
