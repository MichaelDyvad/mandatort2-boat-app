<script>
  import { toast } from '@zerodevx/svelte-toast'
  
  let message = false
  fetch("/forgotpasswordapi")
    .then((res) => res.json())
    .then((result) => {
      message = result.sent;
    });
</script>

<h1>Forgot password</h1>
<div class="wrapper">
  <form action="" method="POST">
    <label for="contact-email">Email to reset password</label>
    <input
      id="contact-email"
      type="email"
      placeholder="email"
      name="forgotemail"
    />
    <input type="submit" class="fadeIn fourth" value="submit" />
  </form>

  {#if message === true}
  {toast.push("An email has been sent to you", {
    theme: {
      '--toastColor': 'mintcream',
      '--toastBackground': 'rgba(72,187,120,0.9)',
      '--toastBarBackground': '#2F855A'
    }
  })}
  {/if}

</div>

<style>
  label {
    color: whitesmoke;
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 50%;
    padding: 20px;
  }

  input[type="submit"] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    margin-left: auto ;
    margin-right: auto;
  }

  input[type="submit"]:hover {
    background-color: #39ace7;
  }

  input[type="email"] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }
</style>
