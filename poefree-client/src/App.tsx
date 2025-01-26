import { ServerResponse } from '@backend/responseTypes';
import './App.css';
import { registerNewUser } from './api/user';

function App() {
    return (
        <button
            onClick={async () => {
                const res: ServerResponse = await registerNewUser({
                    name: 'jayce',
                    email: 'sd@jayce.com',
                    password: 'poop',
                });
                console.log(res);
            }}
        ></button>
    );
}

export default App;
