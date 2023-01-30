import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface IShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const shopItemSchema = new Schema<IShopItem>({
    id: { type: String, unique: true, required: true, default: () => randomUUID() },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: [1, 'price must be >= 1'] },
    quantity: { type: Number, required: true }
})

const ShopItem = model<IShopItem>('ShopItem', shopItemSchema);
export default ShopItem;