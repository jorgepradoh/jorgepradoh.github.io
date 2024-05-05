#%%
import streamlit as st
from pathlib import Path
from PIL import Image
from streamlit.components.v1 import html

current_dir = Path(__file__).parent if "__file__" in locals() else Path.cwd()
resume_file = current_dir / "assets" / "Resume_Jorge_Prado.pdf"
profile_pic = current_dir / "assets" / "profile-pic.jpg"
css_file = current_dir / "styles" / "main.css"


st.set_page_config(
    page_icon="👨‍💻",
    page_title="Digital CV | Jorge Prado "
)
st.title("Main Page")




html(
    """
<html>

<head>
   <script src = "https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.18.11/tsparticles.min.js"> </script>
   <style>
      #particles {
         width: 5000px;
         height: 5000px;
         background-color: #1b2735;
      }
   </style>
</head>
<body>
   <div id = "particles">
   </div>
   <script>
      tsParticles.load("particles", {
         particles: {
            number: {
               value: 1000
            },
            move: {
               enable: true
            },
            color: {
               value: "#FFFFFF"
            },
         }
      });
   </script>
</body>
</html>
""",
    height=20000,
    width=20000,
)
# Add css to make the iframe fullscreen
st.markdown(
    """
<style>
    iframe {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
""",
    unsafe_allow_html=True,
)


NAME = "Jorge Prado"
DESCRIPTION = """
Mechatronics Engineer, A.I. & M.L. Engineering. Proactive, innovative, and committed to professional development. 
"""
EMAIL = "jorge.prado@live.com.mx"

# --- LOAD CSS, PDF & PROFIL PIC ---
with open(css_file) as f:
    st.markdown("<style>{}</style>".format(f.read()), unsafe_allow_html=True)

with open(resume_file, "rb") as pdf_file:
    PDFbyte = pdf_file.read()
profile_pic = Image.open(profile_pic)


col1, col2 = st.columns(2, gap="small")
with col1:
    st.image(profile_pic, width=252)

with col2:
    st.title(NAME)
    st.write(DESCRIPTION)
    st.download_button(
        label=" 📄 Download Resume",
        data=PDFbyte,
        file_name=resume_file.name,
        mime="application/octet-stream",
    )
    st.write("📫: ", EMAIL)

# --- SOCIAL LINKS ---

st.write('\n')

cols = st.columns(4)


cols[3].markdown(
    '<a href="www.linkedin.com/in/jorge-a-prado/"><img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" height="64" alt="LinkedIn URL">',
    unsafe_allow_html=True,
    )
cols[0].markdown(
    '<a href="https://github.com/jorgepradoh"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" height="64" alt="GitHub URL">',
    unsafe_allow_html=True,
    )

st.write("-"*150)

# --- EXPERIENCE & QUALIFICATIONS ---

st.write('\n')
st.subheader("Experience and Qualifications")
st.write(
    """
- ✔️ Experience extracting actionable insights from data
- ✔️ Strong hands on experience and knowledge in Python and ML frameworks
- ✔️ Good understanding of statistical and mathematical principles, along with their respective applications
- ✔️ Excellent team-player and displaying strong sense of initiative on tasks
- ✔️ Extremely adaptable and result-oriented mindset
"""
)
# --- SKILLS ---
st.write('\n')
st.subheader("Skills & Languages")

programming = st.checkbox("👩‍💻 Programming Languages ")
if programming:
    st.write(
        """
            - **Python:** A.I. Focus: M.L. & D.L. for Computer Vision, LLMs for Natural Language Processing.
                    ► Pytorch, Tensorflow, Numpy, Pandas, Scikit-learn 
            - **TypeScript:** QA Automation with TestCafe & Selenium 
            - **Javascript:** Performance Testing with JMeter, K6, Postman
            - **C++:** Object Oriented Programing, Industrial Robot Control 
        """
    )

cloud = st.checkbox("☁️🖥️ Cloud-Related ")

if cloud:
    st.write(
        """        
            - **AWS:** 
                - EC2
                - Sagemaker
                - Bedrock
                - Quicksight
                - Lambda
                - S3
        """
    )

languages = st.checkbox("🗣️ Languages")

if languages:
    st.write(
        """
         - **Spanish:** ***Native***
         - **English:** ***C1 Advanced***
         - **French:** ***B1 Intermediate***
         - **German:** ***A1 Beginner***
        """
             )
    
other = st.checkbox("🤹 Other Skills")

if other:
    st.write(
        """
        - **Computer Aided Design:** SolidWorks, Fusion 360
        - **Electronics:** PLCs, Industrial Robot Manipulation, Electronic Circuit Design
        - **Matlab & Wolfram Mathematica:** For scientific computing, numerical analysis, numerical simulations
        - **3D Printing**
        """
             )

# --- WORK HISTORY ---
st.write('\n')
st.subheader("Work History")
st.write("---")

# --- JOB 1
st.write("💼", "**QA Tester | Volkswagen Financial Services**")
st.write("***August 2023 - Present***")
st.write(
    """
- ► Collaborated with a cross-functional team to perform functional end-to-end testing, user acceptance testing, regression testing, as well as stress testing on high impact financial systems.
- ► Proposed and implemented QA Automation for end-to-end tests using a variety of technologies that better suited the project.
- ► Managed, directed, and actively participated in the continuous improvement of the area’s KPIs and dashboards presented to upper management, as well as integrating them to cloud-based platforms.
- ► Developed several proof-of-concept solutions using A.I. for improving process efficiency and response times.
"""
)

# --- JOB 2
st.write('\n')
st.write("🤖", "**Artificial Intelligence Research Assistant | National Institute for Astrophysics, Optics and Electronics**")
st.write("***August 2022 - August 2023***")
st.write(
    """
- ► As an A.I. Research Assistant, I collaborated with a cross-functional team to develop and maintain state-of-the-art end-to-end A.I. based applications using mainly Computer Vision with Machine Learning and Deep Learning for anomaly detection, object detection and classification, tracking and segmentation.
- ► Database creation and augmentation with both traditional and GAN-based methods.
- ► Conducted research on state-of-the-art Vision Transformers algorithms for scientific and technological innovation.
"""
)

# --- JOB 3
st.write('\n')
st.write("👷🏼", "**Mechatronics Engineer | METLAG Servicios**")
st.write("***January 2021 - August 2021***")
st.write(
    """
- ► As a Mechatronics Engineer my core responsibility was to develop innovative products, from the early stages of the project such as quoting, electronic and mechanical design, CAD, as well as supervising the additive manufacturing process for the products.
- ► Analyzed, documented, and reported user survey results to improve customer communication processes by 18%
- ► I also had to attend weekly meetings with the clients to give an update on every project that we were working on and discuss any additional requirements for any of the projects.
"""
)

# --- Education ---
st.write('\n')
st.subheader("Education")
st.write("---")

st.write('\n')
st.write("🎓", "**National Institute for Astrophysics, Optics and Electronics**")
st.write("***August 2021 - August 2023***")
st.write(
    """
- ► ***MSc. in Science and Technology of Space | Specialization in Earth Observation*** 
- Performed research on vision transformers for monocular visual odometry applied to autonomous rover navigation in martian environments.
"""
)

st.write('\n')
st.write("🎓", "**La Salle Laguna University**")
st.write("***August 2016 - January 2021***")
st.write(
    """
- ► ***Bachelors in Mechatronics Engineering | Specialization in Automation & Embedded Systems***
- Focused on Industrial Robotics for manufacturing automation and Embedded Systems for instrumentation  
"""
)



# %%
