async function getData(resource) {
    try {
        const response = await fetch(`${resource}`, {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching JSON::', error);
    }
}

async function postData(resource, requestBody) {
    try {
        const response = await fetch(`${resource}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching JSON::', error);
    }
}

async function putData(resource, requestBody) {
    try {
        const response = await fetch(`${resource}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching JSON::', error);
    }
}

async function deleteData(resource) {
    try {
        const response = await fetch(`${resource}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching JSON::', error);
    }
}