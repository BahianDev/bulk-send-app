"use client";

import { getNfts } from "@/utils";
import { getProgram } from "@/utils/porgram";
import { Wallet } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [nfts, setNfts] = useState<any[]>([]);
  const [sendList, setSendList] = useState<any[]>([]);

  const get = useCallback(async () => {
    if (publicKey) {
      const owned = await getNfts(publicKey);

      setNfts(owned);
    }
  }, [publicKey]);

  useEffect(() => {
    get();
  }, [get]);

  const { connection } = useConnection();


  const wallet = useAnchorWallet();
  const program = useMemo(() => {
    if (connection && wallet) {
      return getProgram(connection, wallet as Wallet);
    }
  }, [connection, wallet]);

  const handleNftSelection = (nftId: string) => {
    setSendList((prevList) => {
      if (prevList.includes(nftId)) {
        return prevList.filter((id) => id !== nftId);
      } else {
        return [...prevList, nftId];
      }
    });
  };


  const handleBulkSend = useCallback(async () => {
    if (!publicKey) {
      alert("Please connect your wallet");
      return;
    }

    // execute program 

  }, []);

  // wallet bulk send GkKpYLvcoVJ6qpADvQDiHfeZSXDVRxNDjb79ZKveMKYF

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <nav className="flex justify-between w-full">
        <h1 className="text-4xl">Bulk Send</h1>
        <WalletMultiButton />
      </nav>
      <div className="flex mt-20">
        <input
          className="p-5 w-96"
          placeholder="Recipient Wallet Address"
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-5">
        {nfts.map((nft, index) => (
          <label key={index} className="gap-2 text-lg">
            <input
              type="checkbox"
              name="selectedNft"
              value={nft.id}
              onChange={() => handleNftSelection(nft)}
            />
            <span>{nft}</span>
            {nft.name}
          </label>
        ))}
      </div>
      <div>
        <button
          className="p-5 bg-blue-500 text-white w-96 mt-10"
          onClick={() => alert(walletAddress)}
        >
          Send
        </button>
      </div>
    </main>
  );
}
