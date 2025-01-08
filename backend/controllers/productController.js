const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
    },
    limits: { fileSize: 1 * 1024 * 1024 }, 
});

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: 'Failed to fetch product by ID' });
    }
};

exports.addProduct = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, price } = req.body;

            if (!name || !price) {
                return res.status(400).json({ error: 'Name and price are required' });
            }

            const priceFloat = parseFloat(price);
            if (isNaN(priceFloat)) {
                return res.status(400).json({ error: 'Invalid price value' });
            }

            const image = req.file ? req.file.path : null;

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: priceFloat,
                    image,
                },
            });

            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: 'Failed to create product', details: error.message });
        }
    },
];

exports.updateProduct = [
    upload.single('image'),
    async (req, res) => {
        const { id } = req.params;
        const { name, price } = req.body;

        try {
            let priceFloat;
            if (price) {
                priceFloat = parseFloat(price);
                if (isNaN(priceFloat)) {
                    return res.status(400).json({ error: 'Invalid price value' });
                }
            }

            const data = {
                ...(name && { name }),
                ...(priceFloat && { price: priceFloat }),
                ...(req.file && { image: req.file.path }),
            };

            const updatedProduct = await prisma.product.update({
                where: { id: parseInt(id) },
                data,
            });

            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            if (error.code === 'P2025') {
                res.status(404).json({ error: 'Product not found' });
            } else {
                res.status(500).json({ error: 'Failed to update product', details: error.message });
            }
        }
    },
];

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete product', details: error.message });
        }
    }
};

