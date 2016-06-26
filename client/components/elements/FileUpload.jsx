import React from 'react';
FileUpload = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var images = S3.collection.find().fetch()

        // Update progress bar
        let bar = document.querySelector('#progress-bar')
        if (images[0] && bar) {
            bar.MaterialProgress.setProgress(images[0].percent_uploaded)
        }

        return {
            images: images,
        }
    },

    upload(e) {
        let files = e.target.files
        let self = this
        S3.upload({
            files:files,
            path: this.props.path
        },function(e,r){
            if (e)
                sAlert.error(e.reason)
            else {
                let url = r.relative_url
                let fullPath = url.split('/')
                const filename = fullPath.pop()
                const path = fullPath.join('/')
                self.props.onComplete(path, filename)
                S3.collection.remove(r._id)
            }
        });
    },

    render() {
        let uploading = this.data.images[0]
        return (<div>
            {uploading ?
                <div id="progress-bar" className="mdl-progress mdl-js-progress"></div>
                :
                <label className="file-upload-label">
                    <input type="file" onChange={this.upload}/>
                    <h2 className="mdl-button mdl-button--raised mdl-button--colored">Upload image</h2>
                </label>
            }
        </div>)
    }

})
