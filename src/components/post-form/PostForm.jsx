import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {Button, Input , Select,RTE } from "../index" 
import service from '../../appwrite/configuration'
import { useCallback } from 'react'

const PostForm = ({post}) => {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
      title : post?.title|| '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
      
    }

  });
  const navigate = useNavigate()
  const userData = useSelector(state => state.user.userData)

  const submit = async (data) => {
    if(post){
      const file = await data.image[0] ? service.uploadFile(data.image[0]) : null 

        if(file) {
          await service.deleteFile(post.featuredImage) 
        }
          const dbPost = await service
          .updatePost(post.$id, {
            ...data, 
            featuredImage : file ? file.$id : undefined,

          })
            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
    }
    else{
      const file = await data.image[0] ? service.uploadFile(data.image[0]) : null
      //

      if(file){
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await service.createPost({
          ...data,
          userId: userData.userId,
        })
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }

  }
  // two input fields 1.title 2.slug 
  // watch title and generate value inside slug, if user give a space anywhere convert it into dash 
  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string')
     return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g,'-')
      .replace(/^[a-zA-Z\d]/g,'-');

    return ''    
  })

  React.useEffect(() => { // a way of optimizing useEffect function is whena function is called inside it we can store it in the variabel and return it  for ex: example = hello()  return () => { example.unsubscribe()}
    const subscription = watch((value, {name}) => {
      if(name === 'title'){
        setValue('slug', slugTransform(value.title,{shouldValidate: true}))
      }
    })
    
    return () => {
      subscription.unsubscribe()// memory management 
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);

}

export default PostForm