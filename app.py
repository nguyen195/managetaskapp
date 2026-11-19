import streamlit as st
import streamlit.components.v1 as components
import os

# ─── STREAMLIT APP CONFIG ───────────────────────────────────────────────────────
st.set_page_config(
    page_title="TaskFlow Duo - Mobile App",
    page_icon="🥑",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# ─── HIDE STREAMLIT CHROME FOR NATIVE MOBILE FEEL ──────────────────────────────
st.markdown("""
<style>
    /* Hide top header, hamburger menu and footer */
    #MainMenu {visibility: hidden;}
    header {visibility: hidden;}
    footer {visibility: hidden;}
    .stDeployButton {display: none;}
    
    /* Center mobile app container */
    .block-container {
        padding-top: 0.5rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 450px !important;
        margin: 0 auto !important;
    }
    
    /* Background style */
    .stApp {
        background-color: #f4f7f4;
    }
</style>
""", unsafe_allow_html=True)

# ─── LOAD & SERVE PASTEL MOBILE APP ─────────────────────────────────────────────
html_path = os.path.join(os.path.dirname(__file__), "index.html")

if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_code = f.read()
    
    # Render embedded mobile frame with smooth scrolling
    components.html(html_code, height=920, scrolling=True)
else:
    st.error("Không tìm thấy file index.html. Vui lòng kiểm tra lại repo!")
