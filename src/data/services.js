// id is used in the contact form link (/contact?service=id).
export const services = [
  { id: "ml", title: "Machine learning models", short: "Classification and regression models that are tuned, validated and explained.",
    gets: ["Leakage-free pipeline", "Model comparison with cross-validation", "Metrics report (ROC-AUC, PR curves)", "SHAP explanations"],
    tools: ["Scikit-learn", "XGBoost", "SHAP"] },
  { id: "data", title: "Data analysis & preparation", short: "Messy data turned into clean tables and clear answers.",
    gets: ["Exploratory analysis", "Cleaning and feature engineering", "SQL queries (joins, CTEs, window functions)", "Charts and summary of findings"],
    tools: ["Pandas", "SQL", "Matplotlib"] },
  { id: "deploy", title: "ML apps & APIs", short: "Your model behind an app or API that others can use.",
    gets: ["Streamlit interface", "Flask or FastAPI endpoint", "Dockerized, reproducible setup", "GitHub repo with clean structure"],
    tools: ["Streamlit", "FastAPI", "Docker"] },
  { id: "mobile", title: "Mobile & IoT prototypes", short: "Sensor data on your phone, live.",
    gets: ["Flutter mobile app", "Supabase backend with auth", "ESP32 firmware with MQTT", "Real-time alerts"],
    tools: ["Flutter", "Supabase", "ESP32"] },
];
