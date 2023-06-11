import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone'

moment.tz.setDefault('America/Argentina/Buenos_Aires');

const TicketSchema = new mongoose.Schema({

    code: {
        type: String,
        default: uuidv4,
        immutable: true,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        immutable: true,
        default: () => moment().toDate(),
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }

})

export const TicketModel = mongoose.model("Ticket", TicketSchema)