const fs = require('fs');

const files = ['index.html', 'about.html', 'service.html', 'gallery.html', 'contact.html'];

const newFooterAndFloating = `
<!-- ================= FLOATING & FOOTER ================= -->
<style>
/* FLOATING ELEMENTS */
.float-whatsapp {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  background: #25D366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.float-whatsapp:hover {
  transform: scale(1.1);
}

.float-emergency-tab {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #e53935;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 2px;
  padding: 15px 8px;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: -4px 0 15px rgba(229, 57, 53, 0.3);
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: right 0.3s ease;
}

.emergency-panel {
  position: fixed;
  top: 50%;
  right: -340px;
  transform: translateY(-50%);
  width: 320px;
  background: #fff;
  border-radius: 16px 0 0 16px;
  box-shadow: -5px 0 35px rgba(0,0,0,0.25);
  z-index: 1001;
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 24px;
}
.emergency-panel.open {
  right: 0;
}
.ep-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 18px;
}
.ep-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a2e2e;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ep-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
}

.ep-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #555;
  margin-bottom: 12px;
}
.ep-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1px solid #eaeaea;
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  text-decoration: none;
  color: #333;
  transition: border-color 0.2s;
}
.ep-card:hover { border-color: #e53935; }
.ep-card-left { display: flex; align-items: center; gap: 14px; }
.ep-card-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.ep-card-info h4 { font-size: 14px; font-weight: 700; margin:0 0 2px 0; color:#222; }
.ep-card-info p { font-size: 13px; color:#666; margin:0; }

.ep-social {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 15px;
}
.ep-social a {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; text-decoration: none; font-size: 18px;
  transition: transform 0.2s;
}
.ep-social a:hover { transform: scale(1.1); }
.es-fb { background: #1877F2; }
.es-tw { background: #1DA1F2; }
.es-in { background: #E4405F; }
.es-yt { background: #FF0000; }
.es-li { background: #0A66C2; }

/* Obscure backdrop */
.ep-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
  opacity: 0; visibility: hidden; transition: all 0.3s;
}
.ep-overlay.open { opacity: 1; visibility: visible; }

/* New Footer Styles */
.site-footer {
  background-color: #0d2e2e;
  color: #fff;
  padding: 70px 5vw 25px;
  font-family: 'Nunito', sans-serif;
  margin-top: auto;
}
.footer-main {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1.5fr 1.5fr; gap: 40px;
  margin-bottom: 50px;
}
.footer-brand .f-logo {
  display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
}
.f-logo-icon {
  width: 50px; height: 50px; background: linear-gradient(135deg, #0d6e6e, #12a0a0);
  border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px;
}
.f-logo-text { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #fff; line-height: 1.1; }
.f-logo-sub { font-size: 11.5px; color: rgba(255,255,255,0.7); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.footer-brand p { color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.7; }

.footer-title { font-size: 18px; font-weight: 700; margin-bottom: 24px; color: #fff; letter-spacing: 0.3px; }
.footer-links { list-style: none; padding: 0; }
.footer-links li { margin-bottom: 14px; }
.footer-links a { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 14px; transition: color 0.2s; }
.footer-links a:hover { color: #12a0a0; }

.footer-contact { list-style: none; padding: 0; }
.footer-contact li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.6; }
.footer-contact li span:first-child { font-size: 18px; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px;
  text-align: center; color: rgba(255,255,255,0.5); font-size: 13.5px;
}
.footer-bottom a { color: #12a0a0; text-decoration: none; }

@media(max-width: 900px) { .footer-main { grid-template-columns: 1fr 1fr; } }
@media(max-width: 600px) { 
  .footer-main { grid-template-columns: 1fr; }
  .float-whatsapp { bottom: 15px; right: 15px; width: 50px; height: 50px; font-size: 28px; }
  .emergency-panel { width: 280px; }
}
</style>

<a href="https://wa.me/919876543210" class="float-whatsapp" target="_blank" title="Chat on WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#fff"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.602 6.012L.175 23.279l5.378-1.41a12.012 12.012 0 0 0 6.478 1.884c6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm6.368 17.202c-.26.732-1.503 1.411-2.073 1.488-.571.077-1.282.203-4.103-.967-3.411-1.415-5.617-4.908-5.787-5.135-.17-.227-1.382-1.841-1.382-3.513 0-1.672.871-2.493 1.181-2.813.31-.321.678-.401.905-.401.226 0 .452 0 .647.01.205.011.48-.078.751.571.283.678.966 2.355 1.05 2.525.085.17.141.368.028.595-.113.226-.17.368-.34.566-.17.198-.354.439-.508.581-.17.17-.352.356-.16.685.192.329.852 1.405 1.833 2.279 1.267 1.127 2.33 1.472 2.656 1.63.326.158.514.127.708-.099.194-.226.837-.978 1.059-1.312.221-.334.442-.278.741-.166.299.113 1.889.89 2.214 1.053.325.163.541.243.621.378.08.136.08.788-.18 1.52z"/></svg>
</a>

<div class="float-emergency-tab" onclick="toggleEmergency()">
  EMERGENCY
</div>

<div class="ep-overlay" id="epOverlay" onclick="toggleEmergency()"></div>
<div class="emergency-panel" id="epPanel">
  <div class="ep-header">
    <div class="ep-title">✨ Quick Links</div>
    <button class="ep-close" onclick="toggleEmergency()">✕</button>
  </div>
  
  <div class="ep-section-title">Emergency Contacts</div>
  
  <a href="tel:108" class="ep-card">
    <div class="ep-card-left">
      <div class="ep-card-icon" style="background:#ffebee; color:#e53935;">📞</div>
      <div class="ep-card-info">
        <h4>Emergency</h4>
        <p>108</p>
      </div>
    </div>
    <div style="color:#ccc; font-weight:bold;">❯</div>
  </a>

  <a href="tel:102" class="ep-card">
    <div class="ep-card-left">
      <div class="ep-card-icon" style="background:#e3f2fd; color:#1e88e5;">🚑</div>
      <div class="ep-card-info">
        <h4>Ambulance</h4>
        <p>102</p>
      </div>
    </div>
    <div style="color:#ccc; font-weight:bold;">❯</div>
  </a>

  <a href="tel:104" class="ep-card">
    <div class="ep-card-left">
      <div class="ep-card-icon" style="background:#e8f5e9; color:#43a047;">🛡️</div>
      <div class="ep-card-info">
        <h4>Helpline</h4>
        <p>104</p>
      </div>
    </div>
    <div style="color:#ccc; font-weight:bold;">❯</div>
  </a>

  <div class="ep-section-title" style="margin-top: 24px;">Connect With Us</div>
  <div class="ep-social">
    <a href="#" class="es-fb">f</a>
    <a href="#" class="es-tw">X</a>
    <a href="#" class="es-in">in</a>
    <a href="#" class="es-yt">▶</a>
    <a href="#" class="es-li">LI</a>
  </div>
  <div style="margin-top:20px; font-size:11.5px; color:#999; text-align:center;">
    © 2026 SmileCare Dental Clinic
  </div>
</div>

<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-brand">
      <div class="f-logo">
        <div class="f-logo-icon">🦷</div>
        <div>
          <div class="f-logo-text">SmileCare Dental</div>
          <div class="f-logo-sub">Advanced Dental Care</div>
        </div>
      </div>
      <p>SmileCare Dental Clinic offers personalized treatment using modern technology for all dental health issues. Our certified specialists are here for every smile.</p>
    </div>
    
    <div>
      <h3 class="footer-title">Quick Links</h3>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="service.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="gallery.html">Gallery</a></li>
      </ul>
    </div>

    <div>
      <h3 class="footer-title">Contact Us</h3>
      <ul class="footer-contact">
        <li><span>📍</span> <span>123 Dental Avenue, Civil Lines<br>Maharashtra - 400001</span></li>
        <li><span>📞</span> <span>+91 98765 43210</span></li>
        <li><span>✉️</span> <span>info@smilecaredental.com</span></li>
      </ul>
    </div>

    <div>
      <h3 class="footer-title">Why Choose Us?</h3>
      <p style="color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.7;">We offer personalized treatment using modern technology for all dental health issues. Our certified dentists and hygienists are here for every tooth.</p>
    </div>
  </div>
  
  <div class="footer-bottom">
    © 2026 SmileCare Dental Clinic. All Rights Reserved.<br>
    Designed by <a href="#">SmileCare IT</a>
  </div>
</footer>
`;

const jsToggle = `
function toggleEmergency() {
  const panel = document.getElementById('epPanel');
  const overlay = document.getElementById('epOverlay');
  if(panel && overlay) {
    panel.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}
`;

files.forEach(file => {
  let content = fs.readFileSync('c:/Users/HP/Dental-clinik-1/' + file, 'utf8');
  
  // Find where the old footer starts
  const footerStart = content.indexOf('<footer');
  if(footerStart !== -1) {
    // Find the end of old footer
    const footerEnd = content.indexOf('</footer>', footerStart) + 9;
    
    const beforeFooter = content.substring(0, footerStart);
    const afterFooter = content.substring(footerEnd);
    
    let newContent = beforeFooter + newFooterAndFloating + afterFooter;
    
    // Inject the toggle JS into the bottom script tag!
    if(newContent.includes('</script>')) {
      // replace the VERY LAST occurrence or just the first inside the closing blocks 
      // wait, index.html might have multiple scripts. 
      // safer: just append right before </body>
      newContent = newContent.replace('</body>', '<script>\\n' + jsToggle + '\\n</script>\\n</body>');
    }
    
    fs.writeFileSync('c:/Users/HP/Dental-clinik-1/' + file, newContent, 'utf8');
    console.log('Updated ' + file);
  } else {
    // some files might not have <footer directly if it got malformed
    console.log('No footer found in ' + file);
  }
});
