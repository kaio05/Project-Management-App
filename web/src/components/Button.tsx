import { Link } from 'react-router-dom';

interface Button {
    redirect: string,
    title: string
}

function Button(props : Button) {
    return <Link to={props.redirect}><button>{props.title}</button></Link>
}

export default Button;