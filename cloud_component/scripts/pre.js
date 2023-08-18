module.exports = async (runner, args) => {
  try {
    console.log('> PRE: Start')

    // console.log(`args=${JSON.stringify(args)}`);

    // const rc = args.rc;
    // await runner.execute([
    //   `echo '---------------'`,
    //   `ls -alh`,
    //   `echo '---------------'`,
    //   `ls -Ralh ${rc.path}`,
    //   `echo '---------------'`
    // ], {
    //   cwd: rc.workspace_path
    // })

    console.log('> PRE: ✅ DONE')

  } catch (ex) {
    console.error(ex)
    throw new Error('Failed to run script')
  }
}