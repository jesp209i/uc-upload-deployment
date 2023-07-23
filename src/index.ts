import { getInput, setFailed, info, warning } from '@actions/core';
import { exists } from '@actions/io/lib/io-util';
import { uploadDeployment } from './ucUploadDeploymentSrcApi';


async function run() {
    const projectAlias = getInput('project-alias');
    const apiKey = getInput('api-key');
    const deploymentId = getInput('deployment-id');
    const filePath = getInput('file-path');

    const fileExists = await  exists(filePath);
    if (!fileExists)
    {
        setFailed("File was not found on location");
        return;
    }

    const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/${deploymentId}/package`;

    uploadDeployment(url, apiKey, filePath)
        .then(
        response => {
            const messages = response.updateMessage.split('\n');
            const latest = messages.pop();
            info(`${latest}`);
            info("Source Package uploaded successfully");
        }
        , errorResponse =>{
            warning(errorResponse);
            setFailed("Upload failed");
        });        
}

run();