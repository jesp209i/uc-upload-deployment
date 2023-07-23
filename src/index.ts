import { getInput, setFailed, info, warning } from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
    try {
        const projectAlias = getInput('project-alias');
        const apiKey = getInput('api-key');
        const deploymentId = getInput('deployment-id');
        const filePath = getInput('file-path');

        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/${deploymentId}`

        const srcDir = __dirname;

        await exec(`sh ${srcDir}/upload_package.sh ${url} ${apiKey} ${filePath}`)

        info("Source Package uploaded successfully");

    } catch (error) {    
        warning(`Error: ${error}`);

        setFailed("Got an error while trying to upload source deployment package")
    }
}

run();