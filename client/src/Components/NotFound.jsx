import {Link} from 'react-router-dom'

export default function NotFound()
{
    return(
        <section className="container nf">
            <h1>404 | Page Not Found</h1>
            <p><Link to='/register'>Register</Link> Now to Use</p>
        </section>
    )
}