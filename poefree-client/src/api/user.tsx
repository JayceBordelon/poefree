export const getAllUsers = async () => {
    return fetch('http://localhost:4000/api/users')
        .then((res) => res.json())
        .then((resJson) => resJson.payload)
        .catch((err) => console.error(err));
};
