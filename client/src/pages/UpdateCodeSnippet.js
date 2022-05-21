import { useEffect, useState } from 'react';
import { Button, Input, InputGroup } from "reactstrap"
import { v4 } from "uuid"
import { toast } from 'react-toastify';
import 'highlight.js/styles/dracula.css';
import App from '../constants/App';
import Editor from "../components/Editor"
import GistUtil from "../utils/Gist"
import { useSnippet } from '../hooks/useSnippet';

const gistUtil = new GistUtil();

function UpdateCodeSnippet(props) {
    const {
        value, setValue,
        result, setResult,
        executeCode, language, setLanguage,
        update, getCode: getCodeGist
    } = useSnippet()
    const [id, setId] = useState(null);
    const [filename, setFilename] = useState(v4())
    const extensionByLanguage = App.LANGUAGE_BY_EXTENSION

    const save = async () => {
        update(id,
            {
                description: "code js",
                files: {
                    [filename]: {
                        content: value
                    }
                },
                public: true
            })
        toast.success("Code saved with success!")
    }

    const getCode = async (id) => {
        const response = await getCodeGist(id)
        const data = response.data;
        const filename = gistUtil.getFilename(data)
        const extension = filename.split(".")[1]
        const language = extensionByLanguage[extension];
        setFilename(filename)
        setValue(gistUtil.getContent(data))
        setLanguage(language)
    }

    useEffect(() => {
        setId(props.match.params.id)
        getCode(props.match.params.id)
    }, [])

    return (
        <div className='container-fluid'>
            <InputGroup className="mb-2">
                <Input placeholder="username" value={filename}
                    disabled
                    onChange={event => setFilename(event.target.value)}
                />
                <Button color="primary" addonType="append" onClick={() => save()}>
                    Save code
                </Button>
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

export default UpdateCodeSnippet;
