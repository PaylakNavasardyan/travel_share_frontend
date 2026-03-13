import $api from "../../../../http";
    
const ReactToPost = async (postId: string, type: string) => {
    try {
        return await $api.post(`/api/posts/${postId}/react`, {
            type: type,
        });
    }catch(error) {
        console.log(error)
    };
}

export default ReactToPost;
