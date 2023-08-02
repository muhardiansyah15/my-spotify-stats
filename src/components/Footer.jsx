const Footer = () => {
    // var currentYear = document.write(new Date().getFullYear());
    return (
        <footer>
            <div className="container">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="https://muhardiansyah.netlify.app/" rel="noopener noreferrer">Contact</a></li>
                </ul>
                <br />
                <ul className="social">
                    <li><a href="https://github.com/muhardiansyah15"><i className="fa fa-github" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/muhardiansyah15/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.facebook.com/muhardiansyah97"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.instagram.com/muhardiansyah15"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                </ul>
                <br/>
                <p>&copy; Created with <i className="fa fa-heart"></i> by Muhardiansyah</p>
            </div>
        </footer>
    )
}
export default Footer;