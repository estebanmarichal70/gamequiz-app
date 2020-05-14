import React,{Component}  from 'react';
import '../../assets/sass/App.scss';

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div>
                        <span>Holas</span>
                    </div>
                    <div>
                    <span>Holas</span>
                    </div>
                </div>
                <div className="col-5">
                <span>Holas</span>
                </div>
            </div>
        );
    }
}

export default Perfil;