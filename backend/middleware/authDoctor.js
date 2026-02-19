import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const dToken = req.headers.dtoken   // ✅ lowercase

        if (!dToken) {
            return res.json({ success: false, message: "Not Authorized" })
        }

        const decoded = jwt.verify(dToken, process.env.JWT_SECRET)

        req.docId = decoded.id

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Invalid Token" })
    }
}

export default authDoctor
