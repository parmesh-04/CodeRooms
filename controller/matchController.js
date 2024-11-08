const Match = require('../schema/matchModel');
const User = require('../schema/userModel');

// Start a match between two users
exports.startMatch = async (req, res) => {
    const { user1Id, user2Id, problemId } = req.body;
    const match = new Match({ user1: user1Id, user2: user2Id, problemId });
    await match.save();
    res.status(201).json({ message: 'Match started', matchId: match._id });
};

// Record a user's solution submission
exports.submitSolution = async (req, res) => {
    const { matchId, userId, timeInSeconds } = req.body;
    const match = await Match.findById(matchId);

    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Save user's submission time
    if (match.user1.toString() === userId) {
        match.user1Time = timeInSeconds;
    } else if (match.user2.toString() === userId) {
        match.user2Time = timeInSeconds;
    } else {
        return res.status(400).json({ message: 'User not part of this match' });
    }

    // Check if both users have submitted
    if (match.user1Time && match.user2Time) {
        match.endTime = new Date();

        // Determine the winner
        if (match.user1Time < match.user2Time) {
            match.winner = match.user1;
            await User.findByIdAndUpdate(match.user1, { $inc: { score: 10, wins: 1, totalMatches: 1 } });
            await User.findByIdAndUpdate(match.user2, { $inc: { losses: 1, totalMatches: 1 } });
        } else {
            match.winner = match.user2;
            await User.findByIdAndUpdate(match.user2, { $inc: { score: 10, wins: 1, totalMatches: 1 } });
            await User.findByIdAndUpdate(match.user1, { $inc: { losses: 1, totalMatches: 1 } });
        }

        await match.save();
        res.json({ message: 'Match completed', match });
    } else {
        await match.save();
        res.json({ message: 'Submission recorded', match });
    }
};

// Get match details by ID
exports.getMatchDetails = async (req, res) => {
    const { matchId } = req.params;
    const match = await Match.findById(matchId).populate('user1 user2 winner', 'leetcodeUsername score');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
};