function getCSRFToken() {
    return document.querySelector('[name=csrf-token]').content;
}

function apiCall(method, path, resource = null) {
    const requestOptions = {
        method: method,
    }

    if (method === 'POST' || method === 'PUT') {
        requestOptions.headers = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken()
        }
    }

    if (resource) {
        requestOptions.body = JSON.stringify(resource)
    }

    return fetch(path, requestOptions).then((response) => {
        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
}

function post(path, resource) {
    return apiCall("POST", path, resource)
}

function get(path) {
    return apiCall("GET", path);
}

export function getMetrics() {
    return get("api/metrics")
}

export function getMetric() {
    return Promise.resolve( {
        id: 1,
        name: "metric 1",
        avgDay: 10.5,
        avgHour: 9.5,
        avgMin: 9.2,
        measures: [
            { measure: 9.9, timestamp: new Date().getTime() },
            { measure: 9.2, timestamp: new Date().getTime() },
            { measure: 6.1, timestamp: new Date().getTime() },
            { measure: 5.4, timestamp: new Date().getTime() },
            { measure: 12.7, timestamp: new Date().getTime() }
        ]
    })
}