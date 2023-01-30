import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import ShopItem from '../model/ShopItem';

const router = express.Router();

router.post('/items',
    body('name').isString().trim().notEmpty().withMessage('Name cannot be empty'),
    body('description').isString().trim(),
    body('price').isFloat({ min: 1 }).withMessage('Price must be a decimal value >=1'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    async (req: Request, res: Response) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const shopItem = await ShopItem.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity
            })
            res.status(200).json(shopItem)
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    });

router.put('/items/:id',
    param('id').isUUID().withMessage('Must be a UUID'),
    body('name').isString().trim().notEmpty().withMessage('Name cannot be empty'),
    body('description').isString().trim(),
    body('price').isFloat({ min: 1 }).withMessage('Price must be a decimal value >=1'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    async (req: Request, res: Response) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const shopItem = await ShopItem.findOneAndUpdate(
                { id: req.params.id },
                {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    quantity: req.body.quantity
                },
                { new: true })

            if (shopItem) {
                res.status(200).json(shopItem)
            } else {
                res.status(404).json({ message: 'Item does not exist' })
            }

        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    });

router.delete('/items/:id',
    param('id').isUUID().withMessage('Must be a UUID'),
    async (req: Request, res: Response) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const shopItem = await ShopItem.deleteOne({ id: req.params.id })
            if (shopItem.deletedCount > 0) {
                res.status(204)
            }
            else {
                res.status(404).json({ message: 'Item does not exist' })
            }
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    });

router.get('/items', async (req: Request, res: Response) => {
    try {
        const data = await ShopItem.find();
        res.status(200).json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/items/:id',
    param('id').isUUID().withMessage('Must be a UUID'),
    async (req: Request, res: Response) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const data = await ShopItem.findOne({ id: req.params.id });
            if (data) {
                res.status(200).json(data)
            }
            else {
                res.status(404).json({ message: 'Item does not exist' })
            }
        }
        catch (error: any) {
            res.status(500).json()
        }
    });

export default router