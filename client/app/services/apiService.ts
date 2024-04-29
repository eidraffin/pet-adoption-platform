import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then (response => response.json())
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch((error => {
                    reject(error)
                }))
        })
    },


    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },    


    postWithoutToken: async function (url:string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },



    getWithoutToken: async function (url: string): Promise<any> {
        console.log('getWithoutToken', url);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },


    delete: async function(url: string): Promise<any> {
        console.log('delete', url);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },


    put: async function(url: string, data: any): Promise<any> {
        console.log('put', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PUT',
                body: JSON.stringify(data), // Assuming you want to send JSON data
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },

    patch: async function(url: string, data: any): Promise<any> {
        console.log('patch', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PATCH',
                body: JSON.stringify(data), // Assuming you want to send JSON data
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },

}

export default apiService;