async function submitJob() {
    const employerId = localStorage.getItem("employerId");

    if (!employerId) {
        showPopup("ไม่พบข้อมูลผู้ประกอบการ");
        return;
    }

    const { error } = await supabase
        .from("jobs")
        .insert({
            employer_id: employerId,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            location: document.getElementById("location").value,
            amount: parseInt(document.getElementById("amount").value),
            age_min: parseInt(document.getElementById("age_min").value),
            work_date: document.getElementById("work_date").value,
            work_time: document.getElementById("work_time").value,
            salary: document.getElementById("salary").value,
            type: document.getElementById("type").value
        });

    if (error) {
        alert(error.message);
        return;
    }

    showPopup("ประกาศงานสำเร็จ");

// 🔑 ย้ำ email ไว้ก่อนเปลี่ยนหน้า
    const email = localStorage.getItem("currentEmail");
    if (email) {
        localStorage.setItem("currentEmail", email);
    }
}
function goBack(){
    window.location.href = "employer-jobs.html";
}
function showPopup(text){
    const popup = document.getElementById("popup");
    document.getElementById("popup-text").innerText = text;

    popup.style.display = "flex";

    // ซ่อน popup หลัง 6 วิ
    setTimeout(() => {
        popup.style.display = "none";
        window.location.href = "employer-jobs.html";
    }, 6000);
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
}
