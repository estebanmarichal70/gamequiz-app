import React from "react";
import "../assets/sass/youtube.scss";

import ReactPlayer from 'react-player'

const video = (props) => {
    console.log(props)
    return (
            <ReactPlayer
                url={props.videoData.url}

                className='react-player'
                playing
                width='500px'
                height='300px'
                config={{
                    youtube: {
                        playerVars: {
                            start: props.videoData.start,
                            end: props.videoData.end
                        }
                    }
                }}
            />
    );
};
export default video;