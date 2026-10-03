// kind must be one of: "ML", "App", "IoT".
// image: put the file in public/images/projects/ with the same name (png or jpg).
// github: paste the repo link; while it is empty the card shows "coming soon".
// fit (optional): "cover" crops the image to fill, "contain" shows the whole image.
// demo (optional): link to a video or live app.
export const projects = [
  {
    id: "heart",
    images: ["/images/projects/heart-1.png", "/images/projects/heart-2.png"], 
    fit: "contain",
    title: "Heart Disease Risk Predictor",
    kind: "ML",
    blurb: "A classifier that estimates heart disease risk, served through an interactive Streamlit app.",
    points: [
      "Leakage-free feature engineering, cross-validation and RandomizedSearchCV tuning.",
      "Compared four tree-based classifiers; deployed the Random Forest.",
      "SHAP for interpretability; about 0.93 AUC-ROC on the held-out test set.",
    ],
    tech: ["Python", "Scikit-learn", "SHAP", "Streamlit"],
    github: "https://github.com/Mar-SHieee/Heart-Disease-Risk-Predictor",
  },
  {
    id: "rating",
    images: ["/images/projects/rating-1.png", "/images/projects/rating-2.png"],
    title: "Customer Rating Prediction",
    kind: "ML",
    blurb: "Team project predicting customer review scores on the Olist Brazilian e-commerce dataset.",
    points: [
      "Engineered delivery, pricing, product and temporal features.",
      "Compared Linear Regression, Decision Tree, Random Forest and KNN in a shared pipeline.",
    ],
    tech: ["Python", "Pandas", "Scikit-learn"],
    github: "https://github.com/Mar-SHieee/Customer-Rating-Prediction",
  },
  {
    id: "analyst",
    image: "/images/projects/analyst.png",
    title: "Enterprise AI Data Analyst",
    kind: "App",
    blurb: "Team capstone: an AI analyst for an online retail business. Managers see live KPIs, ask questions in plain English and see how every answer was reached.",
    points: [
      "My part: the Streamlit app, MLOps, Docker, testing, documentation and the prediction module that serves the models.",
      "Every number comes from a read-only SQL query or a versioned model, so the AI never invents figures.",
      "Team agent evaluation: 0% hallucination and 100% tool-selection accuracy on 19 labelled cases (offline mode).",
    ],
    tech: ["Python", "Streamlit", "Docker", "Spark", "RAG"],
    github: "https://github.com/Mar-SHieee/Enterprise-AI-Data-Analyst",
  },
  {
    id: "kitchen",
    image: "/images/projects/kitchen.png",
    title: "Kitchen Safety IoT System",
    kind: "IoT",
    blurb: "A mobile app and sensor network that detects kitchen hazards and alerts you in real time.",
    points: [
      "Full Flutter app: auth, live dashboard, sensor management, alert settings and history.",
      "Supabase (Auth, PostgreSQL, real-time) with a schema I designed.",
      "MQTT over HiveMQ for live readings and remote control of LED, buzzer and servo.",
    ],
    tech: ["Flutter", "Supabase", "MQTT", "ESP32"],
    github: "https://github.com/Mar-SHieee/Kitchen-Safety",
    demo: "https://drive.google.com/drive/folders/12oEU5cZqX2h2Plt2XGMm8bk70qlduu7L?usp=sharing", // optional demo video
  },
];
