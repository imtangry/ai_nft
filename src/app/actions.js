'use server'

import {getImg} from "../api/api";
import {revalidatePath} from "next/cache"
import {writeContract, createConfig, http} from '@wagmi/core'
import {z} from 'zod'
import {parseEther} from 'viem'

const validate = z.object({
    title: z.string().min(1, '请输入内容').max(100, '字数最多 20'),
    desc: z.string().min(1, '请输入内容').max(100, '字数最多 100')
})

const abi = [{
    "inputs": [
        {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
        }
    ],
    "name": "mintNft",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}]

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function aiImg(prevState, formData) {
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
    const res = await getImg(data);
    if (res.success) {
        revalidatePath('/', 'layout')
        return {
            msg: "创建成功",
            data: {...res}
        }
    } else {
        return {
            error: '生成失败，网络错误!'
        }
    }

}

export async function mintNFT({nftUrl = '', chain = null, address = ''}) {
    const config = createConfig({
        chains: [chain],
        transports: {
            [chain.id]: http('http://127.0.0.1:8545/'),
        },
    })
    console.log(config)
    try {
        const res = await writeContract(config, {
            abi,
            address,
            functionName: 'mintNft',
            args: [
                nftUrl,
                {value: parseEther('0.001')}
            ],
        })
        console.log('writeContract', res)
        return {
            message: '保存成功'
        }
    }catch (e){
        console.log(e);
        return {
            message: '保存失败'
        }
    }

}
