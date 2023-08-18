module.exports = async (runner, args) => {
  try {
    console.log('> POST');
    console.log(`args=${JSON.stringify(args)}`);

    const rc = args.rc;
    await runner.execute([
      `mv config/tmp-folder-name config/${rc.name}`,
      `mv modules/tmp-folder-name modules/${rc.name}`,
      `mv templates/tmp-folder-name templates/${rc.name}`
    ], {
      cwd: args.workspacePath
    })

    console.log('> POST: ✅ DONE')

  } catch {
    throw new Error('>POST Failed!');
  }
}
