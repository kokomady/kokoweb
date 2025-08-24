import axios from 'axios';
// Simple cookie helpers
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const LOGIN_URL = 'http://localhost:8080/login/hello';
const STUDENTS_GET_URL = 'http://localhost:8080/admin/getClassmate';
const STUDENTS_SAVE_URL = 'http://localhost:8083/admin/addUpdateStudent';



class StudentsService {
    async login(username, password) {
        const response = await axios.post(LOGIN_URL, { username, password });
        if (response.data && response.data.data && response.data.data.accessToken) {
            setCookie('accessToken', response.data.data.accessToken, 1); // Store for 1 day
        }
        return response;
    }

    getAuthHeader() {
        const token = getCookie('accessToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    getAllStudents() {
        return axios.get(STUDENTS_GET_URL, { headers: this.getAuthHeader() });
    }

    addStudent(studentData) {
        return axios.put(STUDENTS_SAVE_URL, studentData, { headers: this.getAuthHeader() });
    }
}

export default new StudentsService();
