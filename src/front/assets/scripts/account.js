const apiURL = `${API_URL}`;

console.log(userData);
async function fetchUserDetails() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/profile`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchUserNutritionist() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/nutritionist`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

const botaoPerfil = document.getElementById('button-perfilAlimentar');
if (userData.role === "USER") {
  updateUserDetails(userData);
  botaoPerfil.style.display = 'block';
}
if (userData.role === "NUTRITIONIST") {
  botaoPerfil.style.display = 'none';
  updateNutritionistDetails(userData);
}


//Função que mostra os detalhes do perfil
async function updateUserDetails(user) {
  const nutritionist = await fetchUserNutritionist();
  const perfil = await fetchUserDetails();
  if (user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-surname').textContent = user.surname;
    if (userData.role == "USER") {
      document.getElementById('user-category').textContent = "Usuário comum";
    } else document.getElementById('user-category').textContent = "Nutricionista";
    document.getElementById('user-email').textContent = user.email;
    if (nutritionist) {
      document.getElementById('user-acompanhamento').textContent = `${nutritionist.name} ${nutritionist.surname}`;
    } else document.getElementById('user-acompanhamento').textContent = `Você não está associado a um nutricionista`;
    document.getElementById('user-weight').textContent = perfil.weight;
    document.getElementById('user-height').textContent = perfil.height;
    document.getElementById('user-age').textContent = perfil.age;
    document.getElementById('user-sex').textContent = perfil.gender;
    document.getElementById('user-waist').textContent = perfil.waist;
    document.getElementById('user-hip').textContent = perfil.hip;
    document.getElementById('user-goal').textContent = perfil.currentGoal;
    document.getElementById('user-scruff').textContent = perfil.neck;
    goal = perfil.pal;
    if (goal == 1.2) {
      document.getElementById('user-levelAthlete').textContent = "Sedentário: pouco ou nenhum exercício";
    } else if (goal == 1.375) {
      document.getElementById('user-levelAthlete').textContent = "Leve: se exercita de 1 a 2 vezes por semana";
    } else if (goal == 1.55) {
      document.getElementById('user-levelAthlete').textContent = "Moderado: se exercita de 2 a 3 vezes por semana";
    } else if (goal == 1.725) {
      document.getElementById('user-levelAthlete').textContent = "Pesado: se exercita de 4 a 5 vezes por semana";
    } else if (goal == 1.9) {
      document.getElementById('user-levelAthlete').textContent = "Trabalho físico ou exercício intenso";
    } else document.getElementById('user-levelAthlete').textContent = "Atleta Profissional";

    if (perfil.smokes) {
      document.getElementById('user-smoke').textContent = "Sim";
    } else document.getElementById('user-smoke').textContent = "Não";

    if (perfil.drinks) {
      document.getElementById('user-alcool').textContent = "Sim";
    } else document.getElementById('user-alcool').textContent = "Não";

    if (perfil.hadSurgeries) {
      document.getElementById('user-surgery').textContent = "Sim";
    } else document.getElementById('user-surgery').textContent = "Não";

    if (perfil.hasDiseases) {
      document.getElementById('user-illness').textContent = "Sim";
    } else document.getElementById('user-illness').textContent = "Não";

    if (perfil.hasPain) {
      document.getElementById('user-pain').textContent = "Sim";
    } else document.getElementById('user-pain').textContent = "Não";

  } else {
    alert('Usuário não encontrado');
  }
}

async function updateNutritionistDetails(user) {
  if (user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-surname').textContent = user.surname;
    if (userData.role == "USER") {
      document.getElementById('user-category').textContent = "Usuário comum";
    } else document.getElementById('user-category').textContent = "Nutricionista";
    document.getElementById('user-email').textContent = user.email;
  } else {
    alert('Usuário não encontrado');
  }
}

//funções de ver senha
document.getElementById('view-password').addEventListener('click', function () {
  var campoSenha = document.getElementById('user-password');
  const showEye = document.getElementById("show-eye1");
  const hideEye = document.getElementById("hide-eye1");
  if (campoSenha.type === 'password') {
    campoSenha.type = 'text';
    hideEye.classList.add("d-none");
    showEye.classList.remove("d-none");
  } else {
    campoSenha.type = 'password';
    hideEye.classList.remove("d-none");
    showEye.classList.add("d-none");
  }
});

document.getElementById('view-confirm-password').addEventListener('click', function () {
  var campoConfirmSenha = document.getElementById('user-confirm-password');
  const showEye = document.getElementById("show-eye2");
  const hideEye = document.getElementById("hide-eye2");
  if (campoConfirmSenha.type === 'password') {
    campoConfirmSenha.type = 'text';
    hideEye.classList.add("d-none");
    showEye.classList.remove("d-none");
  } else {
    campoConfirmSenha.type = 'password';
    hideEye.classList.remove("d-none");
    showEye.classList.add("d-none");
  }
});

//Função de atualizar senha
async function submitForm(event) {
  event.preventDefault();
  event.stopPropagation();

  const password = document.getElementById('user-password').value;
  const confirmPassword = document.getElementById('user-confirm-password').value;

  if (password.length < 8) {
    alert("A senha deve ter ao menos 8 caracteres.");
  } else if (!/[A-Z]/.test(password)) {
    alert("A senha deve conter pelo menos uma letra maiúscula.");
  } else if (!/[a-z]/.test(password)) {
    alert("A senha deve conter pelo menos uma letra minúscula.");
  } else if (!/\W/.test(password)) {
    alert("A senha deve conter pelo menos um caractere especial.");
  } else if (password !== confirmPassword) {
    alert("As duas senhas digitadas não são iguais.");
  } else {

    const requestBody = {
      name: userData.name,
      email: userData.email,
      password: password,
      role: userData.role
    };

    putData(`${apiURL}/user/${userData.id}`, requestBody).then((data) => {
      console.log('Successfully updated --- in the database');
      console.log(data);
    }).catch((error) => {
      console.error('Error while updating ---:', error);
    });

  }

}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formUser-password');
  form.addEventListener('submit', submitForm);
});


//Função de excluir perfil
async function excluirPerfil() {
  const perfil = await fetchUserDetails();

  if (confirm("Tem certeza de que deseja excluir o perfil?")) {
    try {
      const response = await fetch(`${apiURL}/user/${userData.id}`, {
        method: 'DELETE',
      }); userData.profile

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        window.location.href = 'login.html';
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao excluir o item:", error);
    }
  }


}

const btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener("click", function () {
  excluirPerfil();
});
