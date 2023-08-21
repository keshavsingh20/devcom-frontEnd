import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <h5 style={{ textAlign: "center", marginBottom:5 }}>
          2019-2023 &copy; All Copyrights Are Reserved By DEVCOM
        </h5>
        <div className="footerContainer">
          <div className="footerLeft">
            <h1 style={{ textAlign: "start", marginBottom:5 }}>Contact Us</h1>
            <div>
              <div className="Contacts">
                <p>Keshav Singh Yadav</p>
                <a href="tel:6378407433">
                  <i className="fas fa-phone"></i> 6378407433
                </a>
                <br />
                <a href="mailto:keshavyadav200018@gmail.com">
                  <i className="fas fa-envelope"></i> keshavyadav200018@gmail.com
                </a>
              </div>
              <div className="Contacts">
                <p>Hemant Malav</p>
                <a href="tel:9119351084">
                  <i className="fas fa-phone"></i> 9119351084
                </a>
                <br />
                <a href="mailto:malavhemant@gmail.com">
                  <i className="fas fa-envelope"></i> malavhemant@gmail.com
                </a>
              </div>
              <div className="Contacts">
                <p>Iram Khalid</p>
                <a href="#">
                  <i className="fas fa-phone"></i> XXXXX-XXXXX
                </a>
                <br />
                <a href="mailto:iramkhalid24@gmail.com">
                  <i className="fas fa-envelope"></i> iramkhalid24@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="footerCenter">
            <h1 style={{ textAlign: "center", marginBottom:5 }}>Visit Us</h1>
            <div>
              <div className="visit">
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a><p>Instagram</p>
              </div>
              <div className="visit">
                <a href="#">
                  <i className="fa-brands fa-facebook"></i>
                </a><p>FaceBook</p>
              </div>
              <div className="visit">
                <a href="#">
                  <i className="fa-brands fa-twitter" style={{transform: 'translateX(-.3rem)'}}></i>
                </a><p>Twitter</p>
              </div>
              <div className="visit">
                <a href="#">
                  <i className="fa-brands fa-linkedin"></i>
                </a><p>LinkedIn</p>
              </div>
            </div>
          </div>

          <div className="footerRight">
            <h1 style={{ textAlign: "center" }}>Our Location</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.8388167282383!2d73.2921320746712!3d28.059945709853288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6adbe0a7c29%3A0xc45e43813e5ac1e0!2sEngineering%20College%20Bikaner!5e0!3m2!1sen!2sin!4v1684611203298!5m2!1sen!2sin"
              className="locMap"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
