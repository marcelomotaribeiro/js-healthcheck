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
                        <div id="spinner${healthcheck.id}" class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>                 
                    </div>
                </div>`
            setInterval(() => {
                var headers = new Headers()
                headers.append('cache-control', 'no-cache')
                var init = {
                    method: 'GET',
                    headers: headers,
                    mode: 'no-cors'
                }
                var request = new Request(healthcheck.url)
                fetch(request, init)
                    .then((response) => this.update({ ok: response.status == 200 || response.status == 0, healthcheck: healthcheck }))
                    .catch(() => this.update({ ok: false, healthcheck: healthcheck }))
            }, 10000)                
        }
    }

    update(event) {
        document.getElementById(`spinner${event.healthcheck.id}`).style = 'display: none;'
        document.getElementById(`image${event.healthcheck.id}`).src = `${event.ok ? 'success' : 'fail'}.png`
        document.getElementById(`image${event.healthcheck.id}`).alt = event.ok ? 'success' : 'fail'
        document.getElementById(`tag${event.healthcheck.id}`).innerHTML = `<small>${event.healthcheck.tag}</small>`
        document.getElementById(`moment${event.healthcheck.id}`).innerHTML = `<small>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</small>`
    }

}