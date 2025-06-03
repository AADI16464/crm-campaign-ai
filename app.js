const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const segmentRoutes = require('./routes/segmentRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const aiRoutes = require('./routes/aiRoutes');
const verifyGoogleToken = require('./middlewares/verifyGoogleToken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/customers', verifyGoogleToken, customerRoutes);
app.use('/api/segments', verifyGoogleToken, segmentRoutes);
app.use('/api/campaigns', verifyGoogleToken, campaignRoutes);
app.use('/api/delivery-receipt', deliveryRoutes);
app.use('/api/ai', verifyGoogleToken, aiRoutes);

module.exports = app;