import React from 'react'
import "./styles/Gallery.css"
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'

const Gallery = () => {
    const {getAnimePictures, pictures} = useGlobalContext();

    const {id} = useParams();

    const [index, setIndex] = React.useState(0);

    const handleImageClick = (i) => {
        setIndex(i);
    }

    React.useEffect(() => {
        getAnimePictures(id)
    }, [id]);

    return (
        <div className='gallery'>
            <div className="back">
                <Link to="/">
                    Back to home
                </Link>
            </div>
            <div className="big-image">
                <img src={pictures[index]?.jpg.image_url} alt="" />
            </div>
            <div className="small-images">
                {pictures?.map((picture, i) => {
                    return(
                        <div className="image-con" onClick={() => {
                            handleImageClick(i);
                        }} key={i}>
                            <img 
                                src={picture.jpg.image_url}
                                style={{
                                    border: i === index ? "3px solid #EB5757" : "3px solid #e5e7eb",
                                    filter: i === index ? "brighness(1.2)" : "brighness(1)",
                                    transition: "all .3s ease-in-out"
                                }}
                                alt="" 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Gallery
