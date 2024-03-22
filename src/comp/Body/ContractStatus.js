import {useReadContracts} from "wagmi";

const localContract = {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: [
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ]
}
export default function ContractStatus({account}) {
    console.log('ContractStatus 渲染了一次',)
    const {data} = useReadContracts({
        contracts: [
            {
                ...localContract,
                functionName: 'totalSupply',
            },
            {
                ...localContract,
                functionName: 'balanceOf',
                args: [account]
            },
        ],
    })

    return (
        <>
            <hr/>
            <p>当前合约总供应量：{data ? (data?.[0].result).toString() : 0}</p>
            <p>当前账户NTF数量：{data ? (data?.[1].result).toString() : 0}</p>
        </>
    )
}
