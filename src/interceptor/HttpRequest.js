import axios from 'axios';

export default function setup() {
    axios.interceptors.request.use(function(config) {
        config.headers["tenant-identifier"] = `9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d`;
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}