<script>
    export let disabled = false;

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
    class="{ (disabled) ? 'submit_button_disable' : 'submit_button'}"
    disabled={disabled}
>   
    <div 
        class="{ (buttonHovered && !disabled) ? 'submit_button_inner_hovered' : 'submit_button_inner'}"
    >
        <slot/>
    </div>
</button>

<style>

    .submit_button {
        border: none;
        background-color: #D1E9D1;
        color: #15060B;
        padding: 0.125rem;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .submit_button:hover {
        border: none;
        padding: 0;
        background-color: #D1E9D1;
        color: #15060B;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .submit_button:active {
        background-color: #15060B;
        color: #D1E9D1;
    }

    .submit_button_disable {
        border: none;
        background-color: #D1E9D1;
        color: #15060B;
        padding: 0.125rem;
        transition: padding 300ms linear;
        will-change: padding;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
        opacity: 50%;
    }

    button:disabled {
        opacity: 50%;
    }

    .submit_button_inner {
        border: 0.125rem solid #15060B;
        border-radius: 3rem;
        background-color: transparent;
        transition: padding 300ms linear;
        will-change: padding;
        padding: 0.75rem 1.5rem 0.75rem 1.5rem;
        font-size: 1.5rem;
        color: inherit;
    }

    .submit_button_inner_hovered {
        border: 0.125rem solid #15060B;
        border-radius: 3rem;
        background-color: transparent;
        transition: padding 300ms linear;
        will-change: padding;
        padding: 0.875rem 1.625rem 0.875rem 1.625rem;
        font-size: 1.5rem;
        color: inherit;

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
