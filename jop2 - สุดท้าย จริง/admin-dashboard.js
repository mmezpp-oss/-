// โหลดผู้ประกอบการเป็นค่าเริ่มต้น
loadEmployers();

// =======================
// โหลดผู้ประกอบการ
// =======================
async function loadEmployers() {

    document.getElementById("title").innerText = "ผู้ประกอบการรออนุมัติ";

    const { data, error } = await supabase
        .from("employer")
        .select("id, name, email")
        .eq("status", "pending");

    if (error) {
        alert(error.message);
        return;
    }

    renderTable(data, "employer");
}

// =======================
// โหลดผู้หางาน
// =======================
async function loadSeekers() {

    document.getElementById("title").innerText = "ผู้หางานรออนุมัติ";

    const { data, error } = await supabase
        .from("seeker")
        .select("id, name, email")
        .eq("status", "pending");

    if (error) {
        alert(error.message);
        return;
    }

    renderTable(data, "seeker");
}

// =======================
// แสดงข้อมูลในตาราง
// =======================
function renderTable(data, type) {

    const tbody = document.getElementById("list");
    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="3">ไม่มีข้อมูลรออนุมัติ</td>
          </tr>`;
        return;
    }

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.name || "-"}</td>
          <td>${item.email || "-"}</td>
          <td>
            <a href="admin-${type}-detail.html?id=${item.id}">
              ดูรายละเอียด
            </a>
          </td>
        `;
        tbody.appendChild(tr);
    });
}

