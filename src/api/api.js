import {NFTStorage} from 'nft.storage'

const client = new NFTStorage({token: process.env.NC_NFT_STORAGE_KEY})

// hugging_face
export async function getImg({desc,title}) {
    try {
        console.log('getImg------------------', desc)
        const urlRes = await fetch(
            'https://api.thecatapi.com/v1/images/search',
            {
                method: "GET",
            }
        )
        const json = await urlRes.json();
        const imgUrl = json[0].url;

        const imgRes = await fetch(
            imgUrl,
            {
                method: "GET",
            }
        )

        // const imgType = imgRes.headers.get('Content-Type')
        // const imgArrayBuffer = await imgRes.arrayBuffer();

        // curl https://api-inference.huggingface.co/models/gpt2 -X POST -d '"Can you please let us know more details about your "' -H "Authorization: Bearer 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"
        // const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1`
        // const imageFile = new File(imgArrayBuffer, json.id, {type: imgType})
        const imageFile = await imgRes.blob()
        const metadata = await client.store({
            name: title,
            description: desc,
            image: imageFile
        })
        console.log(metadata)
        return {
            success: true,
            metaUrl: `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`,
            url: imgUrl
        }
    } catch (e) {
        console.log(e)
        return {
            success: false,
            data: e
        }
    }
}

// nft_storage
export async function saveImg(data) {
    try {
        const imageFile = new File([data.blob], data.filename, {type: 'image/png'})
        const metadata = await client.store({
            name: data.title,
            description: data.desc,
            image: imageFile
        })
        return {
            success: true,
            data: metadata
        }
    } catch (e) {
        return {
            success: false,
            data: e
        }
    }
}
