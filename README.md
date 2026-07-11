# Math Hub — Interactive Mathematics Website

*We Learn · We Solve · We Win*

A multi-page site with a scientific calculator plus calculators for circle basics, area, volume, and perimeter. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Before you submit — personalize the About page

Open `about.html` and replace the bracketed placeholders:

- `[Your Full Name]`, `[Your Section]`, `[Your School Name]`
- The short biography and reflection paragraphs
- Your photo: add a picture to `images/` (e.g. `images/profile.jpg`), then in `about.html` swap
  ```html
  <div class="about-photo placeholder">Add your photo:<br>images/profile.jpg</div>
  ```
  for
  ```html
  <img class="about-photo" src="images/profile.jpg" alt="Photo of Your Name">
  ```

`images/logo.png` and `images/profile-placeholder.jpg` are already included so the folder structure matches the assignment spec — swap the profile one for your real photo.

## Folder structure

```
MathHub/
  index.html
  calculator.html
  diameter.html
  area.html
  volume.html
  perimeter.html
  about.html
  style.css
  script.js
  images/
    logo.png
    profile-placeholder.jpg
  formulas/
    formulas.md
```

## Publishing with GitHub Pages

1. Go to [github.com](https://github.com) and create a **new repository** named `mathhub` (or any name you like). Make it **Public**.
2. On your computer, open the `MathHub` folder in a terminal and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Math Hub"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mathhub.git
   git push -u origin main
   ```
   (No terminal? On the repository page, click **Add file → Upload files** and drag in everything from the `MathHub` folder instead.)
3. On GitHub, open your repository → **Settings** → **Pages** (left sidebar).
4. Under **Source**, choose **Deploy from a branch**, set branch to **main** and folder to **/ (root)**, then click **Save**.
5. Wait a minute, then your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/mathhub/
   ```

Submit both links as required:
- Repository link: `https://github.com/YOUR-USERNAME/mathhub`
- GitHub Pages link: `https://YOUR-USERNAME.github.io/mathhub/`

## What's inside each page

| Page | Contents |
|---|---|
| Home | Logo, name, intro, nav, banner, footer |
| Calculator | Scientific calculator: +, −, ×, ÷, %, √, exponent (xʸ), parentheses |
| Diameter | Diameter, Radius, Circumference calculators |
| Area | Rectangle, Square, Triangle, Circle, Parallelogram, Trapezoid |
| Volume | Cube, Cylinder, Cone, Sphere, Rectangular Prism |
| Perimeter | Rectangle, Square, Triangle, Circle, Parallelogram |
| About | Your photo, name, grade & section, school, bio, skills, reflection |

All calculator logic lives in `script.js` in one reusable function (`bindCalc`), so every formula card just declares its inputs, its formula, and its output label.
