module.exports = async (runner, args) => {
  try {
    console.log('> POST: Cleanup');
    console.log(`args=${JSON.stringify(args)}`);

    const rc = args.rc;
    // await runner.execute([
    //   'rm -rf ./src/app',
    //   'rm -rf ./src/assets',
    //   'rm -rf ./src/environments',
    //   `npx nx run ${rc.path}:secrets`
    // ], {
    //   cwd: args.workspacePath
    // })

    console.log('> POST: ✅ DONE')

  } catch {
    throw new Error('Failed to cleanup');
  }
}
