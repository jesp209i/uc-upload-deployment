import { getInput, setFailed, info, warning } from '@actions/core';
import { exists } from '@actions/io/lib/io-util';
import { ApiClient } from '@jam-test-umbraco/umbraco-cloud-deployment-apiclient';


async function run() {
    try {
        const apiBaseUrl = getInput('api-base-url', {required: true });
        const projectAlias = getInput('project-alias', { required: true});
        const apiKey = getInput('api-key', { required: true});
        const deploymentId = getInput('deployment-id', { required: true});
        const filePath = getInput('file-path', { required: true});

        const fileExists = await  exists(filePath);
        if (!fileExists)
        {
            setFailed("File was not found on location");
            return;
        }

        const client = new ApiClient(apiBaseUrl, projectAlias, apiKey);

        const response = await client.uploadDeployment(deploymentId, filePath);

        info("Source Package uploaded successfully");
      
    } catch( error)
    {
        warning(`Error: ${error}`);
        setFailed("Upload failed");
    }
}

run();