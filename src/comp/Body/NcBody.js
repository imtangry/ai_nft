"use client"
import './style/nc_body.scss';
import {useEffect, useState} from "react";
import {aiImg, mintNFT} from "../../app/actions";
import {useFormState} from "react-dom";
import SaveButton from "./SaveButton";
import CreateButton from "./CreateButton";
import {useAccountEffect} from "wagmi";
import ContractStatus from "./ContractStatus";
import WalletStatus from "./WalletStatus";


const initialCreateState = {
    msg: '',
    error: '',
    data: {
        metaUrl: "https://ipfs.io/ipfs/bafyreieecuelxvulbk2pwhinaixjecmdqqj6p7xl354oiqgxgohrsn5aqa/metadata.json",
        success: true,
        url: "https://cdn2.thecatapi.com/images/b2b.jpg"
    }
}

export default function NcBody() {
    console.log('BODY 渲染了一次');
    const [title, setTitle] = useState('资产标题');
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [desc, setDesc] = useState('资产描述');
    const [url, setUrl] = useState('https://ipfs.io/ipfs/bafyreieecuelxvulbk2pwhinaixjecmdqqj6p7xl354oiqgxgohrsn5aqa/metadata.json')
    const [createState, createFormAction] = useFormState(aiImg, initialCreateState)

    useEffect(() => {
        if (createState.data) setUrl(`${createState.data.metaUrl}`);
    }, [createState])

    useAccountEffect({
        onConnect(data) {
            console.log('useAccountEffect',data)
            setAccount(data)
            setChainId(data.chainId)
        },
        onDisconnect() {
            console.log('Disconnected!')
            setAccount(null)
        },
    })

    return (
        <main className="nc_body">
            <div className="ncb_left">
                <form autoComplete='off'>
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
                    <CreateButton formAction={createFormAction}/>
                    <SaveButton nftUrl={url} action={mintNFT} address={account?.address} chain={account?.chain}/>
                    <p
                        className={['status', createState.error ? 'operate_error' : '', createState.msg ? 'success' : ''].join(' ')}
                    >{createState?.error || createState?.error}
                    </p>
                </form>
                <hr/>

                <div className='c_info'>
                    <p>当前链：{account && account.chain.name}</p>
                    <p>当前链ID：{chainId}</p>
                    <p>当前账户：{account && account.address}</p>
                    {
                        account && <WalletStatus account={account.address}/>
                    }
                    {
                        (account && chainId === 31337) && <ContractStatus account={account.address}/>
                    }
                </div>
            </div>
            <div className="ncb_right">
                <img src={createState.data ? createState.data.url : ''} alt=""/>
                <p>
                    {
                        createState.data &&
                        <a href={createState.data.metaUrl} target="_blank" rel="noreferrer">Metadata</a>
                    }
                </p>
            </div>
        </main>
    )
}
