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
        console.error(error);
        alert("อัปโหลดรูปไม่สำเร็จ");
        throw error;
    }

    const { data } = supabase
        .storage
        .from("seeker")
        .getPublicUrl(filePath);

    return data.publicUrl;
}


function goMap() {
    const tempForm = {
        email: email.value,
        name: full_name.value,
        shop: shop.value,
        register: register.value,
        location: document.getElementById("location").value, // ✅ เพิ่ม
        address: address.value,
        phone: phone.value
    };

    localStorage.setItem("currentEmail", email.value);
    localStorage.setItem("temp_form_data", JSON.stringify(tempForm));
    localStorage.setItem("mapReturn", "employer.html");
    window.location.href = "map.html";
}

window.onload = () => {

    const mapReturn = localStorage.getItem("mapReturn");

    // ✅ โหลดข้อมูลเฉพาะตอนกลับจาก map
    if (mapReturn === "employer.html") {

        const temp = JSON.parse(localStorage.getItem("temp_form_data"));
        if (temp) {
            email.value = temp.email || "";
            full_name.value = temp.name || "";
            shop.value = temp.shop || "";
            register.value = temp.register || "";
            document.getElementById("location").value = temp.location || "";
            address.value = temp.address || "";
            phone.value = temp.phone || "";
            img_card.value = temp.img_card|| "";
            img_owner.value = temp.img_owner|| "";
            img_shop.value = temp.img_shop|| "";
            img_RC.value = temp.img_RC|| "";

        }

        const lat = localStorage.getItem("selectedLat");
        const lng = localStorage.getItem("selectedLng");
        const addr = localStorage.getItem("selectedAddress");

        if (lat && lng) {
            address.value = addr || `พิกัด ${lat}, ${lng}`;
            point.value = `${lat},${lng}`;
        }

        // 🔥 สำคัญมาก: ลบ flag
        localStorage.removeItem("mapReturn");
    }
};


async function submitEmployer() {

    if (!email.value) {
        alert("กรุณากรอก Email");
        return;
    }

    if (!address.value || !point.value) {
        alert("กรุณาเลือกตำแหน่งจากแผนที่");
        return;
    }

    const imgCardFile = document.getElementById("img_card").files[0];
    const imgOwnerFile = document.getElementById("img_owner").files[0];
    const imgShopFile = document.getElementById("img_shop").files[0];
    const imgRCFile = document.getElementById("img_RC").files[0];

    const img_card = await uploadImage(imgCardFile, "employer_card");
    const img_owner = await uploadImage(imgOwnerFile, "employer_owner");
    const img_shop = await uploadImage(imgShopFile, "employer_shop");
    const img_RC = await uploadImage(imgRCFile, "employer_RC");
    if (!img_card || !img_owner || !img_shop || !img_RC) {
        alert("กรุณาแนบรูปให้ครบ");
        return;
    }


    const { error } = await supabase
        .from("employer")
        .insert([{
            email: email.value,
            name: full_name.value,
            shop: shop.value,
            register: register.value,
            location: document.getElementById("location").value, // ✅ เพิ่มบรรทัดนี้
            address: address.value,
            point: point.value,
            phone: phone.value,
            img_card: img_card,
            img_owner: img_owner,
            img_shop: img_shop,
            img_RC: img_RC,
            status: "pending"
        }]);



    if (error) {
        alert(error.message);
        return;
    }

    // เก็บ email ไว้ใช้ใน pending
    localStorage.setItem("submittedEmail", email.value);
    localStorage.setItem("currentEmail", email.value);
// เก็บข้อมูล employer ไว้ดูในหน้า profile

    localStorage.setItem("saved_employer", JSON.stringify({
        email: email.value,
        name: full_name.value,
        shop: shop.value,
        register: register.value,
        location: document.getElementById("location").value,
        address: address.value,
        phone: phone.value,
        img_shop: img_shop,
        img_owner: img_owner
    }));
    window.location.href = "pending.html";
}





