const baseURL = import.meta.env.VITE_BASE_URL;

const login = async (email, password) => {
    const response = await fetch(`${baseURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
   
    return response;
}

const register = async (username, password) => {
    const response = await fetch(`${baseURL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
}

export {
    login,
    register
}