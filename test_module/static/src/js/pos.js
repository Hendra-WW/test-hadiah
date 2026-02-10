odoo.define('test_module.DisableInfoButton', function(require) {
    'use strict';

    const ProductInfoButton = require('point_of_sale.ProductInfoButton');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { patch } = require('web.utils');

    patch(ProductInfoButton.prototype, 'test_module.ProductInfoButtonPatch', {
        async onClick() {
            const isDisabled = true
            if (isDisabled) {
                console.log("Button disabled")
                return;
            }
            
            // return this._super(...arguments);
        },
    });

    patch(ProductScreen.prototype, 'test_module.ProductScreenPatch', {
        onMounted() {
            if (this._super) this._super(...arguments);

            const buttonTarget = this.el.querySelector('.control-button i[title="Info"]').closest('.control-button');
            if (buttonTarget) {
                buttonTarget.classList.add('disabled');
            }
        },
    });
});
