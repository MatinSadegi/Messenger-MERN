import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

const CropImage = ({ form, setForm, setOpenCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [openSetProfile, setOpenSetProfile] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  //crop image and convert it in base64
  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(form.avatar, croppedArea, 0);
      const data = new FileReader();
      data.readAsDataURL(file);
      data.onloadend = () => {
        setCroppedImg(data.result);
      };
      setOpenSetProfile(true);
    } catch (error) {
      console.log(error);
    }
  };
 //set image on profile
  const setImage = async () => {
    try {
      setForm({ ...form, avatar: croppedImg });
      setOpenSetProfile(false);
      setOpenCrop(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cropper">
      <div
        className="cropper__container"
        style={{ display: openSetProfile ? "none" : "flex" }}
      >
        <div className="cropper__title">
          <p>Crop Profile Photo</p>
          <img
            src="https://img.icons8.com/material-rounded/20/ffffff/multiply--v1.png"
            alt="multiply"
            onClick={() => {
              setOpenCrop(false);
            }}
          />
        </div>
        <div className="cropper__img">
          <Cropper
            image={form.avatar}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <button onClick={cropImage}>
          <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/22/ffffff/external-crop-graphic-design-tanah-basah-basic-outline-tanah-basah.png" />{" "}
          Crop
        </button>
      </div>
      {!openSetProfile ? null : (
        <div className="cropper__set-profile">
          <img
            src="https://img.icons8.com/material-rounded/20/ffffff/multiply--v1.png"
            alt="multiply"
            className="cropper__close-set-profile"
            onClick={() => {
              setOpenCrop(false);
            }}
          />
          <img src={croppedImg} alt="avatar" className="cropper__avatar" />
          <button onClick={setImage}>Set Profile</button>
        </div>
      )}
    </div>
  );
};

export default CropImage;
