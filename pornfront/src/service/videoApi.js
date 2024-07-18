const baseURL = import.meta.env.VITE_BASE_URL;

const fetchVideos = async (search, calledTimes = 0) => {
    try {
        const response = await fetch(`${baseURL}/?q=${search.replaceAll(' ', '+')}`);
        const data = await response.json();
        return data;
    } catch (error) {
        if(calledTimes >= 3) {
            console.error('Error fetching videos:', error);
            throw error;
        }
        await fetchVideos(search, calledTimes + 1);
    }
    
}

export {
    fetchVideos
}