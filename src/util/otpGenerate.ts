export default (length = 6) => {
    const charset = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += charset[Math.floor(Math.random() * charset.length)];
    }
    return OTP;
}