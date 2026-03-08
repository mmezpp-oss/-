let step = "email";
let generatedOTP = "";

// ฟังก์ชันตรวจอีเมลจริง
function isValidEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleSubmit(){
    const input = document.getElementById("input-field");
    const label = document.getElementById("label-text");
    const otpBox = document.getElementById("otp-box");
    const otpShow = document.getElementById("otp-show");

    // STEP 1 : ตรวจอีเมล
    if(step === "email"){
        const email = input.value.trim();

        // ว่าง
        if(email === ""){
            showModal("กรุณากรอกอีเมลให้ถูกต้อง");
            return;
        }
        // ไม่ใช่อีเมลจริง
        if(!isValidEmail(email)){
            showModal("กรุณากรอกอีเมลให้ถูกต้อง");
            return;
        }
        localStorage.setItem("currentEmail", email);

        // ผ่านแล้ว → สร้าง OTP (เดโม)
        generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

        otpShow.innerText = generatedOTP;
        otpBox.style.display = "block";

        step = "otp";
        label.innerText = "รหัส OTP";
        input.value = "";
        input.placeholder = "กรอกรหัส OTP";
        input.type = "number";

        return;
    }

    // STEP 2 : ตรวจ OTP
    if(input.value === generatedOTP){
        window.location.href = "role.html";

            showModal("เข้าสู่ระบบสำเร็จ");
            // ต่อหน้า role ได้
            // window.location.href = "role.html";
        }else{
            showModal("รหัส OTP ไม่ถูกต้อง");
        }
}
function showModal(message){
    const overlay = document.getElementById("modal-overlay");
    const box = overlay.querySelector(".modal-box");

    document.getElementById("modal-message").innerText = message;

    overlay.style.display = "flex";

    // รี animation
    box.style.animation = "none";
    box.offsetHeight; // trigger reflow
    box.style.animation = "modalPop 0.3s ease";
}

function closeModal(){
    const overlay = document.getElementById("modal-overlay");
    overlay.style.display = "none";
}

