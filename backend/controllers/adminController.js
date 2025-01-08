const { PrismaClient } = require("@prisma/client");
const { comparePassword } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.user.findUnique({ where: { email } });

        if (!admin || admin.role !== "admin") {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordValid = await comparePassword(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });



        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

