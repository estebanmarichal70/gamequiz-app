import React from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';

import Spanish from "@uppy/locales/lib/es_ES";

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import XHRUpload from "@uppy/xhr-upload";

import {API_URL} from "../../constants/constants";
import {connect} from "react-redux";

class DragAndDropFileUploader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            hasFiles: false
        }

        this.uppy = Uppy({
            id: 'uppy1',
            autoProceed: false,
            debug: true,
            locale: Spanish,
            restrictions: {
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*']
            },
        })

        this.uppy.on('file-added', (file) => {
            this.setState({hasFiles: true})
        });
    }

    componentWillUnmount() {
        this.uppy.close();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tipoId != null) {

            if (!this.state.hasFiles) {
                return this.props.history.push("/juego/configurar")
            }

            this.uppy.use(XHRUpload, {
                endpoint: API_URL + `/upload_image?tipo=${this.props.tipo}&id=${this.props.tipoId}`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${this.props.token}`
                }
            })

            await this.uppy.upload();

            this.uppy.removePlugin(XHRUpload);

            if (this.props.tipo == "JUEGO") {
                this.props.history.push("/juego/configurar")
            }
        }
    }

    render() {
        return (
            <div>
                <Dashboard
                    uppy={this.uppy}
                    target=".card-upload-image"
                    trigger='#dashboard'
                    theme="dark"
                    hideUploadButton={true}
                />
            </div>
        )
    }
}

const mapStateToProps = ({authUser}) => {
    const {token} = authUser;
    return {token};
};

export default connect(mapStateToProps)(DragAndDropFileUploader);
