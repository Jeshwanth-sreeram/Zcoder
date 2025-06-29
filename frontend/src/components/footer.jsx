import '../styles/footer.css'



const Footer = () => {

   let newdate= new Date();

  return (
    <div className="footer">
      {newdate.getFullYear()} 
      <br></br>
      <div className="followme">


      Follow me on
    
      <div className="follow-links">

        <a href="" target="_blank" title="LinkedIn" className="footer-icon">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="22" className="footer-icon"></img>
        </a>
        <a href="https://github.com" target="_blank" title="GitHub" className="footer-icon">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" alt="GitHub" width="22" className="footer-icon"></img>
        </a>
        <a href="https://www.instagram.com/" target="_blank" title="Instagram" className="footer-icon">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width="22" className="footer-icon"></img>
        </a>
      </div>
      </div>
    </div>
  )
}

export default Footer;
