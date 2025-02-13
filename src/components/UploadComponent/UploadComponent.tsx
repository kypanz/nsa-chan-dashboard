'use client'
import { Info, Trash } from 'phosphor-react'
import { useCallback, useState } from 'react'
import { Button, Input, Upload, UploadBody, UploadFooter, UploadIcon, UploadText } from 'keep-react'
import { endpoints } from '../../utils/endpoints/endpoints'
import axios from 'axios';
import example_code from './example-format-model.json';

export const UploadComponent = () => {
  const [info, setInfo] = useState({
    name: '',
    description: '',
  });
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, []);

  const backendUploadFile = async () => {
    try {
      if (files.length == 0) return alert('Please select a file');
      const payload = new FormData();
      payload.append('file', files[0]);
      payload.append('name', info.name);
      payload.append('description', info.description);
      payload.append('image', image[0]);
      const res = await axios.post(endpoints.companionCreate, payload);
      if (res.status == 200) {
        alert('Uplaoded');
      }
    } catch (error) {
      console.error(error);
      alert('Cant upload the file');
    }
  }


  return (
    <>
      <div className='flex'>
        <div className='w-2/4 gap-y-5'>
          <Input
            className='my-2'
            placeholder="Name"
            type="text"
            onChange={(e) => {
              setInfo((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
          <Input
            className='my-2'
            placeholder="Description"
            type="text"
            onChange={(e) => {
              setInfo((prev) => ({ ...prev, description: e.target.value }))
            }}
          />
          <Input
            className='my-2'
            placeholder="Image"
            type="file"
            onChange={(e) => setImage(e.target.files)}
          />
          <Upload options={{ onDrop }}>
            <UploadBody>
              <UploadIcon>
                <img
                  src="images/icon/folder.svg"
                  alt="folder"
                  height={28}
                  width={28}
                />
              </UploadIcon>
              <UploadText>
                <p className="text-body-3 font-medium text-metal-600 dark:text-white">Drag & Drop or Choose File to Upload</p>
                <p className="text-body-4 font-normal text-metal-400 dark:text-metal-300">
                  .ZIP Format, Max 100 MB.
                </p>
              </UploadText>
            </UploadBody>
            <UploadFooter isFileExists={files.length > 0}>
              <p className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600 dark:text-metal-300">
                <Info size={16} />
                Uploaded Files
              </p>
              <ul className="space-y-1">
                {files?.map((file) => (
                  <li
                    key={file?.name}
                    className="flex items-center justify-between border-l-4 border-l-metal-100 bg-metal-25 px-4 py-2.5 text-left text-body-4 font-normal capitalize text-metal-600 dark:border-l-metal-600 dark:bg-metal-800 dark:text-metal-300 ">
                    {file?.name}
                    <Trash
                      size={16}
                      color="red"
                      onClick={() => setFiles([])} />
                  </li>
                ))}
              </ul>
            </UploadFooter>
          </Upload>

          <Button
            className="my-5"
            onClick={backendUploadFile}>
            Upload model
          </Button>
        </div>
        <div className='w-2/4 mx-2'>
          <p className='my-2 p-2 font-bold rounded'>
            The "ModelName.model3.json"
            file needs to have this format :
          </p>
          <pre
            className='bg-white rounded shadow-md p-2 h-[500px] overflow-scroll'
          > {JSON.stringify(example_code, null, 2)} </pre>
        </div>
      </div>
    </>
  )
}


