<script>
    export let page = 0;
    export let pageCount = 0;
    export let activePageId = 0;
    export let pageChanged = false;

    const setPage = (p) => {
		if (p >= 0 && p < pageCount.length) {
			page = p;
			activePageId = page;
		};
        pageChanged = true;
	};

</script>

<nav class="pagination">
    <ul>
        <li>
            <button 
                type="button"
                disabled={page === 0} 
                on:click={() => setPage(page = 0)}
                on:keydown={() => setPage(page = 0)}
                class="paginationButton"
            >
                first
            </button>
        </li>
        <li>
            <button
                type="button"
                disabled={page === 0} 
                on:click={() => setPage(page - 1)}
                on:keydown={() => setPage(page - 1)}
                class="paginationButton"
            >
                previous
            </button>
        </li>
        {#each pageCount as page, i}
            <li>
                <button
                    type="button"
                    on:click={() => setPage(i)}
                    on:keydown={() => setPage(i)}
                    class={activePageId == i ? "activePaginationButton" : "paginationButton"}
                >
                    {i + 1}
                </button>
            </li>
        {/each}
        <li>
            <button
                type="button"
                disabled={page >= pageCount.length - 1}
                on:click={() => setPage(page + 1)}
                on:keydown={() => setPage(page + 1)}
                class="paginationButton"
            >
                next
            </button>
        </li>
        <li>
            <button 
                type="button"
                disabled={page >= pageCount.length - 1} 
                on:click={() => setPage(pageCount.length - 1)}
                on:keydown={() => setPage(pageCount.length - 1)}
                class="paginationButton"
            >
                last
            </button>
        </li>
    </ul>
</nav> 

<style>

	.pagination {
		margin: 1rem auto 2rem auto;
	}

	ul {
		list-style: none;
		margin: 0;
		box-sizing: border-box;
		padding-inline-start: 0;
		margin-block-start: 0;
    	margin-block-end: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	li {
		float: left;
	}

	button {
		font-size: 1.75rem;
		/* margin: auto auto 1rem auto; */
	}

	.paginationButton {
		background: transparent;
		border-width: 1px;
		padding: 0.5rem 1rem;
		margin-left: 0.3rem;
		cursor: pointer;
		border-style: dashed;
	}

	.activePaginationButton {
		background: transparent;
		border-width: 3px;
		border-style: dashed;
		padding: 0.5rem 1rem;
		margin-left: 0.3rem;
		cursor: pointer;
	}

    @media (max-width: 750px) {

		.pagination {
			margin: 1rem;
		}

		ul {
			flex-wrap: wrap;
		}

		button {
			font-size: 1rem;
			margin: 0.5rem auto auto auto;
		}

    }

</style>