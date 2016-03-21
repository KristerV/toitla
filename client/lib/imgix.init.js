Meteor.startup(() => {
    imgix.onready(function() {
        imgix.fluid({
            updateOnResizeDown: false,
            pixelStep: 10,
            debounce: 200,
            lazyLoad: true,
            lazyLoadOffsetVertical: 1000,
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
    });
})