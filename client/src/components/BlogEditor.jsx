import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

function BlogEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      <Editor
        apiKey="819dl4o7ddof28i9l5yhke1c6ep81az3rkc5qt46xmbmpnsl"  
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'preview', 'anchor', 'searchreplace', 'visualblocks',
            'code', 'fullscreen', 'insertdatetime', 'media', 'table',
            'help', 'wordcount'
          ],
          toolbar:
            'undo redo | blocks | formatselect | bold italic underline forecolor | ' +
            'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6 }',
        }}
        onEditorChange={onChange}
      />
    </div>
  );
}

export default BlogEditor;
