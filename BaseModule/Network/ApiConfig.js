import axios from 'axios';

export const BASE_URL = {
    PRODUCTION_BASE_URL:
        "https://us-central1-book-my-mandapam.cloudfunctions.net",
    QA_BASE_URL: "https://us-central1-book-my-mandapam-dev.cloudfunctions.net"
};

const axiosInstance = axios.create({
    baseURL: BASE_URL.QA_BASE_URL,
    timeout: 10000
});
export default axiosInstance;
