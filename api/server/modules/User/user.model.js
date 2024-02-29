import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const UserSchema = mongoose.Schema({
    user_name: {
        type: String
    },
    email: {
        type: String,
        require: false,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'in_active', 'supended'],
        default: "active",
    },
    is_admin: {
        type: Boolean,
        default: false
    }
}, { collection: 'User', timestamps: true });
UserSchema.plugin(mongoosePaginate);
let UserModel = mongoose.model('User', UserSchema);

export default UserModel