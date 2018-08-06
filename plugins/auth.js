export default ({store, error}) => {
    if (!store.state.isLogin) {
        error ({
            message: 'You are not connected',
            statusCode: 403
        })
    }
}