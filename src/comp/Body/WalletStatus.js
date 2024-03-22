import {useBalance} from 'wagmi'

export default function WalletStatus({account}) {
    const {data} = useBalance({
        address: account,
    })
    console.log('WalletStatus 渲染了一次', data)
    return (
        <>
            <hr/>
            <p>当前账户余额：{data?.formatted} {data?.symbol}</p>
        </>
    )
}
