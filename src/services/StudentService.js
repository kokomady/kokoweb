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

const LOGIN_URL = 'http://192.168.1.9:8080/login/sigin';
const STUDENTS_GET_URL = 'http://192.168.1.9:8080/students/getAllStudents';
const STUDENTS_SAVE_URL = 'http://192.168.1.9:8083/admin/addUpdateStudent';



class StudentsService {
    async login(username, password) {
        try {
            const response = await axios.post(LOGIN_URL, { username, password });
            if (response.status === 200 && response.data && response.data.data && response.data.data.accessToken) {
                setCookie('accessToken', response.data.data.accessToken, 1); // Store for 1 day
                return { success: true, data: response.data };
            } else {
                let errorMsg = 'Invalid password or credentials.';
                if (response.data && response.data.message) errorMsg = response.data.message;
                return { success: false, error: errorMsg };
            }
        } catch (err) {
            let errorMsg = 'Login failed.';
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            return { success: false, error: errorMsg };
        }
    }

    getAuthHeader() {
        const token = getCookie('accessToken');
        if (!token || token === 'undefined' || token === 'null') {
            console.warn('No valid access token found for Authorization header');
            return {};
        }
        return { Authorization: `Bearer ${token}` };
    }

    getAllStudents() {
        return axios.get(STUDENTS_GET_URL, { headers: this.getAuthHeader() });
    }

    addStudent(studentData) {
        return axios.put(STUDENTS_SAVE_URL, studentData, { headers: this.getAuthHeader() });
    }

    async registerUser(email, userData) {
        // userData should include: fullName, password, role, address, phone, otp
        return axios.put(`http://192.168.1.9:8080/user/RegisterUser?email=${email}`, userData);
    }
}

export default new StudentsService();
