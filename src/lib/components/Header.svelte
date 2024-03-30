<script>
	import { page } from '$app/stores';
	import SuzanneContiQuiltsLogo from "$lib/images/logo/Suzanne_Nigro_Conti_Quilts_logo_02.svg?raw";
	import Hamburger from '$lib/components/navigation/Hamburger.svelte'
	import stitches from '$lib/images/icons/stitches_02.svg';

	export let sideDrawer = false;
</script>

<header>
	<nav>
		<ul class="main_nav_tabs_left">
			<li 
				aria-current={$page.url.pathname === '/quilts' ? 'page' : undefined}
				class="main_nav_tab"
			>
				<a 
					href="/quilts"
				>
					quilts
					{#if $page.url.pathname === '/quilts'}
						<div class="underline_stitches">
							<img src={stitches} alt="stitches"/>
						</div>
					{/if}
				</a>
				
			</li>
		</ul>
		<ul class="logo_container">
			<li
				aria-current={$page.url.pathname === '/' ? 'index' : undefined}
				class="logo"
			>
				<a href="/" aria-label="link to index page">
					{@html SuzanneContiQuiltsLogo}
				</a>
			</li>
		</ul>
		<ul class="main_nav_tabs_right">
			<li
				aria-current={$page.url.pathname === '/about' ? 'page' : undefined}
				class="main_nav_tab"
			>
				<a href="/about">
					about
					{#if $page.url.pathname === '/about'}
						<div class="underline_stitches">
							<img src={stitches} alt="stitches"/>
						</div>
					{/if}
				</a>
			</li>
			<li
				aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}
				class="main_nav_tab"
			>
				<a href="/contact">
					contact
					{#if $page.url.pathname === '/contact'}
						<div class="underline_stitches">
							<img src={stitches} alt="stitches"/>
						</div>
					{/if}
				</a>
				
			</li>
		</ul>
		<div class="mobile_nav_toggle_button">
			<Hamburger bind:open={sideDrawer}/>
		</div>
	</nav>
</header>

<style>

	header {
		width: 100%;
		padding: 1.5rem 1rem 1.5rem 1rem;
	}

	nav {
		width: 100%;
		max-width: 1096px;
		margin: 0 auto 0 auto;
		display: flex;
		flex-direction: row;
	}

	nav a {
		text-decoration: none;
		font-size: 1.75rem;
		color: #3B3E29;
		transition: all 0.2s linear;
	}

	nav a:hover {
		color: #ED6545;
	}

	.logo > a {
		fill: #3b3e29;
		transition: all 0.2s linear;
	}

	.logo > a:hover {
		fill: #ED6545;
	}
	
	.main_nav_tabs_left {
		width: 35%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.main_nav_tabs_right {
		width: 35%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.main_nav_tab {
		width: 6rem;
		display: flex;
		flex-direction: column;
		margin: auto 1rem auto 1rem;
	}

	.logo_container {
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logo {
		width: 100%;
		max-width: 12rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		position: relative;
	}

	.underline_stitches {
		position: absolute;
		width: 6rem;
		top: 1.5rem;
	}

	@media (min-width: 750px) {

		.mobile_nav_toggle_button {
			display: none;
		}

	}

	@media (max-width: 750px) {

		.main_nav_tabs_left {
			display: none;
		}

		.main_nav_tabs_right {
			display: none;
		}

		nav {
			max-width: 100%;
			margin: 0;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem 0 1rem;
		}

		.logo_container {
			width: 100%;
			align-items: flex-start;
		}

		.logo {
			width: 100%;
			max-width: 8rem;
		}

	}

</style>
