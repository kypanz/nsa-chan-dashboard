import React from 'react'
import { UploadComponent } from '../UploadComponent/UploadComponent'

export default function AddModel() {
  return (
    <div className="text-left">
      <h1 className="text-2xl font-bold my-5"> Add Model </h1>
      <p> Add here your model files </p>

      {/* TODO : Add the format needed */}
      <div className="w-full my-5">
        <UploadComponent />
      </div>
    </div>
  )
}

