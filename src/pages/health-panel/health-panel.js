export default class HealthPanel {
    
    initialize() {
        fetch("src/pages/health-panel/health-panel.html")
            .then(response => response.text())
            .then(text => {
                document.querySelector('#app').innerHTML = text
                fetch("data.json")
                    .then(response => response.json())
                    .then(json => this.render(json))                
            })
    }

    render(data) {
        const body = document.getElementById('items')
        for(let healthcheck of data) {
            body.innerHTML +=
                `<div class="card ms-5 mt-5" style="width: 10rem;">
                    <img id="image${healthcheck.id}" class="card-img-top">
                    <div class="card-body">
                        <p id="tag${healthcheck.id}" class="card-title"></p>
                        <p id="moment${healthcheck.id}"></p>
                    </div>
                </div>`
            setInterval(() => {
                var headers = new Headers()
                headers.append('cache-control', 'no-cache')
                var init = {
                    method: 'GET',
                    headers: headers
                }
                var request = new Request(healthcheck.url)                           
                fetch(request, init)
                .then(response => this.update({ status: response.status, healthcheck: healthcheck }))
                .catch(() => this.update({ status: -1, healthcheck: healthcheck }))
            }, 5000);                
        }
    }

    update(event) {
        document.getElementById(`image${event.healthcheck.id}`).src = `${event.status == event.healthcheck.expectedStatus ? 'success' : 'fail'}.png`
        document.getElementById(`image${event.healthcheck.id}`).alt = event.status == event.healthcheck.expectedStatus ? 'success' : 'fail'
        document.getElementById(`tag${event.healthcheck.id}`).innerHTML = `<small>${event.healthcheck.tag}</small>`
        document.getElementById(`moment${event.healthcheck.id}`).innerHTML = `<small>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</small>`
    }

}