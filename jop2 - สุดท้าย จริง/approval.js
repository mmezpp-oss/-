
// โหลดผู้ประกอบการเป็นค่าเริ่มต้น
loadEmployers();

// ------------------------
// โหลดผู้ประกอบการ
// ------------------------
async function loadEmployers() {

    setActiveTab(0);

    const { data, error } = await supabase
        .from("employer")
        .select("id, name, email")
        .eq("status", "pending");

    if (error) {
        alert(error.message);
        return;
    }

    render(data, "employer");
}

// ------------------------
// โหลดผู้หางาน
// ------------------------
async function loadSeekers() {

    setActiveTab(1);

    const { data, error } = await supabase
        .from("seeker")
        .select("id, name, email")
        .eq("status", "pending");

    if (error) {
        alert(error.message);
        return;
    }

    render(data, "seeker");
}

// ------------------------
// แสดงข้อมูลในตาราง
// ------------------------
function render(data, type) {

    const tbody = document.getElementById("list");
    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4">ไม่มีข้อมูลรออนุมัติ</td>
            </tr>`;
        return;
    }

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name || "-"}</td>
            <td>${item.email || "-"}</td>
            <td>${type === "employer" ? "ผู้ประกอบการ" : "ผู้หางาน"}</td>
            <td>
                <a href="admin-${type}-detail.html?email=${item.email}"> 
                    ดูรายละเอียด
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ------------------------
// สลับแท็บ
// ------------------------
function setActiveTab(index) {
    document.querySelectorAll(".tab").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
}
