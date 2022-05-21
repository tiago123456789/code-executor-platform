import httpClient from "./HttpClient"

export const executor = (data, accessToken) => {
    return httpClient.post(
        `${process.env.REACT_APP_API_URL}code-executions`,
        data, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
      );
}