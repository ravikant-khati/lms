import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({inputValues, setInputValues}) {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setInputValues({...inputValues, description: content});
  };

  return (
    <>
      <Editor
        apiKey='ttkwmx1mh7dpja018yo21f8k7zsykpm7nquhqgpcc6555no4'
        onInit={(_evt, editor) => editorRef.current = editor}
        value={inputValues.description || ''}
        onEditorChange={handleEditorChange}
        init={{
          height: 250,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}