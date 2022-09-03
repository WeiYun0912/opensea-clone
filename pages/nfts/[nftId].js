import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetail from "../../components/nft/GeneralDetail";
import ItemActivity from "../../components/nft/ItemActivity";
import Purchase from "../../components/nft/Purchase";
const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const { provider } = useWeb3();
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const router = useRouter();

  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://rinkeby.infura.io/v3/439d179feff640ddbf491fc97115cb16"
    );

    return sdk.getNFTModule("0x7AEF1764A08De4BD2daaed016242DC3b316144C5");
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();
      const selectedNftArray = nfts.filter(
        (nft) => nft.id == router.query.nftId
      );

      setSelectedNft(selectedNftArray[0]);
    })();
  }, [nftModule]);

  const marketplaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://rinkeby.infura.io/v3/439d179feff640ddbf491fc97115cb16"
    );

    return sdk.getMarketplaceModule(
      "0x2C0Ad3E45Ea161c1ee846A972Af5879f9C9e015e"
    );
  }, [provider]);

  useEffect(() => {
    if (!marketplaceModule) return;
    (async () => {
      setListings(await marketplaceModule.getAllListings());
    })();
  }, [marketplaceModule]);

  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetail selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketplaceModule={marketplaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </>
  );
};

export default Nft;
