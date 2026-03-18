const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION
const DB_URI = 'mongodb://localhost:27017/lexflow_court';
mongoose.connect(DB_URI)
  .then(() => console.log('✅ Connected to LexFlow MongoDB'))
  .catch(err => console.error('❌ Connection Error:', err));

// 2. CASE SCHEMA (The "Brain" of the Four Systems)
const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  litigantName: String,
  litigantPhone: String,
  trackType: { type: String, enum: ['FAST_TRACK', 'LEGACY'], default: 'FAST_TRACK' },
  investigationScore: { type: Number, default: 0 }, // System 1: Gatekeeper
  adjournmentTokens: { type: Number, default: 2 }, // System 2: Brake
  stayExpiryDate: { type: Date },                 // System 4: Timer
  isStayActive: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' }
});

const Case = mongoose.model('Case', caseSchema);

// 3. ROUTES

// Get all cases for the Judge's Dashboard
app.get('/api/cases', async (req, res) => {
  const cases = await Case.find();
  res.json(cases);
});

// System 2: Adjournment Brake Logic
app.post('/api/cases/:id/adjourn', async (req, res) => {
  const targetCase = await Case.findOne({ caseId: req.params.id });

  if (!targetCase) return res.status(404).send("Case not found");

  if (targetCase.adjournmentTokens <= 0) {
    // SMS Notification Simulation
    console.log(`[LITIGANT ALERT] SMS sent to ${targetCase.litigantPhone}: Adjournment denied for Case ${targetCase.caseId}.`);
    return res.status(403).json({ message: "Limit Reached. Client Notified." });
  }

  targetCase.adjournmentTokens -= 1;
  await targetCase.save();
  res.json({ message: "Adjournment successful", tokensLeft: targetCase.adjournmentTokens });
});

// System 4: The Stay Order "Vacuum"
app.post('/api/system/stay-vacuum', async (req, res) => {
  const now = new Date();
  const result = await Case.updateMany(
    { stayExpiryDate: { $lt: now }, isStayActive: true },
    { isStayActive: false, status: 'STAY_VACATED_BY_SYSTEM' }
  );
  
  console.log(`[SYSTEM] Vacuum executed. ${result.modifiedCount} stays removed.`);
  res.json({ message: "Vacuum complete", cleared: result.modifiedCount });
});

// 4. SEED DATA (Run this once to see results)
const seedData = async () => {
  const count = await Case.countDocuments();
  if (count === 0) {
    await Case.insertMany([
      { 
        caseId: "2026-FT-001", litigantName: "Amit Kumar", litigantPhone: "9876543210",
        trackType: "FAST_TRACK", investigationScore: 90, adjournmentTokens: 2,
        stayExpiryDate: new Date("2026-12-31"), isStayActive: true, status: "Active"
      },
      { 
        caseId: "2015-LG-992", litigantName: "Suresh Singh", litigantPhone: "9123456789",
        trackType: "LEGACY", investigationScore: 40, adjournmentTokens: 0,
        stayExpiryDate: new Date("2024-01-01"), isStayActive: true, status: "Stalled" 
      }
    ]);
    console.log("🌱 Database Seeded with sample cases.");
  }
};
seedData();

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));