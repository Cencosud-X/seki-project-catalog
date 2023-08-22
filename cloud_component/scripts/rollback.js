module.exports = async (runner, args) => {
  try {
    console.log('> Cleaning Monorepo....')

    const rc = args.rc;
    await runner.execute([
      `rm -rf config/${rc.name}`,
      `rm -rf modules/${rc.name}`,
      `rm -rf templates/${rc.name}`
    ], {
      cwd: args.workspacePath
    })

    console.log('> Rollback ✅ DONE')

  } catch {
    throw new Error('Failed to rollback Nx');
  }
}