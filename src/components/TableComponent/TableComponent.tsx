
'use client'
import { useEffect, useState } from 'react';
import { DotsThreeOutlineVertical, MagnifyingGlass, Plus } from 'phosphor-react'
import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
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
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">My avatars</h2>
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
                <Avatar>
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
            <TableCell>
              <Dropdown>
                <DropdownAction asChild>
                  <button>
                    <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white" />
                  </button>
                </DropdownAction>
                <DropdownContent align="end" className="w-[200px] border border-metal-100 p-3 dark:border-metal-800">
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Move</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
