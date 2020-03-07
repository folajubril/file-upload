import React, { Component } from 'react';

export default class FilesUploadComponent extends Component {
    
    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props);

        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            imgCollection: '',
            file: [null]
        }
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files})
    }
    onSubmit(e) {
        e.preventDefault()

        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        // axios.post("http://localhost:4000/api/upload-images", formData, {
        // }).then(res => {
        //     console.log(res.data)
        // })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                    <h3>React Multiple File Upload</h3>
                    <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." />
                    ))}
                        </div>
                        
                        <div className="form-group">
                        <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />                        </div>
                        <div className="form-group">
                        <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>preview</button>
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}