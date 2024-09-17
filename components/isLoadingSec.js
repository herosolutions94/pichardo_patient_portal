import React from 'react'

export default function IsLoadingSec({isProcessing}) {
  return (
    isProcessing ?
    <div className="is_map_load mini_loader">
      <div class="loadingio-spinner-eclipse-2by998twmg8">
          <div class="map-loading-dv">
              <div></div>
          </div>
      </div>
    </div>
    :
    ""
  )
}