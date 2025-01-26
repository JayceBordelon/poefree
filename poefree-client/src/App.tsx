import { useEffect, useState } from 'react';
import './App.css';
import { getAllUsers } from './api/user';

function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers()
            .then((res) => res.payload)
            .then((payload) => setUsers(payload));
    }, []);
    return <>{users.length > 0 && users.map((user) => <p>{user?.id}</p>)}</>;
}

export default App;
