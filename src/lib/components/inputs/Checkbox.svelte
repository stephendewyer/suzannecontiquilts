<script>
  import { v4 as uuidv4 } from 'uuid';

  export let value;
  export let checked = false;
  export let valueChanged = false;

  const unique_id = uuidv4();

  let checkboxHovered = false;

  const checkboxHoverHandler = () => {

    checkboxHovered = true;

  };

  const checkboxExitHandler = () => {

    checkboxHovered = false;

  };

</script>

<div 
  class="checkbox-wrapper-28"
  on:focus={() => checkboxHoverHandler()}
  on:blur={() => checkboxExitHandler()}
  on:mouseenter={() => checkboxHoverHandler()}
  on:mouseover={() => checkboxHoverHandler()}
  on:mouseleave={() => checkboxExitHandler()}
  on:mouseout={() => checkboxExitHandler()}
>
    <input 
      id={unique_id} 
      type="checkbox"
      class="promoted-input-checkbox"
      value={value}
      bind:checked={checked}
      on:click={() => valueChanged = true}
      on:keyup={() => valueChanged = true}
    />
    <svg><use xlink:href="#checkmark-28" /></svg>
    <label 
      for={unique_id}
      class="checkbox_label"
      style="{checkboxHovered ? "color: #ED6545" : "color: #3B3E29"}"
    >
      <slot />   
    </label>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      style="display: none"
    >
      <symbol id="checkmark-28" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-miterlimit="10" 
          fill="none"  
          d="M22.9 3.7l-15.2 16.6-6.6-7.1"
        />
      </symbol>
    </svg>
  </div>

  <style>
    .checkbox-wrapper-28 {
      --size: 1.5rem;
      position: relative;
      display: flex;
    }
  
    .checkbox-wrapper-28 *,
    .checkbox-wrapper-28 *:before,
    .checkbox-wrapper-28 *:after {
      box-sizing: border-box;
    }
  
    .checkbox-wrapper-28 .promoted-input-checkbox {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
  
    .checkbox-wrapper-28 input:checked ~ svg {
      height: calc(var(--size) * 0.6);
      -webkit-animation: draw-checkbox-28 ease-in-out 0.2s forwards;
              animation: draw-checkbox-28 ease-in-out 0.2s forwards;
    }

    .checkbox-wrapper-28 label:active::after {
      background-color: #e6e6e6;
    }

    .checkbox_label {
      font-size: 1.25rem;
      line-height: var(--size);
      cursor: pointer;
      position: relative;
      will-change: color;
      transition: color 300ms ease-out;
    }

    .checkbox-wrapper-28 label:after {
      content: "";
      height: var(--size);
      width: var(--size);
      margin-right: 8px;
      float: left;
      border: 2px solid #3B3E29;
      border-radius: 3px;
      will-change: border;
      transition: all 300ms ease-out;
    }

    .checkbox-wrapper-28:hover label:after {
      border: 2px solid #ED6545;
    }

    .checkbox-wrapper-28 svg {
      stroke: #3B3E29;
      stroke-width: 3px;
      height: 0;
      width: calc(var(--size) * 0.6);
      position: absolute;
      left: calc(var(--size) * 0.21);
      top: calc(var(--size) * 0.2);
      stroke-dasharray: 33;
      transition: stroke 300ms ease-out;
      will-change: stroke;
    }

    .checkbox-wrapper-28:hover svg {
      stroke: #ED6545;
    }
  
    @-webkit-keyframes draw-checkbox-28 {
      0% {
        stroke-dashoffset: 33;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
  
    @keyframes draw-checkbox-28 {
      0% {
        stroke-dashoffset: 33;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }

    @media (max-width: 750px) {

      .checkbox_label {
        font-size: 1rem;
      }

    }
  </style>
  