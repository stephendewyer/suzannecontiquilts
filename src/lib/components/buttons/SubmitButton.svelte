<script>
    let buttonHovered = false;
</script>

<button
    on:mouseover={() => {
        buttonHovered = true;
    }} 
    on:focus={() => {
        buttonHovered = true;
    }}
    on:blur={() => {
        buttonHovered = false;
    }}
    on:mouseout={() => {
        buttonHovered = false;
    }}
    class="{ (buttonHovered) ? 'submit_button_outer_hovered' : 'submit_button_outer'}"
>   
    <div 
        class="{ (buttonHovered) ? 'submit_button_inner_hovered' : 'submit_button_inner'}"
    >
        <slot/>
    </div>
</button>

<style>

    .submit_button_outer {
        border: none;
        background-color: #D1E9D1;
        padding: 0.125rem;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .submit_button_outer_hovered {
        border: none;
        padding: 0;
        background-color: #D1E9D1;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .submit_button_inner {
        border: 0.125rem solid #15060B;
        border-radius: 3rem;
        background-color: transparent;
        transition: padding 300ms linear;
        will-change: padding;
        padding: 0.75rem 1.5rem 0.75rem 1.5rem;
        font-size: 1.5rem;
        color: #15060B;
    }

    .submit_button_inner_hovered {
        border: 0.125rem solid #15060B;
        border-radius: 3rem;
        background-color: transparent;
        transition: padding 300ms linear;
        will-change: padding;
        padding: 0.875rem 1.625rem 0.875rem 1.625rem;
        font-size: 1.5rem;
        color: #15060B;

    }

    @media (max-width: 750px) {
        .submit_button_inner {
            font-size: 1.25rem;
            padding: 0.5rem 1rem 0.5rem 1rem;
        }

        .submit_button_inner_hovered {
            font-size: 1.25rem;
            padding: 0.625rem 1.125rem 0.625rem 1.125rem;
        }
    }
    
</style>
