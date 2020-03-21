<script>
    import Amplify, { Auth, Storage } from 'aws-amplify';
    import {onMount} from 'svelte';

    let user;
    let name;
    let password;
    let newPassword;

    async function handler() {
        user = await Auth.signIn({
            username: name,
            password: password
        });

        const credentials = await Auth.currentCredentials();
        console.log(credentials);
        
        
    }

    async function newPasswordHandle() {
        user = await Auth.completeNewPassword(
            user,
            newPassword,
        )
    }

    function bucketlist() {
        Storage.list('photos/')
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
</script>

<slot>
    <input bind:value={name} type="text"/>
    <input bind:value={password} type="password"/>
    <button on:click={handler}>signIn</button>
    
    {#if user}
        <p>{user.challengeName}</p>
        {#if user.challengeName === 'NEW_PASSWORD_REQUIRED'}
            <span> new password </span> <input bind:value={newPassword} type="password"/> <button on:click={newPasswordHandle}>Change</button>
        {/if}
    {/if}

    <button on:click={bucketlist}>
    </button>

    
</slot>