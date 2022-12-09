import engine from "../../engine";    //, { Image }
import { addLayerPath } from "../../redux/actions/layers/layers";
// import InitialState from "@/src/redux/types/initialStates";
import React from "react";
import { useRef } from "react";
import { FileDrop } from "react-file-drop";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Layer from "../Layer";
import styles from "./index.module.scss";

const typedUseSelectorHook = useSelector;   //: TypedUseSelectorHook<InitialState>

function Assets() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = React.useState("");   //<string>
  const data = typedUseSelectorHook((state) => state.data);

  const state = typedUseSelectorHook((state) => state);
  const { selectedLayer } = state.layers;

  const onFileInputChange = (event) => {    //: any
    const { files } = event.target;
    onFiles(files);
  };

  const onFileDrop = (files) => {   //: any
    onFiles(files);
  };

  const onTargetClick = () => {
    fileInputRef?.current?.click();
  };

  const onFiles = (files) => {    //: any
    const filesArray = Object.values(files);

    filesArray.forEach((file) => {    //: any
      const reader = new FileReader();
      reader.onload = (e) => {    //: any
        const filePath = e.target.result;
        addLayerPath(selectedLayer, {
          name: file.name,
          path: filePath,
          rarity: 0,
        })(dispatch);
      };
      reader.readAsDataURL(file);
    });
  };

  const previewSample = async () => {
    if (!state?.layers?.items[0]?.images[0]) return;

    const randomLayerImages = state.layers.items.map((item) => {
      const randomIndex = Math.floor(Math.random() * item.images.length) + 0;
      // console.log(item.images[randomIndex]
      //   ? item.images[randomIndex]
      //   : {
      //       path:
      //         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      //     });
      return item.images[randomIndex]
        ? item.images[randomIndex]
        : {
            path:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
          };
    });
    // console.log(randomLayerImages);
    await engine.generateNFTPreview(randomLayerImages);
    const samplePreview = await engine.generatePreview();
    setPreview(samplePreview);
    // console.log(samplePreview);
  };

  const handlePreview = async () => {
    engine.setSize({ width: data?.width || 1000, height: data?.height || 1000 });
    previewSample();
  };
  console.log('layer sttate', state.layers)
  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <FileDrop
          className={styles.container__top__upload}
          targetClassName={styles.container__top__upload__target}
          onTargetClick={onTargetClick}
          onDrop={onFileDrop}
          dropEffect="move"
        >
          <span className={styles.container__top__upload__title}>
            Click or drag and drop to upload your images
          </span>

          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className={styles.container__top__upload__input}
            inputprops={{ accept: "image/*" }}
            multiple
          />
        </FileDrop>
        <div className={styles.container__top__preview}>
          <div>
            <span
              className={styles.container__top__preview__button}
              onClick={handlePreview}
            >
              PREVIEW
            </span>
          </div>
          <img
            src={preview}
            className={styles.container__top__preview__image}
          />
          
        </div>
      </div>

      <div className={styles.container__bottom}>
        {state?.layers?.items[selectedLayer]?.images?.map(
          ({ path, rarity, name }, index) => (    //: Image
            <Layer
              path={path}
              rarity={rarity}
              name={name}
              layerIndex={selectedLayer}
              imageIndex={index}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Assets;
