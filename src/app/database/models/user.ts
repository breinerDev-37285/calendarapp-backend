import { Schema,model } from 'mongoose';
import { i_user_model } from '@interfaces/user.interface';
import { hashSync,genSaltSync } from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},{
    collection: 'usuarios',
    timestamps: true
});

userSchema.plugin(uniqueValidator, { message: '{VALUE} ya registrado' })

userSchema.pre('save', function() {
    const user:any = this;
    const salt = genSaltSync();
    user.password = hashSync(user.password, salt);
})

userSchema.on('index', function (err) {
    if (err) return;
})

export default model<i_user_model>('User',userSchema);