export default() => ({
    jwtSecret: process.env.JWT_SECRET,
    emailAPIKey: process.env.EMAIL_APIKEY,
    emailHost: process.env.EMAIL_HOST,
    sessionSecret: process.env.SESSION_SECRET
})