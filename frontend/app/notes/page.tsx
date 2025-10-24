'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axiosInstance from '../axiosinstance';
function NotesList() {
    const router = useRouter()
    const [cols, setCols] = useState<any>([])
    const [rows, setRows] = useState<any>([])

    const handleNew = () => {
        router.push('/notes/new')
    }

    const getAll = async () => {
        const rowData = await axiosInstance.get('/notes')
        const data = rowData?.data?.data
        setCols(Object.keys(data[0]))
        setRows([...data])
    }
    const handleEdit = (id: any) => {
        router.push(`/notes/${id}`)
    }
    const handleDelete = async (id: any) => {
        try {
            const res = await axiosInstance.delete(`/notes/${id}`)
            if(res){
                getAll()
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        // setCols(Object.keys(rows[0]))
        getAll()
    }, [])


    return (
        <div className="w-full h-screen bg-[white] flex justify-center items-center">
            <div className="w-[700px] h-[400px] bg-[whitesmoke] text-black">
                <div className='flex justify-between items-center'>
                    <div> <h2 className='text-3xl'>Notes</h2></div>
                    <div>
                        <button onClick={handleNew} className='bg-[black] text-white p-4 cursor-pointer hover:bg-[grey] transition-all duration-300'>Add New</button>
                    </div>
                </div>
                <table className='text-black w-full h-600px '>
                    <thead className=''>
                        <tr className=' border-black '>
                            {
                                cols?.map((x: string, i: number) => {
                                    return <td className='font-bold text-[20px]' key={i}>{x}</td>

                                })
                            }

                            <td className='font-bold text-[20px]'>Actions</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            rows.map((x: any, i: number) => (
                                <tr key={i} className='m-2'>
                                    {cols.map((y: string, ind: number) => (
                                        <td className='py-1' key={ind}>{x[y]}</td>
                                    ))}
                                    <td className='flex gap-2'>
                                        <span><MdEdit className='hover:text-[grey] cursor-pointer text-xl' onClick={() => handleEdit(x._id)} /></span>
                                        <span><MdDelete className='hover:text-[grey] cursor-pointer text-xl' onClick={() => handleDelete(x._id)} /></span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default NotesList