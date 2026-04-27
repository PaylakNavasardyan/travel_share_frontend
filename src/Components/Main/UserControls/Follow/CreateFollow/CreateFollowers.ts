import $api from '../../../../../http'

export async function CreateFollow() {
    const URL_PATH = window.location.pathname;
    const parts = URL_PATH.split('/');
    const id = parts[parts.length - 1];

    try {
        await $api.post(`/api/follow/${id}`);
        return true;
    } catch(error) {
        console.log(error);
        return false
    }  
}
