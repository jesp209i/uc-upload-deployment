import { getInput, setFailed, info, warning } from '@actions/core';
import { uploadDeployment } from './ucUploadDeploymentSrcApi';

async function run() {
    try {
        const projectAlias = getInput('project-alias');
        const apiKey = getInput('api-key');
        const deploymentId = getInput('deployment-id');
        const filePath = getInput('file-path');

        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/${deploymentId}`

        const deployment = await uploadDeployment(url, apiKey, filePath);
        info("Source Package uploaded successfully");

    } catch (error) {    
        warning(`Error: ${error}`);

        setFailed("Got an error while trying to upload source deployment package")
    }
}

run();