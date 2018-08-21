export default ({store, error}) => {
  if (!store.state.forgetUser) {
    error({
      message: 'You are not authenticated',
      statusCode: 403
    })
  }
}
