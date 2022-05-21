
class Gist {

    getContent(item) {
        const filename = this.getFilename(item);
        return item.files[filename].content
    }

    getFilename(item) {
        const keys = Object.keys(item.files)
        const filename = keys[0]
        return filename;
    }

    download(item) {
        const keys = Object.keys(item.files)
        const filename = keys[0]
        const rawUrl = item.files[filename].raw_url
        const link = document.createElement("a");
        link.href = rawUrl
        link.target = "_blank"
        link.click()
    }
}

export default Gist;