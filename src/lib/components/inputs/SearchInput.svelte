<script>
    export let searchValue = "";
    export let searchValueChanged = false;

</script>

<input 
    id="quilt_search"
    type="search" 
    name="quilt_search" 
    class="search_input"
    placeholder="quilt title"
    bind:value={searchValue}
    on:keyup={() => searchValueChanged = true}
    on:input={() => searchValueChanged = true}
/>

<style>
    .search_input {
		height: 3rem;
		width: 100%;
		font-size: 1.75rem;
		background-color: #ECF7FA;
		border-color: #BAE1D7;
		border-width: 3px;
		border-style: solid;
		padding: 0.25rem 1rem 0.25rem 2.75rem;
		background-image: url('$lib/images/icons/magnifying_glass.svg');
		background-size: 1.5rem;
		background-repeat: no-repeat;
		background-position: 10px center;
		transition: border-color 0.3s ease-out;
	}
	
	.search_input:focus {
		outline: none;
        border-color: #3B3E29;
	}

    @media (max-width: 1200px) {
        .search_input {
			/* font-size: 1.25rem;
			border-width: 2px; */
		}
    }

    @media (max-width: 750px) {
        .search_input {
			font-size: 1.25rem;
			border-width: 2px;
		}
    }
</style>