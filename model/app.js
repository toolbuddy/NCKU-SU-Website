const sqldb = require('./sqldb');

sqldb.sequelize.sync({force: false})
.then(() => {
    console.log("Server started successfuly!");
})
.catch( err=> {
    console.log(err);
});
