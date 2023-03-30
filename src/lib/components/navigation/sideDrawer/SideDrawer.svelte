<script>
    import { page } from '$app/stores';
    import stitches04 from '$lib/images/icons/stitches.svg';

    export let open = false;

</script>

<aside 
    class="{ (open) ? 'side_drawer_open' : 'side_drawer_closed' }"
    aria-hidden="{ (open) ? 'true' : 'false'}"
>
    <nav>
        <ul>
            <li
                class="{$page.url.pathname === '/quilts' ? 'mobile_nav_tab_active' : 'mobile_nav_tab'}"
            >
                <a 
                    href="/quilts" 
                    on:click={() => open = !open} 
                    aria-label="link to quilts page"
                >
                    quilts
                </a>
                <img src={stitches04} alt="stitches" />
            </li>
            <li
                class="{$page.url.pathname === '/about' ? 'mobile_nav_tab_active' : 'mobile_nav_tab'}"
            >
                <a 
                    href="/about" 
                    on:click={() => open = !open}
                    aria-label="link to about page"
                >
                    about
                </a>
                <img src={stitches04} alt="stitches" />
            </li>
            <li
                class="{$page.url.pathname === '/contact' ? 'mobile_nav_tab_active' : 'mobile_nav_tab'}"
            >
                <a 
                    href="/contact" 
                    on:click={() => open = !open} 
                    aria-label="link to contact page"
                >
                    contact
                </a>
                <img src={stitches04} alt="stitches" />
            </li>
        </ul>
    </nav>
    
</aside>

<style>
    aside {
        z-index: 50;
    }

    .side_drawer_closed {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #DCEBC3;
        left: 2rem;
        right: 0;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    }

    .side_drawer_open {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #DCEBC3;
        top: 0;
        right: 0;
        left: 2rem;
        width: auto;
        transform: translateX(0);
        transition: transform 0.3s ease-in-out;
    }

    ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		position: relative;
        margin-top: 0.5rem;
	}

    nav {
        width: 100%;
        max-width: 10rem;
		margin: 6rem auto 0 auto;
	}

    .mobile_nav_tab a {
        text-decoration: none;
		font-size: 1.75rem;
		color: #3B3E29;
		transition: all 0.2s;
    }

    .mobile_nav_tab_active a {
        text-decoration: none;
		font-size: 1.75rem;
		color: #8E7F7D;
		transition: all 0.2s;
    }

	nav a:hover {
		color: #ED6545;
	}

    @media (min-width: 750px) {

      .side_drawer_closed {
          display: none;
      }

      .side_drawer_open {
          display: none;
      }

    }

</style>