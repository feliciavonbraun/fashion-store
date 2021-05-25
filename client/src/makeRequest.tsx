export async function makeRequest(url: string, method: string, body?: {}) {
   try {
       
        const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const result = await response.json();
    return result;
 } catch (error) {
     console.log(error)
 }
}