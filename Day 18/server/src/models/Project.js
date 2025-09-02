import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  columns: [{
    _id: { type: String }, // e.g., 'todo','doing','done'
    title: String,
    order: Number
  }]
}, { timestamps: true });
export default mongoose.model('Project', projectSchema);
