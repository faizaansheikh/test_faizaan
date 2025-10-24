'use client'
import axiosInstance from '@/app/axiosinstance'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function NotesForm() {
    const router = useRouter()
    const params = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const handleContentChange = (e: any) => {
        setContent(e.target.value)
    }
    const handleTitleChange = (e: any) => {
        setTitle(e.target.value)
    }
    const handleSave = async () => {
        const data = {
            title: title,
            content: content
        }
        try {

            const res = await axiosInstance.post('/notes', { ...data })
            if (res) {
                setContent('')
                setTitle('')
                router.back()
            }

        } catch (err) {
            console.log('err', err);

        }


    }

    const getSingleRec = async () => {
        try {

            const data = await axiosInstance.get(`/notes/${params.id}`)
            console.log('single', data);


        } catch (err) {
            console.log('err', err);

        }
    }
    useEffect(() => {
        if (params.id !== 'new') {
         
            
            getSingleRec()
        }


    }, [params.id])


    return (
        <div className="w-full h-screen bg-[whitesmoke] flex justify-center items-center">
            <div className="w-[700px] h-[auto] bg-[#b4b1b1] p-4">
                <h2 className="text-center text-2xl">Notes App</h2>
                <label htmlFor="">Title</label>
                <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" className="border-1 border-black text-black rounded-md p-2 w-full mb-2" />

                <label htmlFor="" >Content</label>
                <textarea value={content} onChange={handleContentChange} name="" id="" cols={6} rows={8} className="border-1 border-black mt-2 text-black rounded-md p-2 w-full"></textarea>
                {/* <input type="textarea" rows={6} placeholder="Enter title" className="border-black border-1 rounded-md p-2 w-full"/> */}


                <div className='flex justify-end'>
                    <button onClick={handleSave} className='bg-[black] text-white p-4 cursor-pointer hover:bg-[grey] transition-all duration-300'>Save</button>
                </div>
            </div>
        </div>
    )
}

export default NotesForm