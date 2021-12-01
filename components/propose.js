import { ethers } from "ethers";
import styles from "../styles/components/propose.module.css";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contract";

export default function Propose() {
  const propose = async () => {
    if (!window.ethereum) {
      alert("You need to connect a wallet!");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    let count = await wavePortalContract.getTotalWaves();
    console.log("Retrieved total wave count...", count.toNumber());

    const waveTxn = await wavePortalContract.wave();
    console.log("Mining...", waveTxn.hash);

    await waveTxn.wait();
    console.log("Mined -- ", waveTxn.hash);

    count = await wavePortalContract.getTotalWaves();
    console.log("Retrieved total wave count...", count.toNumber());
  };

  return (
    <div className={styles.container}>
      <input type="text" className={styles.input} />
      <button className={styles.button} onClick={propose}>
        Propose
      </button>
    </div>
  );
}
