import { useState,useEffect,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from './Editor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../UserContext";
import Loading from "./Loading";

function NewArticle() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState(false);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        if (message){
            if (type)
            toast.success(message);
            else{
            toast.error(message);
            }
            setMessage('');
        }
    }, [message]);

    async function createNewArticle(e) {
        e.preventDefault();
        if (!files || files.length === 0) {
          setMessage("Please choose cover image");
          setType(false);
          return;
        }
        if (files && !(files[0].type.startsWith('image/'))) {
            setMessage("Invalid image file");
            setType(false);
            return;
        }
        if (!content || content.length === 0) {
            setMessage("Please write some content");
            setType(false);
            return;
        }
        setIsLoading(true);
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
    
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/article`,{
            method:'POST',
            body:data,
            credentials:'include',
        });
        if (response.ok){
            setIsLoading(false);
            setRedirect(true);
            setMessage("Article created Successfully");
            setType(true);
        }
        else{
            setIsLoading(false);
            setMessage("Article creation failed");
            setType(false);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!userInfo){
        return <Navigate to={'/'}/>
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }

    return ( 
        <>
            <form onSubmit={createNewArticle} className="newarticle-form" encType='multipart/form-data'>
                <input type="title" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/>
                <input type="summary" placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} required/>
                <input type="file" accept='image/*' onChange={e=>setFiles(e.target.files)}/>
                <Editor value={content} onChange={setContent}/>
                <button className='publish-btn'>Publish Article</button>
            </form>
        </>
     );
}

export default NewArticle;