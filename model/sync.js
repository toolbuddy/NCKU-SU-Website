const sqldb = require('./sqldb');

sqldb.sequelize.sync({force: true})
.then(() => {
    console.log("Database sync successfuly!");
})
.catch( err=> {
    console.log(err);
});
