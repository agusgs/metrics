function getCSRFToken() {
    return document.querySelector('[name=csrf-token]').content;
}

function apiCall(method, path, resource = null) {
    const requestOptions = {
        method: method,
    }

    if (method === 'POST') {
        requestOptions.headers = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken()
        }
        requestOptions.body = JSON.stringify(resource)
    }

    return fetch(path, requestOptions).then((response) => {
        if (!response.ok) {
            console.log(response)
            throw new Error("Network response was not ok");
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
    return get("/api/metrics")
}

export function createMetric(metricName) {
    return post('api/metrics', {name: metricName})
}

export function getMeasures(metricId, filter) {
    return get(`/api/measures?metric_id=${metricId}${filter ? `&from=${filter.toString()}` : ''}`)
}

export function createMeasure(metricId, measure) {
    return post('api/measures', {metricId: metricId, measure: measure})
}
