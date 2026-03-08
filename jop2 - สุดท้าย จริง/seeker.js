async function uploadImage(file, folder) {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase
        .storage
        .from("seeker")
        .upload(filePath, file);

    if (error) {
        alert("อัปโหลดรูปไม่สำเร็จ");
        throw error;
    }

    const { data } = supabase
        .storage
        .from("seeker")
        .getPublicUrl(filePath);

    return data.publicUrl;
}


/* ===== โหลดข้อมูลกลับหลังเลือกแผนที่ ===== */
window.onload = function () {

    // 👉 โหลดเฉพาะกรณีกลับจาก map
    const mapReturn = localStorage.getItem("mapReturn");

    if (mapReturn === "seeker.html") {

        const temp = JSON.parse(localStorage.getItem("temp_seeker_form"));
        if (temp) {
            email.value = temp.email || "";
            full_name.value = temp.name || "";
            idcard.value = temp.idcard || "";
            phone.value = temp.phone || "";
            school.value = temp.school || "";
            exp.value = temp.exp || "";
            gender.value = temp.gender || "";
            document.getElementById("age").innerText = temp.age || "-";
        }

        const lat = localStorage.getItem("selectedLat");
        const lng = localStorage.getItem("selectedLng");
        const addr = localStorage.getItem("selectedAddress");

        if (lat && lng) {
            address.value = addr || `พิกัด ${lat}, ${lng}`;
            address.dataset.point = `${lat},${lng}`;
        }

        // 🔥 สำคัญ: ลบ flag ทิ้ง
        localStorage.removeItem("mapReturn");
    }
};


/* ===== ไปหน้าแผนที่ ===== */
function goMap() {

    const tempForm = {
        email: email.value,
        name: full_name.value,
        idcard: idcard.value,
        phone: phone.value,
        school: school.value,
        exp: exp.value,
        gender: gender.value,
        age: document.getElementById("age").innerText
    };

    localStorage.setItem("temp_seeker_form", JSON.stringify(tempForm));
    localStorage.setItem("mapReturn", "seeker.html");

    window.location.href = "map.html";
}

/* ===== submit ===== */
document
    .getElementById("seekerForm")
    .addEventListener("submit", submitSeeker);

async function submitSeeker(e) {
    e.preventDefault();
    const imgCardFile = document.getElementById("img_card").files[0];
    const imgProfileFile = document.getElementById("img_profile").files[0];
    const imgFaceFile = document.getElementById("img_face").files[0];

    const img_card = await uploadImage(imgCardFile, "card");
    const img_profile = await uploadImage(imgProfileFile, "profile");
    const img_face = await uploadImage(imgFaceFile, "face");


    const point = address.dataset.point;
    let lat = null, lng = null;

    if (point) {
        [lat, lng] = point.split(",");
    }

    const ageText = document.getElementById("age").innerText;
    const ageValue = ageText === "-" ? null : parseInt(ageText);

    const data = {
        email: email.value,
        name: full_name.value,
        idcard: idcard.value,
        phone: phone.value,
        school: school.value,
        age: ageValue,
        exp: exp.value,
        gender: gender.value,
        address: address.value,

        img_card: img_card,
        img_profile: img_profile,
        img_face: img_face,

        status: "pending"
    };



    const { error } = await supabase
        .from("seeker")
        .insert(data);

    if (error) {
        console.error("INSERT ERROR:", error);
        alert("บันทึกข้อมูลไม่สำเร็จ");
        return;
    }




// เก็บอีเมลที่ส่งข้อมูลแล้ว
    localStorage.setItem("submittedEmail", email.value);

    window.location.href = "pending.html";


// เก็บข้อมูลผู้หางานไว้
    localStorage.setItem("saved_seeker", JSON.stringify({
        email: email.value,
        name: full_name.value,
        idcard: idcard.value,
        phone: phone.value,
        school: school.value,
        age: document.getElementById("age").innerText,
        exp: exp.value,
        gender: gender.value,
        address: address.value,
        point: address.dataset.point,

        img_face: img_face   //
    }));




}
// ===== คำนวณอายุจากวันเกิด =====
function calcAge() {
    const birthInput = document.getElementById("birthdate").value;
    const ageSpan = document.getElementById("age");

    if (!birthInput) {
        ageSpan.innerText = "-";
        return;
    }

    const birthDate = new Date(birthInput);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // ถ้ายังไม่ถึงวันเกิดปีนี้ → ลบออก 1 ปี
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    ageSpan.innerText = age;
}
