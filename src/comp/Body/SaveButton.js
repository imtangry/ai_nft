import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'
import {parseEther} from 'viem'
// import {mintNFT} from "../../app/actions";
// import {writeContract} from "@wagmi/core";

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

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function SaveButton({nftUrl = null, chain = null, address}) {
    const {data: hash, error, isPending, writeContract} = useWriteContract();

    const {isLoading: isConfirming, isSuccess: isConfirmed} =
        useWaitForTransactionReceipt({
            hash,
        });

    return (
        <>
            <button
                disabled={!nftUrl || isPending}
                // className={isPending ? 'pending' : ''}
                onClick={(e) => {
                    e.preventDefault();
                    // const res = await mintNFT({nftUrl, chain, address})
                    // if (res.error) {
                    //     setError(res.error)
                    // }
                    writeContract({
                        abi,
                        address: contractAddress,
                        functionName: 'mintNft',
                        args: [
                            nftUrl,
                        ],
                        value: parseEther('0.01')
                    })
                    return false;
                }}
            >{isPending ? '保存中' : '保存NFT'}
            </button>

            {isConfirming && <p>Waiting for confirmation...</p>}
            {isConfirmed && <p>Transaction confirmed.</p>}

            <p
                className={['status', error ? 'operate_error' : ''].join(' ')}
            >{error && error.message}
            </p>
        </>

    )
}
