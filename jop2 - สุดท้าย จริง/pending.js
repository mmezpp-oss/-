const email = localStorage.getItem("currentEmail");
if (!email) location.href = "index.html";

let timer = null;

async function checkStatus() {

    // ===== ผู้หางาน =====
    const { data: seeker, error: seekerError } = await supabase
        .from("seeker")
        .select("id, status")
        .eq("email", email)
        .maybeSingle();

    if (seekerError) {
        console.error(seekerError);
        return;
    }

    if (seeker && seeker.status === "approved") {
        clearInterval(timer);
        // ⭐ เก็บ id ผู้หางาน
        console.log("seeker:", seeker);

        localStorage.setItem("seekerId", seeker.id);
        window.location.href = "jobs.html";
        return;
    }

    // ===== ผู้ประกอบการ =====
    const { data: employer, error: employerError } = await supabase
        .from("employer")
        .select("id, status")
        .eq("email", email)
        .maybeSingle();

    if (employerError) {
        console.error(employerError);
        return;
    }

    if (employer && employer.status === "approved") {
        clearInterval(timer);
        localStorage.setItem("currentEmail", email);

        localStorage.setItem("employerId", employer.id);
        window.location.href = "employer-jobs.html";
    }
}

checkStatus();
timer = setInterval(checkStatus, 5000);
