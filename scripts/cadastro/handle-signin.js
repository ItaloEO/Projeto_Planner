import { UsersApi } from "../api.js";

export async function handleSignin(event){
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("senha");
  const confirmPassword = formData.get("confirmacao-senha");
  const errorMessage = document.querySelector(".error-message");

  if (password !== confirmPassword) { errorMessage.textContent = "As senhas não coincidem."; return; }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{4,}$/.test(password)) { errorMessage.textContent = "A senha deve conter maiúscula, minúscula, número e símbolo."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorMessage.textContent = "Email inválido."; return; }

  const exists = await UsersApi.findByEmail(email);
  if (exists) { errorMessage.textContent = "Este email já está cadastrado."; return; }

  await UsersApi.create({ name, email, password });
  errorMessage.textContent = "";
  window.location.href = "login.html";
}
