// controllers/userController.ts (atualizado)
export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // A1 - Determinar tipo de usuário
        const userRole: JwtPayload['tipo'] = user.isAdmin ? "admin" : "user"; 

        const payload: JwtPayload = {
            id: user._id.toString(),
            tipo: userRole  // ← CAMPO ESSENCIAL
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1d'
        });

        res.json({ 
            token, 
            message: 'Login realizado com sucesso!',
            tipo: userRole,
            nome: user.nome // ← Adicionar nome na resposta
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};