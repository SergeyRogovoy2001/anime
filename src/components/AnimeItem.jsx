import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import './styles/AnimeItem.css'

const AnimeItem = () => {
    const {id} = useParams();

    const [anime, setAnime] = React.useState({});
    const [characters, setCharacters] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    const {
        title, 
        synopsis, 
        trailer, 
        duration, 
        aired, 
        season,
        images, 
        rank, 
        score, 
        scored_by,
        popularity,
        status,
        rating,
        source, 
    } = anime

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    }

    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log(data.data);
    }

    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [])

    return (
        <AnimeItemStyled>
            <div className="back">
                <Link to="/">
                    Back to home
                </Link>
            </div>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored by:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
                    <button onClick={() => {setShowMore(!showMore)}}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>
                <div className="video">
                    <h3 className='title'>Trailer</h3>
                    <div className="trailer-con">
                        {trailer?.embed_url &&
                            <iframe
                                src={trailer?.embed_url}
                                title="InlineFrame Example"
                                width={800}
                                height={450}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                frameBorder="0"
                                allowFullScreen
                            >
                            </iframe>
                        }
                    </div>
                </div>
                <h3 className='title'>Charactersr</h3>
                <div className="characters">
                    {characters?.map((character, index) => {
                        const {role} = character;
                        const {images, name, mal_id} = character.character;
                        return (
                            <Link to={`/character/${mal_id}`} key={index}>
                                <div className="character">
                                        <img src={images?.jpg.image_url} alt="" />
                                        <h4>{name}</h4>
                                        <p>{role}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </AnimeItemStyled>
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 1rem;
    background-color: #EDEDED;
    h1{
        margin-top: 30px;
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient(to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .description{
        margin-top: 2rem;
        line-height: 1.7rem;
        color: #6c7983;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: 600;
            color: #27AE60;
        }
    }
    .trailer-con{
        display: flex;
        justify-content: center;
        align-items: center;
    }    
    .details{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        img{
            border-radius: 7px;
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between; 
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-clild{
                font-weight: 800;
                color: #454e56;
            }
        }
    }
`;

export default AnimeItem
