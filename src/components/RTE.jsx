import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({name, control, label, defaultValue =""}) => { // control comes from react hook form adn is responsible to take state to other forms, we pass when we use this rte over there 
  return (
    <div className='w-full'>
      {label && <label className='inline-bloack mb-1 pl-1'>
        {label}
        </label>}
        <Controller 
          name={name || "content"}
          control={control} // this will be given by the parent element, we pass as it is 
          render={({field: {onChange}}) => (
            <Editor
                initialValue='default value'
                init={
                  {
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                      "anchor",
                  ],
                  toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  }}
              onEditorChange={onChange}
              />
          )}
        />
    </div>
  )
}

export default RTE