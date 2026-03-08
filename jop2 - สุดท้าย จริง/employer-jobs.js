const employerId = localStorage.getItem("employerId");

if (!employerId) {
    alert("ยังไม่พบข้อมูลผู้ประกอบการ");
    throw new Error("STOP: no employerId");
}
function goCreateJob(){
    window.location.href = "create-job.html";
}

async function loadJobs() {

    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", employerId)
        .order("created_at", { ascending: false });

    if (error) {
        alert(error.message);
        return;
    }

    renderJobs(jobs);
}

async function renderJobs(jobs) {

    const grid = document.getElementById("jobGrid");

    for (const job of jobs) {

        // นับจำนวนใบสมัคร
        const { data: apps } = await supabase
            .from("applications")
            .select("id")
            .eq("job_id", job.id);

        const applied = apps.length;   // คนสมัคร
        const total = job.amount;      // จำนวนที่รับ

        let text = "มีผู้สมัครแล้ว " + applied + " คน";

        let color = "black";

        if(applied > 0){
            color = "red";
        }

        const card = document.createElement("div");
        card.className = "job-card";
        card.style.cursor = "pointer";

        card.onclick = function () {
            window.location.href = `employer-job-detail.html?id=${job.id}`;
        };

        card.innerHTML = `
            <div class="job-card-inner">
                <div class="job-logo">
                    <img id="shop-img-${job.id}" src="">
                </div>

                <div class="job-info">
                    <h4>${job.title}</h4>
                    <p>วันที่: ${job.work_date}</p>
                    <p>เวลา: ${job.work_time}</p>

                    <p style="color:${color}; font-weight:bold;">
                        ${text}
                    </p>

                </div>
            </div>
        `;

        grid.appendChild(card);
    }
}
function toggleApplicants(bell){

    const box = bell.parentElement.parentElement.querySelector(".applicants-box");

    if(box.style.display === "none"){
        box.style.display = "block";
        bell.classList.add("bell-active");
    }else{
        box.style.display = "none";
        bell.classList.remove("bell-active");
    }

}
loadJobs();
