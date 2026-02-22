const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup 
const hbs = exphbs.create({
  extname: ".handlebars",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  helpers: {     // helpers setup 
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    yearRange: function (text) {
      return String(text || "").replace(/\s+/g, " ").trim();
    },
    json: (obj) => JSON.stringify(obj, null, 2),
  },
});

app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.redirect("/resume"));

app.get("/resume", (req, res) => {
  const resume = {
    name: "Yean Fong",
    personal: {
      addressLines: [
        "St. 118, Sangkat Phsar Depo 3,",
        "Khan Toul Kork, Phnom Penh, Cambodia.",
      ],
      telephone: "(+855) 69 89 55 88",
      email: "yfong231@gmail.com",
      dob: "2nd March 2001",
      nationality: "Cambodian",
      photoUrl: "/images/profile.jpg", 
    },

    education: [
      {
        leftTitle: "American University of Phnom Penh",
        leftMeta: "Phnom Penh, Cambodia",
        rightDate: "2024-2026",
        subLine: "Major: Information Technology Management",
        bullets: [],
      },
      {
        leftTitle: "Fort Hays State University",
        leftMeta: "Hays, KS, USA",
        rightDate: "2024-2026",
        subLine: "Major: Computer Science",
        bullets: [],
      },
      {
        leftTitle: "ASEAN Young Leadership Program",
        leftMeta: "Common Purpose, Singapore",
        rightDate: "2022-2023",
        subLine: "",
        bullets: [
          "Completed self-learning and in-person phases at the American University of Phnom Penh, Cambodia in 2022.",
          "Completed self-learning and in-person phases at Sampoerna University, Indonesia in 2023.",
        ],
      },
      {
        leftTitle: "East Los Angeles College",
        leftMeta: "Monterey Park, CA, USA",
        rightDate: "2022",
        subLine: "",
        bullets: [],
      },
      {
        leftTitle: "Pasadena City College",
        leftMeta: "Pasadena, CA, USA",
        rightDate: "2019-2021",
        subLine: "Previous Major: Architectural Computer-Aided Design",
        bullets: [],
      },
      {
        leftTitle: "Kamo High School",
        leftMeta: "Kamo, New Zealand",
        rightDate: "2016-2018",
        subLine: "High School Diploma",
        bullets: [
          "Completed New Zealand’s National Certificate of Educational Achievement (NCEA) level 1, level 2, and level 3.",
          "Kamo High School Environmental Prefect in 2018.",
          "Community Service (Kiwi Buddies) Award Recipient in 2017 and 2018.",
        ],
      },
    ],

    experience: [
      {
        roleOrg: "Spectrum Management Intern | Telecommunication Regulator of Cambodia",
        location: "Phnom Penh, Cambodia",
        rightDate: "Jan/2026 – Present",
        bullets: [
          "Assisted in spectrum licensing and frequency assignment processes, supporting compliance with national telecommunications regulations.",
          "Contributed to spectrum management activities, including data analysis, documentation, and coordination with internal teams.",
          "Supported the review of license applications and technical submissions, ensuring efficient and accurate spectrum use.",
        ],
      },
      {
        roleOrg: "Part-time Administrative Officer | M H Hotel",
        location: "Phnom Penh, Cambodia",
        rightDate: "Mar/2022 – Dec/2025",
        bullets: [
          "Ensure that departmental administrative papers are filed correctly.",
          "Verified the business documentations are consolidated and communicated in a timely manner.",
          "Handled scheduling, paperwork, and planning.",
        ],
      },
    ],

    //unless
    showSkills: true,
    skills: {
      digital:
        "Microsoft Office, Google Workspace, Computer Design Applications such as AutoCAD, Sketchup, Adobe Illustrator, Adobe Photoshop, and Lumion, Programming Languages such as Python, Java, and C++",
      languages: "Fluent in Khmer and English, and elementary-level Mandarin.",
    },
  };

  res.render("resume", {
    pageTitle: "Minimal Resume",
    resume,
  });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});