const fs = require('fs');
const { exec } = require('child_process');

module.exports = async (runner, args) => {

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

  function updateSettings(filePath, url, repository) {
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error reading the JSON file:', err);
        return;
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
  
        // Update
        jsonData.srcRepoUrl = url;
        jsonData.creator = repository;
  
        // Convert the updated JSON object back to a string
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
  
        // Write the updated JSON back to the file
        fs.writeFile(filePath, updatedJsonData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.log('Error writing updated JSON to the file:', writeErr);
            return;
          }
          console.log('JSON updated successfully!');
        });
      } catch (parseErr) {
        console.log('Error parsing JSON:', parseErr);
      }
    });
  }

  function updateWorkspace(filePath, projectName, projectdir) {
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error reading the JSON file:', err);
        return;
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
  
        // add project
        if (!jsonData.projects) {
          jsonData["projects"] = {}
        }
        jsonData.projects[projectName] = projectdir

        // Convert the updated JSON object back to a string
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
  
        // Write the updated JSON back to the file
        fs.writeFile(filePath, updatedJsonData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.log('Error writing updated JSON to the file:', writeErr);
            return;
          }
          console.log('JSON updated successfully!');
        });
      } catch (parseErr) {
        console.log('Error parsing JSON:', parseErr);
      }
    });
  }

  console.log('> POST');

  try {
    // find organization and repository
    const command = `git remote -v | grep push`;
    exec(command, {cwd: args.workspacePath}, (error, stdout, stderr) => {
      if (error) {
        throw new Error(`Error executing command: ${error.message}`);
      }
      const remoteURI = stdout.trim();
      if (!remoteURI) {
        throw new Error("Could not find the Git remote");
      }
      const orgAndRepo = extractOrgAndRepoFromGitRemote(remoteURI);
      if (orgAndRepo) {
          // replace srcRepoUrl
          const componentRcFile = `${args.workspacePath}/metadata/tmp-folder-name/componentrc.json`;
          const srcRepoUrl = `https://github.com/${orgAndRepo.organization}/${orgAndRepo.repository}`;
          updateSettings(componentRcFile, srcRepoUrl, orgAndRepo.repository);
      } else {
        throw new Error("Could not detect your repo and organization from your Git remote URI");
      }
    });
  } catch(ex) {
    console.log(`We couldn't detect your Git remote URL because of this error: ${ex}`);
    console.log(`You must set your repository URL in componentrc.json`);
    console.log(`For example`);
    console.log(`"srcRepoUrl": "https://github.com/<organization>/<repository>"`);
  }

  const rc = args.rc;
  try {
    await runner.execute([
      `mv metadata/tmp-folder-name metadata/${rc.name}`,
      `mv modules/tmp-folder-name modules/${rc.name}`,
      `mv templates/tmp-folder-name templates/${rc.name}`
    ], {
      cwd: args.workspacePath
    })

    console.log('> POST: ✅ DONE')
  } catch {
    throw new Error('>POST Failed!');
  }

  // support for nx < 15.9
  // update workspace.json
  try {
    const workspaceFile = `${rc.workspace_path}/workspace.json`
    console.log(`workspaceFile=${workspaceFile}`)
    if (fs.existsSync(workspaceFile)) {
      console.log(`updateWorkspace(${workspaceFile}, ${rc.name}, ${rc.group_folder}/${rc.path})`)
      updateWorkspace(workspaceFile, rc.name, `${rc.group_folder}/${rc.path}`)
    }
  } catch {
    throw new Error('>POST Failed!');
  }
}
