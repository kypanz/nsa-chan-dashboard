
'use client'
import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AvatarFallback
} from 'keep-react'
import { endpoints } from '../../utils/endpoints/endpoints'
import axios from 'axios';
import { ModalComponentUpdate } from '../ModalComponentUpdate/ModalComponentUpdate';
import { ModalComponentDelete } from '../ModalComponentDelete/ModalComponentDelete';
import { ModalComponentLoadModel } from '../ModalComponentLoadModel/ModalComponentLoadModel';

export const TableComponent = () => {

  const [listCompanion, setListCompanion] = useState([]);

  const backendRequest = async () => {
    try {
      const res = await axios.get(endpoints.companionList);
      if (res.status == 200) {
        setListCompanion(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    backendRequest();
  }, []);

  return (
    <Table>
      <TableCaption>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Button onClick={backendRequest}> Update list </Button>
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">My Models</h2>
            <Badge color="secondary">
              {(listCompanion) ? listCompanion.length : 0} Model/s
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            {/* TODO : Custom search */}
          </div>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>
            <div className="w-[200px]">Name</div>
          </TableHead>
          <TableHead>Description</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listCompanion && listCompanion.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className='w-20 h-20'>
                  <AvatarImage src={item.image} />
                  <AvatarFallback className='bg-blue-200'> I </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body-4 font-medium">{item.name}</p>
                  <p className="text-body-5 font-normal">{item.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className='flex justify-end'>
              <div>
                <ModalComponentUpdate companion_id={item._id} />
              </div>
              <div className='pl-2'>
                <ModalComponentDelete item={item} />
              </div>
              <div className='pl-2'>
                <ModalComponentLoadModel item={item} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
