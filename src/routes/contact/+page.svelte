<script>
	import quiltPattern from '$lib/images/quilts/Grandma_Kate/Suzanne_Conti_Grandma_Kate_08.jpg';
	import stitches from '$lib/images/icons/stitches.svg';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import CancelButton from '$lib/components/buttons/CancelButton.svelte';
</script>

<svelte:head>
	<title>contact - Suzanne Conti Quilts</title>
	<meta name="description" content="contact Suzanne Conti Quilts" />
</svelte:head>

<div class="text-column">
	<section 
		class="quilt_pattern_background"
		style="background-image: url({quiltPattern});"
	>
		<div class="contact_content_container">
			<div class="contact_form">
				<h1 class="contact_heading">
					send a message
				</h1>
				<img 
					class="stitches"
					src="{stitches}" 
					alt="stitches" 
				/>
				<form method="POST" class="form_container">
					<div class="form_field">
						<label 
							for="name_first"
							class="form_label"
						>
							first name:
						</label>
						<input 
							name="name_first" 
							type="text" 
							class="form_input"
						/>
					</div>
					<div class="form_field">
						<label 
							for="name_last"
							class="form_label"
						>
							last name:
							
						</label>
						<input 
							name="name_last" 
							type="text" 
							class="form_input"
						/>
					</div>
					<div class="form_field">
						<label 
							for="email"
							class="form_label"
						>
							email:
						</label>
						<input 
							name="email" 
							type="email" 
							class="form_input"
						/>
					</div>
					<div class="form_field">
						<label 
							for="subject"
							class="form_label"
						>
							subject:
							
						</label>
						<input 
							name="subject" 
							type="text" 
							class="form_input"
							style="width: 100%;"
						/>
					</div>
					<div class="form_field">
						<label 
							for="message"
							class="form_label"
						>
							message:
						</label>
						<textarea 
							name="message" 
							type="text" 
							class="form_para_input"
						/>
					</div>
					<div class="form_buttons_container">
						<CancelButton>cancel</CancelButton>
						<SubmitButton>send</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	</section>
</div>

<style>

	.quilt_pattern_background {
		width: 100%;
		position: relative;
		background-repeat: repeat-y;
		background-size: cover;
		padding: 2rem;
	}

	.contact_content_container {
		max-width: 2000px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.contact_form {
		padding: 1rem 2rem 3rem 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba(255,255,255,0.7);
		border-radius: 3rem;
	}

	.contact_heading {
		margin: 0 auto;
		text-align: center;
		font-size: 2.5rem;
	}

	.stitches {
		max-width: 12rem;
		margin: 1rem auto;
	}

	.form_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 40rem;
		margin: 1rem auto auto auto;
	}

	.form_field {
		width: 100%;
		margin: 0 0 1rem 0;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.form_label {
		width: 10rem;
		display: inline-block;
		text-align: right;
	}
	
	.form_input {
		width: 100%;
		display: inline-block;
	}

	.form_para_input {
		width: 100%;
		display: inline-block;
	}

	.form_buttons_container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 2rem;
	}

	@media (max-width: 750px) {

		.quilt_pattern_background {
			padding: 1rem;
		}

		.contact_form {
			padding: 0.5rem 1rem 1rem 1rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: rgba(255,255,255,0.7);
			border-radius: 3rem;
		}

		.contact_content_container {
			max-width: 100%;
			margin: 0;
			flex-direction: column;
			gap: 1rem;
		}

		.contact_heading {
			margin: 0 auto;
			text-align: center;
			font-size: 1.5rem;
		}

		.stitches {
			max-width: 8rem;
			margin: 0.5rem auto;
		}

		.form_field {
			width: 100%;
			margin: 0 0 1rem 0;
			flex-direction: column;
			font-size: 1.25rem;
			gap: 0.125rem;
		}

		.form_label {
			width: 100%;
			display: block;
			text-align: left;
		}
		
		.form_input {
			width: 100%;
			display: block;
		}

		.form_para_input {
			width: 100%;
			display: inline-block;
		}

		.form_buttons_container {
			flex-direction: column-reverse;
			justify-content: flex-start;
			align-items: center;
			gap: 0.125rem;
		}
	}

</style>
