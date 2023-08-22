module.exports = async (runner, args) => {
  try {
    console.log('> PRE: Start')

    console.log('> PRE: ✅ DONE')

  } catch (ex) {
    console.error(ex)
    throw new Error('Failed to run script')
  }
}