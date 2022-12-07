// var appUrl = "https://kritikasharma025.github.io/hotel-app-frontend"
var appUrl = "http://localhost:5500";
var serverUrl = "http://localhost:8080/api"
// var serverUrl = "https://hotel-app-backend.onrender.com/api"

const updateImage = () => {
    cloudinary.openUploadWidget({
        cloudName: "dwxwscvsq",
        uploadPreset: "hotel-app-kritika",
        sources: [
            "local",
            "url"
        ],showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
            palette: {
                window: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0078FF",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#0078FF",
                action: "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1"
            },
            fonts: {
                default: {
                    active: true
                }
            }
        }
    },
    async (err, info) => {
        if (!err) {
            if (info.event === "success") {

                let data = await fetch(`${serverUrl}/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwToken")}`
                    },
                    body: JSON.stringify({
                        image: info.info.secure_url
                    }),
                    method: "PUT"
                })

                data = await data.json()
                console.log(data)

                if (data.status === true) {
                    sessionStorage.clear()
                    sessionStorage.setItem('userData', JSON.stringify(data.data))
                    window.location.href = `${appUrl}/login.html`
                }
            }
        }
    }
    )
}

document.getElementById("upload_widget").addEventListener("click", function(){
    updateImage();
}, false)

document.getElementById("upload_widget").src = JSON.parse(sessionStorage.getItem("userData")).image;