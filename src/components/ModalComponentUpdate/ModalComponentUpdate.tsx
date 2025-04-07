
'use client'
import { CloudArrowUp } from 'phosphor-react'
import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'
import { endpoints } from '../../utils/endpoints/endpoints';
import axios from 'axios';
import { useState } from 'react';

interface IModalComponentUpdate {
  companion_id: string;
}

export const ModalComponentUpdate = ({ companion_id }: IModalComponentUpdate) => {

  const [data, setData] = useState({
    name: '',
    description: '',
  });
  const [image, setImage] = useState([]);

  const backendUpdateModelMetadata = async () => {
    try {
      const payload = new FormData();
      payload.append('image', image[0]);
      payload.append('companion_id', companion_id);
      payload.append('name', data.name);
      payload.append('description', data.description);
      const res = await axios.post(endpoints.companionUpdate, payload);
      if (res.status == 200) {
        alert('Model info update');
      }
    } catch (error) {
      console.error(error);
      alert('erorr on update model');
    }
  }

  return (
    <Modal>
      <ModalAction asChild>
        <Button>Open Modal</Button>
      </ModalAction>
      <ModalContent>
        <ModalHeader className="mb-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
            <CloudArrowUp size={28} />
          </div>
          <div className="space-y-1">
            <ModalTitle>New info</ModalTitle>
            <ModalDescription>
              Add here the new changes
            </ModalDescription>
            <div className='py-2'>
              <Input placeholder='Name'
                onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className='py-2'>
              <Input placeholder='Description'
                onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className='py-2'>
              <label>New image ( optional )</label>
              <input type='file'
                onChange={(e) => setImage(e.target.files)}
              />
            </div>

          </div>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={backendUpdateModelMetadata}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

