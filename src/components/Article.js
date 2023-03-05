import {format} from 'date-fns';
import { Link } from 'react-router-dom';

function Article(props) {
    return (
        <Link to={`/article/${props._id}`} className="links">
            <div className="article">
                <div className="image">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/`+props.cover} alt="" />
                </div>
                <div className="texts">
                    <h2>{props.title}</h2>
                    <p className="info">
                        <Link to={`/viewprofile/${props.author?._id ?? ''}`} className="author links">@{props.author?.username ?? 'Unknown'}</Link>
                        <time>{format(new Date(props.createdAt),'MMM d, yyyy | HH:mm')}</time>
                    </p>
                    <p className="summary">{props.summary}</p>
                </div>
            </div>
        </Link>
     );
}

export default Article;