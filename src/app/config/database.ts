import { ConnectionOptions } from 'mongoose';

export const config:ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}