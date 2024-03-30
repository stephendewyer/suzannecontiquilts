<script>
    import { v4 as uuidv4 } from 'uuid';

    export let options;

    export let userSelected = options[0].value;

    const unique_id = uuidv4();

    const slugify = (str = "") => {

        str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");

    };
    
</script>

<fieldset 
    aria-labelledby={`label-${unique_id}`}
    id={`group-${unique_id}`}
    class="radio_buttons"
    style="margin: 0; padding: 0;"
>
    {#each options as { value, label }}
      <label 
        for={slugify(label)}
        class="container"
      >
        {label}  
        <input
          type="radio"
          name="group"
          id={slugify(label)}
          bind:group={userSelected}
          value={value} 
        />
        <span class="checkmark" />
      </label> 
    {/each}
  </fieldset>

<style>

  .radio_buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    border: none;
  }

  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1.2rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }

  @media (max-width: 750px) {
    .container {
      font-size: 1rem;
    }
  }
 
</style>