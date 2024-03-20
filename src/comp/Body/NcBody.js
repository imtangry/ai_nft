"use client"
import './style/nc_body.scss';
import {useState} from "react";
import {mintNft} from "../../app/actions";
import {useFormState} from "react-dom";
import SaveButton from "./SaveButton";

const initialState = {
    msg: '',
    error: ''
}

export default function NcBody() {
    const [title, setTitle] = useState('资产标题');
    const [desc, setDesc] = useState('资产描述');
    const [saveState, saveFormAction] = useFormState(mintNft, initialState)

    return (
        <main className="nc_body">
            <div className="ncb_left">
                <form autoComplete='off'>
                    <label htmlFor="nft_title_input" className='offscreen'>资产标题</label>
                    <input
                        id='text-nft_title_input-input'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <label htmlFor="nft_desc_textarea" className='offscreen'>资产描述</label>
                    <textarea
                        value={desc}
                        name="desc"
                        cols={5}
                        id="nft_desc_textarea"
                        onChange={(e) => {
                            setDesc(e.target.value)
                        }}/>
                    <SaveButton formAction={saveFormAction}/>
                    <p
                        className={['status', saveState.error ? 'operate_error' : '', saveState.msg ? 'success' : ''].join(' ')}
                    >{saveState?.error || saveState?.error}
                    </p>
                </form>
            </div>
            <div className="ncb_right">

            </div>
        </main>
    )
}
