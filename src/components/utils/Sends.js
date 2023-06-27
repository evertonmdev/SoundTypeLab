import axios from "axios";
import { toast } from "react-toastify";

export const SendCadastro = async () => {
    const Button = document.getElementById("button")
    Button.disabled = true
    Button.innerHTML = "Carregando..."

    await axios({
        method: "POST",
        url: "http://localhost:3000/api/Cadastro",
        data: {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
    })
    .then(res => {
        toast("Cadastro realizado com sucesso!", {
            theme: 'dark'
        })
        window.location.href = "/login"
    })
    .catch(err => {
        Button.disabled = false
        Button.innerHTML = "Criar"

        if(err.response.status === 400) toast("Usuário já existe!", {
            theme: 'dark'
        })
        else if(err.response.status === 500) toast("Erro interno do servidor!", {
            theme: 'dark'
        })
        else toast("Erro ao realizar o cadastro!", {
            theme: 'dark'
        })
    })
}
