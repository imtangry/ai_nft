// hugging_face
export async function getImg(data) {
    try {
        const res = await fetch(
            'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NC_HUGGING_FACE_KEY}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: data,
                    options: {wait_for_model: true}
                }),
            }
        )
        console.log(res)
        const blob = await res.blob();
        const objectURL = URL.createObjectURL(blob);
        console.log(objectURL)
        return {
            success: true,
            data: objectURL
        }
    } catch (e) {
        return {
            success: false,
            data: e
        }
    }

    return res
}

// nft_storage
