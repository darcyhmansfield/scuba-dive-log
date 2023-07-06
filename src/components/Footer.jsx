import '../styles/footer.css'

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-row">
                <div className="footer-col">
                    <p>© DiveTrack 2023</p>
                    <p>We acknowledge and respect the Aboriginal and Torres Strait Islander people as the custodians of these lands and waters.</p>
                </div>
                <div className="footer-col">
                    <h3 className='contact'>Contact</h3>
                    <p>1 Market St</p>
                    <p>Sydney, NSW</p>
                    <p>2000</p>
                    <p>enquiries@divetrack.com.au</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;