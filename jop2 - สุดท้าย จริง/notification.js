const email = localStorage.getItem("currentEmail");

async function loadStatus(){

    const { data, error } = await supabase
        .from("applications")
        .select("status, job_id")
        .eq("seeker_email", email);

    if(error){
        alert(error.message);
        return;
    }

    const container = document.getElementById("jobStatus");
    container.innerHTML = "";

    for(const app of data){

        let color = "orange";
        let text = "รอพิจารณา";

        if(app.status === "approved"){
            color = "green";
            text = "ผ่าน";
        }

        if(app.status === "rejected"){
            color = "red";
            text = "ไม่ผ่าน";
        }

// ดึง employer_id ของงาน
        const { data: job } = await supabase
            .from("jobs")
            .select("employer_id")
            .eq("id", app.job_id)
            .single();

// ดึงรูปหน้าร้าน
        const { data: employer } = await supabase
            .from("employer")
            .select("img_shop")
            .eq("id", job.employer_id)
            .single();


        const div = document.createElement("div");

        div.innerHTML = `
<div style="display:flex;gap:20px;margin:30px">

<img src="${employer.img_shop}" style="
width:120px;
height:120px;
border:2px solid black;
border-radius:20px;
object-fit:cover;
">

<div>
<p>สถานะ: <span style="color:${color}">${text}</span></p>
<p class="detail" onclick="goJobDetail('${app.job_id}')">รายละเอียด</p>

</div>

</div>
`;

        container.appendChild(div);

    }

}

loadStatus();
function goJobDetail(jobId){
    window.location.href = `job-detail.html?id=${jobId}`;
}