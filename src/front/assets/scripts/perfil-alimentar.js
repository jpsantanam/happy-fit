const apiURL = `${API_URL}`;

document.addEventListener('DOMContentLoaded', function () {
	// verifica se o selectedUserId está no localStorage
    // const selectedUserId = localStorage.getItem('selectedUserId');
    // let userId;
    // if (selectedUserId) {
    //     userId = selectedUserId;
    // } else {
    //     // Se não estiver no localStorage, obter userId do usuário comum
    //     const userData = JSON.parse(localStorage.getItem('loggedUser'));
    //     userId = userData.id;
    // }
	const carousel = new bootstrap.Carousel(document.getElementById('cadastroCarrossel'), { interval: false, wrap: false });

	document.getElementById("account-button").addEventListener("click", () => {
		menuToggle();
	});

	const form = document.getElementById("user-profile");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (form.checkValidity()) {
			const peso = document.getElementById('peso').value;
			const altura = document.getElementById('altura').value;
			const idade = document.getElementById('idade').value;
			const sexo = document.getElementById('sexo').value;
			const cintura = document.getElementById('cintura').value;
			const quadril = document.getElementById('quadril').value;
			const pescoco = document.getElementById('pescoco').value;
			const objetivos = document.getElementById('objetivos').value;
			const fuma = document.getElementById('fuma').value;
			const bebe = document.getElementById('bebe').value;
			const cirurgia = document.getElementById('cirurgia').value;
			const doencaCronica = document.getElementById('doenca-cronica').value;
			const dorCronica = document.getElementById('dor-cronica').value;
			const naf = document.getElementById('naf').value;

			const requestBody = {
				height: altura,
				weight: peso,
				age: idade,
				gender: sexo,
				hip: quadril,
				waist: cintura,
				neck: pescoco,
				currentGoal: objetivos,
				smokes: fuma,
				drinks: bebe,
				hadSurgeries: cirurgia,
				hasDiseases: doencaCronica,
				hasPain: dorCronica,
				pal: naf,
			};

			postData(`${apiURL}/profile`, requestBody).then((data) => {
				console.log('Successfully posted new profile to the database');
				console.log(data);

				const _requestBody = {
					totalCalories: 0,
					totalProteins: 0,
					totalCarbs: 0,
					totalFats: 0
				};

				postData(`${apiURL}/diet`, _requestBody).then((data) => {
					console.log('Successfully posted new diet to the database');
					console.log(data);
					localStorage.setItem('loggedUser', JSON.stringify(data));
					alert("Perfil alimentar cadastrado com sucesso.");
					window.location.href = 'dieta.html';
/* 
					const _requestBody = JSON.stringify({
						date = new Date(),
						totalCalories: 0,
						totalProteins: 0,
						totalCarbs: 0,
						totalFats: 0
					});

					postData(`${apiURL}/diary`, _requestBody).then((data) => {
						console.log('Successfully posted new diary to the database');
						console.log(data);
					}).catch((error) => {
						console.error('Error while posting new diary:', error);
					});
*/
				}).catch((error) => {
					console.error('Error while posting new diet:', error);
				});
			}).catch((error) => {
				console.error('Error while posting new profile:', error);
			});

		} else {
			form.classList.add('was-validated');
			const invalidFields = form.querySelectorAll(':invalid');
			const firstInvalidField = invalidFields[0];
			const invalidFieldIndex = Array.prototype.indexOf.call(form, firstInvalidField);
		}
	});
});

document.addEventListener('DOMContentLoaded', function () {

	const carousel = new bootstrap.Carousel(document.getElementById('cadastroCarrossel'), { wrap: false });

	document.getElementById('cadastroCarrossel').addEventListener('slide.bs.carousel'), function (e) {
		event.preventDefault()
		const active = e.relatedTarget;
		if (active.classList.contains('carousel-item')) {
			if (active === this.firstElementChild) {
				document.querySelector('.carousel-control-prev').classList.add('d-none');
				document.querySelector('.carousel-control-next').classList.remove('d-none');
			} else if (active === this.lastElementChild) {
				document.querySelector('.carousel-control-next').classList.add('d-none');
				document.querySelector('.carousel-control-prev').classList.remove('d-none');
			} else {
				document.querySelector('.carousel-control-prev').classList.remove('d-none');
				document.querySelector('.carousel-control-next').classList.remove('d-none');
			}
		}
	}
});
