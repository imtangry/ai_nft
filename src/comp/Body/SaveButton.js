import {useFormStatus} from 'react-dom'

export default function SaveButton({formAction}) {
    const {pending} = useFormStatus()
    return (
        <button
            disabled={pending}
            className={pending ? 'pending' : ''}
            type='submit'
            formAction={formAction}
        >{pending ? '生成中...' : '生成NFT'}
        </button>
    )
}
