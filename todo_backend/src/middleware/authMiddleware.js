import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if(!token) {return res.status(401).json({message:"No tokens provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({message: "Invalid Token"})}

        req.userId = decoded.id //we originally create the tokens in authRoutes encoding the userId as id.
        next() //this basically says you passed all the checks anc can move onto the next endpoints which are the todoRoutes.
    })
}

export default authMiddleware