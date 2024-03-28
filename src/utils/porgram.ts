import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Idl, Program, Wallet } from "@project-serum/anchor";
import IDL from "./idl.json";

export const PROGRAM_ID = new PublicKey("8m9fdw8FbnYeMZYqD8BNpPFZyYZJkMFc2Wu3ZdYwx2nR");

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program(IDL as Idl, PROGRAM_ID, provider);
  return program;
};
