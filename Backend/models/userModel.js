const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  role: {type: Number, required: true}
}, {timestamps: true});