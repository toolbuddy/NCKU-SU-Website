const discuss = require('./discuss.js')

// add discuss
discuss.add({
  content: 'Im disucss',
  studentId: 'F99999999',
  parentId: 1
}, "discuss")
.then( id => {
  console.log('discuss added, id = ' + id);
});

// add reply
discuss.add({
  content: 'Im reply',
  studentId: 'F99999999',
  parentId: 1
}, "reply")
.then( id => {
  console.log('reply added to discuss:1 , id = '+id);
});

// delete discuss
discuss.del(1, "discuss");

// delete reply
discuss.del(1, "reply");

// get discuss content
discuss.getContent(1, "discuss")
.then( con => {
  console.log('discuss:1, content: ' + con);
});

// get reply content
discuss.get(1, "reply")
.then( con => {
  console.log('reply:1, content: ' + con);
});

// get number of discusses
discuss.getSum(1, "discuss")
.then( num => {
  console.log('number of discusses: ' + num);
});

discuss.getSum(1, "reply")
.then( num => {
  console.log('number fo replies: ' + num);
});

