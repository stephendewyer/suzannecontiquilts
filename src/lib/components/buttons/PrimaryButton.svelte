<script>

    let buttonHovered = false;
    export let quiltCardIsHoveredProp;

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
    class="{ (buttonHovered) || quiltCardIsHoveredProp ? 'primary_button_hovered' : 'primary_button'}"
>
    <slot/>
    <div class="arrow_icon_container">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.18 568.32">
        <defs>
            <style>.cls-1{fill:#15060B;}</style>
        </defs>
        <path class="cls-1" d="M301.3,300.76L40.62,561.44c-9.17,9.17-24.03,9.17-33.2,0l-.54-.54c-9.17-9.17-9.17-24.03,0-33.2l243.54-243.54L6.88,40.62C-2.29,31.45-2.29,16.59,6.88,7.42l.54-.54C16.59-2.29,31.45-2.29,40.62,6.88L301.3,267.56c9.17,9.17,9.17,24.03,0,33.2Z"/></svg>
    </div>
</button>

<style>

    .primary_button {
        outline: 0.125rem solid #FDFCE8;
        outline-offset: -0.25rem;
        color: #FDFCE8;
        background-color: #15060B;
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1.5rem;
        border: none;
        transition: all 300ms;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .primary_button_hovered {
        outline: 0.125rem solid #15060B;
        outline-offset: -0.125rem;
        color: #15060B;
        background-color: #FDFCE8;
        padding: 1rem 1.5rem 1rem 1.5rem;
        font-size: 1.5rem;
        border: none;
        transition: all 300ms;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        border-radius: 3rem;
    }

    .primary_button > .arrow_icon_container > svg > path {
        fill: #FDFCE8;
    }

    .primary_button_hovered > .arrow_icon_container > svg > path {
        fill: #15060B;
    }

    .primary_button > .arrow_icon_container {
        margin: auto auto auto 0.75rem;
        will-change: 'margin-left';
        transition: all 0.33s ease-out;
    }

    .primary_button_hovered > .arrow_icon_container {
        margin: auto auto auto 1.25rem;
        will-change: 'margin-left';
        transition: all 0.33s ease-out;
    }

    .arrow_icon_container {
        width: 0.5rem;
    }

    @media (max-width: 750px) {
        .primary_button {
            font-size: 1.25rem;
            padding: 0.75rem 1rem 0.75rem 1rem;
        }
    }
    
</style>