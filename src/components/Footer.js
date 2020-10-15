import React from 'react';

const Footer = () => {
  return ( 
    <footer>
      <div class="wrapper">
        <p><a href="https://dribbble.com/shots/8559713-Investment-Portfolio-Dashboard" rel="noopener" target='_blank'>Design</a> inspired by <a href="https://dribbble.com/incom" rel="noopener" target='_blank'>Tim</a></p>
        <p>Created by <a href="https://alexcalia.com" rel="noopener" target='_blank'>Alex Calia</a></p>
        <ul class="socials">
          <li><a href="https://www.linkedin.com/in/alexander-calia-33190337/" alt="LinkedIn link" rel="noopener" target='_blank'><i class="fab fa-linkedin"></i></a></li>
          <li><a href="https://github.com/alexcalia" alt="Github link" rel="noopener" target='_blank'><i class="fab fa-github"></i></a></li>
          <li><a href="https://twitter.com/alexandercalia" alt="Twitter link" rel="noopener" target='_blank'><i class="fab fa-twitter"></i></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;