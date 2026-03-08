const email = new URLSearchParams(window.location.search).get("email");

if (!email) {
    alert("ไม่พบข้อมูลผู้หางาน");
    location.href = "approval.html";
}
async function loadDetail() {

    const { data: sk, error } = await supabase
        .from("seeker")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    if (error || !sk) {
        alert("ไม่พบข้อมูลผู้หางาน");
        location.href = "approval.html";
        return;
    }

    // ข้อมูลข้อความ
    document.getElementById("skName").innerText = sk.name || "-";
    document.getElementById("skEmail").innerText = sk.email || "-";
    document.getElementById("skPhone").innerText = sk.phone || "-";
    document.getElementById("skidcard").innerText = sk.idcard || "-";
    document.getElementById("skAge").innerText = sk.age ?? "-";
    document.getElementById("skSchool").innerText = sk.school || "-";
    document.getElementById("skExp").innerText = sk.exp || "-";
    document.getElementById("skGender").innerText = sk.gender || "-";

    // รูปภาพ
    document.getElementById("imgCard").src = sk.img_card || "idcard.jpg";
    document.getElementById("imgProfile").src = sk.img_profile || "student.jpg";
    document.getElementById("imgFace").src = sk.img_face || "face.jpg";
}

async function approveSeeker() {

    const { error } = await supabase
        .from("seeker")
        .update({ status: "approved" })
        .eq("email", email);

    if (error) {
        alert(error.message);
        return;
    }

    showPopup("อนุมัติผู้หางานเรียบร้อย");

    setTimeout(() => {
        window.location.href = "approval.html";
    }, 6000);
}

async function rejectSeeker() {

    const { error } = await supabase
        .from("seeker")
        .update({ status: "rejected" })
        .eq("email", email);

    if (error) {
        alert(error.message);
        return;
    }

    showPopup("ไม่อนุมัติผู้หางาน");

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
function showPopup(text){
    const popup = document.getElementById("popupAlert");

    document.getElementById("popupText").innerText = text;
    popup.style.display = "flex";

    // ซ่อนอัตโนมัติหลัง 6 วินาที
    setTimeout(() => {
        popup.style.display = "none";
    }, 6000);
}

function closePopup(){
    document.getElementById("popupAlert").style.display = "none";
}