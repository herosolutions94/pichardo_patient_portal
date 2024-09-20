import React from 'react'

export default function IsLoadingIcon({isProcessing}) {
  return (
    isProcessing ?
    <div className="loader_icon">
      <img src='/images/loading.gif' />
    </div>
    :
    ""
  )
}