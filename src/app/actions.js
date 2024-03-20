'use server'

import {redirect} from 'next/navigation'
import {addNote, updateNote, delNote} from '../../api/api'
import {revalidatePath} from "next/cache"
import {z} from 'zod'

const validate = z.object({
    title: z.string(),
    content: z.string().min(1, '请输入内容').max(100, '字数最多 100')
})

const sleep = ms => new Promise(r => setTimeout(r, ms));


export async function saveNote(prevState, formData) {
    const noteId = formData.get('noteId')

    let data = {
        title: formData.get('title'),
        content: formData.get('body'),
        updateTime: new Date()
    }


    const validated = validate.safeParse(data)
    if (!validated.success) {
        return {
            errors: validated.error.issues
        }
    }

    data = JSON.stringify(data)

    await sleep(1000)

    if (noteId) {
        updateNote(noteId, data)
        revalidatePath('/', 'layout')
        // redirect(`/note/${noteId}`)
    } else {
        addNote(data)
        revalidatePath('/', 'layout')
        // redirect(`/note/${res}`)
    }

    return {
        message: '保存成功'
    }

}

export async function deleteNote(prevState, formData) {
    const noteId = formData.get('noteId')
    delNote(noteId)
    revalidatePath('/', 'layout')
    redirect('/')
}
