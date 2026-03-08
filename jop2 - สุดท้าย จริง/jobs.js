async function ensureSeekerId(){

    let seekerId = localStorage.getItem("seekerId");

    if(seekerId) return;

    const email = localStorage.getItem("currentEmail");
    if(!email) return;

    const { data } = await supabase
        .from("seeker")
        .select("id")
        .eq("email", email)
        .single();

    if(data){
        localStorage.setItem("seekerId", data.id);
    }
}

ensureSeekerId();
async function createJob(employerId) {
    const { error } = await supabase
        .from("jobs")
        .insert({
            employer_id: employerId,
            title: document.getElementById("title").value,
            description: document.getElementById("desc").value,
            location: document.getElementById("location").value,
            amount: parseInt(document.getElementById("amount").value),
            type: document.getElementById("type").value
        });

    if (!error) alert("สร้างงานสำเร็จ");
}
let currentType = "mall";

async function loadJobs() {
    const grid = document.getElementById("jobGrid");
    grid.innerHTML = "";
    const seekerEmail = localStorage.getItem("currentEmail");

// ดึง job ที่ผู้สมัครเคยสมัครแล้ว
    const { data: applied } = await supabase
        .from("applications")
        .select("job_id")
        .eq("seeker_email", seekerEmail);

    const appliedJobIds = applied.map(a => a.job_id);

    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("type", currentType)

        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    for (const job of jobs) {
        if(appliedJobIds.includes(job.id)) continue;

        // 1. สร้างการ์ดก่อน (ยังไม่สนรูป)
        const card = document.createElement("div");
        card.className = "job-card";

        // นับเฉพาะคนที่อนุมัติแล้ว
        const { data: approved } = await supabase
            .from("applications")
            .select("id")
            .eq("job_id", job.id)
            .eq("status", "approved");

        const approvedCount = approved.length;
        const total = job.amount;

        const text = "รับแล้ว " + approvedCount + "/" + total;

        card.innerHTML = `
  <img id="shop-img-${job.id}" src="">
  <div>จำนวนที่รับ ${job.amount} คน</div>
  <div style="color:red;font-weight:bold;">
    ${text}
    <div class="detail" onclick="goJobDetail('${job.id}')">รายละเอียด</div>
  </div>
`;

        grid.appendChild(card);

        // 2. ดึงข้อมูลร้านจาก employer
        if (job.employer_id) {
            const { data: employer } = await supabase
                .from("employer")
                .select("img_shop")
                .eq("id", job.employer_id)
                .single();

            // 3. ถ้ามีรูป → ใส่ URL ลง img
            if (employer && employer.img_shop) {
                document.getElementById(
                    `shop-img-${job.id}`
                ).src = employer.img_shop;
            }
        }
    }
}

loadJobs();

function filterJobs(type) {
    currentType = type;

    // เปลี่ยนสถานะ tab active
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    if (type === "mall") {
        document.querySelectorAll(".tab")[0].classList.add("active");
    } else {
        document.querySelectorAll(".tab")[1].classList.add("active");
    }

    loadJobs();
}


function goNotification() {
    window.location.href = "notification.html";
}
function goJobDetail(jobId) {
    window.location.href = `job-detail.html?id=${jobId}`;
}
