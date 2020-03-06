document.addEventListener('DOMContentLoaded', function() {
	let elems = document.querySelectorAll('.carousel');

	let instances = M.Carousel.init(elems, {
		fullWidth: true,
		indicators: false
	});

	let instance = M.Carousel.getInstance(elems[0]);
	setInterval(function() {
		instance.next(1);
	}, 4000);
});

async function loginAttempt(event) {
	debugger;
	event.preventDefault();
	let usuario = {
		usuario: document.getElementById('usuario').value,
		password: document.getElementById('password').value
	};

	let response = await fetch('/_login', {
		method: 'POST',
		body: JSON.stringify(usuario),
		headers: {
			'Content-Type': 'application/json'
		}
    });
    
	if (response.ok) {
		let data = await response.json();
		localStorage.setItem('usuario', JSON.stringify(data.usuario));
		window.location.href = '/';
	} else {
        let data = await response.json();
		alert(data.mensaje);
	}
}
