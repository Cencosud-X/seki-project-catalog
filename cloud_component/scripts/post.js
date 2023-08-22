const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (runner, args) => {

  function getRemote() {
    exec(`git remote -v | grep push`, {cwd: args.workspacePath}, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      return stdout.trim();
    });
  }

  function extractOrgAndRepoFromGitRemote(remote) {
    // Regular expression to match Git remote URL format
    const remoteRegex = /origin\s+git@[^:]+:([^\/]+)\/([^\/]+?)\.git\s+\(push\)/;

    const match = remote.match(remoteRegex);
    if (match) {
        const organization = match[1];
        const repository = match[2];

        return { organization, repository };
    } else {
        return null; // Remote URL format doesn't match
    }
  }

  function updateRepoUrl(filePath, url) {
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the JSON file:', err);
        return;
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
  
        // Update the srcRepoUrl attribute
        jsonData.srcRepoUrl = url;
  
        // Convert the updated JSON object back to a string
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
  
        // Write the updated JSON back to the file
        fs.writeFile(filePath, updatedJsonData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error('Error writing updated JSON to the file:', writeErr);
            return;
          }
          console.log('JSON updated successfully!');
        });
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    });
  }

  console.log('> POST');
  console.log(`args=${JSON.stringify(args)}`);

  try {
    // find organization and repository
    const remoteURI = getRemote()
    if (!remoteURI) throw new Error("Could not find the Git remote");
    const orgAndRepo = extractOrgAndRepoFromGitRemote(remoteURI);
    if (orgAndRepo) {
        // replace srcRepoUrl
        updateRepoUrl(`config/tmp-folder-name/componentrc.json`, `https://github.com/${orgAndRepo.organization}/${orgAndRepo.repository}`);
    } else {
      throw new Error("Could not detect your repo and organization from your Git remote URI");
    }
  } catch(ex) {
    console.error(`We couldn't detect your Git remote URL because of this error: ${ex}`)
    console.log(`You must put your repository URL in componentrc.json`)
    console.log(`For example`)
    console.log(`"srcRepoUrl": "https://github.com/<organization>/<repository>"`)
  }

  try {
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
