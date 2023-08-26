import { Schema, Types } from 'mongoose';
import { ITransactionDocument } from '../models/schemas/transaction.models';


export const TransactionSchema = new Schema<ITransactionDocument>(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    amount: { type: Number },
    currency_name: { type: String },
    transaction_type: { type: String },
    sender_user_id: { type: String, index: true },
    sender_card_number: { type: Number },
    receiver_user_id: { type: String, index: true },
    receiver_card_number: { type: Number },
    status: { type: String },
    signature: { type: String },
    sender_bank: { type: String, index: true },
    receiver_bank: { type: String, index: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
