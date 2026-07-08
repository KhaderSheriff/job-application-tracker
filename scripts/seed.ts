import connectDB from "../lib/db";
import "@/lib/models";
import { Board, Column, JobApplication } from "@/lib/models";

const USER_ID = "6a4a70bf41ebce20f24226df";

/*const SAMPLE_JOBS = [
  // Wish List
  {
    company: "MU Company",
    position: "Software Developer",
    location: "San Francisco, CA",
    tags: ["React", "Tailwind", "High Pay"],
    description: "Build modern web applications using React and Tailwind CSS",
    jobUrl: "https://example.com/jobs/1",
    salary: "$120k - $150k",
  },
  {
    company: "Stripe",
    position: "Front End Developer",
    location: "Remote",
    tags: ["TypeScript", "React", "Next.js"],
    description: "Work on payment infrastructure frontend",
    jobUrl: "https://example.com/jobs/2",
    salary: "$130k - $160k",
  },
  {
    company: "Nutrishe",
    position: "QA Engineer",
    location: "New York, NY",
    tags: ["CIT", "Appium", "CI/CD"],
    description: "Ensure quality of mobile and web applications",
    jobUrl: "https://example.com/jobs/3",
    salary: "$90k - $110k",
  },
  // Applied
  {
    company: "LeaFood",
    position: "DevOps Engineer",
    location: "Austin, TX",
    tags: ["promQL", "Full-stack", "Docker"],
    description: "Manage infrastructure and deployment pipelines",
    jobUrl: "https://example.com/jobs/4",
    salary: "$110k - $140k",
  },
  {
    company: "Nomura",
    position: "Mobile Developer",
    location: "Tokyo, Japan",
    tags: ["React Native", "iOS", "Android"],
    description: "Develop mobile applications for financial services",
    jobUrl: "https://example.com/jobs/5",
    salary: "$100k - $130k",
  },
  {
    company: "Wise",
    position: "UI/UX Designer",
    location: "London, UK",
    tags: ["Figma", "Design Systems", "User Research"],
    description: "Design beautiful and intuitive user experiences",
    jobUrl: "https://example.com/jobs/6",
    salary: "$80k - $100k",
  },
  {
    company: "Danone",
    position: "DevOps Engineer",
    location: "Paris, France",
    tags: ["promQL", "Full-stack", "Docker"],
    description: "Support cloud infrastructure and CI/CD",
    jobUrl: "https://example.com/jobs/7",
    salary: "$95k - $120k",
  },
  // Interviewing
  {
    company: "Retomotion",
    position: "Web Designer",
    location: "Berlin, Germany",
    tags: ["Figma", "React", "Bootstrap"],
    description: "Create responsive web designs and implement them",
    jobUrl: "https://example.com/jobs/8",
    salary: "$85k - $105k",
  },
  {
    company: "WorkLab",
    position: "Product Manager",
    location: "Seattle, WA",
    tags: ["Product Strategy", "Agile", "Analytics"],
    description:
      "Help drive the product and business planning for our platform",
    jobUrl: "https://example.com/jobs/9",
    salary: "$140k - $170k",
  },
  {
    company: "I Networks",
    position: "Mobile Developer",
    location: "Remote",
    tags: ["Flutter", "Dart", "Firebase"],
    description: "Build cross-platform mobile applications",
    jobUrl: "https://example.com/jobs/10",
    salary: "$115k - $145k",
  },
  // Offer
  {
    company: "Profan",
    position: "Software Developer",
    location: "Stockholm, Sweden",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    description: "Develop backend services and APIs",
    jobUrl: "https://example.com/jobs/11",
    salary: "$100k - $125k",
  },
  {
    company: "MUS Logistics",
    position: "UI Designer",
    location: "Amsterdam, Netherlands",
    tags: ["Figma", "Illustrator"],
    description:
      "Lead the UX process and workflow, and work closely with development team",
    jobUrl: "https://example.com/jobs/12",
    salary: "$90k - $110k",
  },
  // Rejected
  {
    company: "Ultra Vouche",
    position: "Associate",
    location: "Chicago, IL",
    tags: ["Scrum", "Agile"],
    description: "Support product development and project management",
    jobUrl: "https://example.com/jobs/13",
    salary: "$70k - $85k",
  },
  {
    company: "NRI",
    position: "Web Test",
    location: "Boston, MA",
    tags: ["Testing", "Automation"],
    description: "Manage product testing and quality assurance",
    jobUrl: "https://example.com/jobs/14",
    salary: "$75k - $90k",
  },
  {
    company: "TOG London",
    position: "Data Ana",
    location: "London, UK",
    tags: ["JavaScript", "Python", "SQL"],
    description: "Analyze user data and provide insights for product decisions",
    jobUrl: "https://example.com/jobs/15",
    salary: "$85k - $100k",
  },
];*/

const SAMPLE_JOBS = [
  // Wish List
  {
    company: "Google",
    position: "Software Engineer",
    location: "Bengaluru, India",
    tags: ["Java", "DSA", "Dream Company"],
    description: "Develop scalable backend systems and cloud applications.",
    jobUrl: "https://careers.google.com",
    salary: "₹28 LPA - ₹45 LPA",
  },
  {
    company: "Microsoft",
    position: "Software Engineer",
    location: "Hyderabad, India",
    tags: ["C#", ".NET", "Azure"],
    description: "Build enterprise software and cloud solutions.",
    jobUrl: "https://careers.microsoft.com",
    salary: "₹24 LPA - ₹40 LPA",
  },
  {
    company: "Amazon",
    position: "SDE I",
    location: "Chennai, India",
    tags: ["Java", "AWS", "Backend"],
    description: "Develop scalable e-commerce and cloud services.",
    jobUrl: "https://www.amazon.jobs",
    salary: "₹18 LPA - ₹32 LPA",
  },

  // Applied
  {
    company: "Wipro",
    position: "Java Full Stack Developer",
    location: "Bengaluru, India",
    tags: ["Java", "Spring Boot", "React"],
    description: "Develop enterprise applications using Java and React.",
    jobUrl: "https://careers.wipro.com",
    salary: "₹5 LPA - ₹8 LPA",
  },
  {
    company: "Infosys",
    position: "Systems Engineer",
    location: "Mysuru, India",
    tags: ["Java", "SQL", "Freshers"],
    description: "Build and maintain enterprise software solutions.",
    jobUrl: "https://careers.infosys.com",
    salary: "₹4 LPA - ₹6 LPA",
  },
  {
    company: "TCS",
    position: "Software Engineer",
    location: "Chennai, India",
    tags: ["Java", "Angular", "SQL"],
    description: "Develop and support client applications.",
    jobUrl: "https://www.tcs.com/careers",
    salary: "₹4 LPA - ₹7 LPA",
  },
  {
    company: "Accenture",
    position: "Application Development Associate",
    location: "Hyderabad, India",
    tags: ["Java", "Cloud", "Agile"],
    description: "Develop modern enterprise applications.",
    jobUrl: "https://www.accenture.com/in-en/careers",
    salary: "₹4.5 LPA - ₹7 LPA",
  },

  // Interviewing
  {
    company: "Zoho",
    position: "Software Developer",
    location: "Chennai, India",
    tags: ["Java", "Problem Solving", "Backend"],
    description: "Develop cloud-based business software.",
    jobUrl: "https://www.zoho.com/careers",
    salary: "₹8 LPA - ₹12 LPA",
  },
  {
    company: "Freshworks",
    position: "Graduate Software Engineer",
    location: "Chennai, India",
    tags: ["JavaScript", "React", "Node.js"],
    description: "Build SaaS products used by global customers.",
    jobUrl: "https://www.freshworks.com/company/careers",
    salary: "₹10 LPA - ₹16 LPA",
  },
  {
    company: "MulticoreWare",
    position: "Software Engineer",
    location: "Chennai, India",
    tags: ["C++", "AI", "Computer Vision"],
    description: "Develop high-performance software and AI solutions.",
    jobUrl: "https://multicorewareinc.com/careers",
    salary: "₹7 LPA - ₹12 LPA",
  },

  // Offer
  {
    company: "Zetwerk",
    position: "Graduate Engineer Trainee",
    location: "Bengaluru, India",
    tags: ["Java", "Spring Boot", "SQL"],
    description: "Build internal enterprise software solutions.",
    jobUrl: "https://zetwerk.com/careers",
    salary: "₹6 LPA - ₹8 LPA",
  },
  {
    company: "Oracle",
    position: "Associate Software Engineer",
    location: "Bengaluru, India",
    tags: ["Java", "Oracle DB", "Cloud"],
    description: "Develop cloud-native enterprise applications.",
    jobUrl: "https://careers.oracle.com",
    salary: "₹12 LPA - ₹18 LPA",
  },

  // Rejected
  {
    company: "Capgemini",
    position: "Software Engineer",
    location: "Pune, India",
    tags: ["Java", "SQL", "Testing"],
    description: "Develop and maintain enterprise applications.",
    jobUrl: "https://www.capgemini.com/careers",
    salary: "₹4 LPA - ₹6 LPA",
  },
  {
    company: "Cognizant",
    position: "Programmer Analyst",
    location: "Chennai, India",
    tags: ["Java", "Spring", "REST APIs"],
    description: "Build and maintain business applications.",
    jobUrl: "https://careers.cognizant.com",
    salary: "₹4.5 LPA - ₹7 LPA",
  },
  {
    company: "HCLTech",
    position: "Graduate Engineer",
    location: "Noida, India",
    tags: ["Java", "Cloud", "DevOps"],
    description: "Develop enterprise applications and cloud services.",
    jobUrl: "https://www.hcltech.com/careers",
    salary: "₹4.5 LPA - ₹7.5 LPA",
  },
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ Error: SEED_USER_ID environment variable is required");
    console.log("Usage: SEED_USER_ID=your-user-id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🌱 Starting seed process...");
    console.log(`📋 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️  Board not found. Creating board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Board created");
    } else {
      console.log("✅ Board found");
    }

    // Get all columns
    const columns = await Column.find({ boardId: board._id }).sort({
      order: 1,
    });
    console.log(`✅ Found ${columns.length} columns`);

    if (columns.length === 0) {
      console.error(
        "❌ No columns found. Please ensure the board has default columns."
      );
      process.exit(1);
    }

    // Map column names to column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingJobs.length} existing job applications...`
      );
      await JobApplication.deleteMany({ userId: USER_ID });

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "Wish List": SAMPLE_JOBS.slice(0, 3),
      Applied: SAMPLE_JOBS.slice(3, 7),
      Interviewing: SAMPLE_JOBS.slice(7, 10),
      Offer: SAMPLE_JOBS.slice(10, 12),
      Rejected: SAMPLE_JOBS.slice(12, 15),
    };

    let totalCreated = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      const columnId = columnMap[columnName];
      if (!columnId) {
        console.warn(`⚠️  Column "${columnName}" not found, skipping...`);
        continue;
      }

      const column = columns.find((c) => c.name === columnName);
      if (!column) continue;

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          tags: jobData.tags,
          description: jobData.description,
          jobUrl: jobData.jobUrl,
          salary: jobData.salary,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: columnName.toLowerCase().replace(" ", "-"),
          order: i,
        });

        column.jobApplications.push(jobApplication._id);
        totalCreated++;
      }

      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to "${columnName}" column`);
    }

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`📊 Created ${totalCreated} job applications`);
    console.log(`📋 Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();