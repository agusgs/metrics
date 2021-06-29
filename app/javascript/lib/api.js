function getCSRFToken() {
    return document.querySelector('[name=csrf-token]').content;
}

function apiCall(method, path) {
    const requestOptions = {
        method: method,
    }

    return fetch(path, requestOptions).then((response) => {
        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
}

function get(path) {
    return apiCall("GET", path);
}

export function getMetrics() {
    return get("/api/metrics")
}

export function getMeasures(metricId, filter) {
    return get(`/api/measures?metric_id=${metricId}${filter ? `&from=${filter.unix()}` : ''}`)
}