import { ServerResponse } from "@backend/responseTypes";
import "./App.css";
import { getAllUsers, registerNewUser } from "./api/user";
import { useState } from "react";
import { User } from "@backend/prismaTypes";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <>
      <button
        onClick={async () => {
          const res: ServerResponse = await registerNewUser({
            name: "jayce",
            email: "bad@jayce.com",
            password: "poop",
          });
          const usersResponse: ServerResponse = await getAllUsers();
          if (usersResponse.payload) {
            const userList: User[] = usersResponse.payload as User[];
            setUsers(userList);
          }
        }}
      >
        Register Fake User
      </button>
      {users.length > 0 && users.map((user) => <p>{JSON.stringify(user)}</p>)}
    </>
  );
}

export default App;
