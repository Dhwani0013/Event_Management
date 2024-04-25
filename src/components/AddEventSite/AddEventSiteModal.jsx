import React, { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./AddEventSiteModal.scss";
import { useAuth } from "../../authentication";

const AddEventSiteModal = (props) => {
  const { isOpen, onClose, onSave, data, title } = props || {};
  const { uploadImageToStorage, addEventSiteToFirestore, fetchCategories } = useAuth();
  const [location, setLocation] = useState(data != null ? data.location : "");
  const [description, setDescription] = useState(
    data != null ? data.description : ""
  );
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgURL, setImageURL] = useState(data != null ? data.img : "");
  const [price, setPrice] = useState(data != null ? data.price : "");
  const [priceError, setPriceError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategoriesFromFirestore = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesFromFirestore();
  }, []);

  const handlePriceChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value) || value === "") {
      setPrice(value);
      setPriceError("");
    } else {
      setPriceError("Price should only contain numbers.");
    }
  };

  const handleSave = async () => {
    if (
      location.trim() === "" ||
      description.trim() === "" ||
      img === null ||
      price.trim() === "" ||
      selectedCategory.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const imageURL = await uploadImageToStorage(img, location);
      const docId = await addEventSiteToFirestore({
        location,
        description,
        img: imageURL,
        price,
        category: selectedCategory,
      });

      onSave({ docId, location, description, img: imageURL, price, category: selectedCategory });

      // Close modal
      onClose();
    } catch (error) {
      alert("Error saving venue site. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>{title ?? "Add"} Venue Site</h2>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Image:</label>
        <div className="imagePreview">
          {imgURL != "" ? (
            <img src={imgURL} alt="venue Site Preview" />
          ) : imgPreview != null ? (
            <img src={imgPreview} alt="venue Site Chosen Image" />
          ) : (
            <p>Chosen Image</p>
          )}
        </div>
        <input
          id="eventImage"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        <label htmlFor="eventImage" className="imagePicker">
          <CloudUploadIcon />
          {imgPreview ? "Change Image" : "Choose Image"}
        </label>
        <label>Price:</label>
        <input type="text" value={price} onChange={handlePriceChange} />
        {priceError && <p className="error-message">{priceError}</p>}
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddEventSiteModal;
