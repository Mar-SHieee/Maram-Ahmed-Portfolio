// Edit your personal info here. It feeds the cover, about, contact and footer.
export const profile = {
  name: "Maram Ahmed",
  roles: ["Machine Learning Engineer", "Data Science student", "Builder of ML apps"],
  headline: "End-to-end ML: from raw data to a working app people can use.",
  pills: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Docker"],
  location: "Alexandria, Egypt",
  email: "marmora000mm@gmail.com",
  phone: "01017031441",
  whatsapp: "https://wa.me/201017031441",
  linkedin: "https://www.linkedin.com/in/maram-ahmed-41b9aa312",
  github: "https://github.com/Mar-SHieee",

  // Photo: put the file in public/images/profile.jpg, then tune the numbers.
  // Tip: open the site with ?edit at the end of the link (e.g. localhost:5173/?edit)
  // to get sliders, then press "Copy settings" and paste the result here.
  photo: {
    src: "/images/profile.jpg",
    size: 220,       // width in px (120 - 360)
    ratio: 1,        // width / height: 1 = square, 0.8 = portrait 4:5
    shape: "circle", // "circle" | "rounded" | "square"
    zoom: 1,         // 1 = fit, 2 = zoomed in 2x
    x: 50,           // horizontal focus 0-100
    y: 30,           // vertical focus 0-100
  },

  // Your USP (one sentence, handout pattern: I help [client] achieve [outcome] through [method]).
    usp: "I'm a final-year Data Science student at FCDS, Alexandria University (GPA 3.76/4.00), with 3+ years of academic and project experience across statistics, machine learning, and end-to-end data workflows."
  , about: [
    "I combine statistical thinking with machine learning engineering, building models that are not just accurate, but reliable, validated, and ready to use.",
    "I like building leakage-free ML pipelines and deploying them with Streamlit, Flask, FastAPI and Docker, aiming at production-ready AI.",
  ],
};
