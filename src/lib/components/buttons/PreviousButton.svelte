<script>
    import stitches from '$lib/images/icons/stitches.svg';
    import arrowLeft from "$lib/images/icons/arrow_left.svg?raw"

    let buttonHovered = false;

</script>

<button 
    class="previous_button"
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
>
    <div class="button_top">
        <div class="{ (buttonHovered) ? 'arrow_icon_container_hovered' : 'arrow_icon_container'}">
            {@html arrowLeft}
        </div>
        
        previous quilt
    </div>
    <img class="stitches" src={stitches} alt="stitches" />
    <slot/>    
</button>
    
<style>
    .previous_button {
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1.75rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
    }

    .button_top {
        display: flex;
        flex-direction: row;
    }

    .stitches {
        width: 100%;
        max-width: 12rem;
        margin: 1rem auto 1rem 0;
    }

    .arrow_icon_container {
        margin: auto 0.75rem auto auto;
        will-change: 'margin-right';
        transition: all 0.33s ease-out;
        width: 0.5rem;
    }

    .arrow_icon_container_hovered {
        margin: auto 1.55rem auto auto;
        width: 0.5rem;
        will-change: 'margin-right';
        transition: all 0.33s ease-out;
    }

    .arrow_icon_container {
        fill: #3B3E29;
    }

    .arrow_icon_container_hovered {
        fill: #3B3E29;
    }

    @media (max-width: 750px) {
        .previous_button {
            padding: 1rem 1.5rem 1rem 1.5rem;
            font-size: 1rem;
        }

        .stitches {
            max-width: 8rem;
            margin: 0.5rem auto 0.5rem 0;
        }
    }
</style>