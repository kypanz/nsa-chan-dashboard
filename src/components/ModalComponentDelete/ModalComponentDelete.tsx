
'use client'
import { CloudArrowUp } from 'phosphor-react'
import {
  Button,
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

interface IModalComponentDelete {
  item: {
    _id: string;
  }
}

export const ModalComponentDelete = ({ item }: IModalComponentDelete) => {

  const backendDeleteModel = async () => {
    try {
      if (!item._id) throw new Error('companion_id not defined');
      const payload = {
        companion_id: item._id
      }
      const res = await axios.post(endpoints.companionDelete, payload);
      if (res.status == 200) {
        alert('Model deleted');
      }
    } catch (error) {
      console.error(error);
      alert('Error on delete model');
    }
  }

  return (
    <Modal>
      <ModalAction asChild>
        <Button
          className='bg-red-600 hover:bg-red-500'>
          Delete
        </Button>
      </ModalAction>
      <ModalContent>
        <ModalHeader className="mb-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
            <CloudArrowUp size={28} />
          </div>
          <div className="space-y-1">
            <ModalTitle>¿ Are you sure ?</ModalTitle>
            <ModalDescription>
              You gonna permantly delete the model.
            </ModalDescription>
          </div>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={backendDeleteModel}
            className='bg-red-500 hover:bg-red-600'>Yes Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
