import React from 'react';
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import Dashboard from '@uppy/react/lib/Dashboard'

import Spanish from "@uppy/locales/lib/es_ES";

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';


export default class DragAndDropFileUploader extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        this.uppy = Uppy({
            id: 'uppy1',
            autoProceed: true,
            debug: true,
            locale: Spanish,
            maxNumberOfFiles: 1,
        })
            .use(Tus);
    }

    componentWillUnmount() {
        this.uppy.close();
    }

    render() {
        return (
            <div>
                <Dashboard
                    uppy={this.uppy}
                    target=".card-upload-image"
                    trigger='#dashboard'
                    theme="dark"
                />
            </div>
        )
    }
}