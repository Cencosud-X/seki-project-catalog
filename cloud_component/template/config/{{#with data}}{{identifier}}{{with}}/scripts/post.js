const path = require('path');

module.exports = async (runner, args) => {
  try {
    console.log('> POST: {{data.identifier}}');

    // Write code to generate local resources. For example:

    // console.log('> Creating settings file for local environment...');
    // const productConfigPath = path.join(process.cwd(), "config");
    // const repoPath = args.repoClonedPath;
    // const settingsJsonPath = path.join(repoPath, "templates", "settings.json");
    // const rc = args.rc;
    // await runner.execute([
    //   `cat ${settingsJsonPath} > ${productConfigPath}/${rc.kind}_${rc.identifier}_settings.json`
    // ])

    console.log('> POST: process ✅ DONE');
  } catch (ex) {
    throw new Error(`Failed run post script (${ex})`);
  }
}
