const express = require('express');

// Create express instnace
const app = express();

// Require API routes
const users = require('./routes/test');
const getProposal = require('./routes/getProposal');
const ProposalSum = require('./routes/ProposalSum');
const saveProposal = require('./routes/saveProposal');
const deleteProposal = require('./routes/deleteProposal');
const addDiscuss = require('./routes/addDiscuss');
const addReply = require('./routes/addReply');
const delDiscuss = require('./routes/delDiscuss');
const delReply = require('./routes/delReply');
const DisscussSum = require('./routes/DiscussSum');
const ReplySum = require('./routes/ReplySum');
const DisscussContent = require('./routes/DiscussContent');
const ReplyContent = require('./routes/ReplyContent');


// Import API Routes
app.use(users);
app.use(getProposal);
app.use(ProposalSum);
app.use(saveProposal);
app.use(deleteProposal);
app.use(addDiscuss);
app.use(addReply);
app.use(delDiscuss);
app.use(delReply);
app.use(DisscussContent);
app.use(ReplyContent);
app.use(DisscussSum);
app.use(ReplySum);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
