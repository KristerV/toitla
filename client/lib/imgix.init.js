Meteor.startup(() => {
    imgix.onready(function() {

        // HACK: Imgix will load too soon and images will not load (will need change of resolution)
        Meteor.setTimeout(() => {
            imgix.fluid({
                updateOnResizeDown: false,
                pixelStep: 10,
                autoInsertCSSBestPractices: false,
                onChangeParamOverride: function(w, h, params, element) {

                    if (params.shape === 'square') {
                        const min = Math.min(w, h) || w || h
                        params.w = `${min}`
                        params.h = `${min}`
                    }

                    return params;
                }
            });
        }, 1000)
    });
})