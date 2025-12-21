'use client'
import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your poem here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      })

      // Set initial content if provided
      if (value) {
        quillRef.current.root.innerHTML = value
      }

      // Handle text change
      quillRef.current.on('text-change', () => {
        const content = quillRef.current.root.innerHTML
        onChange(content)
      })
    }

    return () => {
      // Cleanup on unmount
    }
  }, [onChange])

  return (
    <div className='w-full z-1  sm:w-[500px]'>
      <div
        ref={editorRef}
        className='bg-white border border-gray-300 rounded'
        style={{
          minHeight: '200px',
          fontSize: '16px',
          fontFamily: 'var(--font-lora), sans-serif'
        }}
      />
      <style jsx global>{`
        .ql-toolbar {
          border: 1px solid #ccc;
          border-radius: 4px 4px 0 0;
          background-color: #f9f9f9;
        }
        .ql-container {
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 4px 4px;
          font-size: 16px;
        }
        .ql-editor {
          min-height: 300px;
          padding: 12px;
        }
        .ql-editor.ql-blank::before {
          color: #999;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

export default QuillEditor
