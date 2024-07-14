const fetchVideos = async (search) => {
    const response = await fetch(`http://localhost:3000/?q=${search.replaceAll(' ', '+')}`);
    const data = await response.json();
    return data;
}

export {
    fetchVideos
}