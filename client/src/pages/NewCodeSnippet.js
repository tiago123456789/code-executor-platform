import { useState } from 'react';
import { Button, Input, InputGroup } from "reactstrap"
import { v4 } from "uuid"
import { toast } from 'react-toastify';
import 'highlight.js/styles/dracula.css';
import App from '../constants/App';
import Gist from "../services/Gist"
import Editor from '../components/Editor';
import { useSnippet } from '../hooks/useSnippet';

const gistService = new Gist();

function NewCodeSnippet() {
  const { 
    value, setValue, setLanguage, language,
    result, executeCode, save: saveGist
  } = useSnippet();
  const [filename, setFilename] = useState(v4())
  const extensionByLanguage = App.EXTENSION_BY_LANGUAGE;

  const save = async () => {
    await saveGist({
      description: "code test",
      files: {
        [`${filename}.${extensionByLanguage[language]}`]: {
          content: value
        }
      },
      public: true
    })
    toast.success("Code saved with success!")
  }

  return (
    <div className='container-fluid'>
      <InputGroup className="mb-2">
        <Input placeholder="username" value={filename}
          onChange={event => setFilename(event.target.value)}
        />
        <Button color="primary" addonType="append" onClick={() => save()}>
          Save code
        </Button>
      </InputGroup>
      <InputGroup className="mb-2">
        <select className="form-control" onChange={(event) => setLanguage(event.target.value)}>
          <option value='javascript'>Javascript</option>
          <option value='php'>PHP</option>
          <option value='python'>Python</option>
        </select>
      </InputGroup>
      <Editor
        value={value}
        setValue={setValue}
        language={language}
        executeCode={executeCode}
        result={result}
      />
    </div>
  );
}

export default NewCodeSnippet;
