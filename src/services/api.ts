const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const fetchbyName = (name:string, page:number)=>{

    const apiStr = `${apiUrl}?s=${name}&apikey=${apiKey}&type=movie&page=${page}`;

    return fetch(apiStr).then(data=>data.json()).then(movieRes=>movieRes);

}

const fetchbyID = (id:string)=>{

    const apiStr = `${apiUrl}?i=${id}&apikey=${apiKey}&plot=full`;

    return fetch(apiStr).then(data=>data.json()).then(movieRes=>movieRes);

}

export default {fetchbyID, fetchbyName}