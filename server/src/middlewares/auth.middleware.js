import jwt from 'jsonwebtoken';

function authMiddleware(roles) {
    return (req, res, next) => {
        const token = req.headers.authorization;
        const tokdenData = jwt.decode(token);
        if (roles.includes(tokdenData?.role)) {
            next();
        }else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
  
}

export default authMiddleware;