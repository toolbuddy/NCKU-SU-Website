export default ({store, error}) => {
  if (!store.state.status) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
