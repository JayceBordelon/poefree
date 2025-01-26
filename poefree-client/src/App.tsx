import { useEffect, useState } from 'react';
import './App.css';
import { getAllUsers } from './api/user';
import { User } from '@backend/prismaTypes';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getAllUsers().then((payload) => setUsers(payload));
    }, []);

    return users ? <p>{JSON.stringify(users)}</p> : <h1>Uh Oh</h1>;
}

export default App;
