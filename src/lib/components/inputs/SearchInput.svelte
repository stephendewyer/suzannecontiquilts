<script>
    export let searchValue = "";
    export let searchValueChanged = false;

</script>

<div class="quilt_search_container">
	<label 
		for="quilt_search" 
		class="label"
	>
		<slot />
	</label>
	<input 
		id="quilt_search"
		type="search" 
		name="quilt_search" 
		class="search_input"
		placeholder="quilt name"
		bind:value={searchValue}
		on:keyup={() => searchValueChanged = true}
		on:input={() => searchValueChanged = true}
	/>
</div>

<style>

	.quilt_search_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	.label {
		font-size: 1.25rem;
		font-weight: 600;
	}
	
    .search_input {
		height: 3rem;
		width: 100%;
		font-size: 1.5rem;
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

	@media screen and (max-width: 1200px) {
		.search_input {
			font-size: 1.175rem;
			border-width: 2px;
		}

		.label {
			font-size: 1.175rem;
		}
	}

    @media (max-width: 750px) {
        .search_input {
			font-size: 1rem;
			border-width: 2px;
		}

		.label {
			font-size: 1rem;
		}
    }
</style>