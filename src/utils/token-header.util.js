export default function authHeader() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo && userInfo.token) {
        return { Authorization: 'Bearer ' + userInfo.token };
    } else {
        return {};
    }
}