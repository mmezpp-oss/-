const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

if (!jobId) {
    alert("ไม่พบรหัสงาน");
    window.location.href = "employer-jobs.html";
}

async function loadJobDetail() {

    const { data: job, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

    if (error || !job) {
        alert("ไม่พบข้อมูลงาน");
        return;
    }

    document.getElementById("title").innerText = job.title;
    document.getElementById("description").innerText = job.description;
    document.getElementById("location").innerText = job.location;
    document.getElementById("work_date").innerText = job.work_date;
    document.getElementById("work_time").innerText = job.work_time;
    document.getElementById("salary").innerText = job.salary;
    document.getElementById("amount").innerText = job.amount;
    document.getElementById("age_min").innerText = job.age_min;
    const typeText = job.type === "mall" ? "งานในห้าง" : "งานนอกห้าง";
    document.getElementById("type").innerText = typeText;
}

loadJobDetail();
function goBack(){
    window.location.href = "employer-jobs.html";
}