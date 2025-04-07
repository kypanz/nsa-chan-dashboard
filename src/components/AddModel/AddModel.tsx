import React from 'react'
import { UploadComponent } from '../UploadComponent/UploadComponent'
import example_code from './example-format-model.json';

export default function AddModel() {
  return (
    <div className="text-left">


      <div className='w-full mx-2 flex'>
        <div>
          <p className='font-bold my-4'> Structure folder reference </p>
          <img
            className='h-[500px]'
            src="/images/examples/example-model-live2d.png" />
        </div>
        <div>
          <p className='my-2 p-2 font-bold rounded'>
            The "ModelName.model3.json"
            file needs to have this format :
          </p>
          <pre
            className='bg-white rounded shadow-md p-2 h-[500px] overflow-scroll'
          > {JSON.stringify(example_code, null, 2)} </pre>
        </div>
      </div>

      <h1 className="text-2xl font-bold my-5"> Add Model </h1>
      <p> Add here your model files </p>

      {/* TODO : Add the format needed */}
      <div className="w-full my-5">
        <UploadComponent />
      </div>
    </div>
  )
}

