
// AXIOS is a promise based HTTP client for the browser and node.js
// Promise based means that you can take advantage of JavaScript's async and await for more readable asynchronous code.
// Async and await are a new feature of ES7 which allow you to write asynchronous code that looks synchronous.
// Asynchronous means that things can happen independently of the main program flow.
function getTodos() {
    axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(res => showResult(res)) // res means response
        .catch(err => alert(err)); // err means error

}

function addTodo() {
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'Learn Axios',
            completed: false
        })
        .then(res => showResult(res))
        .catch(err => alert(err));
}
// USE patch if you want to update only one field
// USE put if you want to update all fields
function updateTodo() {
    axios
        .put('https://jsonplaceholder.typicode.com/todos/1', {
            title: 'Learn Axios',
            completed: true
        })
        .then(res => showResult(res))
        .catch(err => alert(err));
}

function deleteTodo() {
    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showResult(res))
        .catch(err => alert(err));
}

// Getting simultaneous request (Sim Request)
// all means that we are requesting different HTTP request at the same time
// It takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved.
function getMultipleDatas() {
    axios
        .all([
            axios
                .get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
            axios
                .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        ])
        .then(
            axios
                .spread((todos, posts) => {
                showOutput(todos);
                showOutput(posts);
            })
        )
        .catch(err => alert(err));
}

// INTERCEPTING REQUESTS & RESPONSES
// interceptors are functions that Axios calls for every request and response before they are handled by then or catch.
// interceptors are used to modify request configuration such as adding headers or authentication tokens

// interceptors are used as logging requests and responses which is useful for debugging
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    console.log(`Data fetched from ${response.config.url} at ${new Date().getTime()}`);
    return response;
}, error => {
    return Promise.reject(error);
})

// Useful for authentication tokens
function customHeaders() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer myToken'
        }
    }

    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'Learning Custom Headers',
            completed: false
        }, config)
        .then(res => showResult(res))
        .catch(err => alert(err));
}

// This function demonstrates how to transform the response data before it is handled by then or catch.
// The transformResponse option allows you to modify the response data, such as changing its structure or content.
// In this example, the title of the response data is converted to uppercase before being processed.
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Learning Transform Response',
        },
        // concat is used to add a new function to the existing transformResponse array
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    }

    axios(options)
        .then(res => showResult(res))
        .catch(err => alert(err));
}

function showResult(res) {
    document.getElementById('result').innerHTML = `
    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Status ${res.status}</div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Headers</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Data</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Config</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
    </div>
    `
}


function showOutput(res) {
    document.getElementById('output').innerHTML = `
    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Status ${res.status}</div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Headers</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Data</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
    </div>

    <div class="rounded-lg bg-gray-200 shadow-md px-4 py-2 my-4">
        <div class="text-md">Config</div>
        <div class="rounded-lg bg-white px-4 py-2 my-2 overflow-auto">
            <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
    </div>
    `
}

document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('patch').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', deleteTodo);
document.getElementById('sim').addEventListener('click', getMultipleDatas);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);