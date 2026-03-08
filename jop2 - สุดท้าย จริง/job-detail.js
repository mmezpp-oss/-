const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

if (!jobId) {
    alert("ไม่พบรหัสงาน");
    window.location.href = "jobs.html";
}

async function loadJobDetail() {

    // 🔹 ดึงข้อมูลงานจากตาราง jobs
    const { data: job, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

    if (error || !job) {
        showPopup("ไม่พบข้อมูลงาน");
        return;
    }

    // 🔹 แสดงข้อมูลบนหน้าเว็บ
    document.getElementById("title").innerText = job.title;
    document.getElementById("description").innerText = job.description;
    document.getElementById("location").innerText = job.location;
    document.getElementById("work_date").innerText = job.work_date;
    document.getElementById("work_time").innerText = job.work_time;
    document.getElementById("salary").innerText = job.salary;
    document.getElementById("amount").innerText = job.amount;
}

async function applyJob(){

    const seekerEmail = localStorage.getItem("currentEmail");

    // 🔹 ดึง employer_id ของงาน
    const { data: job } = await supabase
        .from("jobs")
        .select("employer_id")
        .eq("id", jobId)
        .single();
    const { data: exist } = await supabase
        .from("applications")
        .select("*")
        .eq("job_id", jobId)
        .eq("seeker_email", seekerEmail)
        .single();

    if(exist){
        showPopup("คุณสมัครงานนี้แล้ว");
        return;
    }

    const { error } = await supabase
        .from("applications")
        .insert({
            job_id: jobId,
            seeker_email: seekerEmail,
            employer_id: job.employer_id
        });

    if(error){
        alert(error.message);
        return;
    }

    showPopup("ส่งใบสมัครสำเร็จ");

    setTimeout(() => {
        window.location.href = "jobs.html";
    }, 6000);

}
function goBack(){
    window.location.href = "jobs.html";
}
function showPopup(text){
    const popup = document.getElementById("popup");
    document.getElementById("popup-text").innerText = text;

    popup.style.display = "flex";

    // ซ่อนอัตโนมัติหลัง 6 วินาที
    setTimeout(() => {
        popup.style.display = "none";
    }, 6000);
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
}
loadJobDetail();