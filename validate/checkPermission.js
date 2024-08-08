const jwt = require('jsonwebtoken');
const user = require("../models/userModel");

const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"User chua dang nhap"});
        }
        const data = jwt.verify(token, 'nodejs');
        if(!data){
            return res.status(401).json({message:"Thông tin user không hợp lệ"})
        }
        const User = await user.findById(data.id);
        if(!User){
            res.status(401).json({message:"User không hợp lệ"})
        } 

        next();

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = checkPermission;