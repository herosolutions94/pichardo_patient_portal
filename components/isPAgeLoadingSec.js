import React from "react";

export default function IsPAgeLoadingSec({ isProcessing, text }) {
    return <>
        {
            isProcessing ?
            <div className="is_map_load with_text_load">
                <div class="loadingio-spinner-eclipse-2by998twmg8">
                    <div class="map-loading-dv">
                            <div></div>
                        </div>
                    </div>
                    <h4>
                        {text}
                    </h4>
                </div>
                :
                ""
        }
    </>;
}