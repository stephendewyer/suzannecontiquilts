<script>
    import Arrow from '$lib/images/icons/arrow.svg?raw';
    export let quiltCardIsHoveredProp;
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
    class="{ (buttonHovered) || quiltCardIsHoveredProp ? 'primary_button_outer_hovered' : 'primary_button_outer'}"
>
    <div class="{ (buttonHovered) || quiltCardIsHoveredProp ? 'primary_button_inner_hovered' : 'primary_button_inner'}">
        <slot/>
        <div class="arrow_icon_container">
            {@html Arrow}
        </div>
    </div>
</button>

<style>

    .primary_button_outer {
        background-color: #15060B;
        padding: 0;
        border: 0.125rem solid #15060B;
        transition: background-color 300ms linear, border 300ms linear;
        will-change: background-color, border;
        cursor: pointer;
        border-radius: 3rem;
    }

    .primary_button_outer_hovered {
        background-color: #FDFCE8;
        padding: 0;
        border: 0.125rem solid #FDFCE8;
        transition: background-color 300ms linear, border 300ms linear;
        will-change: background-color, border;
        cursor: pointer;
        border-radius: 3rem;
    }

    .primary_button_inner {
        border: 0.125rem solid #FDFCE8;
        color: #FDFCE8;
        background-color: transparent;
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border-radius: 3rem;
        transition: all 300ms;
    }

    .primary_button_inner_hovered {
        border: 0.125rem solid #15060B;
        color: #15060B;
        background-color: transparent;
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
        border-radius: 3rem;
        transition: all 300ms;
    }

    .primary_button_inner > .arrow_icon_container {
        fill: #FDFCE8;
    }

    .primary_button_inner_hovered > .arrow_icon_container {
        fill: #15060B;
    }

    .arrow_icon_container {
        will-change: 'fill';
        transition: all 0.33s ease-out;
        width: 0.5rem;
    }

    @media (max-width: 750px) {
        .primary_button_inner {
            font-size: 1.25rem;
            padding: 0.75rem 1rem 0.75rem 1rem;
        }

        .primary_button_inner_hovered {
            font-size: 1.25rem;
            padding: 0.75rem 1rem 0.75rem 1rem;
        }
    }
    
</style>