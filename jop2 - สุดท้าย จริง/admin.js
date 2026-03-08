async function loginAdmin() {
    console.log("กดปุ่มแล้ว"); //
    const password = document.getElementById("password").value;

    if (!password) {
        alert("กรุณาใส่รหัสผ่าน");
        return;
    }

    // 🔗 เช็คกับตาราง admin
    const { data, error } = await supabase
        .from("admin")
        .select("id, email")
        .eq("password", password)
        .single();

    if (error || !data) {
        alert("รหัสผ่านไม่ถูกต้อง");
        return;
    }

    // ✅ ล็อกอินสำเร็จ
    localStorage.setItem("admin_id", data.id);
    localStorage.setItem("admin_email", data.email);

    window.location.href = "admin-dashboard.html";
}

function cancelAdmin() {
    window.location.href = "role.html";
}
