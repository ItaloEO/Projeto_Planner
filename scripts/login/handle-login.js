import { UsersApi } from "../api.js";

export async function handleLogin(event){
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const password = formData.get("senha");
  const remember = !!formData.get("rememberMe");
  const errorMessage = document.querySelector(".error-message");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorMessage.textContent = "Email inválido."; return; }

  try {
    const user = await UsersApi.findByEmail(email);
    if (!user || user.password !== password) { errorMessage.textContent = "Email ou senha incorretos."; return; }

    const expires = remember ? `; max-age=${60*60*24*30}` : "";
    document.cookie = `loggedInUser=${user.id}; path=/${expires}`;
    localStorage.setItem("currentUser", JSON.stringify({ id: user.id, name: user.name, email: user.email }));

    errorMessage.textContent = "";
    window.location.href = "index.html";
  } catch {
    errorMessage.textContent = "Falha ao conectar. Tente novamente.";
  }
}
