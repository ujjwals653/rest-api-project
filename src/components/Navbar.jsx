import { Link } from 'react-router-dom';

const Navbar = () => {

    return(
        <nav>
            <Link to="/"><h5>Countries of the World</h5></Link>
            <Link to="/"><p>About</p></Link>
        </nav>
    )
}

export default Navbar