import App from './App.svelte';
import Amplify, {Auth} from 'aws-amplify';
import awsmobile from './aws-exports';

const app = new App(
    {
        target: document.body
    }
)

Amplify.configure(
    awsmobile
);



export default app;