import React from 'react'
import Popular from './Popular';
import { useGlobalContext } from '../context/global';
import './styles/Home.css'
import Upcoming from './Upcoming';
import Airing from './Airing';

const Home = () => {

    const {
        handleSubmit, 
        search, 
        searchAnime, 
        handleChange,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
    } = useGlobalContext();

    const [rendered, setRendered] = React.useState('popular');

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

    return (
        <div className='home'>
            <header>
                <div className="logo">
                    <h1>
                        {rendered === 'popular' ? 'Popular Anime' : 
                        rendered === 'airing' ? 'Aring Anime' : 'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={() => {
                            setRendered('popular');
                            getPopularAnime();
                        }}>
                            Popular
                        </button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder='Search Anime' value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing')
                            getAiringAnime();
                        }}>
                            Airing
                        </button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming')
                            getUpcomingAnime();
                        }}>
                            Upcoming
                        </button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </div>
    )
}

export default Home
