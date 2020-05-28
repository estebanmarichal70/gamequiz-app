import React from "react";

const ViewError = () => {
    return (
        <div className="d-flex center-all flex-column h-100">
            <div>
                <span className="titulo-inicio">
                    404
                </span>
            </div>
            <div className="titulo-inicio">
                La pagina solicitada no existe.
            </div>
        </div>
    )
}

export default ViewError;