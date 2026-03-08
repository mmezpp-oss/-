const employerId = localStorage.getItem("employerId");

async function loadApplicants(){

    const { data: apps, error } = await supabase
        .from("applications")
        .select("seeker_email, employer_id, job_id")
        .eq("status", "pending")
        .order("created_at", { ascending: false })

    if(error){
        alert(error.message);
        return;
    }

    const container = document.getElementById("applicants");
    container.innerHTML = "";

    for(const app of apps){

        if(String(app.employer_id) !== String(employerId)) continue;
        // ดึงข้อมูลงาน
        const { data: job } = await supabase
            .from("jobs")
            .select("work_date, work_time")
            .eq("id", app.job_id)
            .single();

        // ดึงข้อมูลผู้สมัคร
        const { data: seeker } = await supabase
            .from("seeker")
            .select("*")
            .eq("email", app.seeker_email)
            .single();

        const div = document.createElement("div");
        div.className = "notification-card";

        div.innerHTML = `
<img src="${seeker.img_face}" style="width:120px;height:120px;border-radius:20px;border:2px solid black">

<div>

<div style="color:Black">
วันที่: ${job.work_date}
</div>

<div style="color:Black">
เวลา: ${job.work_time}
</div>

<div class="notification-detail" onclick="openDetail('${seeker.email}','${app.job_id}')">
รายละเอียด
</div>

</div>
`;

        container.appendChild(div);
    }

}

function openDetail(email, jobId){
    window.location.href = `applicant-detail.html?email=${email}&job=${jobId}`;
}


loadApplicants();