const data = JSON.parse(localStorage.getItem("saved_employer"));

if(data){

    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("shop").innerText = data.shop;
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("location").innerText = data.location;
    document.getElementById("address").innerText = data.address;

    document.getElementById("shopImg").src = data.img_shop;
    if(data.img_shop){
        document.getElementById("shopImg").src = data.img_shop;
    }else{
        document.getElementById("shopImg").style.display = "none";
    }

}

function goHome(){
    window.location.href = "employer-jobs.html";
}

function goNotification(){
    window.location.href = "notifications.html";
}