---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false


  - block: resume-skills
    content:
      title: Skills & Hobbies
      username: admin
    design:
      show_skill_percentage: false


  - block: markdown
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        Welcome to my research corner! I am a Machine Learning Engineer with expertise in Retrieval-Augmented Generation (RAG), computational fluid dynamics (CFD), and generative AI.

        My work spans advanced topics like hybrid retrieval systems, biomedical analysis, and AI-driven physics modeling. I blog about machine learning, computational modeling, and cutting-edge AI applications.

        Let's collaborate on innovative projects that push boundaries! 😃
    design:
      columns: '1'



  - block: collection
    content:
      title: Academic Publications
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
      

---
