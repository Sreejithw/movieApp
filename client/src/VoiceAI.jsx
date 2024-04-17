import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectGenreOrCategory, searchMovie } from './features/currentGenreOrCategory';
import { fetchToken } from './components/utils';

const VoiceAI = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: '90aaa27b9f728180ac3e3c97253c83ea2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, query, genres, genreOrCategory }) => {
                    if(command === 'chooseGenre'){
                        const foundGenre = genres.find((singleGenre) => singleGenre.name.toLowerCase() === genreOrCategory.toLowerCase());

                        if(foundGenre){
                            navigate('/');
                            dispatch(selectGenreOrCategory(foundGenre.id));
                        } else {
                            const categoryType = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                            navigate('/');
                            dispatch(selectGenreOrCategory(categoryType));
                        }
                    }
                    else if(command === 'login'){
                        fetchToken();
                    }
                    else if(command === 'logout'){
                        localStorage.clear();
                        navigate('/');
                    }
                    else if(command === 'search'){
                        dispatch(searchMovie(query));
                    }
                }
            });
      }, []);
}

export default VoiceAI