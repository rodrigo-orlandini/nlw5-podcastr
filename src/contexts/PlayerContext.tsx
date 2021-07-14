import { createContext, useState, ReactNode, useContext } from "react";

type EpisodeProps = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextProps = {
    episodesList: Array<EpisodeProps>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    play: (episode: EpisodeProps) => void;
    playList: (episodes: EpisodeProps[], episodeIndex: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextProps);

export const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
    const [episodesList, setEpisodesList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const play = (episode: EpisodeProps) => {
        setEpisodesList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(!isPlaying);
    }
    
    const playList = (episodes: EpisodeProps[], episodeIndex: number) => {
        setEpisodesList(episodes);
        setCurrentEpisodeIndex(episodeIndex);
        setIsPlaying(true);
    }
    
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodesList.length;

    const playNext = () => {
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodesList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    const playPrevious = () => {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    }

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    }

    const setPlayingState = (state: boolean) => {
        setIsPlaying(state);
    }

    const clearPlayerState = () => {
        setEpisodesList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider value={{ 
            episodesList,
            currentEpisodeIndex,
            isPlaying,
            isLooping,
            isShuffling,
            hasNext,
            hasPrevious,
            play,
            playList,
            playNext,
            playPrevious,
            togglePlay,
            toggleLoop,
            toggleShuffle,
            setPlayingState,
            clearPlayerState
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}