
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
import JSZip from 'jszip';

interface IModalComponentLoadModel {
  item: {
    _id: string;
  }
}

export const ModalComponentLoadModel = ({ item }: IModalComponentLoadModel) => {

  const backendRequestLoadModel = async () => {
    try {

      console.log('getting the model ...');
      const payload = {
        companion_id: item._id
      }
      const response = await axios.get(endpoints.companionModel, {
        responseType: 'arraybuffer',
        params: payload
      });

      const zip = await JSZip.loadAsync(response.data);

      // const model_files: any[] = [];

      for (const relativePath of Object.keys(zip.files)) {
        const file = zip.files[relativePath];
        const content = await file.async("blob");
        // console.log(`File ${relativePath} in memory :`, content);
        // model_files.push({ name: relativePath, content: content });
        const test = URL.createObjectURL(content);
        console.log('Test => ', test);
      }

      // window.WaifuModels = model_files;
      console.log('done.');

    } catch (error) {
      console.error('Error cargando el modelo Live2D:', error);
    }
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button className='bg-green-600 hover:bg-green-500'> Load Model </Button>
      </ModalAction>
      <ModalContent>
        <ModalHeader className="mb-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 text-metal-900 dark:bg-metal-800 dark:text-white">
            <CloudArrowUp size={28} />
          </div>
          <div className="space-y-1">
            <ModalTitle>¿ Are you sure ?</ModalTitle>
            <ModalDescription>
              You gonna load the new model and remove the current one
            </ModalDescription>
          </div>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={backendRequestLoadModel}
            className='bg-green-600 hover:bg-green-500'>Yes Load the model</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
