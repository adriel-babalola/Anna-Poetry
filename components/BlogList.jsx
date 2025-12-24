import { blog_data } from '@/assets/images/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
    const [menu, setMenu] = useState("All")
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blog');
                setBlogs(response.data.blogs);
                console.log(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []); 
    return (
        <div>
            <div className='flex flex-wrap justify-center gap-2 sm:gap-6 my-8 sm:my-10 px-4'>
                <button onClick={() => { setMenu('All') }} className={`text-xs sm:text-sm ${menu === 'All' ? 'bg-black text-white py-1 px-3 sm:px-4 rounded-sm' : 'py-1 px-3 sm:px-4'}`}>All</button>
                <button onClick={() => { setMenu('Midnight Thoughts') }} className={`text-xs sm:text-sm ${menu === 'Midnight Thoughts' ? 'bg-black text-white py-1 px-3 sm:px-4 rounded-sm' : 'py-1 px-3 sm:px-4'}`}>Midnight Thoughts</button>
                <button onClick={() => { setMenu('Healing') }} className={`text-xs sm:text-sm ${menu === 'Healing' ? 'bg-black text-white py-1 px-3 sm:px-4 rounded-sm' : 'py-1 px-3 sm:px-4'}`}>Healing</button>
                <button onClick={() => { setMenu('Unfiltered') }} className={`text-xs sm:text-sm ${menu === 'Unfiltered' ? 'bg-black text-white py-1 px-3 sm:px-4 rounded-sm' : 'py-1 px-3 sm:px-4'}`}>Unfiltered</button>
            </div>

            <div className='flex flex-wrap justify-center sm:justify-around gap-4 mb-16 px-4 sm:mx-0 xl:mx-24'>
                {blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                    return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />
                })}
            </div>
        </div>
    )
}

export default BlogList
