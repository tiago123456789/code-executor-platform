import React, { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { Link } from "react-router-dom";
import GistUtil from "../utils/Gist"
import ModalGenerateLink from "../components/ModalGenerateLink";
import { useSnippet } from "../hooks/useSnippet";

const gistUtil = new GistUtil();

export default () => {
    const { 
        generate: generateLinkToShare,
        linkToShare, setLinkToShare,
        gists, getGists
    } = useSnippet()
    const [permission, setPermission] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [gist, setGist] = useState(null);

    const toggle = () => {
        setOpenModal(!openModal);
    }

    const openGenerateLinkModal = (item) => {
        toggle();
        setGist(item);
    }

    const closeGenerateLinkModal = () => {
        toggle();
        setLinkToShare(null)
        setPermission(null)
    }

    const generate = async (event) => {
        event.preventDefault();
        await generateLinkToShare(gist, permission)
    }

    useEffect(() => {
        getGists()
    }, [])

    return (
        <section className="container-fluid">
            <ModalGenerateLink
                openModal={openModal}
                toggle={toggle}
                setPermission={setPermission}
                linkToShare={linkToShare}
                generate={generate}
                closeGenerateLinkModal={closeGenerateLinkModal}
            />
            <br/>
            <Link
                to={"/snippet-code/new"} 
            className="btn btn-primary mt-2 mb-2">
                New snippet
            </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Filename</th>
                        <th>Is public?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gists.map(gist => {
                            return (
                                <tr key={gist.id}>
                                    <td>{gist.id}</td>
                                    <td>{gistUtil.getFilename(gist)}</td>
                                    <td>{(gist.public ? "yes" : "no")}</td>
                                    <td>
                                        <Button color="primary" className="mb-1" onClick={() => gistUtil.download(gist)}>Download</Button>&nbsp;
                                        { gist.public  && 
                                            <Button color="primary" className="mb-1"
                                            onClick={() => openGenerateLinkModal(gist)}
                                            >Generate link</Button>
                                        }
                                        &nbsp;
                                        <Link to={`/snippet-code/${gist.id}/edit`} className="btn btn-primary">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}