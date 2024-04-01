<script>
    import { page } from '$app/stores';
    import Michigan_Quilt_stripes from '$lib/images/footer/Michigan_Quilt_footer.jpg';
    import SuzanneContiQuiltsLogo from "$lib/images/logo/Suzanne_Nigro_Conti_Quilts_logo_02.svg?raw";
    const today = new Date();
    const year = today.getFullYear();
    export let footerHeight;

</script>

<footer bind:clientHeight={footerHeight}>
    <div class="footer_top">
        <img src={Michigan_Quilt_stripes} alt="Michigan Quilt stripes" />
        <div class="footer_top_gradient"/>
    </div>
    <div class="nav_bottom_container">        
        <div class="nav_bottom">
            <nav>
                <div class="footer_top_nav_tabs">
                    <ul class="footer_nav_logo">
                        <li>
                            <a href="/" aria-label="link to index page">
                                {@html SuzanneContiQuiltsLogo}
                            </a>
                        </li>
                    </ul>
                    <ul class="footer_nav_tabs_main">
                        <li 
                            class={$page.url.pathname === '/quilts' ? 'footer_nav_tab_active' : 'footer_nav_tab'}
                        >
                            <a href="/quilts" aria-label="link to quilts page">
                                quilts
                            </a>
                        </li>
                        <li 
                            class={$page.url.pathname === '/about' ? 'footer_nav_tab_active' : 'footer_nav_tab'}
                        >
                            <a href="/about" aria-label="link to about page">
                                about
                            </a>
                        </li>
                        <li 
                            class={$page.url.pathname === '/contact' ? 'footer_nav_tab_active' : 'footer_nav_tab'}
                        >
                            <a href="/contact" aria-label="link to contact page">
                                contact
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="footer_nav_tabs_secondary">
                    <li 
                        class={$page.url.pathname === '/colophon' ? 'footer_nav_tab_active_secondary' : 'footer_nav_tab_secondary'}
                    >
                        <a href="/colophon" aria-label="link to colophon page">
                            colophon
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="copyright">
                    Suzanne Conti © {year}
            </div>
        </div>
    </div>
</footer>

<style>

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .footer_top {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .footer_top_gradient {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgb(242,215,249);
        background: linear-gradient(180deg, rgba(242,215,249,1) 0%, rgba(242,215,249,0.8463760504201681) 25%, rgba(242,215,249,0.6474964985994398) 50%, rgba(242,215,249,0) 100%);
    }

    .nav_bottom_container {
        background-color: #15060B;
        padding: 1rem;
    }

    .nav_bottom {
        width: 100%;
		max-width: 860px;
		margin: 0 auto 0 auto;
    }

    .footer_nav_logo {
        width: 100%;
        max-width: 12rem;
        display: flex;
        flex-direction: column;
    }

    .footer_nav_logo > li > a {
        fill: #ffffff;
        transition: fill 0.2s linear;
    }

    .footer_nav_logo > li > a:hover {
        fill: rgb(242,215,249);
        transition: fill 0.2s linear;
    }

    .footer_top_nav_tabs {
        display: flex;
		flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }

    .footer_nav_tabs_main {
        display: flex;
        flex-direction: row;
    }

    .footer_nav_tabs_secondary {
        display: flex;
        flex-direction: row;
    }

    .footer_nav_tab a {
        margin: auto auto auto 2rem;
        color: #ffffff;
        transition: color 0.2s linear;
    }

    .footer_nav_tab_active a {
        margin: auto auto auto 2rem;
        color: #BFC8D1;
        transition: color 0.2s linear;
    }

    .footer_nav_tab_secondary a {
        margin: auto 1rem auto auto;
        color: #ffffff;
        transition: color 0.2s linear;
        font-size: 1.25rem;
    }

    .footer_nav_tab_active_secondary a {
        margin: auto 1.5rem auto auto;
        color: #BFC8D1;
        transition: color 0.2s linear;
        font-size: 1.25rem;
    }

    nav {
		display: flex;
        flex-direction: column;
	}

	nav a {
		text-decoration: none;
		transition: all 0.2s linear;
	}

	nav a:hover {
		color: #F2D7F9;
	}

    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		position: relative;
	}

    .copyright {
        color: #ffffff;
        font-size: 1.25rem;
        text-align: center;
        margin: 0.5rem auto auto auto;
    }

    @media (max-width: 750px) {

        nav {
            justify-content: space-between;
        }

        .nav_bottom {
            margin: 0 1rem 0 1rem;
            width: auto;
        }

        .footer_nav_logo {
            max-width: 7rem;
            flex-direction: flex-start;
        }

        .footer_nav_tabs_main {
            display: flex;
            flex-direction: column;
            padding: 0 0 1rem 0;
            width: 50%;
        }

        .footer_nav_tab {
            margin: auto auto 1rem 0;
        }

        .footer_nav_tab_active {
            margin: auto auto 1rem 0;
        }

        .footer_nav_tab_secondary a {
            margin: auto 1rem auto auto;
            color: #ffffff;
            transition: all 0.2s;
            font-size: 1rem;
        }

        .footer_nav_tab_active_secondary a {
            margin: auto 1.5rem auto auto;
            color: #BFC8D1;
            transition: all 0.2s;
            font-size: 1rem;
        }

        .copyright {
            font-size: 1rem;
            text-align: center;
        }

    }
    
</style>