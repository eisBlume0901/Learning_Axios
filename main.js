// GET REQUEST


function getTodos() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => showResult(res)) // res means response
        .catch(err => console.log(err)); // err means error

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

document.getElementById('get').addEventListener('click', getTodos);