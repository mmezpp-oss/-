// ดึง id จาก URL
const email = new URLSearchParams(window.location.search).get("email");

if (!email) {
    alert("ไม่พบข้อมูลผู้ประกอบการ");
    location.href = "approval.html";
}

// โหลดรายละเอียดผู้ประกอบการ
async function loadDetail() {

    const { data: emp, error } = await supabase
        .from("employer")
        .select("*")
        .eq("email", email)
        .maybeSingle();


    if (error) {
        alert(error.message);
        return;
    }

    console.log("EMP DATA:", emp); // ใช้เช็กตอน debug

    // ===== ใส่ข้อมูลข้อความ =====
    document.getElementById("empName").innerText = emp.name || "-";
    document.getElementById("empEmail").innerText = emp.email || "-";
    document.getElementById("empPhone").innerText = emp.phone || "-";
    document.getElementById("empShop").innerText = emp.shop || "-";
    document.getElementById("empRegister").innerText = emp.register || "-";
    document.getElementById("empLocation").innerText = emp.location || "-";
    document.getElementById("empAddress").innerText = emp.address || "-";

    // ===== รูปภาพ =====
    document.getElementById("shopImg").src =
        emp.img_shop || "shop.jpg";

    document.getElementById("imgCard").src =
        emp.img_card || "idcard.jpg";

    document.getElementById("imgOwner").src =
        emp.img_owner || "owner.jpg";

    document.getElementById("imgRC").src =
        emp.img_RC || "RC.jpg";
}

// เรียกฟังก์ชันทันทีเมื่อเปิดหน้า

async function approve() {

    const { error } = await supabase
        .from("employer")
        .update({ status: "approved" })
        .eq("email", email);

    if (error) {
        alert(error.message);
        return;
    }
    showPopup("อนุมัติผู้ประกอบการเรียบร้อย");

    setTimeout(() => {
        window.location.href = "approval.html";
    }, 6000);
}


async function reject() {

    const { error } = await supabase
        .from("employer")
        .update({ status: "rejected" })
        .eq("email", email);

    if (error) {
        alert(error.message);
        return;
    }
    showPopup("ไม่อนุมัติผู้ประกอบการ");

    setTimeout(() => {
        window.location.href = "approval.html";
    }, 6000);
}

loadDetail();
function openImage(src) {
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("modalImg");

    img.src = src;
    modal.style.display = "flex";
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
function openFile(src) {
    if (src.toLowerCase().endsWith(".pdf")) {
        window.open(src, "_blank");
    } else {
        openImage(src);
    }
}
function showPopup(text){
    document.getElementById("popupText").innerText = text;
    document.getElementById("popupAlert").style.display = "flex";
}

function closePopup(){
    document.getElementById("popupAlert").style.display = "none";
}