import { request } from 'https';
import FormData from 'form-data';
import { createReadStream } from 'fs';

export interface DeploymentResponse {
    "deploymentState": string,
    "updateMessage": string
}

export async function uploadDeployment(callUrl: string, apiKey: string, filePath: string): Promise<DeploymentResponse>
{
    return new Promise((resolve, reject) =>{
        const readStream = createReadStream(filePath);

        const form = new FormData();
        form.append('file', readStream);

        const headers = form.getHeaders();
        headers['Umbraco-Api-Key'] = apiKey;

        const requestOptions = {
            method : 'POST',
            headers : headers
        };

        let uploadResponse: DeploymentResponse;

        const req = request(callUrl, requestOptions, 
            response => {
                if (response.statusCode !== 202){
                    return reject(new Error(JSON.stringify(response)));
                }
            const chunks: any[] = [];
        
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => {
                const data = Buffer.concat(chunks).toString();
                const obj = JSON.parse(data);
                const result: DeploymentResponse = {
                    deploymentState: obj.deploymentState,
                    updateMessage: obj.updateMessage
                }
                return resolve(result);
            });
            response.on('error', ()=>{
                return reject(new Error(JSON.stringify(response)));
            });
        });

        form.pipe(req);
        //req.end();
    });
}

