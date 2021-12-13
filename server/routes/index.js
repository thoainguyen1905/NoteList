const authUSer = require('./auth')
const postUser = require('./post')

function route(app){
    app.use('/auth',authUSer)
    app.use('/posts',postUser)
}

module.exports = route