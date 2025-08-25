<script>
	import quiltPattern from '$lib/images/quilts/Katherine_Marie_Jurkiewicz_Quilt_02/Katherine_Marie_Jurkiewicz_Quilt_02_08.jpg';
	import quiltHeader from '$lib/images/quilts/New_Mexico/Suzanne_Conti_New_Mexico_01.jpg';
	import stitches from '$lib/images/icons/stitches.svg';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import CancelButton from '$lib/components/buttons/CancelButton.svelte';
	import ErrorFlashMessage from '$lib/components/flash_messages/Error.svelte';
	import SuccessFlashMessage from '$lib/components/flash_messages/Success.svelte';
	import PendingFlashMessage from '$lib/components/flash_messages/Pending.svelte';
	import { PUBLIC_DOMAIN } from '$env/static/public';

	let nameFirst = "";
	let nameLast = "";
	let email = "";
	let subject = "";
	let message = "";

	// before submit

	let enteredNameFirstIsValid = true;
	let enteredNameLastIsValid = true;
	let enteredEmailIsValid = true;
	let enteredSubjectIsValid = true;
	let enteredMessageIsValid = true;

	let enteredEmailHasAtSymbol = true;

	let enteredNameFirstIsTouched = true;
	let enteredNameLastIsTouched = true;
	let enteredEmailIsTouched = true;
	let enteredSubjectIsTouched = true;
	let enteredMessageIsTouched = true;

    const nameFirstChangeHandler = () => {
		console.log(nameFirst)
        if (nameFirst !== '') {
            enteredNameFirstIsValid = true;
        }
    };

	const nameLastChangeHandler = () => {
        if (nameLast !== '') {
            enteredNameLastIsValid = true;
        }
    };

	const emailChangeHandler = () => {
		if (email !== '' && email.includes('@') ) {
			enteredEmailIsValid = true;
			enteredEmailHasAtSymbol = true;
		}

		if (email !== '' && !email.includes('@')) {
			enteredEmailIsValid = true;
		}
    };

	const subjectChangeHandler = () => {
        if (subject !== '') {
            enteredSubjectIsValid = true;
        }
    };

	const messageChangeHandler = () => {
        if (message !== '') {
            enteredMessageIsValid = true;
        }
    };

    const nameFirstBlurHandler = () => {
        enteredNameFirstIsTouched = true;
        if (nameFirst === '') {
			enteredNameFirstIsValid = false;
        }
    }

    const nameLastBlurHandler = () => {
        enteredNameLastIsTouched = true;
        if (nameLast === '') {
            enteredNameLastIsValid = false;
        }
    }

    const emailBlurHandler = () => {
        enteredEmailIsTouched = true;
        if (email === '') {
            enteredEmailIsValid = false;
        }
        if (email !== '' && !email.includes('@') ) {
            enteredEmailIsValid = true;
            enteredEmailHasAtSymbol = false;
        }
    }

	const subjectBlurHandler = () => {
        enteredSubjectIsTouched = true;
        if (subject === '') {
            enteredSubjectIsValid = false;
        }
    }

    const messageBlurHandler = () => {
        enteredMessageIsTouched = true;
        if (message === '') {
            enteredMessageIsValid = false;
        }
    }

    // after submit

	let item = "";

	$: if((item.success) || (item.error)) {
		setTimeout(() => {
			item = "";
		}, 4000)
	}

	async function createMessage(nameFirst, nameLast, email, subject, message) {		

		const response = await fetch("/api/sendMail", {

			method: 'POST',
			body: JSON.stringify({
				nameFirst,
				nameLast,
				email,
				subject,
				message
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		});
		item = await response.json();
		console.log(item);
		return item;
	}

	let pending = false;

	$: if((item.success) || (item.error)) {
		pending = false;
	}

	async function handleSubmit() {

		pending = true;

        try {
            await createMessage(
                nameFirst,
                nameLast,
                email,
				subject,
                message
            );
			if (nameFirst === '') {
                enteredNameFirstIsValid = false;
            }
            if (nameLast === '') {
                enteredNameLastIsValid = false;
            }
            if (email === '') {
                enteredEmailIsValid = false;
            }
            if (email !== '' && !email.includes('@')) {
                enteredEmailHasAtSymbol = false;
            }
			if (subject === '') {
                enteredSubjectIsValid = false;
            }
            if (message === '') {
                enteredMessageIsValid = false;
            }
            if (item.success) {
				nameFirst = "",
                nameLast = "",
                email = "",
				subject = "",
                message = ""
			}
        } catch (error) {
			console.log("catch");
        }
	}

</script>

<svelte:head>
	<title>Contact Suzanne Conti Quilts</title>
	<meta name="description" content="Get in touch with Suzanne Conti to share something about her quilts or her ancestors' quilts." />
	<link rel="canonical" href="https://suzannecontiquilts.vercel.app/contact" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Contact Suzanne Conti Quilts" />
	<meta property="og:description" content="Get in touch with Suzanne Conti to share something about her quilts or her ancestors' quilts." />
	<meta property="og:url" content="https://suzannecontiquilts.vercel.app/contact" />
	<meta property="og:image" content={`${PUBLIC_DOMAIN}${quiltHeader}`} />
</svelte:head>

<div class="text-column">
	<section 
		class="quilt_pattern_background"
		style="background-image: url({quiltPattern});"
	>
		<div class="contact_content_container">
			<div class="contact_form">
				<h1 class="contact_heading">
					Have something to share about Suzanne's and her ancestors' quilts?
				</h1>
				<p>Suzanne would like to hear from you.  Please use the form to send a message.</p>
				<img 
					class="stitches"
					src="{stitches}" 
					alt="stitches" 
				/>
				<form 
					on:submit|preventDefault={handleSubmit}
					method="POST" 
					class="form_container"
					noValidate
				>
					<div class="form_field">
						<label 
							for="name_first"
							class="form_label"
						>
							first name:
						</label>
						<input 
							id="name_first"
							type="text" 
							class="form_input"
							style="{(!enteredNameFirstIsValid) ? 'background-color: #FDDBD3;' : 'background-color: #FFFFFF;'}"
							bind:value={nameFirst}
							on:input={nameFirstChangeHandler}
							on:blur={nameFirstBlurHandler}
						/>	
					</div>
					{#if (!enteredNameFirstIsValid)}
						<div class="input_error_message">
							missing a first name
						</div>
					{/if}
					<div class="form_field">
						<label 
							for="name_last"
							class="form_label"
						>
							last name:
							
						</label>
						<input 
							id="name_last" 
							type="text" 
							class="form_input"
							style="{(!enteredNameLastIsValid) ? 'background-color: #FDDBD3;' : 'background-color: #FFFFFF;'}"
							bind:value={nameLast}
							on:input={nameLastChangeHandler}
							on:blur={nameLastBlurHandler}
						/>
					</div>
					{#if (!enteredNameLastIsValid)}
						<div class="input_error_message">
							missing a last name
						</div>
					{/if}
					<div class="form_field">
						<label 
							for="email"
							class="form_label"
						>
							email address:
						</label>
						<input 
							id="email" 
							type="email" 
							class="form_input"
							style="{(!enteredEmailIsValid || !enteredEmailHasAtSymbol) ? 'background-color: #FDDBD3;' : 'background-color: #FFFFFF;'}"
							bind:value={email}
							on:input={emailChangeHandler}
							on:blur={emailBlurHandler}
						/>
					</div>
					{#if (!enteredEmailIsValid)}
						<div class="input_error_message">
							missing an email
						</div>
					{/if}
					{#if (!enteredEmailHasAtSymbol)}
						<div class="input_error_message">
							email must have an @ symbol
						</div>
					{/if}
					<div class="form_field">
						<label 
							for="subject"
							class="form_label"
						>
							subject:
							
						</label>
						<input 
							id="subject" 
							type="text" 
							class="form_input"
							style="{(!enteredSubjectIsValid) ? 'background-color: #FDDBD3;' : 'background-color: #FFFFFF;'}"
							bind:value={subject}
							on:input={subjectChangeHandler}
							on:blur={subjectBlurHandler}
						/>
					</div>
					{#if (!enteredSubjectIsValid)}
						<div class="input_error_message">
							missing a subject
						</div>
					{/if}
					<div class="form_field">
						<label 
							for="message"
							class="form_label"
						>
							message:
						</label>
						<textarea 
							id="message" 
							type="text" 
							class="form_para_input"
							style="{(!enteredMessageIsValid) ? 'background-color: #FDDBD3;' : 'background-color: #FFFFFF;'}"
							bind:value={message}
							on:input={messageChangeHandler}
							on:blur={messageBlurHandler}
						/>
					</div>
					{#if (!enteredMessageIsValid)}
						<div class="input_error_message">
							missing a message
						</div>
					{/if}
					<div class="form_buttons_container">
						<a href="/" aria-label="link index page">
							<CancelButton>cancel</CancelButton>
						</a>
						<SubmitButton type="submit">send</SubmitButton>
					</div>
				</form>
				{#if (pending)}
					<PendingFlashMessage >
						please wait while we validate your data
					</PendingFlashMessage>
				{:else if (item.error)}
					<ErrorFlashMessage >
						{item.error}
					</ErrorFlashMessage>
				{:else if (item.success)}
					<SuccessFlashMessage>
						{item.success}
					</SuccessFlashMessage>
				{/if}
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
		width: 45rem;
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
		background: rgba(255,255,255,0.7);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
		border-radius: 3rem;
	}

	.contact_heading {
		margin: 0 auto;
		text-align: left;
		font-size: 2.5rem;
	}

	.stitches {
		max-width: 12rem;
		margin: 1rem auto auto auto;
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
		margin: 1rem 0 0 0;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.form_label {
		width: 15rem;
		display: inline-block;
		text-align: right;
	}
	
	.form_input {
		width: 100%;
	}

	.input_error_message {
		width: auto;
		margin-left: auto;
		text-align: right;
		font-size: 1.5rem;
		color: #ffffff;
		background-color: rgba(255,0,0,0.50);
		padding: 0.5rem 1rem;
	}

	.form_para_input {
		width: 100%;
	}

	.form_buttons_container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 2rem;
		margin: 1rem auto auto auto;
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
			margin: 0.5rem auto auto auto;
		}

		.form_field {
			width: 100%;
			margin: 0.5rem 0 0 0;
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

		.input_error_message {
			width: auto;
			margin-left: auto;
			text-align: right;
			font-size: 1rem;
			color: #ffffff;
			background-color: rgba(255,0,0,0.50);
			padding: 0.5rem 1rem;
		}
	}

</style>
