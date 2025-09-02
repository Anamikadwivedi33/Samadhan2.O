import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'todo' }, // matches project.columns._id
  order: { type: Number, default: 0 },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dueDate: Date,
  activity: [{
    at: { type: Date, default: Date.now },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,
    meta: Object
  }]
}, { timestamps: true });
export default mongoose.model('Task', taskSchema);
