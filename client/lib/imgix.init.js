Meteor.startup(() => {
    imgix.onready(function() {
        var self = {props: {}}
        self.fluid = imgix.fluid({
            updateOnResizeDown: false,
            pixelStep: 10,
            debounce: 1000,
            lazyLoad: true,
            lazyLoadOffsetVertical: 500,
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