import axios from "axios";

const BASE_URL = process.env.TASKFLOW_API_BASE_URL || "http://localhost:8000";

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function main() {
  console.log(`Seeding against: ${BASE_URL}`);

  const api = axios.create({ baseURL: BASE_URL, headers: { "Content-Type": "application/json" } });

  const demoUser = {
    name: "Demo User",
    email: "user@taskflow.com",
    password: "User123!",
  };

  // 1) Register (idempotent)
  try {
    await api.post("/api/auth/register", demoUser);
    console.log("✓ Registered demo user");
  } catch (e) {
    console.log("ℹ︎ Register skipped (likely exists)");
  }

  // 2) Login
  const { data: login } = await api.post("/api/auth/login", {
    email: demoUser.email,
    password: demoUser.password,
  });
  const token = login.token;
  const auth = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  console.log("✓ Logged in");

  // 3) Create project (idempotent by title check)
  const projectTitle = "Demo Project";
  let projectId;
  try {
    const projectsRes = await auth.get("/api/project");
    const existing = (projectsRes.data || []).find((p) => p.title === projectTitle);
    if (existing) {
      projectId = existing._id;
      console.log("ℹ︎ Project exists:", projectId);
    } else {
      const { data: created } = await auth.post("/api/project", { title: projectTitle, description: "Seeded demo project" });
      projectId = created._id || created.projectId || created.id;
      console.log("✓ Created project:", projectId);
      await sleep(200);
    }
  } catch (e) {
    console.error("✗ Failed to ensure project", e?.response?.data || e.message);
    process.exit(1);
  }

  // 4) Create tasks (best-effort)
  const tasks = [
    { title: "Set up repo", status: "Todo", priority: "High" },
    { title: "Design board", status: "In Progress", priority: "Medium" },
    { title: "Deploy preview", status: "Done", priority: "Low" },
  ];

  for (const t of tasks) {
    try {
      await auth.post("/api/task", { ...t, projectId, assignedTo: [] });
      console.log(`✓ Created task: ${t.title}`);
      await sleep(100);
    } catch (e) {
      console.log(`ℹ︎ Skipped task: ${t.title}`);
    }
  }

  console.log("Seeding complete.");
}

main().catch((e) => {
  console.error("Seed failed:", e?.response?.data || e.message);
  process.exit(1);
});


