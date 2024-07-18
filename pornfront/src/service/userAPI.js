const baseURL = import.meta.env.VITE_BASE_URL;

const login = async (email, password) => {
    const response = await fetch(`${baseURL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
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

const addFavoriteVideo = async ({title, url, thumbnail}) => {
    const response = await fetch(`${baseURL}/user/favorite`, {
        method: 'POST',
    headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, url, thumbnail })
    });
    const data = await response.json();
    return data;
}

const getFavorites = async () => {
    const response = await fetch(`${baseURL}/user/favorite`, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}

export {
    login,
    register,
    addFavoriteVideo,
    getFavorites
}