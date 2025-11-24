const generateOtp = () => {
    let otp = 0;

    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10)
        otp *= 10
    }
    return otp/10
}

export default generateOtp