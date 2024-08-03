<script>
    export let inspirationCardData;
    export let index;

</script>

<div 
    class="inspiration_card_container"
>
    <img 
        class="inspiration_thumbnail"
        src="{inspirationCardData.image}" 
        alt="{inspirationCardData.alt}"
    />
    <div class="inspiration_info_container">
        <h3 class="inspiration_name">
            {inspirationCardData.name}
        </h3>
    </div>
</div>

<style>

    .inspiration_card_container {
		position: relative;
		height: 36rem;
        max-width: 33%;
		width: 100%;
		filter: drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.25));
	}

	.inspiration_thumbnail {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.inspiration_info_container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background: rgb(233,237,255);
		background: linear-gradient(0deg, rgba(233,237,255,1) 0%, rgba(233,237,255,0.7525385154061625) 20%, rgba(233,237,255, 0.10) 50%, rgba(0,0,0,0) 100%);
	}

	.inspiration_name {
		text-align: center;
		color: #15060B;
		margin: 0 auto 1rem auto;
		transition: all 600ms;
		will-change: color;
	}

    @media screen and (max-width: 750px) {

        .inspiration_card_container {
            max-width: 100%;
			height: 28rem;
		}

    }


</style>