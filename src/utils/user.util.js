export default function getUserId() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo && userInfo.user._id) {
        return userInfo.user._id;
    } else {
        return {};
    }
}