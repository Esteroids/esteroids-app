import {Link} from "react-router-dom";

function Footer(){
    return (
        <div className="container">
            <div className="row">
                <div className="footer d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row footer-items">
                    
                    <div className="footer-items d-none d-lg-block">
                      <a href="https://twitter.com/e_steroids" target="_blank" rel="noreferrer">
                        <img src="./images/twitter.svg" alt="Twitter icon"/>&nbsp;&nbsp; TWITTER &nbsp;&nbsp; <img src="./images/blue_arrow_left.svg" alt="left blue arrow"/>
                      </a>
                    </div>

                    <div className="footer-items d-lg-none d-xl-non d-xxl-none">
                      <img src="./images/twitter.svg" alt="Twitter icon"/>
                    </div>

                    <div className="footer-items d-none d-lg-block">
                      <a href="https://discord.gg/9c2EWzjFzY" target="_blank" rel="noreferrer">
                        <img src="./images/discord.svg" alt="Discord icon"/>&nbsp;&nbsp; DISCORD &nbsp;&nbsp; <img src="./images/blue_arrow_left.svg" alt="left blue arrow"/>
                      </a>
                    </div>                   

                    <div className="footer-items d-lg-none d-xl-non d-xxl-none">
                      <img src="./images/discord.svg" alt="Discord icon"/>
                    </div>

                    <div className="footer-items d-none d-lg-block">
                      <Link to="/about">
                        <img src="./images/info.svg" alt="info emoji"/>&nbsp;&nbsp; ABOUT &nbsp;&nbsp;<img src="./images/blue_arrow_left.svg" alt="left blue arrow"/>
                      </Link>
                    </div>

                    <div className="footer-items d-lg-none d-xl-non d-xxl-none">
                      <Link to="/about">
                        <img src="./images/info.svg" alt="info emoji"/>
                      </Link>
                    </div>

                  </div>
                  <div className="footer-items d-none d-lg-block">
                    <Link to="/">
                      <img src="./images/logo.svg" alt="Esteroids logo"/>
                      </Link>
                  </div>
                  <div className="footer-items d-none d-lg-block">
                    <Link to="/privacy">
                      PRIVACY POLICY&nbsp;&nbsp;<img src="./images/blue_arrow_left.svg" alt="left blue arrow"/>
                    </Link>
                  </div>
                  <div className="footer-items m-0 d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none">
                    <Link to="/privacy" className="m-0">
                      PRIVACY POLICY&nbsp;&nbsp;<img src="./images/blue_arrow_left.svg" alt="left blue arrow"/>
                    </Link>
                  </div>
                </div>
              </div>
         </div>
    );
}

export default Footer;