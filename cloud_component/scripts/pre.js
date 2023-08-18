module.exports = async (runner, args) => {
  try {
    console.log('> PRE: Start');

    // const rc = args.rc;
    // await runner.execute([
    //   `npx nx g @nrwl/web:app ${rc.path}`
    // ], {
    //   cwd: rc.workspace_path
    // })

    console.log('> PRE: ✅ DONE')

  } catch (ex) {
    console.error(ex);
    throw new Error('Failed to run script');
  }
}