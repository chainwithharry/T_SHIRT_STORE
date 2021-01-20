import React from "react";
import { API } from "../../backend";


const ImageHelper = ({product})=>{

    const imageurl = product ? `${API}/product/photo/${ product._id}`: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZXJyb3J8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

    return(
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>

    )

}

export default ImageHelper;