import { useEffect, useState } from 'react';
import { Input, InputGroup } from "reactstrap"
import { v4 } from "uuid"
import 'highlight.js/styles/dracula.css';
import App from "../constants/App"
import GistUtil from "../utils/Gist"
import GistService from '../services/Gist';
import { useSnippet } from "../hooks/useSnippet"
import * as codeExecutorService from "../services/CodeExecutor"
import Editor from '../components/Editor';

const gistUtil = new GistUtil();
const gistService = new GistService();

function CodeShareSnippet(props) {
    const {
        value, setValue,
        language, setLanguage,
        result, executeCode,
        getCode: getCodeGist
    } = useSnippet()
    const [permission, setPermission] = useState(null)
    const [id, setId] = useState(null);
    const [filename, setFilename] = useState(v4())
    const extensionByLanguage = App.LANGUAGE_BY_EXTENSION

    const getCode = async (id) => {
        const response = await getCodeGist(id)
        const data = response.data;
        const filename = gistUtil.getFilename(data)
        setFilename(filename)
        setValue(gistUtil.getContent(data))
        const extension = filename.split(".")[1]
        const language = extensionByLanguage[extension];
        setLanguage(language)
    }

    const getPermissions = async (token) => {
        const response = await gistService.validateLink(token);
        setPermission(response.data.permission)
    }

    const hasPermission = (permissionNecessary) => {
        return permission == permissionNecessary
    }

    useEffect(() => {
        getPermissions(props.match.params.token)
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
            </InputGroup>
            <Editor
                value={value}
                setValue={(value) => hasPermission("editor") ? setValue(value) : false}
                language={language}
                executeCode={executeCode}
                result={result}
            />
        </div>
    );
}

export default CodeShareSnippet;
