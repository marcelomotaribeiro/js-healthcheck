export default class HealthPanel {
    
    initialize() {
        fetch("src/pages/health-panel/health-panel.html")
            .then(response => response.text())
            .then(text => {
                document.querySelector('#app').innerHTML = text
                fetch(import.meta.env.VITE_DATA_URL)
                    .then(response => response.json())
                    .then(json => this.render(json))                
            })
    }

    render(data) {
        document.getElementById('title').innerHTML = data.title
        const body = document.getElementById('items')
        const getImg = (logo) => {
            if (logo) {
                return `<img src="${logo}"/>`
            }
            return '';
        }
        for(let healthcheck of data.data) {
            body.innerHTML +=
                `<div id="spinner${healthcheck.id}" class="mt-2 ms-2 text-center" style="width: 15rem;" >
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                </div> 
                <div id="card${healthcheck.id}" class="card mt-2 ms-2" style="width: 15rem; display: none;">
                    <div id="tag${healthcheck.id}" class="card-header"></div>
                    <div class="card-body text-center">
                        <img id="image${healthcheck.id}" width="50%" heigth="50%" >
                        <p id="momentOk${healthcheck.id}"></p>
                        <p id="momentFail${healthcheck.id}"></p>
                        <div class="grid">
                            <a class="btn btn-outline-primary g-col-6" id="link1${healthcheck.id}" target="_blank">Health link</a>
                            <a class="btn btn-outline-primary g-col-6" id="link2${healthcheck.id}" target="_blank">Home</a>
                        </div>
                        <div>
                            ${healthcheck.logo1 ? getImg(healthcheck.logo1) : '' }
                            ${healthcheck.logo2 ? getImg(healthcheck.logo2) : '' }
                            ${healthcheck.logo3 ? getImg(healthcheck.logo3) : '' }
                            ${healthcheck.logo4 ? getImg(healthcheck.logo4) : '' }
                            ${healthcheck.logo5 ? getImg(healthcheck.logo5) : '' }
                            ${healthcheck.logo6 ? getImg(healthcheck.logo6) : '' }
                            ${healthcheck.logo7 ? getImg(healthcheck.logo7) : '' }
                            ${healthcheck.logo8 ? getImg(healthcheck.logo8) : '' }
                            ${healthcheck.logo9 ? getImg(healthcheck.logo9) : '' }
                            ${healthcheck.logo10 ? getImg(healthcheck.logo10) : '' }
                            ${healthcheck.logo11 ? getImg(healthcheck.logo11) : '' }
                        </div>
                    </div>
                </div>`
            setInterval(() => {
                var headers = new Headers()
                headers.append('cache-control', 'no-cache')
                var init = {
                    method: 'GET',
                    headers: headers,
                    mode: healthcheck.cors ? 'no-cors' : 'cors'
                }
                var request = new Request(healthcheck.urlHealth)
                fetch(request, init)
                .then(response => this.update({ ok: healthcheck.cors ? true : response.status == 200, healthcheck: healthcheck }))
                .catch(() => this.update({ ok: false, healthcheck: healthcheck }))
            }, 10000)                
        }
    }

    update(event) {
        document.getElementById(`spinner${event.healthcheck.id}`).style = 'display: none;'
        document.getElementById(`card${event.healthcheck.id}`).style = 'width: 15rem;'
        document.getElementById(`image${event.healthcheck.id}`).src = `${event.ok ? 'success' : 'fail'}.png`
        document.getElementById(`image${event.healthcheck.id}`).alt = event.ok ? 'success' : 'fail'
        document.getElementById(`tag${event.healthcheck.id}`).innerHTML = `<small>${event.healthcheck.tag}</small>`
        document.getElementById(event.ok ? `momentOk${event.healthcheck.id}` : `momentFail${event.healthcheck.id}`).innerHTML = 
            `<small><strong>${event.ok ? 'Ping OK: ': 'Ping Falha: '}</strong>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</small>`
        document.getElementById(`link1${event.healthcheck.id}`).href = event.healthcheck.urlHealth
        document.getElementById(`link2${event.healthcheck.id}`).href = event.healthcheck.urlHome
    }

}