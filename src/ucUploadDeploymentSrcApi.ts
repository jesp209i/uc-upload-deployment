import axios, { Axios } from "axios";
import { createReadStream } from 'fs';

export interface DeploymentResponse {
    "deploymentState": string,
    "updateMessage": string
}

export async function uploadDeployment(callUrl: string, apiKey: string, filePath: string): Promise<DeploymentResponse>
{
    const file = createReadStream(filePath);
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Umbraco-Api-Key': apiKey
    };

    try {
        const uploadResponse = await axios.post<DeploymentResponse>(callUrl,{
            file: file
        },{
            headers: headers,
            validateStatus: status => status === 202
        });

        return Promise.resolve(uploadResponse.data);
    }
    catch (error)
    {
        return Promise.reject("Error during upload");
    }
}
