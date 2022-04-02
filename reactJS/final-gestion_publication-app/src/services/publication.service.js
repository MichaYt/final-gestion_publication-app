import http from "../http-common";

class PublicationDataService {
    getAll() {
        return http.get("/publications");
    }
    get(id) {
        return http.get(`/publications/${id}`);
    }
    create(data) {
        return http.post("/publications", data);
    }
    update(id, data) {
        return http.put(`/publications/${id}`, data);
    }
    delete(id) {
        return http.delete(`/publications/${id}`);
    }
    deleteAll() {
        return http.delete(`/publications`);
    }
    findByTitle(title) {
        return http.get(`/publications?title${title}`);
    }
}

export default new PublicationDataService();