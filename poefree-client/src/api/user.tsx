import { CreateUserPayload } from '@backend/payloads/userPayloads';
import { ServerResponse } from '@backend/responseTypes';

export const getAllUsers = async () => {
    return fetch('http://localhost:4000/api/users')
        .then((res) => res.json())
        .then((resJson) => resJson.payload)
        .catch((err) => console.error(err));
};

export const registerNewUser = async (
    createUserPayload: CreateUserPayload,
): Promise<ServerResponse> => {
    try {
        const response = await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            body: JSON.stringify(createUserPayload),
            headers: {
                'Content-Type': 'application/json', // Fixed the headers format
            },
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`,
            );
        }

        // Parse the JSON response
        const data: ServerResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to register new user:', error);
        throw error; // Rethrow the error to handle it further up the call stack
    }
};
