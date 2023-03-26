<script>
    import { page } from '$app/stores';
    import Michigan_Quilt_stripes from '$lib/images/footer/Michigan_Quilt_footer.jpg';
    import logo_white from '$lib/images/logo/Suzanne_Conti_Quilts_logo_white.svg';

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
                <ul class="footer_nav_logo">
                    <li>
                        <a href="/" aria-label="link to index page">
                            <img src={logo_white} alt="Suzanne Conti Quilts logo"/>
                        </a>
                    </li>
                </ul>
                <ul class="footer_nav_tabs">
                    <li 
                        class="{$page.url.pathname === '/quilts' ? 'footer_nav_tab_active' : 'footer_nav_tab'}"
                    >
                        <a href="/quilts" aria-label="link to quilts page">
                            quilts
                        </a>
                    </li>
                    <li 
                        class="{$page.url.pathname === '/about' ? 'footer_nav_tab_active' : 'footer_nav_tab'}"
                    >
                        <a href="/about" aria-label="link to about page">
                            about
                        </a>
                    </li>
                    <li 
                        class="{$page.url.pathname === '/contact' ? 'footer_nav_tab_active' : 'footer_nav_tab'}"
                    >
                        <a href="/contact" aria-label="link to contact page">
                            contact
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
		max-width: 1096px;
		margin: 0 auto 0 auto;
    }

    .footer_nav_logo {
        width: 100%;
        max-width: 12rem;
        display: flex;
        flex-direction: column;
    }

    .footer_nav_tabs {
        display: flex;
        flex-direction: row;
    }

    .footer_nav_tab a {
        margin: auto 1rem auto 1rem;
        color: #ffffff;
        transition: all 0.2s;
    }

    .footer_nav_tab_active a {
        margin: auto 1rem auto 1rem;
        color: #BFC8D1;
        transition: all 0.2s;
    }

    nav {
		display: flex;
		flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
	}

	nav a {
		text-decoration: none;
		font-size: 1.75rem;
		transition: all 0.2s;
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
        font-size: 1.5rem;
        text-align: center;
    }

    @media (max-width: 750px) {

        nav {
            justify-content: space-between;
        }

        nav a {
            font-size: 1.25rem;
        }

        .nav_bottom {
            margin: 0 1rem 0 1rem;
        }

        .footer_nav_logo {
            max-width: 7rem;
            align-items: flex-start;
        }

        .footer_nav_tabs {
            display: flex;
            flex-direction: column;
            padding: 0 0 1rem 0;
            width: 50%;
        }

        .footer_nav_tab {
            margin: auto auto 1rem 0;
        }

        .copyright {
            font-size: 1.25rem;
            text-align: left;
        }

    }
    
</style>