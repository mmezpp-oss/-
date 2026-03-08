/* ======================
   ปุ่มผู้หางาน
====================== */
function goSeeker() {
    const submittedEmail = localStorage.getItem("submittedEmail");
    const currentEmail = localStorage.getItem("currentEmail");


    if (submittedEmail && currentEmail && submittedEmail === currentEmail) {
        // เคยส่งข้อมูลแล้ว
        window.location.href = "pending.html";
    } else {
        // ยังไม่เคยส่ง
        window.location.href = "seeker.html";
    }
}

/* ======================
   ปุ่มผู้ประกอบการ
====================== */
function goEmployer() {
    const submittedEmail = localStorage.getItem("submittedEmail");
    const currentEmail = localStorage.getItem("currentEmail");

    if (submittedEmail && currentEmail && submittedEmail === currentEmail) {
        window.location.href = "pending.html";
    } else {
        window.location.href = "employer.html";
    }
}

/* ======================
   แอดมิน
====================== */
function goAdmin() {
    document.getElementById("adminModal").style.display = "flex";
}

function closeAdmin() {
    document.getElementById("adminModal").style.display = "none";
}

/* ======================
   Login Admin
====================== */
function loginAdmin(){
    const input = document.getElementById("adminPassword").value;
    const saved = localStorage.getItem("adminPassword");

    // ตั้งรหัสครั้งแรก
    if(!saved){
        if(input.length < 4){
            alert("รหัสผ่านอย่างน้อย 4 ตัว");
            return;
        }
        localStorage.setItem("adminPassword", input);
        alert("ตั้งรหัสผ่านสำเร็จ");
        window.location.href = "approval.html"; // ✅ หน้าอนุมัติ
        return;
    }

    // ตรวจรหัส
    if(input === saved){
        window.location.href = "approval.html"; // ✅ หน้าอนุมัติ
    }else{
        alert("รหัสผ่านไม่ถูกต้อง");
    }
}
