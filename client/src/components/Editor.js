import React from "react"
import { Button } from "reactstrap"
import { CodeEditorEditable } from "react-code-editor-editable"

export default ({ value, setValue, language, executeCode, result }) => {
    return (
        <>
            <CodeEditorEditable
                value={value}
                setValue={setValue}
                width='80vw'
                height='40vh'
                language={language}
                inlineNumbers
            />
             <Button className="mt-1" color="primary" onClick={() => executeCode()}>Execute code</Button>&nbsp;
            <code className="hljs mt-1" style={{ width: "80vw", height: "40vh" }}>
                <h6>Result:</h6>
                <pre>
                {result}
                </pre>
            </code>
        </>
    )
}