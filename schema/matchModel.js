const matchSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    problemId: { type: String, required: true }, 
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    user1Time: { type: Number }, 
    user2Time: { type: Number },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Winner's user ID
})

module.exports = mongoose.model('Match', matchSchema);