import api from 'jikanjs'

api.settings.setBaseURL('https://api.jikan.moe/v3', 3); // sets also the api version


export const search = async (query, page = 1, category = 'anime') => {
    try {
        return await api.search(category, query, page);
    } catch(e) {
        return e;
    }
}
