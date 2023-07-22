import axios, { Axios } from "axios";
import { info } from '@actions/core';
import { createReadStream } from 'fs';

export interface DeploymentResponse {
    "deploymentState": string,
    "updateMessage": string
}

export async function uploadDeployment(callUrl: string, apiKey: string, filePath: string)
{
    const file = createReadStream(filePath);
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Umbraco-Api-Key': apiKey
    };

    const uploadResponse = await axios.post<DeploymentResponse>(callUrl,{
        file: file
    },{
        headers: headers,
        //validateStatus: status => status === 202
    })
    .then(response => response.data)
    .catch(error => info(error.toJSON()));
}
