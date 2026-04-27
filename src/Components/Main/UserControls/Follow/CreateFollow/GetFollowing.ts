import $api from "../../../../../http"

export async function GetFollowing() {
    const URL_PATH = window.location.pathname;
    const parts = URL_PATH.split('/');
    const id = parts[parts.length - 1];

    try {
        let response = await $api.get(`/api/follow/following/${id}`);
        let followArray = response.data.data.following;

        if (!followArray || !Array.isArray(followArray)) {
            return [];
        }

        return followArray;

    } catch(error) {
        console.log(error);
        return []
    }
}