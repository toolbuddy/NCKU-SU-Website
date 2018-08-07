const setting =  require('./default.js')

module.exports =  {
    sequelize: {
        database: setting.database,
        username: setting.username,
        password: setting.password,
        define: {
            charset: 'utf8'
        },
        host: setting.host,
        dialect: setting.dialect,
        operatorsAliases: 'false'
    }
}
