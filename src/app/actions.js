'use server'

import {getImg} from "../api/api";
import {revalidatePath} from "next/cache"
import {z} from 'zod'

const validate = z.object({
    title: z.string().min(1, '请输入内容').max(100, '字数最多 20'),
    desc: z.string().min(1, '请输入内容').max(100, '字数最多 100')
})

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function mintNft(prevState, formData) {
    console.log('mintNft', formData)
    const title = formData.get('title')
    const desc = formData.get('desc')

    const data = {
        title,
        desc
    }

    const validated = validate.safeParse(data)

    if (!validated.success) {
        return {
            errors: validated.error.issues
        }
    }

    await sleep(1000)
    const objectURL = await getImg(desc);
    if (objectURL.success) {
        revalidatePath('/', 'layout')
        return {
            message: objectURL
        }
    } else {
        return {
            error: '生成失败，网络错误!'
        }
    }

}
