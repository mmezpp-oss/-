const data = JSON.parse(localStorage.getItem("saved_seeker"));

if(data){

    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("school").innerText = data.school;
    document.getElementById("age").innerText = data.age;
    document.getElementById("exp").innerText = data.exp;
    document.getElementById("gender").innerText = data.gender;
    document.getElementById("address").innerText = data.address;

    if(data.img_face){
        document.getElementById("img_face").src = data.img_face;
    }else{
        document.getElementById("img_face").style.display = "none";
    }

}

function goHome(){
    window.location.href = "jobs.html";
}

function goNotification(){
    window.location.href = "notification.html";
}