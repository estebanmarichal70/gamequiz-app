import React from "react";

import ReactPlayer from 'react-player'

const video = (props) => {
    return (
            <ReactPlayer
                url={props.videoData.url}
                className='react-player'
                playing
                onDuration={props.handleDuration}
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