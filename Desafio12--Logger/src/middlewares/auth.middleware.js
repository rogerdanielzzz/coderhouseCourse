export const adminValidator = (req, res, next) => {

    if (req?.user?.role == "admin") return next()
    return res.status(401).json({ error: "unathorized only for admin" });

}

export const userValidator = (req, res, next) => {
    console.log(req.user.role)
    if (req?.user?.role == "user") return next()
    return res.status(401).json({ error: "unathorized only for user" });

}