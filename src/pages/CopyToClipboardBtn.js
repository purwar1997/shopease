import { useState } from 'react';
import { LuClipboardList, LuClipboardCheck } from 'react-icons/lu';

const CopyToClipboardBtn = ({ textToCopy }) => {
  const [textCopied, setTextCopied] = useState(false);

  const writeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTextCopied(true);
      setTimeout(() => setTextCopied(false), 2500);
    } catch (error) {
      console.log('Failed to copy text to clipboard.');
    }
  };

  return (
    <button
      className='text-base text-gray-500 hover:text-indigo-600'
      onClick={writeToClipboard}
      title={textCopied ? 'Copied' : 'Copy to clipboard'}
    >
      {textCopied ? <LuClipboardCheck /> : <LuClipboardList />}
    </button>
  );
};

export default CopyToClipboardBtn;
