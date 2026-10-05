const admin = (req,res,next) => {
   //console.log("req.user", req)
//console.log("req.user", req.user)
    if(req.user && req.user.role === "admin") {
        next()
    } else {
     //   console.log("req.user", req.user)
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
}

export default admin