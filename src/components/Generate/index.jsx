import engine from "../../engine";
// import InitialState from "../../redux/types/initialStates";
import web3 from "../../services/web3";
import React, { useEffect } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import Button from "../common/Button";
import Input from "../common/Input";
import styles from "./index.module.scss";
// import { Performance } from "perf_hooks";
// ss
const typedUseSelectorHook = useSelector;   //: TypedUseSelectorHook<InitialState>

function Generate() {
  const [collectionSize, setCollectionSize] = React.useState(1);    //<number>
  const [maxCollectionSize, setMaxCollectionSize] = React.useState(1);    //<number>
  const [coins, setCoins] = React.useState(0.005);    //<number>
  const [ipfsURI, setIpfsURI] = React.useState("");   //<string>
  const data = typedUseSelectorHook((state) => state.data);
  const layers = typedUseSelectorHook((state) => state.layers);

  useEffect(() => {
    const maxCollectionSize =
      engine.layersCartesianProduct(layers.items)?.length || 0;
    setMaxCollectionSize(maxCollectionSize);
  }, [layers.items]);

  const onGenerate = () => {
    engine.setSize({ width: data?.width || 1000, height: data?.height || 1000 });
    engine.setLayers(layers.items);
    engine.setCollectionSize(collectionSize || 1);
    // console.log(data);
    // console.log(layers)//console.log(JSON.stringify(layers));

    engine.generateNFTs(data, ipfsURI);
    
   
  };

  const onGenerateAndUpload = () => {
    engine.setSize({ width: data?.width || 1000, height: data?.height || 1000 });
    engine.setLayers(layers.items);
    engine.setCollectionSize(collectionSize || 1);
    // console.log(data);
    // console.log(layers)//console.log(JSON.stringify(layers));

    engine.generateAndUploadNFTs(data, ipfsURI);
    
   
  };
  

  const onBNB = () => {
    web3.collectPayment(coins, true);
  };

  const onETH = () => {
    web3.collectPayment(coins);
  };

  // console.log("ipf", ipfsURI);
  // console.log("collectionSize", collectionSize);
  // console.log("coins", coins);
  return (
    <div className="container" id="generate">
      <div className="container__max"></div>
      <Input
        className="container__input"
        label="Collection size"
        value={collectionSize}
        max={maxCollectionSize}
        type="number"
        onChange={({ target: { value } }) => setCollectionSize(value)}    //: any
      />
      <div className="container__max">
        Maximum collection size for provided layers: {maxCollectionSize}
      </div>

      <Button
        title="Generate & Download"
        onClick={onGenerate}
        disabled={maxCollectionSize < collectionSize || maxCollectionSize === 0}
      />
      <br/>
      <Button
        title="Generate & Upload  to IPFS"
        onClick={onGenerateAndUpload}
        disabled={maxCollectionSize < collectionSize || maxCollectionSize === 0}
      />
    </div>
  );
}

export default Generate;
