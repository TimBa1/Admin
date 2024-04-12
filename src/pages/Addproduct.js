import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate,  useLocation, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";




let schema = yup.object().shape({
  name: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brandSlug: yup.string().required("Brand is Required"),
  categorySlugs: yup.array().nullable().required("Category is Required"),

  // tags: yup.string().required("Tag is Required"),
  // color: yup
  //   .array()
  //   .min(1, "Pick at least one color")
  //   .required("Color is Required"),
  quantityAvailable: yup.number().required("Quantity is Required"),
});


const Addproduct = () => {
  const {id} = useParams();

  const details = useLocation().state;

  const type =  id ?'edit':'create'

console.log(details?.slug, 'wow')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    // dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  // const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;


  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);


  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    // formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [img]);

console.log(details)
  const formik = useFormik({
    initialValues: {
      name: type === 'edit' ? details?.name : "",
      description: type === 'edit' ? details?.description
       : "",
      price: type === 'edit' ? details?.price : "",
      brandSlug: type === 'edit' ? details?.brandSlug?.name : "",
      categorySlugs: [],
      // tags: "",
      // color: "",
      quantityAvailable: type === 'edit' ? details?.quantityAvailable : "",
      images: type === 'edit' ? details?.images  :  [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (type === 'edit') {

      } else {
        dispatch(createProducts(values));
      }

      formik.resetForm();
      // setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  // const handleColors = (e) => {
  //   setColor(e);
  //   console.log(color);
  // };


const [image, setImage] = useState([])
  const handleImageChange = (event) => {
    const data = Array.from(event.target.files);
    setImage(data);
    const productSlug = details?.slug
    dispatch(uploadImg(data,productSlug))
  };
console.log(image)

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="">
            <CustomInput
              type="text"
              label="Enter Description"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brandSlug"
            onChange={formik.handleChange("brandSlug")}
            onBlur={formik.handleBlur("brandSlug")}
            value={formik.values.brandSlug}
            className="form-control py-3 mb-3"
            id=""

          >
            <option value="">Select Brand</option>
            {brandState?.content?.map((i, j) => {
              return (
                <option key={j} value={i.slug}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brandSlug && formik.errors.brandSlug}
          </div>
          <select
            name="categorySlugs"
            onChange={formik.handleChange("categorySlugs")}
            onBlur={formik.handleBlur("categorySlugs")}
            value={formik.values.categorySlugs}
            className="form-control py-3 mb-3"
            id=""
            multiple
          >
            <option value="">Select Category</option>
            {catState?.content?.map((i, j) => {
              return (
                <option key={j} value={i.slug}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categorySlugs && formik.errors.categorySlugs}
          </div>
          {/* <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div> */}
          {/* 
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div> */}
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantityAvailable"
            onChng={formik.handleChange("quantityAvailable")}
            onBlr={formik.handleBlur("quantityAvailable")}
            val={formik.values.quantityAvailable}
          />
          <div className="error">
            {formik.touched.quantityAvailable && formik.errors.quantityAvailable}
          </div>

          <input type='file'  name="images" accept="image/*" multiple onChange={handleImageChange}/>
          {type === 'edit' && (<>
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {details.images?.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i} alt="" width={100} height={100} />
                  </div>
                );
              })}
            </div>
          </>)}

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >{type === 'edit' ? 'Edit Product' : "  Add Product"}

          </button>
        </form >
      </div>
    </div>
  );
};

export default Addproduct;





