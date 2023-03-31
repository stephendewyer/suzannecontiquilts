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
        <div class="{ (buttonHovered) ? 'arrow_icon_container_hovered' : 'arrow_icon_container'}">
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.18 568.32">
            <defs>
                <style>.cls-1{fill:#3B3E29;}</style>
            </defs>
            <path class="cls-1" d="M6.88,267.56L267.56,6.88c9.17-9.17,24.03-9.17,33.2,0l.54,.54c9.17,9.17,9.17,24.03,0,33.2L57.76,284.16l243.54,243.54c9.17,9.17,9.17,24.03,0,33.2l-.54,.54c-9.17,9.17-24.03,9.17-33.2,0L6.88,300.76c-9.17-9.17-9.17-24.03,0-33.2Z"/></svg>
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
            margin: 0.5rem auto 0.5rem 0;
        }
    }
</style>