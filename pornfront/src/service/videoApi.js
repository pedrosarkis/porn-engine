const fetchVideos = async (search) => {
    const response = await fetch(`https://porn-engine-api.onrender.com/?q=${search.replaceAll(' ', '+')}`);
    const data = await response.json();
    return data;
}

export {
    fetchVideos
}