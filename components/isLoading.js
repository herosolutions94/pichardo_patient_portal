import React from 'react'

export default function IsLoading({isProcessing}) {
  return (
    isProcessing ?
    <div className="loader_icon_spin">
      <span></span>
    </div>
    :
    ""
  )
}