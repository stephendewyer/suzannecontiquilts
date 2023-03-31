<script>
    import stitches from '$lib/images/icons/stitches.svg';

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
        next quilt
        <div class="{ (buttonHovered) ? 'arrow_icon_container_hovered' : 'arrow_icon_container'}">
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.18 568.32">
            <defs>
                <style>.cls-1{fill:#15060B;}</style>
            </defs>
            <path class="cls-1" d="M301.3,300.76L40.62,561.44c-9.17,9.17-24.03,9.17-33.2,0l-.54-.54c-9.17-9.17-9.17-24.03,0-33.2l243.54-243.54L6.88,40.62C-2.29,31.45-2.29,16.59,6.88,7.42l.54-.54C16.59-2.29,31.45-2.29,40.62,6.88L301.3,267.56c9.17,9.17,9.17,24.03,0,33.2Z"/></svg>
        </div>
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

.previous_button > .button_top > .arrow_icon_container > svg > path {
    fill: #3B3E29;
}

@media (max-width: 750px) {
    .previous_button {
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1rem;
    }

    .stitches {
        max-width: 8rem;
        margin: 0.5rem 0 0.5rem auto;
    }
}
</style>