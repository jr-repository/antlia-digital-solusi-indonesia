
import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link as LinkIcon
} from 'lucide-react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  // Initialize the editor with initial value
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    // Focus back to the editor to maintain cursor position
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleInput();
  };

  const handleFormat = (format: string) => {
    execCommand(format);
  };

  const handleAlignment = (alignment: string) => {
    execCommand('justify' + alignment);
  };

  const handleCreateLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('italic')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('underline')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Underline"
        >
          <Underline size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        <button
          type="button"
          onClick={() => handleFormat('insertUnorderedList')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat('insertOrderedList')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        <button
          type="button"
          onClick={() => handleAlignment('Left')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleAlignment('Center')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleAlignment('Right')}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        <button
          type="button"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Insert Link"
        >
          <LinkIcon size={18} />
        </button>
      </div>
      
      {/* Link Input */}
      {showLinkInput && (
        <div className="flex p-2 border-b bg-gray-50">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 px-3 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
          />
          <button
            type="button"
            onClick={handleCreateLink}
            className="px-3 py-1 bg-antlia-blue text-white rounded-r-md hover:bg-opacity-90"
          >
            Insert
          </button>
        </div>
      )}
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none article-content"
        onInput={handleInput}
      />
    </div>
  );
};

export default RichTextEditor;
