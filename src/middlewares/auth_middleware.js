import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const senhaJwt = process.env.JWT_PASSWORD;

export const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera formato: "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Usuário não autenticado.' });
    }

    try {
        const decoded = jwt.verify(token, senhaJwt);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido. Faça login novamente.' });
    }
};
