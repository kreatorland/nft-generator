import { createCanvas, loadImage } from "canvas";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Buffer } from "buffer";
import axios from 'axios';
import {NFTStorage} from "nft.storage";

class Engine {

  constructor(size, layers, collectionSize) { 
    this.size = size;
    this.layers = layers;
    this.collectionSize = collectionSize;
    this.preview = "";
    this.jszip = new JSZip();

    this.canvas = createCanvas(size.width, size.height);
    this.ctx = this.canvas.getContext("2d");
    this.arr = [];
  }

  isValid(){  //: boolean 
    return (
      this.layers.length > 0 &&
      this.layers.every((layer) => layer.images.length > 0)
    );
  }

  setSize(size) {   //: Size
    this.size = size;
    this.canvas.width = size.width;
    this.canvas.height = size.height;
  }

  setLayers(layers) {   //: Array<Layer>
    this.layers = layers;
  }

  setCollectionSize(collectionSize) {   //: number
    this.collectionSize = collectionSize;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
  }

  async drawImage(imagePath, x, y) {    //: string ?: number ?: number
    const image = await loadImage(imagePath);
    console.log("path are",x, y)
    this.ctx.drawImage(image, x || 0, y || 0, this.canvas.width, this.canvas.height );

  }
  async generateNFT(images, fileName) {   //: Array<Image>    : string
    const imgs = Array.isArray(images) ? images : [images];
    this.clearCanvas();
    for(let i = 0 ; i<imgs.length; i ++) {
      await this.drawImage(imgs[i].path);
     
    }
 
    await this.saveFileToZip(`${fileName}.png`, "Collection");


  }

  async generateNFTs(data, ipfsURI) {   
    
    this.jszip = new JSZip();
    const cartesianProduct = this.layersCartesianProduct(this.layers);
    const selectedImages = this.selectNRandomElements(
      cartesianProduct,
      this.collectionSize
    );
    ///TODO
    var startTime = new Date().getTime();
    console.log(startTime);

    for(let i = 0 ; i<selectedImages.length; i ++) {
      await this.generateNFT(selectedImages[i], `${i}`);
      await this.generateMetaData(data, selectedImages[0], ipfsURI, i);
    }


    var endTime = new Date().getTime();
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    this.jszip
      .generateAsync({ type: "blob" })
      .then((content) => {    //: any
        saveAs(content, "NFTCollection.zip");
      })
      .catch((err) => console.log(err));    //: any

    
  }

  async generateMetaData(
    data,   //: iData
    images,   //: Image[]
    ipfsURI,    //: string
    index   //: number
  ) {

    const imgs = Array.isArray(images) ? images : [images];
    
    let dna = "";
    const attributes = imgs.map((image) => {
      const breakPoints = image.path.split(".");
      dna += breakPoints[breakPoints?.length - 2];
      return {
        trait_type: image.layer,
        value: image?.name?.split(".")[0],
      };
    });
    
    
    const metadata = {
      name: data.name,
      description: data.description,
      attributes: attributes,
      image: `ipfs://${ipfsURI.replace("ipfs://", "")}/${index}.png`,
      dna: Buffer.from(`${dna}`).toString("hex"),   
      edition: 1,
      date: data?.date,
      engine: "NFTooze",
    };
    

    await this.jszip.file(
      `NFTCollection/Collection/${index}.json`,
      JSON.stringify(metadata)
    );

    return metadata;
  }
  
  async generateNFTPreview(images) {    //: Array<Image>
    const imgs = Array.isArray(images) ? images : [images];
    this.clearCanvas();

    for (let img of imgs){
      await this.drawImage(img.path);
      
    }
    return;

  }

 

  async saveFileToZip(fileName, path) {   //: string  : string
    return await new Promise((resolve) => {
      this.canvas.toBlob((blob) => {    //: any
        this.jszip.file(`NFTCollection/${path}/${fileName}`, blob);
        this.clearCanvas();
        resolve(true);
      });
    });
  }

  async saveCanvasFile(fileName) {    //: string
    this.canvas.toBlob(async (blob) => {    //: any
      saveAs(blob, `${fileName}`);
    });
  }

  canvasToArr(fileName){
    this.canvas.toBlob((blob)=>{
      const file = new File([blob], `${fileName}.png`,{
        type: blob.type,
        lastModified: new Date().getTime()
      });
      this.arr.push(file);

    });
  }

  async pinArrToIPFS(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJlYTE2Nzc4MTIyRmJkMzI4MDdDODYzMmM2RDJmY0U1MmJGRDc3MzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTAwOTc1MjE5NCwibmFtZSI6InRlc3QifQ.Ilap6RZKFrcF7qcTbi_hPZ5RviY8Ay18hDstEsm1WUE";
    const storage = new NFTStorage({token});
    const cid = await storage.storeDirectory(this.arr);
    const status = await storage.status(cid);
    console.log(`Uploaded URL:  https://${cid}.ipfs.nftstorage.link`);
    this.arr = [];
  }

  async pinCanvasToIPFS(fileName){
    ///TODO
    
    this.canvas.toBlob(async (blob) => {
     
      

      const formData = new FormData();
      formData.append("file", blob, `${fileName}.png`);

      try {
        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                'pinata_api_key': '6a5e18bc116ad0bbe4ab',
                'pinata_secret_api_key': '86be236933b9847e77e129a09fde30d2dcd16e39ecf68b8e5957a9a64dd3514a',
                "Content-Type": "multipart/form-data"
            },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(`${fileName}.png:`, ImgHash); 
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  

    });


  }

  async generatePreview() {

    // await this.pinCanvasToIPFS();

    return await new Promise((resolve) => {
      this.canvas.toBlob(async (blob) => {    //: any
        const img = (await this.blobToBase64(blob));    // as string
        // console.log(img);
        this.preview = img;
        resolve(img);
      });
    });
  }

  blobToBase64(blob) {    //: any
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  }

  layersCartesianProduct(layers) {   
    const images = layers
      .map((layer) => ({
        ...layer,
        images: layer.images.map((image) => ({ ...image, layer: layer.name })),
      }))
      .map((layer) => layer.images);
    return images.reduce((a, b) =>
      a.flatMap((d) => b.map((e) => [d, e].flat()))
    );
  }

  selectNRandomElements(
    array,    
    n   
  ) {   
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  async generateBannerCollage(blobImage) {    //?: boolean
    if (!this.isValid()) return;

    this.jszip = new JSZip();
    const cartesianProduct = this.layersCartesianProduct(this.layers);
    const allImages = this.selectNRandomElements(
      cartesianProduct,
      cartesianProduct?.length > 50 ? 50 : cartesianProduct?.length
    );
    const gridSize = Math.ceil(Math.sqrt(allImages.length));

    this.canvas.width = this.size.width * gridSize;
    this.canvas.height = this.size.height * gridSize;

    let x = 0;
    let y = 0;
    for (let i = 0; i < allImages.length; i++) {
      for (let j = 0; j < allImages[i].length; j++) {
        await this.drawImage(allImages[i][j].path, x, y);
      }

      if (x >= this.size.width * gridSize) {
        x = 0;
        y += Number(this.size.height);
      } else {
        x += Number(this.size.width);
      }
    }

    return await new Promise((resolve) => {
      this.canvas.toBlob(async (blob) => {    //: any
        const img = (await this.blobToBase64(blob)) ;   //as string
        this.preview = img;
        // console.log(img);
        blobImage ? resolve(blob) : resolve(img);
      });
    });
  }

  async downloadBannerCollage() {
    if (!this.isValid()) return;

    this.jszip = new JSZip();

    const blobImage = await this.generateBannerCollage(true);
    await this.jszip.file(`NFTCollectionBanner/Banner/banner.png`, blobImage);

    this.jszip
      .generateAsync({ type: "blob" })
      .then((content) => {    //: any
        saveAs(content, "NFTCollectionBanner.zip");
      })
      .catch((err) => console.log(err));    //: any
  }
  
  async generateAndUploadNFTs(data, ipfsURI) {   //: iData   : string
    
    this.jszip = new JSZip();
    // var startTime = new Date().getTime();
    // console.log(startTime);

    const cartesianProduct = this.layersCartesianProduct(this.layers);
    const selectedImages = this.selectNRandomElements(
      cartesianProduct,
      this.collectionSize
    );

    let index = 0;
    for (let selectedImage of selectedImages){
      
      await this.generateNFT(selectedImage, `${index}`);
      //await this.pinCanvasToIPFS(`${index}`);
      this.canvasToArr(`${index}`);
      await this.generateMetaData(data, selectedImage, ipfsURI, index);
      index++;
    }
    
    // var endTime = new Date().getTime();
    // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    this.jszip
    .generateAsync({ type: "blob" })
    .then((content) => {    //: any
      saveAs(content, "NFTCollection.zip");
    })
    .catch((err) => console.log(err));    //: any
    
    console.log("Uploading .......");
    await this.pinArrToIPFS();

  }
 
}

const engine = new Engine({ width: 374, height: 374 }, [], 1);

export default engine;
