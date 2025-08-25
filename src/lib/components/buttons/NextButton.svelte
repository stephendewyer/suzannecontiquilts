<script>
    import stitches from '$lib/images/icons/stitches.svg';
    import arrow from "$lib/images/icons/arrow.svg?raw"
    let buttonHovered = false;

</script>

<button 
    class="next_button"
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
        next quilt
        <div class="{ (buttonHovered) ? 'arrow_icon_container_hovered' : 'arrow_icon_container'}">
            {@html arrow}
        </div>
    </div>
    <img class="stitches" src={stitches} alt="stitches" />
    <slot/>    
</button>

<style>

.next_button {
    padding: 1rem 1.5rem 1rem 1.5rem;
    font-size: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    margin: 1rem 0 1rem auto;
}

.arrow_icon_container {
    margin: auto auto auto 0.75rem;
    will-change: 'margin-left';
    transition: all 0.33s ease-out;
    width: 0.5rem;
}

.arrow_icon_container_hovered {
    margin: auto auto auto 1.55rem;
    width: 0.5rem;
    will-change: 'margin-left';
    transition: all 0.33s ease-out;
}

.arrow_icon_container {
    fill: #3B3E29;
}

.arrow_icon_container_hovered {
    fill: #3B3E29;
}

@media (max-width: 750px) {
    .next_button {
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1rem;
    }

    .stitches {
        max-width: 8rem;
        margin: 0.5rem 0 0.5rem auto;
    }
}
</style>