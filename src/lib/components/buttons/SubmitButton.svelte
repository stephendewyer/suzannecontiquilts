<script>

</script>

<button 
    class="primary_button"
>
    <slot/>
</button>

<style>

    .primary_button {
        outline: 0.125rem solid #15060B;
        outline-offset: -0.25rem;
        color: #15060B;
        background-color: #D1E9D1;
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1.5rem;
        border: none;
        transition: all 300ms;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
        box-sizing: border-box;
    }

    .primary_button:hover {
        outline: 0.125rem solid #15060B;
        outline-offset: -0.125rem;
        color: #15060B;
        background-color: #D1E9D1;
    }

    @media (max-width: 750px) {

        .primary_button {
            font-size: 1.25rem;
            padding: 0.75rem 1rem 0.75rem 1rem;
        }

    }
    
</style>