import { Schema,model } from 'mongoose';
import { i_events_model } from '@interfaces/events.interface';

const eventsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        refer: 'User',
        required: true
    }
},{
    collection: 'eventos',
    timestamps: true
});



export default model<i_events_model>('Event',eventsSchema);

