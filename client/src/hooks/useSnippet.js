import { useState } from "react";
import * as codeExecutorService from "../services/CodeExecutor"
import Gist from "../services/Gist"
import { toast } from 'react-toastify';

const gistService = new Gist();

export const useSnippet = () => {
    const [linkToShare, setLinkToShare] = useState(null);
    const [gists, setGists] = useState([]);
    const [value, setValue] = useState("");
    const [result, setResult] = useState(null);
    const [language, setLanguage] = useState("js")

    const getCode = async (id) => {
        const accessToken = localStorage.getItem("accessToken")
        return gistService.getById(id, accessToken);
    }
    
    const executeCode = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await codeExecutorService.executor(
            { code: encodeURI(value), language }, accessToken
        );
        setResult(response.data.output);
    }

    const update = async (id, data) => {
        const accessToken = localStorage.getItem("accessToken")
        await gistService.update(
            id, 
            data,
            accessToken
        )
        toast.success("Code saved with success!")
    }

    const save = async (data) => {
        const accessToken = localStorage.getItem("accessToken")
        return gistService.create(data, accessToken)
    }

    const generate = async (gist, permission) => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await gistService.generateLink(gist, accessToken, permission)
        setLinkToShare(response.link)
    }

    const getGists = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const gists = await gistService.get(accessToken)
        setGists(gists)
    }

    return {
        getGists,
        generate,
        linkToShare, 
        setLinkToShare,
        gists,
        executeCode,
        value,
        result,
        language,
        setLanguage,
        setValue,
        save,
        update,
        getCode
    }
}