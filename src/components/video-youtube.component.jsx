import React from "react";
import "../assets/sass/youtube.scss";

import ReactPlayer from 'react-player'

const video = (props) => {
    return (
            <ReactPlayer
                url={props.videoData.url}
                className='react-player'
                playing
                width={props.videoData.width}
                height={props.videoData.height}
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