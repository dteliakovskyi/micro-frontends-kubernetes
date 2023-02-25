<script>
  let hasAccount = false;
  let email = "";
  let password = "";
  let rePassword = "";

  let emailError = "";
  let passwordError = "";
  let rePasswordError = "";

  const handleClick = async () => {
    if (!hasAccount && rePassword !== password) {
      return (rePasswordError = "Passwords should be the same");
    }

    if (email && password) {
      const path = hasAccount ? "signin" : "signup";
      const url = `/api/users/${path}`;

      emailError = "";
      passwordError = "";
      rePasswordError = "";

      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            data.errors.forEach((error) => {
              switch (error.field) {
                case "password":
                  passwordError = error.message;
                  break;
                default:
                  emailError = error.message;
                  break;
              }
            });
          } else {
            console.log(data);
            sessionStorage.setItem("userEmail", data.user);
            location.assign("/");
          }
        });
    }
  };
</script>

<main class="container {hasAccount ? '' : 'sign-up-mode'}">
  <div class="forms-container">
    <div class="signin-signup">
      <form class="sign-in-form">
        <h2 class="title">Sign in</h2>
        <div class="input-field">
          <input
            class="input"
            type="text"
            placeholder="Email"
            bind:value={email}
          />
        </div>
        <div class="input-field">
          <input
            class="input"
            type="password"
            placeholder="Password"
            bind:value={password}
          />
        </div>
        <input
          type="submit"
          value="Login"
          class="btn"
          on:click|preventDefault={() => handleClick()}
        />
      </form>
      <form class="sign-up-form">
        <h2 class="title">Sign up</h2>
        <div class="input-field">
          <input
            class="input"
            type="text"
            placeholder="Email"
            bind:value={email}
            required
          />
          {#if emailError}
            <span class="error">{emailError}</span>
          {/if}
        </div>
        <div class="input-field">
          <input
            class="input"
            type="password"
            placeholder="Password"
            minlength="4"
            bind:value={password}
            required
          />
          {#if passwordError}
            <span class="error">{passwordError}</span>
          {/if}
        </div>
        <div class="input-field">
          <input
            class="input"
            type="password"
            placeholder="Repeat Password"
            minlength="4"
            bind:value={rePassword}
            required
          />
          {#if rePasswordError}
            <span class="error">{rePasswordError}</span>
          {/if}
        </div>
        <input
          on:click|preventDefault={() => handleClick()}
          type="submit"
          class="btn"
          value="Register"
        />
      </form>
    </div>
  </div>

  <div class="panels-container">
    <div class="panel left-panel">
      <div class="content">
        <h3>Create an account</h3>
        <button
          class="btn transparent"
          on:click={() => (hasAccount = !hasAccount)}>Sign up</button
        >
      </div>
    </div>
    <div class="panel right-panel">
      <div class="content">
        <h3>Already have an account?</h3>
        <div>SOME CHANGEWS</div>
        <button
          class="btn transparent"
          on:click={() => (hasAccount = !hasAccount)}>Sign in</button
        >
      </div>
    </div>
  </div>
</main>

<style>
  h3,
  input {
    font-family: "Poppins", sans-serif;
  }

  .container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    color: rgb(32, 101, 209);
    background: rgba(249, 250, 251, 0.8);
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  form.sign-up-form {
    opacity: 0;
    z-index: 1;
  }

  form.sign-in-form {
    z-index: 2;
  }

  .title {
    font-size: 2.8rem;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 24rem;
  }
  .error {
    margin-top: 1rem;
    margin-left: 0.5rem;
    align-self: flex-start;
    color: crimson;
  }
  .input:hover {
    border-color: rgb(33, 43, 54);
  }
  .input {
    flex: 1;
    border: 1px solid rgb(71 89 109 / 51%);
    border-radius: 6px;
    outline: none;
    background: none;
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0;
    padding: 1.5rem 2rem;
    width: 100%;
    color: rgb(32, 101, 209);
  }

  .input::placeholder {
    font-weight: 500;
    color: rgb(99, 115, 129);
  }

  .btn {
    width: 15rem;
    color: #efebe9;
    border: none;
    outline: none;
    height: 5rem;
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    background: rgb(32, 101, 209);
    box-shadow: 8px 8px 16px #d9d2ce, -8px -8px 16px #fffcf6;
  }

  .btn:hover {
    background: rgb(16, 57, 150);
  }
  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .container:before {
    content: "";
    position: absolute;
    height: 2500px;
    width: 2500px;
    top: 0;
    right: 48%;
    transform: translateY(-50%);
    background: rgb(32, 101, 209);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }

  .panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
  }

  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }

  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
    transition: all 0.2s;
  }

  .panel .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel h3 {
    color: #eee7e2;
    font-weight: 600;
    line-height: 1;
    font-size: 2.6rem;
  }

  .btn.transparent {
    background: rgb(32, 101, 209);
    box-shadow: rgb(32 49 76 / 47%) 0px 8px 16px 0px;
  }

  .btn.transparent:hover {
    background: rgb(16, 57, 150);
  }

  .right-panel .content {
    opacity: 0;
    transform: translateX(800px);
    transition: all 1s;
  }

  .container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
  }

  .container.sign-up-mode .left-panel .content {
    opacity: 0;
    transform: translateX(-800px);
    transition: all 1s;
  }

  .container.sign-up-mode .signin-signup {
    left: 25%;
  }

  .container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
  }

  .container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
  }

  .container.sign-up-mode .right-panel .content {
    opacity: 1;
    transform: translateX(0%);
    transition: all 1s;
    transition-delay: 1s;
  }

  .container.sign-up-mode .left-panel {
    pointer-events: none;
  }

  .container.sign-up-mode .right-panel {
    pointer-events: all;
  }

  @media (max-width: 870px) {
    .container {
      min-height: 10rem;
      height: 100vh;
    }
    .signin-signup {
      width: 100%;
      top: 95%;
      transform: translate(-50%, -100%);
      transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .container.sign-up-mode .signin-signup {
      left: 50%;
    }

    .panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 2.5rem 8%;
      grid-column: 1 / 2;
    }

    .right-panel {
      grid-row: 3 / 4;
    }

    .left-panel {
      grid-row: 1 / 2;
    }

    .panel .content {
      padding-right: 15%;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.8s;
    }

    .panel h3 {
      font-size: 1.2rem;
    }

    .btn.transparent {
      width: 110px;
      height: 35px;
      font-size: 0.7rem;
    }

    .container:before {
      width: 1500px;
      height: 1500px;
      transform: translateX(-50%);
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }

    .container.sign-up-mode:before {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }

    .container.sign-up-mode .left-panel .content {
      transform: translateY(-300px);
    }

    .container.sign-up-mode .right-panel .content {
      transform: translateY(0px);
    }

    .right-panel .content {
      transform: translateY(300px);
    }

    .container.sign-up-mode .signin-signup {
      top: 5%;
      transform: translate(-50%, 0);
    }
  }

  @media (max-width: 570px) {
    form {
      padding: 0 1.5rem;
    }

    .panel .content {
      padding: 0.5rem 1rem;
    }
    .container {
      padding: 1.5rem;
    }

    .container:before {
      bottom: 72%;
      left: 50%;
    }

    .container.sign-up-mode:before {
      bottom: 28%;
      left: 50%;
    }
  }
</style>
