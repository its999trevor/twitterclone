import api from "./api";

const Handlers = {
    async likehandler(id) {
        try {
            const response = await api.post(`/like/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    },
    async retweethandler(id) {
        try {
            const response = await api.post(`/retweet/${id}`);
            let checkexist = response.data.alredyretweeted;   
            if (checkexist) {
                const response = await api.delete(`/retweet/${id}`);
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }
    },
    async checkIfLiked(id) {
        try {
            const response = await api.get(`/like/${id}/isLiked`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    },
    async checkIfRetweeted(id) {
        try {
            const response = await api.get(`/retweet/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}
export default Handlers;
