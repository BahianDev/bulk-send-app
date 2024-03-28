import { connection } from "@/services/web3";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export const getNfts = async (publicKey: PublicKey) => {
  const parsed = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  const owned = parsed.value
    .filter(
      (account) => account.account.data.parsed.info.tokenAmount.amount > 0
    )
    .map((account) => {
      return account.account.data.parsed.info.mint;
    });


    return owned
};
