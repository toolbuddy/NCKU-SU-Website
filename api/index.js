const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const getProposal = require('./routes/getProposal');
const ProposalSum = require('./routes/ProposalSum');
const saveProposal = require('./routes/saveProposal');
const deleteProposal = require('./routes/deleteProposal');

// Import API Routes
app.use(users);
app.use(getProposal);
app.use(ProposalSum);
app.use(saveProposal);
app.use(deleteProposal);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
