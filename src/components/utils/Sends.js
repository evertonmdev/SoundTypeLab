import axios from "axios";
import { toast } from "react-toastify";

export const SendCadastro = async event => {
    event.preventDefault()

    const Button = document.getElementById("button")
    Button.disabled = true
    Button.innerHTML = "Carregando..."

    await axios({
        method: "POST",
        url: `${window.location.origin}/api/Cadastro`,
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


export const GetDownloadLink = async (url, title, email) => {
    const Button = document.getElementById("buttondwn")
    try {
        Button.disabled = true
        const data = {
            url,
            title,
            email
        }

        const resoponse =  await axios.post(`${window.location.origin}/api/download`, data, {
            responseType: 'blob'
        })
        const Title_Archive = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim()
        const urlDownload = window.URL.createObjectURL(new Blob([resoponse.data], {
            type: 'audio/*'
        }))
    
        const link = document.createElement('a')
        link.href = urlDownload
        link.setAttribute('download', `${Title_Archive}.mp3`)
        link.click()
        
        window.URL.revokeObjectURL(urlDownload)
        toast("Download iniciado!", {
            theme: 'dark'
        })
    } catch(e) {
        Button.disabled = false
        toast("Você precisa realizar o login para download", {
            theme: 'dark'
        })
    }

}