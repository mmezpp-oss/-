
function showPopup(message){

    const popup = document.getElementById("popup");
    const text = document.getElementById("popupText");

    text.innerText = message;

    popup.classList.add("show");

    setTimeout(()=>{
        popup.classList.remove("show");
    },6000);

}