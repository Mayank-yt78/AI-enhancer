import React from 'react'

function ImageUploader(props) {
  const showImageHandler = (e) =>{
    const file = e.target.files[0];
    if(file){
      props.uploadImageHandler(file)
    }

  }
  return (
    <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl'>
        <label htmlFor="fileinput" className='block w-full p-6 text-center cursor-pointer border-2 border-dashed transition-all border-gray-200 hover:border-blue-400 rounded-lg'>
            <input type="file" id="fileinput" className='hidden' onChange={showImageHandler} />
            <span className='text-lg font-medium text-gray-600'>click and drag to upload your image</span>
        </label>
    </div>
  )
}

export default ImageUploader