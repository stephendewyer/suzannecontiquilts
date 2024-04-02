<script>
    export let clicked = false;
    let buttonHovered = false;
</script>

<div
    on:click={() => {
        clicked = true;
    }}
    on:keyup={() => {
        clicked = true;
    }}
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
    class="{ (buttonHovered) ? 'cancel_button_outer_hovered' : 'cancel_button_outer'}"
>   
    <div 
        class="{ (buttonHovered) ? 'cancel_button_inner_hovered' : 'cancel_button_inner'}"
    >
        <slot/>
    </div>
</div>

<style>

    .cancel_button_outer {
        border: none;
        background-color: #B6B3B7;
        padding: 0.125rem;
        margin: 0 auto;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .cancel_button_outer_hovered {
        border: none;
        padding: 0;
        margin: 0 auto;
        background-color: #B6B3B7;
        transition: padding 300ms linear;
        will-change: padding;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .cancel_button_inner {
        border: 0.125rem solid #15060B;
        border-radius: 3rem;
        background-color: transparent;
        transition: padding 300ms linear;
        will-change: padding;
        padding: 0.75rem 1.5rem 0.75rem 1.5rem;
        font-size: 1.5rem;
        color: #15060B;
    }

    .cancel_button_inner_hovered {
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
        .cancel_button_inner {
            font-size: 1.25rem;
            padding: 0.5rem 1rem 0.5rem 1rem;
        }

        .cancel_button_inner_hovered {
            font-size: 1.25rem;
            padding: 0.625rem 1.125rem 0.625rem 1.125rem;
        }
    }
    
</style>