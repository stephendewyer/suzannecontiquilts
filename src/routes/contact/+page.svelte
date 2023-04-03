<script>
	import quiltPattern from '$lib/images/quilts/Grandma_Kate/Suzanne_Conti_Grandma_Kate_08.jpg';
	import stitches from '$lib/images/icons/stitches.svg';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import CancelButton from '$lib/components/buttons/CancelButton.svelte';

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
        if (email !== '') {
            enteredEmailIsValid = true;
        }
    };

	const emailLeaveHandler = () => {
		if (email !== '' && email.includes('@') ) {
			enteredEmailIsValid = true;
			enteredEmailHasAtSymbol = true;
		}

		if (email !== '' && !email.includes('@')) {
			enteredEmailIsValid = true;
		}
	}

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

    // const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    // const [requestError, setRequestError] = useState();

    // useEffect(() => {
    //     if (requestStatus === 'success' || requestStatus === 'error') {
    //         const timer = setTimeout(() => {
    //             setRequestStatus(null);
    //             setRequestError(null);
    //         }, 6000);
    
    //         return () => clearTimeout(timer);
    //     }
    // }, [requestStatus]);

	async function handleSubmit() {

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
		const item = await response.json()
		console.log(item);
		return item;
	}

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
				<form 
					on:submit|preventDefault={handleSubmit}
					method="POST" 
					class="form_container"
				>
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
							bind:value={nameFirst}
							on:input={nameFirstChangeHandler}
							on:blur={nameFirstBlurHandler}
						/>	
					</div>
					{#if (!enteredNameFirstIsValid)}
						<div class="input_error_message">
							Missing a first name.
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
							name="name_last" 
							type="text" 
							class="form_input"
							bind:value={nameLast}
							on:input={nameLastChangeHandler}
							on:blur={nameLastBlurHandler}
						/>
					</div>
					{#if (!enteredNameLastIsValid)}
						<div class="input_error_message">
							Missing a last name.
						</div>
					{/if}
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
							bind:value={email}
							on:change={emailLeaveHandler}
							on:input={emailChangeHandler}
							on:blur={emailBlurHandler}
						/>
					</div>
					{#if (!enteredEmailIsValid)}
						<div class="input_error_message">
							Missing an email.
						</div>
					{/if}
					{#if (!enteredEmailHasAtSymbol)}
						<div class="input_error_message">
							Email must have an @ symbol.
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
							name="subject" 
							type="text" 
							class="form_input"
							bind:value={subject}
							on:input={subjectChangeHandler}
							on:blur={subjectBlurHandler}
						/>
					</div>
					{#if (!enteredSubjectIsValid)}
						<div class="input_error_message">
							Missing a subject.
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
							name="message" 
							type="text" 
							class="form_para_input"
							bind:value={message}
							on:input={messageChangeHandler}
							on:blur={messageBlurHandler}
						/>
					</div>
					{#if (!enteredMessageIsValid)}
						<div class="input_error_message">
							Missing a message.
						</div>
					{/if}
					<div class="form_buttons_container">
						<CancelButton>cancel</CancelButton>
						<SubmitButton type="submit">send</SubmitButton>
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
		width: 10rem;
		display: inline-block;
		text-align: right;
	}
	
	.form_input {
		width: 100%;
		display: inline-block;
	}

	.input_error_message {
		width: 100%;
		text-align: right;
		font-size: 1.5rem;
		color: red;
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
	}

</style>
